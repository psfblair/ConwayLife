(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Life,Core,WebSharper,Collections,SetModule,Seq,Operators,BalancedTree,_FSharpSet_1,Game,Concurrency;
 Runtime.Define(Global,{
  Life:{
   Core:{
    cellState:function(_,_1,_2)
    {
     return(Runtime.Tupled(function(cell)
     {
      var liveNeighborCount,x,x1,_arg00_,_arg01_,f,f1,isCellAlive,f2;
      liveNeighborCount=(x=(x1=(_arg00_=cell[0],(_arg01_=cell[1],Core.neighbors(_arg00_,_arg01_))),(f=function(set2)
      {
       return SetModule.Filter(function(arg00)
       {
        return set2.Contains(arg00);
       },_);
      },f(x1))),(f1=function(set)
      {
       return set.get_Count();
      },f1(x)));
      isCellAlive=(f2=function(set)
      {
       return set.Contains(cell);
      },f2(_));
      return[cell,isCellAlive,liveNeighborCount];
     }))([_1,_2]);
    },
    neighborhood:function(_,_1)
    {
     var _arg1,b,a,x,f;
     _arg1=[_,_1];
     b=_arg1[1];
     a=_arg1[0];
     x=Seq.toList(Seq.delay(function()
     {
      return Seq.collect(function(i)
      {
       return Seq.map(function(j)
       {
        return[a+i,b+j];
       },Operators.range(-1,1));
      },Operators.range(-1,1));
     }));
     f=function(elements)
     {
      var t;
      t=BalancedTree.OfSeq(elements);
      return _FSharpSet_1.New1(t);
     };
     return f(x);
    },
    neighbors:function(_,_1)
    {
     var cell,x,_arg00_,_arg01_,f;
     cell=[_,_1];
     x=(_arg00_=cell[0],(_arg01_=cell[1],Core.neighborhood(_arg00_,_arg01_)));
     f=function(set)
     {
      return set.Remove(cell);
     };
     return f(x);
    },
    nextGeneration:function(livingCells)
    {
     var x,x1,x2,x3,f,f2,f3,mapping,f4,f5,mapping1;
     x=(x1=(x2=(x3=(f=function(set)
     {
      var f1,a,t;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var _arg00_,_arg01_;
       _arg00_=tupledArg[0];
       _arg01_=tupledArg[1];
       return Core.neighborhood(_arg00_,_arg01_);
      });
      a=Seq.map(f1,set);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     },f(livingCells)),(f2=function(sets)
     {
      var a,t;
      a=Seq.concat(sets);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     },f2(x3))),(f3=(mapping=Runtime.Tupled(function(tupledArg)
     {
      var _arg10_,_arg11_;
      _arg10_=tupledArg[0];
      _arg11_=tupledArg[1];
      return Core.cellState(livingCells,_arg10_,_arg11_);
     }),function(set)
     {
      var a,t;
      a=Seq.map(mapping,set);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     }),f3(x2))),(f4=function(set)
     {
      return SetModule.Filter(Runtime.Tupled(function(tupledArg)
      {
       var _arg00_,_arg01_,_arg02_;
       _arg00_=tupledArg[0];
       _arg01_=tupledArg[1];
       _arg02_=tupledArg[2];
       return Core.survives(_arg00_,_arg01_,_arg02_);
      }),set);
     },f4(x1)));
     f5=(mapping1=Runtime.Tupled(function(tupledArg)
     {
      var cell,_arg1,_arg2;
      cell=tupledArg[0];
      _arg1=tupledArg[1];
      _arg2=tupledArg[2];
      return cell;
     }),function(set)
     {
      var a,t;
      a=Seq.map(mapping1,set);
      t=BalancedTree.OfSeq(a);
      return _FSharpSet_1.New1(t);
     });
     return f5(x);
    },
    survives:function(_,_1,_2)
    {
     var cellState;
     cellState=[_,_1,_2];
     if(cellState[2]===2)
      {
       if(cellState[1])
        {
         return true;
        }
       else
        {
         return false;
        }
      }
     else
      {
       if(cellState[2]===3)
        {
         return true;
        }
       else
        {
         return false;
        }
      }
    }
   },
   Game:{
    addCell:function(_,_1)
    {
     var cell,s;
     cell=[_,_1];
     Game.currentState().contents=(s=Game.currentState().contents,s.Add(cell));
    },
    currentState:Runtime.Field(function()
    {
     return{
      contents:_FSharpSet_1.New1(null)
     };
    }),
    generationLoop:function(drawFunction)
    {
     var f,f1;
     if(Game.reset())
      {
       f=function()
       {
        return Concurrency.Return(null);
       };
       return Concurrency.Delay(f);
      }
     else
      {
       f1=function()
       {
        var x,f2;
        x=Concurrency.Sleep(500);
        f2=function()
        {
         var x1,f3;
         Game.newGeneration();
         drawFunction(Game.currentState().contents);
         x1=Game.generationLoop(drawFunction);
         f3=function()
         {
          return Concurrency.Return(null);
         };
         return Concurrency.Bind(x1,f3);
        };
        return Concurrency.Bind(x,f2);
       };
       return Concurrency.Delay(f1);
      }
    },
    isAlive:function(_,_1)
    {
     var cell,s;
     cell=[_,_1];
     s=Game.currentState().contents;
     return s.Contains(cell);
    },
    newGeneration:function()
    {
     Game.currentState().contents=Core.nextGeneration(Game.currentState().contents);
    },
    removeCell:function(_,_1)
    {
     var cell,a;
     cell=[_,_1];
     Game.currentState().contents=(a=Game.currentState().contents,a.Remove(cell));
    },
    reset:Runtime.Field(function()
    {
     return false;
    }),
    resetAllCells:function()
    {
     Game.currentState().contents=_FSharpSet_1.New1(null);
    },
    startDrawing:function(drawFunction)
    {
     var computation,t;
     Game.reset=function()
     {
      return false;
     };
     computation=Game.generationLoop(drawFunction);
     t={
      $:0
     };
     return Concurrency.Start(computation);
    },
    stopDrawing:function()
    {
     Game.reset=function()
     {
      return true;
     };
    },
    stopDrawingAndReset:function(drawFunction)
    {
     Game.stopDrawing();
     Game.resetAllCells();
     return drawFunction(Game.currentState().contents);
    },
    toggleCell:function(_,_1)
    {
     var cell,_arg00_,_arg01_,_arg00_1,_arg01_1,_arg00_2,_arg01_2;
     cell=[_,_1];
     if(_arg00_=cell[0],(_arg01_=cell[1],Game.isAlive(_arg00_,_arg01_)))
      {
       _arg00_1=cell[0];
       _arg01_1=cell[1];
       return Game.removeCell(_arg00_1,_arg01_1);
      }
     else
      {
       _arg00_2=cell[0];
       _arg01_2=cell[1];
       return Game.addCell(_arg00_2,_arg01_2);
      }
    },
    toggleCellAndRedraw:function(x,y,drawFunction)
    {
     Game.toggleCell(x,y);
     return drawFunction(Game.currentState().contents);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Life=Runtime.Safe(Global.Life);
  Core=Runtime.Safe(Life.Core);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Collections=Runtime.Safe(WebSharper.Collections);
  SetModule=Runtime.Safe(Collections.SetModule);
  Seq=Runtime.Safe(WebSharper.Seq);
  Operators=Runtime.Safe(WebSharper.Operators);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  _FSharpSet_1=Runtime.Safe(Collections["FSharpSet`1"]);
  Game=Runtime.Safe(Life.Game);
  return Concurrency=Runtime.Safe(WebSharper.Concurrency);
 });
 Runtime.OnLoad(function()
 {
  Game.reset();
  Game.currentState();
 });
}());
