namespace LifeMobileSite

   module MobileContent =
      open IntelliFactory.WebSharper  // For JavaScript attribute (also Web.Control but this is ambiguous)
      open IntelliFactory.WebSharper.Html
      open IntelliFactory.WebSharper.Html5
      open IntelliFactory.WebSharper.JQuery
      open IntelliFactory.WebSharper.JQuery.Mobile
      open LifeHtml.Canvas
      open Life.Game

      type BodyControl() = 
         inherit IntelliFactory.WebSharper.Web.Control()

         [<JavaScript>]
         let CELL_SIDE_PIXELS = 10

         [<JavaScript>]
         override this.Body = 
            let headerHeight = JQuery.Of("#header").Height()
            let width = JQuery.Of("body").Width()
            let height = JQuery.Of("#page").Height() - (headerHeight * 2) // Assume header and footer are same height
            let xOffset = 0
            let yOffset = headerHeight / CELL_SIDE_PIXELS
            let board = new LifeBoard(width, height, CELL_SIDE_PIXELS, xOffset, yOffset)
            Span [ 
               board.Canvas()
               Div [Attr.Style "clear:both"]
               ] :> IPagelet

      type FooterControl() = 
         inherit IntelliFactory.WebSharper.Web.Control()

         [<JavaScript>]
         override this.Body = 
            JQuery.Mobile.Mobile.Use()
            Div [HTML5.Attr.Data "role" "controlgroup" ; 
                 HTML5.Attr.Data "type" "horizontal"; 
                 HTML5.Attr.Data "mini" "true"
                 Attr.Id "footerControls" ] -< [
                  A [HTML5.Attr.Data "role" "button"; HTML5.Attr.Data "icon" "check" ] 
                     -< [ Text "Go" ]
                     |>! OnClick (fun element eventArguments -> Go |> GameEvents.Trigger) 
                  A [HTML5.Attr.Data "role" "button"; HTML5.Attr.Data "icon" "delete" ] 
                     -< [ Text "Stop" ]
                     |>! OnClick (fun element eventArguments -> Stop |> GameEvents.Trigger) 
                  A [HTML5.Attr.Data "role" "button"; HTML5.Attr.Data "icon" "refresh"] 
                     -< [ Text "Reset" ] 
                     |>! OnClick (fun element eventArguments -> Reset |> GameEvents.Trigger)
                  ] |>! OnAfterRender (fun x -> JQuery.Of(x.Body).Trigger("create") |> ignore)
            :> IPagelet
