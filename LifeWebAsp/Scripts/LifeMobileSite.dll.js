(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,jQuery,LifeHtml,Canvas,WebSharper,Html,Default,List,Operators,HTML5,EventsPervasives;
 Runtime.Define(Global,{
  LifeMobileSite:{
   MobileContent:{
    BodyControl:Runtime.Class({
     get_Body:function()
     {
      var headerHeight,width,height,canvas_y_Offset,_this;
      headerHeight=jQuery("#header").height();
      width=jQuery("body").width();
      height=jQuery("#page").height()-headerHeight*2;
      canvas_y_Offset=(headerHeight/this.CELL_SIDE_PIXELS>>0)+1;
      Canvas.initialize(width,height,this.CELL_SIDE_PIXELS,0,canvas_y_Offset);
      return Default.Span(List.ofArray([Canvas.nodes(),Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","clear:both"))]))]));
     }
    }),
    FooterControl:Runtime.Class({
     get_Body:function()
     {
      var x,x1,_this,arg00,_this1,arg001,_this2,arg002,_this3,x2,_this4,arg003,_this5,arg004,f,x3,x5,_this7,arg006,_this8,arg007,f2,x6,x7,_this9,arg008,_thisa,arg009,f3,x8,f4,f5,f6,f7;
      x=(x1=Operators.add(Default.Div(List.ofArray([(_this=HTML5.Attr(),(arg00="data-"+"role",_this.NewAttr(arg00,"controlgroup"))),(_this1=HTML5.Attr(),(arg001="data-"+"type",_this1.NewAttr(arg001,"horizontal"))),(_this2=HTML5.Attr(),(arg002="data-"+"mini",_this2.NewAttr(arg002,"true"))),(_this3=Default.Attr(),_this3.NewAttr("id","footerControls"))])),List.ofArray([(x2=Operators.add(Default.A(List.ofArray([(_this4=HTML5.Attr(),(arg003="data-"+"role",_this4.NewAttr(arg003,"button"))),(_this5=HTML5.Attr(),(arg004="data-"+"icon",_this5.NewAttr(arg004,"check")))])),List.ofArray([Default.Text("Go")])),(f=(x3=function()
      {
       return function()
       {
        var x4,f1;
        x4={
         $:0
        };
        f1=function(arg005)
        {
         var _this6;
         _this6=Canvas.GameEvents();
         return _this6.event.Trigger(arg005);
        };
        return f1(x4);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x3,arg10);
      }),(f(x2),x2))),(x5=Operators.add(Default.A(List.ofArray([(_this7=HTML5.Attr(),(arg006="data-"+"role",_this7.NewAttr(arg006,"button"))),(_this8=HTML5.Attr(),(arg007="data-"+"icon",_this8.NewAttr(arg007,"delete")))])),List.ofArray([Default.Text("Stop")])),(f2=(x6=function()
      {
       return function()
       {
        var x4,f1;
        x4={
         $:1
        };
        f1=function(arg005)
        {
         var _this6;
         _this6=Canvas.GameEvents();
         return _this6.event.Trigger(arg005);
        };
        return f1(x4);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x6,arg10);
      }),(f2(x5),x5))),(x7=Operators.add(Default.A(List.ofArray([(_this9=HTML5.Attr(),(arg008="data-"+"role",_this9.NewAttr(arg008,"button"))),(_thisa=HTML5.Attr(),(arg009="data-"+"icon",_thisa.NewAttr(arg009,"refresh")))])),List.ofArray([Default.Text("Reset")])),(f3=(x8=function()
      {
       return function()
       {
        var x4,f1;
        x4={
         $:2
        };
        f1=function(arg005)
        {
         var _this6;
         _this6=Canvas.GameEvents();
         return _this6.event.Trigger(arg005);
        };
        return f1(x4);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnClick(x8,arg10);
      }),(f3(x7),x7)))])),(f4=(f5=function(x4)
      {
       var x9,f1;
       x9=jQuery(x4.Body).trigger("create");
       f1=function(value)
       {
        value;
       };
       return f1(x9);
      },function(w)
      {
       return Operators.OnAfterRender(f5,w);
      }),(f4(x1),x1)));
      f6=(f7=function()
      {
       return jQuery.mobile.changePage(".");
      },function(w)
      {
       return Operators.OnAfterRender(f7,w);
      });
      f6(x);
      return x;
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  jQuery=Runtime.Safe(Global.jQuery);
  LifeHtml=Runtime.Safe(Global.LifeHtml);
  Canvas=Runtime.Safe(LifeHtml.Canvas);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  Operators=Runtime.Safe(Html.Operators);
  HTML5=Runtime.Safe(Default.HTML5);
  return EventsPervasives=Runtime.Safe(Html.EventsPervasives);
 });
 Runtime.OnLoad(function()
 {
 });
}());
