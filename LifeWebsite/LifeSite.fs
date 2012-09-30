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

   let Page = Skin.WithContent "John Horton Conway's Game of Life" <| fun ctx -> [ Div [new WebsiteContent.CanvasFrame()] ]

type LifeWebsite() =
   interface IWebsite<LifeSite.Action> with
      member this.Sitelet = [ Sitelet.Content "/index" LifeSite.Action.Index LifeSite.Page ] |> Sitelet.Sum
      member this.Actions = [ LifeSite.Action.Index ]
