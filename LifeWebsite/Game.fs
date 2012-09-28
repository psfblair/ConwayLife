namespace Life

module Game =
   open IntelliFactory.WebSharper
   open Core

(* ***************** State management ***************** *)

   [<JavaScript>]
   let currentState =  ref Set.empty<Cell>

   [<JavaScript>]
   let isAlive cell = 
      Set.contains cell !currentState

   [<JavaScript>]
   let removeCell cell =
      currentState := Set.remove cell !currentState

   [<JavaScript>]
   let addCell cell =
      currentState := Set.add cell !currentState

   [<JavaScript>]
   let toggleCell cell =
      if isAlive cell then
         removeCell cell
      else 
         addCell cell

   [<JavaScript>]
   let newGeneration() =
      currentState := nextGeneration !currentState

   [<JavaScript>]
   let resetAllCells() =
      currentState := Set.empty<Cell>

   [<JavaScript>]
   let mutable reset = false

   [<JavaScript>]
   let rec generationLoop drawFunction =
      if reset then
            async { return () }
      else
            async {
               do! Async.Sleep 500
               newGeneration()
               do  drawFunction !currentState
               do! generationLoop drawFunction
            }
  
   [<JavaScript>]
   let startDrawing drawFunction =
      reset <- false
      Async.Start (generationLoop drawFunction)

   [<JavaScript>]
   let stopDrawing () =
      reset <- true

   [<JavaScript>]
   let stopDrawingAndReset drawFunction =
      stopDrawing ()
      resetAllCells()
      drawFunction !currentState

   [<JavaScript>]
   let toggleCellAndRedraw (x,y) drawFunction =
      toggleCell (x,y)
      drawFunction !currentState