namespace LifeWebsite

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

module LifeSite =

   open IntelliFactory.WebSharper
   open IntelliFactory.Html

   type Action =
         | Index
         | Mobile

   let MainHomePage = LifeMainSite.Skin.WithContent "John Horton Conway's Game of Life" 
                                                    <| fun ctx -> [ Div [new LifeMainSite.WebsiteContent.CanvasFrame()] ]

   let MobileGamePage = LifeMobileSite.Skin.WithGameContent "Conway's Game of Life" 
                                                    <| fun ctx -> [ Div [ new LifeMobileSite.MobileContent.BodyControl() ] ]
                                                    <| fun ctx -> [ Div [ new LifeMobileSite.MobileContent.FooterControl() ] ]

type LifeWebsite() =
   interface IWebsite<LifeSite.Action> with
      member this.Sitelet = [ Sitelet.Content "/" LifeSite.Action.Index LifeSite.MainHomePage
                              Sitelet.Content "/mobile" LifeSite.Action.Mobile LifeSite.MobileGamePage
                            ] |> Sitelet.Sum
      member this.Actions = [ LifeSite.Action.Index ; LifeSite.Action.Mobile ]

[<assembly: WebsiteAttribute(typeof<LifeWebsite>)>]
do ()
