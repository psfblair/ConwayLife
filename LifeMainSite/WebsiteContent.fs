﻿namespace LifeMainSite.WebsiteContent

open IntelliFactory.WebSharper  // For JavaScript attribute (also Web.Control but this is ambiguous)
open IntelliFactory.Html.Tags
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Html5
open LifeHtml.Canvas
open Life.Game

type CanvasFrame() = 
    inherit IntelliFactory.WebSharper.Web.Control()
         
    let CANVAS_WIDTH = 1200
    let CANVAS_HEIGHT = 650
    let CELL_SIDE_PIXELS = 10
    let CANVAS_X_OFFSET = 10
    let CANVAS_Y_OFFSET = 65
    
    [<JavaScript>]
    override this.Body = 
        LifeHtml.Canvas.initialize CANVAS_WIDTH CANVAS_HEIGHT CELL_SIDE_PIXELS CANVAS_X_OFFSET CANVAS_Y_OFFSET
        Span [ 
            Span [Attr.Style "position:absolute; top:20px; left:425px"] -< [
                    Input [Attr.Type "button"; Attr.Value "Go"] |>! OnClick (fun element eventArguments -> Go |> GameEvents.Trigger) 
                    Input [Attr.Type "button"; Attr.Value "Stop"] |>! OnClick (fun element eventArguments -> Stop |> GameEvents.Trigger) 
                    Input [Attr.Type "button"; Attr.Value "Reset"] |>! OnClick (fun element eventArguments -> Reset |> GameEvents.Trigger)
                    ]
            P [Attr.Style "font-style:italic; position:absolute; top:30px; " ; Text "Click within the canvas to set/unset cells. To add/remove cells in a running game, stop the game first. Cells outside the canvas boundaries are still tracked." ]
            LifeHtml.Canvas.nodes()
            Div [Attr.Style "clear:both"]
            ] :> IPagelet
