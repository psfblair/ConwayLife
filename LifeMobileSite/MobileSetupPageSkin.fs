namespace LifeMobileSite

open System.IO
open IntelliFactory.WebSharper.Sitelets

   type Page =  { Title : string ; Body : Content.HtmlElement list; Footer : Content.HtmlElement list }

   module Skin =
      let RunTemplate : IntelliFactory.WebSharper.Sitelets.Content.Template<Page> =
         let path = Path.Combine(__SOURCE_DIRECTORY__, "RunPage.html")
         Content.Template<Page>(path)
               .With("title", fun x -> x.Title)    
               .With("body", fun x -> x.Body)      
               .With("footer", fun x -> x.Footer)

      let WithContent title body footer =
         Content.WithTemplate RunTemplate <| fun context ->  { Title = title;  Body = body context; Footer = footer context }

