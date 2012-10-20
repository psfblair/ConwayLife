(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Control,_FSharpEvent_1,LifeHtml,Canvas,Life,Game,Number,Math,Seq,Collections,BalancedTree,_FSharpSet_1,SetModule,Html,Default,HTML5,List,T,Unchecked,G_vmlCanvasManager,Util,Operators;
 Runtime.Define(Global,{
  LifeHtml:{
   Canvas:{
    GameEvents:Runtime.Field(function()
    {
     return _FSharpEvent_1.New();
    }),
    adjustInitArrayAndRedraw:function(evt)
    {
     var cell,x,x1,f,f1,func,tupledArg1,_arg10_,_arg11_,x3,y1;
     if(Canvas.didNotMoveDuringClick(evt))
      {
       cell=(x=(x1=Canvas.canvasCoordinatesFromMouseEvent(evt),(f=Runtime.Tupled(function(tupledArg)
       {
        var _arg00_,_arg01_;
        _arg00_=tupledArg[0];
        _arg01_=tupledArg[1];
        return Canvas.transformPixelPairToCellPair(_arg00_,_arg01_);
       }),f(x1))),(f1=(func=function(x2)
       {
        return function(y)
        {
         return x2+y;
        };
       },(tupledArg1=[Canvas.cellXOffset(),Canvas.cellYOffset()],(_arg10_=tupledArg1[0],(_arg11_=tupledArg1[1],Runtime.Tupled(function(tupledArg)
       {
        var _arg20_,_arg21_;
        _arg20_=tupledArg[0];
        _arg21_=tupledArg[1];
        return Canvas.pairMap2(func,_arg10_,_arg11_,_arg20_,_arg21_);
       }))))),f1(x)));
       x3=cell[0];
       y1=cell[1];
       return Game.toggleCellAndRedraw(x3,y1,function(gameState)
       {
        return Canvas.drawLife(gameState);
       });
      }
     else
      {
       return null;
      }
    },
    canvas:Runtime.Field(function()
    {
     var _this;
     _this=Canvas.element();
     return _this.Body;
    }),
    canvasCoordinatesFromMouseEvent:function(evt)
    {
     var x,x1,f,func,tupledArg,_arg10_,_arg11_,f1,func1;
     x=(x1=[evt.clientX,evt.clientY],(f=(func=function(x2)
     {
      return function(y)
      {
       return x2-y;
      };
     },(tupledArg=[Canvas.canvasXOffset(),Canvas.canvasYOffset()],(_arg10_=tupledArg[0],(_arg11_=tupledArg[1],Runtime.Tupled(function(tupledArg1)
     {
      var _arg20_,_arg21_;
      _arg20_=tupledArg1[0];
      _arg21_=tupledArg1[1];
      return Canvas.pairMap2(func,_arg10_,_arg11_,_arg20_,_arg21_);
     }))))),f(x1)));
     f1=(func1=function(value)
     {
      return Number(value);
     },Runtime.Tupled(function(tupledArg1)
     {
      var _arg10_1,_arg11_1;
      _arg10_1=tupledArg1[0];
      _arg11_1=tupledArg1[1];
      return Canvas.pairMap(func1,_arg10_1,_arg11_1);
     }));
     return f1(x);
    },
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
     var canvasCoordinatePair,isBetweenOriginAnd,patternInput,f,tupledArg,_arg10_,_arg11_,yOk,xOk;
     canvasCoordinatePair=[_,_1];
     isBetweenOriginAnd=function(thePoint)
     {
      return function(theLimit)
      {
       if(thePoint>0)
        {
         return thePoint<Number(theLimit);
        }
       else
        {
         return false;
        }
      };
     };
     patternInput=(f=(tupledArg=[Canvas.canvas().width,Canvas.canvas().height],(_arg10_=tupledArg[0],(_arg11_=tupledArg[1],Runtime.Tupled(function(tupledArg1)
     {
      var _arg20_,_arg21_;
      _arg20_=tupledArg1[0];
      _arg21_=tupledArg1[1];
      return Canvas.pairMap2(isBetweenOriginAnd,_arg10_,_arg11_,_arg20_,_arg21_);
     })))),f(canvasCoordinatePair));
     yOk=patternInput[1];
     xOk=patternInput[0];
     if(xOk)
      {
       return yOk;
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
    cellXOffset:Runtime.Field(function()
    {
     return 0;
    }),
    cellYOffset:Runtime.Field(function()
    {
     return 0;
    }),
    context:Runtime.Field(function()
    {
     return Canvas.canvas().getContext("2d");
    }),
    didNotMoveDuringClick:function(evt)
    {
     var withinMoveTolerance,patternInput,x,f,didNotMoveY,didNotMoveX;
     withinMoveTolerance=function(distanceMoved)
     {
      return Math.abs(distanceMoved)<Number(Canvas.cellSide());
     };
     patternInput=(x=Canvas.pixelsMovedDuring(evt,Canvas.mouseDownCanvasCoordinates()),(f=Runtime.Tupled(function(tupledArg)
     {
      var _arg10_,_arg11_;
      _arg10_=tupledArg[0];
      _arg11_=tupledArg[1];
      return Canvas.pairMap(withinMoveTolerance,_arg10_,_arg11_);
     }),f(x)));
     didNotMoveY=patternInput[1];
     didNotMoveX=patternInput[0];
     if(didNotMoveX)
      {
       return didNotMoveY;
      }
     else
      {
       return false;
      }
    },
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
     Canvas.context().canvas.addEventListener("mousedown",function(evt)
     {
      return Canvas.setMouseDown(evt);
     },false);
     Canvas.context().canvas.addEventListener("mouseup",function(evt)
     {
      return Canvas.setMouseUp(evt);
     },false);
     Canvas.context().canvas.addEventListener("mousemove",function(evt)
     {
      return Canvas.scrollViewport(evt);
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
    mouseDownCanvasCoordinates:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    nodes:function()
    {
     var _this,_this1;
     return Operators.add(Default.Div(List.ofArray([Default.Width(Global.String(Canvas.canvas().width)),(_this=Default.Attr(),_this.NewAttr("style","float:left; clear:both"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("style","float:center"))])),List.ofArray([Canvas.element()]))]));
    },
    pairMap:function(_,_1,_2)
    {
     return(Runtime.Tupled(function(pair)
     {
      return[_(pair[0]),_(pair[1])];
     }))([_1,_2]);
    },
    pairMap2:function(_,_1,_2,_3,_4)
    {
     return((Runtime.Tupled(function(secondPair)
     {
      return Runtime.Tupled(function(firstPair)
      {
       return[(_(firstPair[0]))(secondPair[0]),(_(firstPair[1]))(secondPair[1])];
      });
     }))([_1,_2]))([_3,_4]);
    },
    pixelsMovedDuring:function(evt,previous)
    {
     var prevY,prevX,x,f,func,tupledArg,_arg10_,_arg11_;
     if(previous.$==1)
      {
       prevY=previous.$0[1];
       prevX=previous.$0[0];
       x=Canvas.canvasCoordinatesFromMouseEvent(evt);
       f=(func=function(x1)
       {
        return function(y)
        {
         return x1-y;
        };
       },(tupledArg=[prevX,prevY],(_arg10_=tupledArg[0],(_arg11_=tupledArg[1],Runtime.Tupled(function(tupledArg1)
       {
        var _arg20_,_arg21_;
        _arg20_=tupledArg1[0];
        _arg21_=tupledArg1[1];
        return Canvas.pairMap2(func,_arg10_,_arg11_,_arg20_,_arg21_);
       })))));
       return f(x);
      }
     else
      {
       return[0,0];
      }
    },
    previousCanvasCoordinates:Runtime.Field(function()
    {
     return{
      $:0
     };
    }),
    scrollViewport:function(evt)
    {
     var previous,prevY,prevX,x,x1,f,f1,_;
     if(Canvas.previousCanvasCoordinates().$==1)
      {
       previous=Canvas.previousCanvasCoordinates();
       prevY=Canvas.previousCanvasCoordinates().$0[1];
       prevX=Canvas.previousCanvasCoordinates().$0[0];
       x=(x1=Canvas.pixelsMovedDuring(evt,previous),(f=Runtime.Tupled(function(tupledArg)
       {
        var _arg00_,_arg01_;
        _arg00_=tupledArg[0];
        _arg01_=tupledArg[1];
        return Canvas.transformPixelPairToCellPair(_arg00_,_arg01_);
       }),f(x1)));
       f1=Runtime.Tupled(function(tupledArg)
       {
        var _arg00_,_arg01_;
        _arg00_=tupledArg[0];
        _arg01_=tupledArg[1];
        return Canvas.updateCellOffsets(_arg00_,_arg01_);
       });
       f1(x);
       _=(Runtime.Tupled(function(arg0)
       {
        return{
         $:1,
         $0:arg0
        };
       }))(Canvas.canvasCoordinatesFromMouseEvent(evt));
       Canvas.previousCanvasCoordinates=function()
       {
        return _;
       };
       return Canvas.drawLife(Game.currentState().contents);
      }
     else
      {
       return null;
      }
    },
    setMouseDown:function(evt)
    {
     var canvasCoordinates,_,_1;
     canvasCoordinates=Canvas.canvasCoordinatesFromMouseEvent(evt);
     _={
      $:1,
      $0:canvasCoordinates
     };
     Canvas.previousCanvasCoordinates=function()
     {
      return _;
     };
     _1={
      $:1,
      $0:canvasCoordinates
     };
     Canvas.mouseDownCanvasCoordinates=function()
     {
      return _1;
     };
    },
    setMouseUp:function(evt)
    {
     var _,_1;
     Canvas.adjustInitArrayAndRedraw(evt);
     _={
      $:0
     };
     Canvas.previousCanvasCoordinates=function()
     {
      return _;
     };
     _1={
      $:0
     };
     Canvas.mouseDownCanvasCoordinates=function()
     {
      return _1;
     };
    },
    transformCellCoordinatesToCanvasCoordinates:function(_,_1)
    {
     var cell,multiplyByCellSide,addHalfACellSide,x,x1,x2,f,func,tupledArg,_arg10_,_arg11_,f1,f2,f3,func1;
     cell=[_,_1];
     multiplyByCellSide=function(element)
     {
      return element*Canvas.cellSide();
     };
     addHalfACellSide=function(element)
     {
      return element+(Canvas.cellSide()/2>>0);
     };
     x=(x1=(x2=(f=(func=function(x3)
     {
      return function(y)
      {
       return x3-y;
      };
     },(tupledArg=[Canvas.cellXOffset(),Canvas.cellYOffset()],(_arg10_=tupledArg[0],(_arg11_=tupledArg[1],Runtime.Tupled(function(tupledArg1)
     {
      var _arg20_,_arg21_;
      _arg20_=tupledArg1[0];
      _arg21_=tupledArg1[1];
      return Canvas.pairMap2(func,_arg10_,_arg11_,_arg20_,_arg21_);
     }))))),f(cell)),(f1=Runtime.Tupled(function(tupledArg1)
     {
      var _arg10_1,_arg11_1;
      _arg10_1=tupledArg1[0];
      _arg11_1=tupledArg1[1];
      return Canvas.pairMap(multiplyByCellSide,_arg10_1,_arg11_1);
     }),f1(x2))),(f2=Runtime.Tupled(function(tupledArg1)
     {
      var _arg10_1,_arg11_1;
      _arg10_1=tupledArg1[0];
      _arg11_1=tupledArg1[1];
      return Canvas.pairMap(addHalfACellSide,_arg10_1,_arg11_1);
     }),f2(x1)));
     f3=(func1=function(value)
     {
      return Number(value);
     },Runtime.Tupled(function(tupledArg1)
     {
      var _arg10_1,_arg11_1;
      _arg10_1=tupledArg1[0];
      _arg11_1=tupledArg1[1];
      return Canvas.pairMap(func1,_arg10_1,_arg11_1);
     }));
     return f3(x);
    },
    transformPixelPairToCellPair:function(_,_1)
    {
     var pair,divideByCellSide,x,f,f1,func;
     pair=[_,_1];
     divideByCellSide=function(element)
     {
      return element/Number(Canvas.cellSide());
     };
     x=(f=Runtime.Tupled(function(tupledArg)
     {
      var _arg10_,_arg11_;
      _arg10_=tupledArg[0];
      _arg11_=tupledArg[1];
      return Canvas.pairMap(divideByCellSide,_arg10_,_arg11_);
     }),f(pair));
     f1=(func=function(value)
     {
      return value<<0;
     },Runtime.Tupled(function(tupledArg)
     {
      var _arg10_,_arg11_;
      _arg10_=tupledArg[0];
      _arg11_=tupledArg[1];
      return Canvas.pairMap(func,_arg10_,_arg11_);
     }));
     return f1(x);
    },
    updateCellOffsets:function(_,_1)
    {
     var offsetPair,_2,_3;
     offsetPair=[_,_1];
     _2=Canvas.cellXOffset()-offsetPair[0];
     Canvas.cellXOffset=function()
     {
      return _2;
     };
     _3=Canvas.cellYOffset()-offsetPair[1];
     Canvas.cellYOffset=function()
     {
      return _3;
     };
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
  Math=Runtime.Safe(Global.Math);
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
  Canvas.previousCanvasCoordinates();
  Canvas.mouseDownCanvasCoordinates();
  Canvas.element();
  Canvas.context();
  Canvas.cellYOffset();
  Canvas.cellXOffset();
  Canvas.cellSide();
  Canvas.canvasYOffset();
  Canvas.canvasXOffset();
  Canvas.canvas();
  Canvas.GameEvents();
 });
}());
