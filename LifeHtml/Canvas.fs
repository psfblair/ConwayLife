namespace LifeHtml
open System

   module Canvas =
      open IntelliFactory.WebSharper  // For Inline, JavaScript attributes, dom events
      open IntelliFactory.WebSharper.Html
      open IntelliFactory.WebSharper.Html5
      open Life.Core
      open Life.Game
 
      [<JavaScript>]
      let element = HTML5.Tags.Canvas []

      [<JavaScript>]
      let canvas  = As<CanvasElement> element.Dom

      [<JavaScript>]
      let context = canvas.GetContext "2d"

      [<JavaScript>]
      let mutable cellSide = 0

      [<JavaScript>]
      let mutable canvasXOffset = 0

      [<JavaScript>]
      let mutable canvasYOffset = 0

      [<JavaScript>]
      let mutable cellXOffset = 0

      [<JavaScript>]
      let mutable cellYOffset = 0

      [<JavaScript>]
      let mutable previousCanvasCoordinates = None

      [<JavaScript>]
      let mutable mouseDownCanvasCoordinates = None

      // Since IE does not support canvas natively. Initialization of the 
      // canvas element is done through the excanvas.js library.
      [<Inline "G_vmlCanvasManager.initElement($elem)">]
      let initializeForIE6 (elem: CanvasElement) : unit = ()

      type CanvasCoordinatePair = float * float

      [<JavaScript>]
      let pairMap func pair = (func (fst pair)), (func (snd pair))

      [<JavaScript>]
      let pairMap2 func secondPair firstPair = (func (fst firstPair) (fst secondPair)), (func (snd firstPair) (snd secondPair))

      [<JavaScript>]
      let transformCellCoordinatesToCanvasCoordinates (cell: Cell) : CanvasCoordinatePair = 
         let multiplyByCellSide element = element * cellSide
         let addHalfACellSide element = element + (cellSide / 2)

         cell |> pairMap2 (-) (cellXOffset, cellYOffset)
              |> pairMap multiplyByCellSide
              |> pairMap addHalfACellSide
              |> pairMap float

      [<JavaScript>]
      let transformPixelPairToCellPair (pair: CanvasCoordinatePair) : Cell = 
         let divideByCellSide element = element / (float cellSide)
         pair |> pairMap divideByCellSide |> pairMap int

      [<JavaScript>]
      let cellIsWithinViewableCanvas (canvasCoordinatePair: CanvasCoordinatePair) =
        let isBetweenOriginAnd (thePoint: float) (theLimit: int) = (thePoint > 0.0) && (thePoint < (float theLimit))
        let (xOk, yOk) = canvasCoordinatePair |> pairMap2 isBetweenOriginAnd (canvas.Width, canvas.Height)
        xOk && yOk

      [<JavaScript>]
      let canvasCoordinatesFromMouseEvent (evt: Dom.Event) : CanvasCoordinatePair =
         let event = evt :?> Dom.MouseEvent
         (event.ClientX, event.ClientY) |> pairMap2 (-) (canvasXOffset, canvasYOffset) |> pairMap float

      [<JavaScript>]
      let drawSmallCircleAtPoint canvasCoordinatePair =
         let radius = ((float cellSide) - 2.0) / 2.0
         let startAngle = 0.0
         let endAngle = Math.PI * 2.
         context.BeginPath()
         context.Arc((fst canvasCoordinatePair), (snd canvasCoordinatePair), radius, startAngle, endAngle, true)
         context.ClosePath()
         context.Stroke()

      [<JavaScript>]
      let drawLife (gameState: Set<int*int>) =
         context.Save()
         context.ClearRect(0., 0., (float canvas.Width), (float canvas.Height))
         context.FillStyle <- "#8EE5EE"
         context.FillRect(0., 0., (float canvas.Width), (float canvas.Height))
         context.Save()

         context.StrokeStyle <- "black"
         context.FillStyle <- "black"
         context.LineWidth <- 1.

         gameState |> Set.map transformCellCoordinatesToCanvasCoordinates
                   |> Set.filter cellIsWithinViewableCanvas 
                   |> Set.iter drawSmallCircleAtPoint      
         context.Save()

      [<JavaScript>]
      let pixelsMovedDuring (evt:Dom.Event) (previous: option<CanvasCoordinatePair>) : CanvasCoordinatePair = 
         match previous with
            | None -> (0.0, 0.0)
            | Some(prevX,prevY) -> canvasCoordinatesFromMouseEvent evt |> pairMap2 (-) (prevX, prevY)

      [<JavaScript>]
      let didNotMoveDuringClick (evt:Dom.Event) = 
         let withinMoveTolerance distanceMoved = (abs distanceMoved) < (float cellSide)
         let (didNotMoveX, didNotMoveY) = pixelsMovedDuring evt mouseDownCanvasCoordinates |> pairMap withinMoveTolerance
         didNotMoveX && didNotMoveY

      [<JavaScript>]
      let adjustInitArrayAndRedraw (evt:Dom.Event) =
         if didNotMoveDuringClick evt then
            let cell = canvasCoordinatesFromMouseEvent evt |> transformPixelPairToCellPair
                                                           |> pairMap2 (+) (cellXOffset, cellYOffset)
            toggleCellAndRedraw cell drawLife
         else
            ()
      
      [<JavaScript>]
      let setMouseDown (evt:Dom.Event) = 
         let canvasCoordinates = canvasCoordinatesFromMouseEvent evt
         previousCanvasCoordinates <- Some(canvasCoordinates)
         mouseDownCanvasCoordinates <- Some(canvasCoordinates)

      [<JavaScript>]
      let setMouseUp (evt:Dom.Event) =
         adjustInitArrayAndRedraw evt
         previousCanvasCoordinates <- None
         mouseDownCanvasCoordinates <- None
      
      [<JavaScript>]
      let updateCellOffsets offsetPair =
         cellXOffset <- cellXOffset - (fst offsetPair)
         cellYOffset <- cellYOffset - (snd offsetPair)
                          
      [<JavaScript>]
      let scrollViewport (evt:Dom.Event) = 
         match previousCanvasCoordinates with
            | None -> ()
            | Some(prevX,prevY) as previous ->
                pixelsMovedDuring evt previous |> transformPixelPairToCellPair |> updateCellOffsets
                previousCanvasCoordinates <- Some <| canvasCoordinatesFromMouseEvent evt              
                drawLife !currentState

      type GameEvent = | Go | Stop | Reset
     
      [<JavaScript>]
      let GameEvents = new Event<GameEvent>()

      [<JavaScript>]
      let initialize width height cellSidePixels canvasXOffsetPixels canvasYOffsetPixels = 
         // Conditional initialization for the case of IE.
         if (JavaScript.Get "getContext" canvas = JavaScript.Undefined) then
               initializeForIE6 canvas
            
         canvas.Width  <- width
         canvas.Height <- height
         cellSide <- cellSidePixels
         canvasXOffset <- canvasXOffsetPixels
         canvasYOffset <- canvasYOffsetPixels

         context.Canvas.AddEventListener("mousedown", setMouseDown, false)
         context.Canvas.AddEventListener("mouseup", setMouseUp, false)
         context.Canvas.AddEventListener("mousemove", scrollViewport, false)

         drawLife !currentState

         GameEvents.Publish.Add (function | Go -> startDrawing drawLife
                                          | Stop -> stopDrawing ()
                                          | Reset -> stopDrawingAndReset drawLife )

      [<JavaScript>]
      let nodes () = 
         Div [ Width (string canvas.Width); Attr.Style "float:left; clear:both" ] -< [
               Div [ Attr.Style "float:center" ] -< [
                  element
               ]
         ]