namespace LifeHtml
open System

   module Canvas =
      open IntelliFactory.WebSharper  // For Inline, JavaScript attributes, dom events
      open IntelliFactory.WebSharper.Html
      open IntelliFactory.WebSharper.Html5
      open Life.Game
 
      // Since IE does not support canvas natively. Initialization of the 
      // canvas element is done through the excanvas.js library.
      [<Inline "G_vmlCanvasManager.initElement($elem)">]
      let initializeForIE6 (elem: CanvasElement) : unit = ()

      type CanvasCoordinatePair = float * float

      [<JavaScript>]
      let transformCellCoordinatesToCanvasCoordinates cellSideInPixels cell : CanvasCoordinatePair = 
         let centerX = ((fst cell) * cellSideInPixels) + (cellSideInPixels / 2) |> float
         let centerY = ((snd cell) * cellSideInPixels) + (cellSideInPixels / 2) |> float
         (centerX, centerY)

      [<JavaScript>]
      let cellIsWithinViewableCanvas width height canvasCoordinatePair =
        (fst canvasCoordinatePair) > 0. && (fst canvasCoordinatePair) < (float width) &&
            (snd canvasCoordinatePair) > 0. && (snd canvasCoordinatePair) < (float height)

      [<JavaScript>]
      let drawSmallCircleAtPoint (ctx:CanvasRenderingContext2D) cellSideInPixels canvasCoordinatePair =
         let radius = ((float cellSideInPixels) - 2.0) / 2.0
         let startAngle = 0.0
         let endAngle = Math.PI * 2.
         ctx.BeginPath()
         ctx.Arc((fst canvasCoordinatePair), (snd canvasCoordinatePair), radius, startAngle, endAngle, true)
         ctx.ClosePath()
         ctx.Stroke()

      [<JavaScript>]
      let drawLife (context:CanvasRenderingContext2D) width height cellSide (gameState: Set<int*int>) =
         context.Save()
         context.ClearRect(0., 0., (float width), (float height))
         context.FillStyle <- "#8EE5EE"
         context.FillRect(0., 0., (float width), (float height))
         context.Save()

         context.StrokeStyle <- "black"
         context.FillStyle <- "black"
         context.LineWidth <- 1.

         gameState |> Set.map (transformCellCoordinatesToCanvasCoordinates cellSide)
                   |> Set.filter (cellIsWithinViewableCanvas width height) 
                   |> Set.iter (drawSmallCircleAtPoint context cellSide)      
         context.Save()

      [<JavaScript>]
      let adjustInitArrayAndRedraw (context:CanvasRenderingContext2D) width height cellSide cellXOffset cellYOffset (evt:Dom.Event) =
         let event = evt :?> Dom.MouseEvent
         let x = (event.ClientX / cellSide) - cellXOffset
         let y = (event.ClientY / cellSide) - cellYOffset
         toggleCellAndRedraw (x,y) (drawLife context width height cellSide)

      type GameEvent = | Go | Stop | Reset
     
      [<JavaScript>]
      let GameEvents = new Event<GameEvent>()
 
      [<JavaScript>]
      let element = HTML5.Tags.Canvas []

      [<JavaScript>]
      let canvas  = As<CanvasElement> element.Dom

      [<JavaScript>]
      let context = canvas.GetContext "2d"

      [<JavaScript>]
      let initialize (width:int) (height:int) (cellSide:int) (cellXOffset:int) (cellYOffset:int) = 
         // Conditional initialization for the case of IE.
         if (JavaScript.Get "getContext" canvas = JavaScript.Undefined) then
               initializeForIE6 canvas
            
         canvas.Width  <- width
         canvas.Height <- height

         context.Canvas.AddEventListener("click", (adjustInitArrayAndRedraw context width height cellSide cellXOffset cellYOffset), false)
          
         drawLife context width height cellSide !currentState

         GameEvents.Publish.Add (function | Go -> startDrawing (drawLife context width height cellSide) 
                                          | Stop -> stopDrawing ()
                                          | Reset -> stopDrawingAndReset (drawLife context width height cellSide) )

      [<JavaScript>]
      let nodes () = 
         Div [ Width (string canvas.Width); Attr.Style "float:left; clear:both" ] -< [
               Div [ Attr.Style "float:center" ] -< [
                  element
               ]
         ]