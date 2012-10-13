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

   let MainHomePage = LifeMainSite.Skin.WithContent "John Horton Conway's Game of Life" <| fun ctx -> [ Div [new LifeMainSite.WebsiteContent.CanvasFrame()] ]

type LifeWebsite() =
   interface IWebsite<LifeSite.Action> with
      member this.Sitelet = Sitelet.Content "/" LifeSite.Action.Index LifeSite.MainHomePage
      member this.Actions = [ LifeSite.Action.Index ]

[<assembly: WebsiteAttribute(typeof<LifeWebsite>)>]
do ()
