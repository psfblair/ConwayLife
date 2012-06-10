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
        let CANVAS_WIDTH = 800
        [<JavaScript>]
        let CANVAS_HEIGHT = 600
        [<JavaScript>]
        let CELL_SIDE_PIXELS = 10
        [<JavaScript>]
        let mutable context = None

        [<JavaScript>]
        let mutable initialState =  Set.empty

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
            let y = (event.ClientY / CELL_SIDE_PIXELS) - 11
            if Set.contains (x,y) initialState then
                initialState <- Set.remove (x,y) initialState
            else 
                initialState <- Set.add (x, y) initialState
            drawLife (Option.get context) initialState 

        [<JavaScript>]
        let StarterFormlet () : Formlet<int> =
            Controls.Button("Go")

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
            
            drawLife ctx initialState
            Div [ Width (string width); Attr.Style "float:left" ] -< [
                Div [ Attr.Style "float:center" ] -< [
                    element
                    P [Align "center"] -< [
                        I [Text <| "Life" ]
                    ]
                ]
            ]

        [<JavaScript>]
        let rec generationLoop oldState  =
            async {
                do! Async.Sleep 500
                //Window.Self.Alert("Before: " + (stringifySet oldState))
                let newState = nextGeneration oldState
               // Window.Self.Alert("After: " + (stringifySet newState))
                do drawLife (Option.get context) newState
                do! generationLoop newState
            }

        [<JavaScript>]
        let startDrawing s =
            Async.Start (generationLoop initialState)

        (* // This doesn't work either:
        [<JavaScript>]
        let rec generationLoop currentState () =
            let newState = nextGeneration currentState
            drawLife (Option.get context) newState
            JavaScript.SetTimeout (generationLoop newState) 500 |> ignore

        [<JavaScript>]
        let startDrawing s = 
            JavaScript.SetTimeout (generationLoop initialState) 500 |> ignore
        *)

        [<JavaScript>]
        let Main () =
            Div [
                Div [ StarterFormlet().Run (fun s -> startDrawing s) ]                                              
                AnimatedCanvas CANVAS_WIDTH CANVAS_HEIGHT "1"
                Div [Attr.Style "clear:both"]
            ]

    module Client =
        type CanvasViewer() = 
            inherit IntelliFactory.WebSharper.Web.Control()

            [<JavaScript>]
            override this.Body = Canvas.Main () :> _


    let Index = Skin.WithTemplate "Index page" <| fun ctx -> [  Div [new Client.CanvasViewer()] ]

    let MySitelet = [ Sitelet.Content "/index" Action.Index Index ] |> Sitelet.Sum
    let MyActions = [ Action.Index ]

type MySampleWebsite() =
    interface IWebsite<LifeSite.Action> with
        member this.Sitelet = LifeSite.MySitelet
        member this.Actions = LifeSite.MyActions

[<assembly: WebsiteAttribute(typeof<MySampleWebsite>)>]
do ()
