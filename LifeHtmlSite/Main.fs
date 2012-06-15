namespace LifeHtmlSite

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

module LifeSite =
    open IntelliFactory.WebSharper
    open IntelliFactory.Html
    open IntelliFactory.WebSharper.Formlet

    type Action =
        | Index

    module Skin =
        type Page =  { Title : string ; Body : list<Content.HtmlElement> }

        let MainTemplate =
            let path = Path.Combine(__SOURCE_DIRECTORY__, "Main.html")
            Content.Template<Page>(path)
                .With("title", fun x -> x.Title)
                .With("body", fun x -> x.Body)

        let WithTemplate title body : Content<Action> =
            Content.WithTemplate MainTemplate <| fun context ->  { Title = title;  Body = body context }

    module Canvas =
        open IntelliFactory.WebSharper.Html
        open IntelliFactory.WebSharper.Html5
        open Life
                
         // Since IE does not support canvas natively. Initialization of the 
        // canvas element is done through the excanvas.js library.
        [<Inline "G_vmlCanvasManager.initElement($elem)">]
        let Initialize (elem: CanvasElement) : unit = ()

        [<JavaScript>]
        let CANVAS_WIDTH = 1200
        [<JavaScript>]
        let CANVAS_HEIGHT = 650
        [<JavaScript>]
        let CELL_SIDE_PIXELS = 10
        [<JavaScript>]
        let mutable context = None

        [<JavaScript>]
        let mutable currentState =  Set.empty

        [<JavaScript>]
        let drawSmallCircleAtPoint (ctx: CanvasRenderingContext2D) (x,y) =
            let radius = (float(CELL_SIDE_PIXELS) - 2.0) / 2.0
            let startAngle = 0.0
            let endAngle = Math.PI * 2.
            let centerX = float ((x * CELL_SIDE_PIXELS) + (CELL_SIDE_PIXELS / 2)) 
            let centerY = float ((y * CELL_SIDE_PIXELS) + (CELL_SIDE_PIXELS / 2)) 
            ctx.BeginPath()
            ctx.Arc(centerX, centerY, radius, startAngle, endAngle, true)
            ctx.ClosePath()
            ctx.Stroke()

        [<JavaScript>]
        let drawLife (ctx: CanvasRenderingContext2D) (gameState: Set<int*int>) =
            ctx.Save()
            ctx.ClearRect(0., 0., float(CANVAS_WIDTH), float(CANVAS_HEIGHT))
            ctx.FillStyle <- "#8EE5EE"
            ctx.FillRect(0., 0., float(CANVAS_WIDTH), float(CANVAS_HEIGHT))
            ctx.Save()

            ctx.StrokeStyle <- "black"
            ctx.FillStyle <- "black"
            ctx.LineWidth <- 1.

            Set.iter (drawSmallCircleAtPoint ctx) gameState      
            ctx.Save()

        [<JavaScript>]
        let adjustInitArrayAndRedraw (evt:Dom.Event) =
            let event = evt :?> Dom.MouseEvent
            let x = (event.ClientX / CELL_SIDE_PIXELS) - 1  // For some reason we have crazy offsets here
            let y = (event.ClientY / CELL_SIDE_PIXELS) - 6
            if Set.contains (x,y) currentState then
                currentState <- Set.remove (x,y) currentState
            else 
                currentState <- Set.add (x, y) currentState
            drawLife (Option.get context) currentState 

        [<JavaScript>]
        let AnimatedCanvas width height caption =
            let element = HTML5.Tags.Canvas []
            let canvas  = As<CanvasElement> element.Dom
            // Conditional initialization for the case of IE.
            if (JavaScript.Get "getContext" canvas = JavaScript.Undefined) then
                Initialize canvas
            
            canvas.Width  <- width
            canvas.Height <- height

            let ctx = canvas.GetContext "2d"
            ctx.Canvas.AddEventListener("click", adjustInitArrayAndRedraw, false)

            context <- Some(ctx)
            
            drawLife ctx currentState
            Div [ Width (string width); Attr.Style "float:left; clear:both" ] -< [
                Div [ Attr.Style "float:center" ] -< [
                    element
                ]
            ]

        [<JavaScript>]
        let mutable reset = false

        [<JavaScript>]
        let rec generationLoop () =
            if reset then
                async { return () }
            else
                async {
                    do! Async.Sleep 500
                    currentState <- nextGeneration currentState
                    do  drawLife (Option.get context) currentState
                    do! generationLoop ()
                }
  
        [<JavaScript>]
        let startDrawing () =
            reset <- false
            Async.Start (generationLoop ())

        [<JavaScript>]
        let stopDrawing () =
            reset <- true

        [<JavaScript>]
        let stopDrawingAndReset () =
            stopDrawing ()
            currentState <- Set.empty
            drawLife (Option.get context) currentState

        [<JavaScript>]
        let Main () =
            Span [ 
                Span [Attr.Style "position:absolute; top:20px; left:425px"] -< [
                        Input [Attr.Type "button"; Attr.Value "Go"] |>! OnClick (fun element eventArguments -> startDrawing()) 
                        Input [Attr.Type "button"; Attr.Value "Stop"] |>! OnClick (fun element eventArguments -> stopDrawing()) 
                        Input [Attr.Type "button"; Attr.Value "Reset"] |>! OnClick (fun element eventArguments -> stopDrawingAndReset()) 
                        ]
                P [Attr.Style "font-style:italic; position:absolute; top:30px; " ; Text "Click within the canvas to set/unset cells. To add/remove cells in a running game, stop the game first. Cells outside the canvas boundaries are still tracked." ]
                AnimatedCanvas CANVAS_WIDTH CANVAS_HEIGHT "1" 
                Div [Attr.Style "clear:both"]
            ]

    module Client =
        type CanvasViewer() = 
            inherit IntelliFactory.WebSharper.Web.Control()

            [<JavaScript>]
            override this.Body = Canvas.Main () :> _


    let Index = Skin.WithTemplate "John Horton Conway's Game of Life" <| fun ctx -> [  Div [new Client.CanvasViewer()] ]

    let MySitelet = [ Sitelet.Content "/index" Action.Index Index ] |> Sitelet.Sum
    let MyActions = [ Action.Index ]

type MySampleWebsite() =
    interface IWebsite<LifeSite.Action> with
        member this.Sitelet = LifeSite.MySitelet
        member this.Actions = LifeSite.MyActions

[<assembly: WebsiteAttribute(typeof<MySampleWebsite>)>]
do ()
