namespace LifeHtml
open System

   module Canvas =
      open IntelliFactory.WebSharper  // For Inline, JavaScript attributes, dom events
      open IntelliFactory.WebSharper.Html
      open IntelliFactory.WebSharper.Html5
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

      // Since IE does not support canvas natively. Initialization of the 
      // canvas element is done through the excanvas.js library.
      [<Inline "G_vmlCanvasManager.initElement($elem)">]
      let initializeForIE6 (elem: CanvasElement) : unit = ()

      type CanvasCoordinatePair = float * float

      [<JavaScript>]
      let transformCellCoordinatesToCanvasCoordinates cell : CanvasCoordinatePair = 
         let centerX = ((fst cell) * cellSide) + (cellSide / 2) |> float
         let centerY = ((snd cell) * cellSide) + (cellSide / 2) |> float
         (centerX, centerY)

      [<JavaScript>]
      let cellIsWithinViewableCanvas canvasCoordinatePair =
        (fst canvasCoordinatePair) > 0. && (fst canvasCoordinatePair) < (float canvas.Width) &&
            (snd canvasCoordinatePair) > 0. && (snd canvasCoordinatePair) < (float canvas.Height)

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
      let adjustInitArrayAndRedraw (evt:Dom.Event) =
         let event = evt :?> Dom.MouseEvent
         let x = (event.ClientX - canvasXOffset) / cellSide
         let y = (event.ClientY - canvasYOffset) / cellSide
         toggleCellAndRedraw (x,y) drawLife

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

         context.Canvas.AddEventListener("click", adjustInitArrayAndRedraw, false)

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