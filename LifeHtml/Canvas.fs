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
      let Initialize (elem: CanvasElement) : unit = ()

      [<JavaScript>]
      let drawSmallCircleAtPoint (ctx:CanvasRenderingContext2D) cellSide (x,y) =
         let radius = ((float cellSide) - 2.0) / 2.0
         let startAngle = 0.0
         let endAngle = Math.PI * 2.
         let centerX = float ((x * cellSide) + (cellSide / 2)) 
         let centerY = float ((y * cellSide) + (cellSide / 2)) 
         ctx.BeginPath()
         ctx.Arc(centerX, centerY, radius, startAngle, endAngle, true)
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

         Set.iter (drawSmallCircleAtPoint context cellSide) gameState      
         context.Save()

      [<JavaScript>]
      let adjustInitArrayAndRedraw (context:CanvasRenderingContext2D) width height cellSide cellXOffset cellYOffset (evt:Dom.Event) =
         let event = evt :?> Dom.MouseEvent
         let x = (event.ClientX / cellSide) - cellXOffset
         let y = (event.ClientY / cellSide) - cellYOffset
         toggleCellAndRedraw (x,y) (drawLife context width height cellSide)

      [<JavaScript>]
      type GameEvent = | Go | Stop | Reset
     
      [<JavaScript>]
      let GameEvents = new Event<GameEvent>()

      [<JavaScript>]
      type LifeBoard (width : int,  height : int, cellSide : int, cellXOffset : int, cellYOffset : int) = 

         let element = HTML5.Tags.Canvas []
         let canvas  = As<CanvasElement> element.Dom
         let context = canvas.GetContext "2d"

         do 
            // Conditional initialization for the case of IE.
            if (JavaScript.Get "getContext" canvas = JavaScript.Undefined) then
                  Initialize canvas
            
            canvas.Width  <- width
            canvas.Height <- height

            context.Canvas.AddEventListener("click", (adjustInitArrayAndRedraw context width height cellSide cellXOffset cellYOffset), false)
          
            drawLife context width height cellSide !currentState

            GameEvents.Publish.Add (function | Go -> startDrawing (drawLife context width height cellSide) 
                                             | Stop -> stopDrawing ()
                                             | Reset -> stopDrawingAndReset (drawLife context width height cellSide) )

         member this.Canvas () = 
            Div [ Width (string width); Attr.Style "float:left; clear:both" ] -< [
                  Div [ Attr.Style "float:center" ] -< [
                     element
                  ]
            ]