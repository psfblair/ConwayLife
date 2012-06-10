module Life
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html5

[<JavaScript>]
let stringifySet (set:Set<int*int>) = //For debugging with Alerts (Window.Self.Alert)
    let stringifyPairAndAdd (accum:string) (x:int,y:int) = 
        accum + "(" + x.ToString() + "," + y.ToString() + ")"
    Set.fold stringifyPairAndAdd "" set

[<JavaScript>]
let neighborhood (a:int,b:int) = 
    let f = [   for i in -1..1 do
                for j in -1..1 do
                    yield a+i, b+j
            ] |> Set.ofList
//    Window.Self.Alert("Neighbors of: (" + a.ToString() + "," + b.ToString() + ") : " + stringifySet(f))
    f

[<JavaScript>]
let neighbors cell =
    neighborhood cell |> Set.remove cell
    (* // The following doesn't work either... seems even worse:
    let setOfMe = Set.empty |> Set.add cell
    neighborhood cell |> Set.difference setOfMe 
    *)

[<JavaScript>]
let cellState liveCells cell =
//    Window.Self.Alert("Cell is: " + (fst cell).ToString() + "," + (snd cell).ToString())
    let neighboringCells = neighbors cell
    let liveNeighborCount = neighboringCells |> Set.intersect liveCells  |> Set.count
//    Window.Self.Alert("Live cells is: " + (stringifySet liveCells))
//    Window.Self.Alert("Neighbors is: " + (stringifySet neighborsWithoutItself))
//    Window.Self.Alert("Live neighbors is: " +  (stringifySet (Set.intersect liveCells neighborsWithoutItself))) 
//    Window.Self.Alert("Live neighbor count is: " + liveNeighborCount.ToString())
    let isCellAlive = Set.contains cell liveCells
//    Window.Self.Alert("Live cells is: " + (stringifySet liveCells))
//    Window.Self.Alert("Cell is: " + (fst cell).ToString() + "," + (snd cell).ToString())
//    Window.Self.Alert("Is cell alive is: " + isCellAlive.ToString())
    (cell, isCellAlive, liveNeighborCount)

[<JavaScript>]
let survivalRules = function
    | _, _,    3 -> true
    | _, true, 2 -> true
    | _          -> false

[<JavaScript>]
let nextGeneration livingCells : Set<int*int> = 
    //Window.Self.Alert("Before: " + (stringifySet livingCells))
    let newState = livingCells|> Set.map neighborhood 
                              |> Set.unionMany 
                              |> Set.map (cellState livingCells) 
                              |> Set.filter survivalRules 
                              |> Set.map (fun (a1,b1,c1) -> a1)
    //Window.Self.Alert("After: " + (stringifySet newState))
    newState
