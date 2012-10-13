(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,LifeHtml,Canvas,WebSharper,Html,Default,List,Operators,EventsPervasives;
 Runtime.Define(Global,{
  LifeMainSite:{
   WebsiteContent:{
    CanvasFrame:Runtime.Class({
     get_Body:function()
     {
      var _this,x,_this1,_this2,f,x1,x3,_this4,_this5,f2,x4,x5,_this6,_this7,f3,x6,_this8,_this9;
      Canvas.initialize(this.CANVAS_WIDTH,this.CANVAS_HEIGHT,this.CELL_SIDE_PIXELS,this.X_OFFSET,this.Y_OFFSET);
      return Default.Span(List.ofArray([Operators.add(Default.Span(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","position:absolute; top:20px; left:425px"))])),List.ofArray([(x=Default.Input(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("type","button")),(_this2=Default.Attr(),_this2.NewAttr("value","Go"))])),(f=(x1=function()
      {
       return function()
       {
        var x2,f1;
        x2={
         $:0
        };
        f1=function(arg00)
        {
         var _this3;
         _this3=Canvas.GameEvents();
         return _this3.event.Trigger(arg00);
        };
        return f1(x2);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x1,arg10);
      }),(f(x),x))),(x3=Default.Input(List.ofArray([(_this4=Default.Attr(),_this4.NewAttr("type","button")),(_this5=Default.Attr(),_this5.NewAttr("value","Stop"))])),(f2=(x4=function()
      {
       return function()
       {
        var x2,f1;
        x2={
         $:1
        };
        f1=function(arg00)
        {
         var _this3;
         _this3=Canvas.GameEvents();
         return _this3.event.Trigger(arg00);
        };
        return f1(x2);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x4,arg10);
      }),(f2(x3),x3))),(x5=Default.Input(List.ofArray([(_this6=Default.Attr(),_this6.NewAttr("type","button")),(_this7=Default.Attr(),_this7.NewAttr("value","Reset"))])),(f3=(x6=function()
      {
       return function()
       {
        var x2,f1;
        x2={
         $:2
        };
        f1=function(arg00)
        {
         var _this3;
         _this3=Canvas.GameEvents();
         return _this3.event.Trigger(arg00);
        };
        return f1(x2);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x6,arg10);
      }),(f3(x5),x5)))])),Default.P(List.ofArray([(_this8=Default.Attr(),_this8.NewAttr("style","font-style:italic; position:absolute; top:30px; ")),Default.Text("Click within the canvas to set/unset cells. To add/remove cells in a running game, stop the game first. Cells outside the canvas boundaries are still tracked.")])),Canvas.nodes(),Default.Div(List.ofArray([(_this9=Default.Attr(),_this9.NewAttr("style","clear:both"))]))]));
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  LifeHtml=Runtime.Safe(Global.LifeHtml);
  Canvas=Runtime.Safe(LifeHtml.Canvas);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  Operators=Runtime.Safe(Html.Operators);
  return EventsPervasives=Runtime.Safe(Html.EventsPervasives);
 });
 Runtime.OnLoad(function()
 {
 });
}());
