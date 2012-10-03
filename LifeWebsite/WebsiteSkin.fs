namespace LifeWebsite

open System.IO
open System.Web
open IntelliFactory.WebSharper.Sitelets // For the Content module

type Page =  { Title : string ; Body : list<Content.HtmlElement> }

module Skin =
    let getTemplatePath() =
        try
            HttpContext.Current.Server.MapPath("~/bin/Main.html")
        with 
            | ex -> Path.Combine(__SOURCE_DIRECTORY__, @"Main.html")

    let MainTemplate : Content.Template<Page> =
        let path = getTemplatePath()
        Content.Template<Page>(path)
            .With("title", fun x -> x.Title)    // function mapping Title field of Page to "title" placeholder in html
            .With("body", fun x -> x.Body)      // function mapping Body field of Page to div whose data-hole attribute is "body"

    // The second argument (body) will be a function mapping from a Context<Action> to a list of HTML elements
    // and this function will return a Content<Action>
    let WithContent (title:string) (body:Context<'a> -> Content.HtmlElement list) : Content<'a> =
        Content.WithTemplate MainTemplate <| fun context ->  { Title = title;  Body = body context }

