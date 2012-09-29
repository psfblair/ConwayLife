namespace LifeMobileSite

open System
open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

module LifeSite =
   open IntelliFactory.WebSharper
   open IntelliFactory.Html

   type Action =
         | Index

   let Page =
      Skin.WithContent "Conway's Game of Life" 
                  <| fun ctx -> [ Div [ new MobileContent.BodyControl() ] ]
                  <| fun ctx -> [ Div [ new MobileContent.FooterControl() ] ]

type LifeWebsite() =
   interface IWebsite<LifeSite.Action> with
      member this.Sitelet = [ Sitelet.Content "/index" LifeSite.Action.Index LifeSite.Page ] |> Sitelet.Sum
      member this.Actions = [ LifeSite.Action.Index ]

[<assembly: WebsiteAttribute(typeof<LifeWebsite>)>]
do ()
