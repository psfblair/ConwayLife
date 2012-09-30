(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Control,_FSharpEvent_1,Life,Game,LifeHtml,Canvas,Number,Seq,Html,Default,HTML5,List,T,Unchecked,G_vmlCanvasManager,Util,Operators;
 Runtime.Define(Global,{
  LifeHtml:{
   Canvas:{
    GameEvents:Runtime.Field(function()
    {
     return _FSharpEvent_1.New();
    }),
    adjustInitArrayAndRedraw:function(context,width,height,cellSide,cellXOffset,cellYOffset,evt)
    {
     var x,y;
     x=(evt.clientX/cellSide>>0)-cellXOffset;
     y=(evt.clientY/cellSide>>0)-cellYOffset;
     return Game.toggleCellAndRedraw(x,y,function(gameState)
     {
      return Canvas.drawLife(context,width,height,cellSide,gameState);
     });
    },
    canvas:Runtime.Field(function()
    {
     var _this;
     _this=Canvas.element();
     return _this.Body;
    }),
    context:Runtime.Field(function()
    {
     return Canvas.canvas().getContext("2d");
    }),
    drawLife:function(context,width,height,cellSide,gameState)
    {
     var f;
     context.save();
     context.clearRect(0,0,Number(width),Number(height));
     context.fillStyle="#8EE5EE";
     context.fillRect(0,0,Number(width),Number(height));
     context.save();
     context.strokeStyle="black";
     context.fillStyle="black";
     context.lineWidth=1;
     f=Runtime.Tupled(function(tupledArg)
     {
      var x,y;
      x=tupledArg[0];
      y=tupledArg[1];
      return Canvas.drawSmallCircleAtPoint(context,cellSide,x,y);
     });
     Seq.iter(f,gameState);
     return context.save();
    },
    drawSmallCircleAtPoint:function(ctx,cellSide,x,y)
    {
     var radius,endAngle,centerX,centerY;
     radius=(Number(cellSide)-2)/2;
     endAngle=3.14159265358979*2;
     centerX=Number(x*cellSide+(cellSide/2>>0));
     centerY=Number(y*cellSide+(cellSide/2>>0));
     ctx.beginPath();
     ctx.arc(centerX,centerY,radius,0,endAngle,true);
     ctx.closePath();
     return ctx.stroke();
    },
    element:Runtime.Field(function()
    {
     var _this,x;
     _this=HTML5.Tags();
     x=Runtime.New(T,{
      $:0
     });
     return _this.NewTag("canvas",x);
    }),
    initialize:function(width,height,cellSide,cellXOffset,cellYOffset)
    {
     var target,_this;
     if(Unchecked.Equals((target=Canvas.canvas(),target.getContext),undefined))
      {
       G_vmlCanvasManager.initElement(Canvas.canvas());
      }
     Canvas.canvas().width=width;
     Canvas.canvas().height=height;
     Canvas.context().canvas.addEventListener("click",function(evt)
     {
      return Canvas.adjustInitArrayAndRedraw(Canvas.context(),width,height,cellSide,cellXOffset,cellYOffset,evt);
     },false);
     Canvas.drawLife(Canvas.context(),width,height,cellSide,Game.currentState().contents);
     return Util.addListener((_this=Canvas.GameEvents(),_this.event),function(_arg1)
     {
      if(_arg1.$==1)
       {
        return Game.stopDrawing();
       }
      else
       {
        if(_arg1.$==2)
         {
          return Game.stopDrawingAndReset(function(gameState)
          {
           return Canvas.drawLife(Canvas.context(),width,height,cellSide,gameState);
          });
         }
        else
         {
          return Game.startDrawing(function(gameState)
          {
           return Canvas.drawLife(Canvas.context(),width,height,cellSide,gameState);
          });
         }
       }
     });
    },
    nodes:function()
    {
     var _this,_this1;
     return Operators.add(Default.Div(List.ofArray([Default.Width(Global.String(Canvas.canvas().width)),(_this=Default.Attr(),_this.NewAttr("style","float:left; clear:both"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","float:center"))])),List.ofArray([Canvas.element()]))]));
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Control=Runtime.Safe(WebSharper.Control);
  _FSharpEvent_1=Runtime.Safe(Control["FSharpEvent`1"]);
  Life=Runtime.Safe(Global.Life);
  Game=Runtime.Safe(Life.Game);
  LifeHtml=Runtime.Safe(Global.LifeHtml);
  Canvas=Runtime.Safe(LifeHtml.Canvas);
  Number=Runtime.Safe(Global.Number);
  Seq=Runtime.Safe(WebSharper.Seq);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  HTML5=Runtime.Safe(Default.HTML5);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  G_vmlCanvasManager=Runtime.Safe(Global.G_vmlCanvasManager);
  Util=Runtime.Safe(WebSharper.Util);
  return Operators=Runtime.Safe(Html.Operators);
 });
 Runtime.OnLoad(function()
 {
  Canvas.element();
  Canvas.context();
  Canvas.canvas();
  Canvas.GameEvents();
 });
}());
