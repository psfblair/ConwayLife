(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Control,_FSharpEvent_1,Life,Game,LifeHtml,Canvas,Number,Seq,Collections,BalancedTree,_FSharpSet_1,SetModule,Html,Default,HTML5,List,T,Unchecked,G_vmlCanvasManager,Util,Operators;
 Runtime.Define(Global,{
  LifeHtml:{
   Canvas:{
    GameEvents:Runtime.Field(function()
    {
     return _FSharpEvent_1.New();
    }),
    adjustInitArrayAndRedraw:function(context,width,height,cellSide,canvasXOffset,canvasYOffset,evt)
    {
     var x,y;
     x=(evt.clientX-canvasXOffset)/cellSide>>0;
     y=(evt.clientY-canvasYOffset)/cellSide>>0;
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
    cellIsWithinViewableCanvas:function(_,_1,_2,_3)
    {
     return(Runtime.Tupled(function(canvasCoordinatePair)
     {
      if((canvasCoordinatePair[0]>0?canvasCoordinatePair[0]<Number(_):false)?canvasCoordinatePair[1]>0:false)
       {
        return canvasCoordinatePair[1]<Number(_1);
       }
      else
       {
        return false;
       }
     }))([_2,_3]);
    },
    context:Runtime.Field(function()
    {
     return Canvas.canvas().getContext("2d");
    }),
    drawLife:function(context,width,height,cellSide,gameState)
    {
     var x,x1,f,mapping,f1,predicate,f2,action;
     context.save();
     context.clearRect(0,0,Number(width),Number(height));
     context.fillStyle="#8EE5EE";
     context.fillRect(0,0,Number(width),Number(height));
     context.save();
     context.strokeStyle="black";
     context.fillStyle="black";
     context.lineWidth=1;
     x=(x1=(f=(mapping=Runtime.Tupled(function(tupledArg)
     {
      var _arg10_,_arg11_;
      _arg10_=tupledArg[0];
      _arg11_=tupledArg[1];
      return Canvas.transformCellCoordinatesToCanvasCoordinates(cellSide,_arg10_,_arg11_);
     }),function(set)
     {
      var a,t;
      a=Seq.map(mapping,set);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     }),f(gameState)),(f1=(predicate=Runtime.Tupled(function(tupledArg)
     {
      var _arg20_,_arg21_;
      _arg20_=tupledArg[0];
      _arg21_=tupledArg[1];
      return Canvas.cellIsWithinViewableCanvas(width,height,_arg20_,_arg21_);
     }),function(set)
     {
      return SetModule.Filter(predicate,set);
     }),f1(x1)));
     f2=(action=Runtime.Tupled(function(tupledArg)
     {
      var _arg20_,_arg21_;
      _arg20_=tupledArg[0];
      _arg21_=tupledArg[1];
      return Canvas.drawSmallCircleAtPoint(context,cellSide,_arg20_,_arg21_);
     }),function(set)
     {
      return Seq.iter(action,set);
     });
     f2(x);
     return context.save();
    },
    drawSmallCircleAtPoint:function(_,_1,_2,_3)
    {
     return(Runtime.Tupled(function(canvasCoordinatePair)
     {
      var radius,endAngle;
      radius=(Number(_1)-2)/2;
      endAngle=3.14159265358979*2;
      _.beginPath();
      _.arc(canvasCoordinatePair[0],canvasCoordinatePair[1],radius,0,endAngle,true);
      _.closePath();
      return _.stroke();
     }))([_2,_3]);
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
    initialize:function(width,height,cellSide,canvasXOffset,canvasYOffset)
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
      return Canvas.adjustInitArrayAndRedraw(Canvas.context(),width,height,cellSide,canvasXOffset,canvasYOffset,evt);
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
    },
    transformCellCoordinatesToCanvasCoordinates:function(_,_1,_2)
    {
     return(Runtime.Tupled(function(cell)
     {
      var centerX,x,f,centerY,x1,f1;
      centerX=(x=cell[0]*_+(_/2>>0),(f=function(value)
      {
       return Number(value);
      },f(x)));
      centerY=(x1=cell[1]*_+(_/2>>0),(f1=function(value)
      {
       return Number(value);
      },f1(x1)));
      return[centerX,centerY];
     }))([_1,_2]);
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
  Canvas.canvas();
  Canvas.GameEvents();
 });
}());
