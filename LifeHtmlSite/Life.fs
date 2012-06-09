module Life
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html5

[<JavaScript>]
let stringifySet (set:Set<int*int>) = //For debugging with Alerts (Window.Self.Alert)
    let stringifyPairAndAdd (accum:string) (x:int,y:int) = 
        accum + "(" + x.ToString() + "," + y.ToString() + ")"
    Set.fold stringifyPairAndAdd "" set

[<JavaScript>]
let neighbors (a,b) = 
   // Window.Self.Alert("Neighbors of: " + a.ToString() + "," + b.ToString())
    let f = [   for i in -1..1 do
                for j in -1..1 do
                    yield a+i, b+j
            ] |> Set.ofList
    //Window.Self.Alert(stringifySet(f))
    f

[<JavaScript>]
let cellState liveCells cell =
    //Window.Self.Alert("Cell is: " + (fst cell).ToString() + "," + (snd cell).ToString())
    let neighborsWithoutItself = neighbors cell |> Set.remove cell
    let liveNeighborCount = Set.intersect liveCells neighborsWithoutItself |> Set.count
    //Window.Self.Alert("Live neighbor count is: " + liveNeighborCount.ToString())
    //Window.Self.Alert("Live cells is: " + (stringifySet liveCells))
    //Window.Self.Alert("Neighbors is: " + (stringifySet (neighbors cell |> Set.remove cell)))
    let isCellAlive = Set.contains cell liveCells
    //Window.Self.Alert("Is cell alive is: " + isCellAlive.ToString())
    (cell, isCellAlive, liveNeighborCount)

[<JavaScript>]
let survivalRules = function
    | _, _,    3 -> true
    | _, true, 2 -> true
    | _          -> false

[<JavaScript>]
let nextGeneration livingCells : Set<int*int> = 
    //Window.Self.Alert("Before: " + (stringifySet livingCells))
    let newState = livingCells|> Set.map neighbors 
                              |> Set.unionMany 
                              |> Set.map (cellState livingCells) 
                              |> Set.filter survivalRules 
                              |> Set.map (fun (a,b,c) -> a)
    //Window.Self.Alert("After: " + (stringifySet newState))
    newState

(*

[<JavaScript>]
let listContains aList elem =
    List.exists (fun x -> x = elem) aList

[<JavaScript>]
let intersect (list1:list<int*int>) (list2:list<int*int>) =
    List.fold (fun accum elem -> if (listContains list2 elem) then elem::accum else accum) [] list1

[<JavaScript>]
let removeFromList elem list =
    List.filter (fun x -> not (x = elem)) list

[<JavaScript>]
let discardIfInList accum elem =
    match accum with 
        | [] -> [elem]
        | aList when List.exists (fun x -> x = elem) aList -> aList
        | aList -> elem :: aList

[<JavaScript>]
let filterDups alist =
    List.fold discardIfInList [] alist


let newState = livingCells|> List.map neighbors 
                        |> List.concat 
                        |> filterDups
                        |> List.map (cellState livingCells) 
                        |> List.filter survivalRules 
                        |> List.map (fun (a,b,c) -> a)

 *)