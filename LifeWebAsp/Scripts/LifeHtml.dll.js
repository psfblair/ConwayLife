(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Control,_FSharpEvent_1,LifeHtml,Canvas,Life,Game,Number,Seq,Collections,BalancedTree,_FSharpSet_1,SetModule,Html,Default,HTML5,List,T,Unchecked,G_vmlCanvasManager,Util,Operators;
 Runtime.Define(Global,{
  LifeHtml:{
   Canvas:{
    GameEvents:Runtime.Field(function()
    {
     return _FSharpEvent_1.New();
    }),
    adjustInitArrayAndRedraw:function(evt)
    {
     var x,y;
     x=(evt.clientX-Canvas.canvasXOffset())/Canvas.cellSide()>>0;
     y=(evt.clientY-Canvas.canvasYOffset())/Canvas.cellSide()>>0;
     return Game.toggleCellAndRedraw(x,y,function(gameState)
     {
      return Canvas.drawLife(gameState);
     });
    },
    canvas:Runtime.Field(function()
    {
     var _this;
     _this=Canvas.element();
     return _this.Body;
    }),
    canvasXOffset:Runtime.Field(function()
    {
     return 0;
    }),
    canvasYOffset:Runtime.Field(function()
    {
     return 0;
    }),
    cellIsWithinViewableCanvas:function(_,_1)
    {
     var canvasCoordinatePair;
     canvasCoordinatePair=[_,_1];
     if((canvasCoordinatePair[0]>0?canvasCoordinatePair[0]<Number(Canvas.canvas().width):false)?canvasCoordinatePair[1]>0:false)
      {
       return canvasCoordinatePair[1]<Number(Canvas.canvas().height);
      }
     else
      {
       return false;
      }
    },
    cellSide:Runtime.Field(function()
    {
     return 0;
    }),
    context:Runtime.Field(function()
    {
     return Canvas.canvas().getContext("2d");
    }),
    drawLife:function(gameState)
    {
     var x,x1,f,f2,f3;
     Canvas.context().save();
     Canvas.context().clearRect(0,0,Number(Canvas.canvas().width),Number(Canvas.canvas().height));
     Canvas.context().fillStyle="#8EE5EE";
     Canvas.context().fillRect(0,0,Number(Canvas.canvas().width),Number(Canvas.canvas().height));
     Canvas.context().save();
     Canvas.context().strokeStyle="black";
     Canvas.context().fillStyle="black";
     Canvas.context().lineWidth=1;
     x=(x1=(f=function(set)
     {
      var f1,a,t;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var _arg00_,_arg01_;
       _arg00_=tupledArg[0];
       _arg01_=tupledArg[1];
       return Canvas.transformCellCoordinatesToCanvasCoordinates(_arg00_,_arg01_);
      });
      a=Seq.map(f1,set);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     },f(gameState)),(f2=function(set)
     {
      return SetModule.Filter(Runtime.Tupled(function(tupledArg)
      {
       var _arg00_,_arg01_;
       _arg00_=tupledArg[0];
       _arg01_=tupledArg[1];
       return Canvas.cellIsWithinViewableCanvas(_arg00_,_arg01_);
      }),set);
     },f2(x1)));
     f3=function(set)
     {
      var f1;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var _arg00_,_arg01_;
       _arg00_=tupledArg[0];
       _arg01_=tupledArg[1];
       return Canvas.drawSmallCircleAtPoint(_arg00_,_arg01_);
      });
      return Seq.iter(f1,set);
     };
     f3(x);
     return Canvas.context().save();
    },
    drawSmallCircleAtPoint:function(_,_1)
    {
     var canvasCoordinatePair,radius,endAngle;
     canvasCoordinatePair=[_,_1];
     radius=(Number(Canvas.cellSide())-2)/2;
     endAngle=3.14159265358979*2;
     Canvas.context().beginPath();
     Canvas.context().arc(canvasCoordinatePair[0],canvasCoordinatePair[1],radius,0,endAngle,true);
     Canvas.context().closePath();
     return Canvas.context().stroke();
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
    initialize:function(width,height,cellSidePixels,canvasXOffsetPixels,canvasYOffsetPixels)
    {
     var target,_this;
     if(Unchecked.Equals((target=Canvas.canvas(),target.getContext),undefined))
      {
       G_vmlCanvasManager.initElement(Canvas.canvas());
      }
     Canvas.canvas().width=width;
     Canvas.canvas().height=height;
     Canvas.cellSide=function()
     {
      return cellSidePixels;
     };
     Canvas.canvasXOffset=function()
     {
      return canvasXOffsetPixels;
     };
     Canvas.canvasYOffset=function()
     {
      return canvasYOffsetPixels;
     };
     Canvas.context().canvas.addEventListener("click",function(evt)
     {
      return Canvas.adjustInitArrayAndRedraw(evt);
     },false);
     Canvas.drawLife(Game.currentState().contents);
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
           return Canvas.drawLife(gameState);
          });
         }
        else
         {
          return Game.startDrawing(function(gameState)
          {
           return Canvas.drawLife(gameState);
          });
         }
       }
     });
    },
    nodes:function()
    {
     var _this,_this1;
     return Operators.add(Default.Div(List.ofArray([Default.Width(Global.String(Canvas.canvas().width)),(_this=Default.Attr(),_this.NewAttr("style","float:left; clear:both"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","float:center"))])),List.ofArray([Canvas.element()]))]));
    },
    transformCellCoordinatesToCanvasCoordinates:function(_,_1)
    {
     var cell,centerX,x,f,centerY,x1,f1;
     cell=[_,_1];
     centerX=(x=cell[0]*Canvas.cellSide()+(Canvas.cellSide()/2>>0),(f=function(value)
     {
      return Number(value);
     },f(x)));
     centerY=(x1=cell[1]*Canvas.cellSide()+(Canvas.cellSide()/2>>0),(f1=function(value)
     {
      return Number(value);
     },f1(x1)));
     return[centerX,centerY];
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Control=Runtime.Safe(WebSharper.Control);
  _FSharpEvent_1=Runtime.Safe(Control["FSharpEvent`1"]);
  LifeHtml=Runtime.Safe(Global.LifeHtml);
  Canvas=Runtime.Safe(LifeHtml.Canvas);
  Life=Runtime.Safe(Global.Life);
  Game=Runtime.Safe(Life.Game);
  Number=Runtime.Safe(Global.Number);
  Seq=Runtime.Safe(WebSharper.Seq);
  Collections=Runtime.Safe(WebSharper.Collections);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  _FSharpSet_1=Runtime.Safe(Collections["FSharpSet`1"]);
  SetModule=Runtime.Safe(Collections.SetModule);
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
  Canvas.cellSide();
  Canvas.canvasYOffset();
  Canvas.canvasXOffset();
  Canvas.canvas();
  Canvas.GameEvents();
 });
}());
