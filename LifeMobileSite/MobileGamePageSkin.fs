namespace LifeMobileSite

open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets

type Page =  { Title : string ; Body : Content.HtmlElement list; Footer : Content.HtmlElement list }

module Skin =
    let getPathForTemplate filename =
        try
            HttpContext.Current.Server.MapPath("~/bin/" + filename)
        with 
            | ex -> Path.Combine(__SOURCE_DIRECTORY__, filename)

    let GameTemplate : IntelliFactory.WebSharper.Sitelets.Content.Template<Page> =
        let path = getPathForTemplate "GamePage.html"
        Content.Template<Page>(path)
            .With("title", fun x -> x.Title)    
            .With("body", fun x -> x.Body)      
            .With("footer", fun x -> x.Footer)

    let WithGameContent title body footer =
        Content.WithTemplate GameTemplate <| fun context ->  { Title = title;  Body = body context; Footer = footer context }

