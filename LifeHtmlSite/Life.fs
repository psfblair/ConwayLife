module Life
open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html5

[<JavaScript>]
type Cell = int * int
[<JavaScript>]
type Neighborhood = Set<Cell>
[<JavaScript>]
type Neighbors = Set<Cell>
[<JavaScript>]
type Generation = Set<Cell>

[<JavaScript>]
type IsAlive = bool
[<JavaScript>]
type LiveNeighborCount = int
[<JavaScript>]
type CellState = Cell * IsAlive * LiveNeighborCount

[<JavaScript>]
let neighborhood ((a,b):Cell) : Neighborhood = 
    [   for i in -1..1 do
        for j in -1..1 do
            yield a+i, b+j
    ] |> Set.ofList

[<JavaScript>]
let neighbors (cell:Cell) : Neighbors = neighborhood cell |> Set.remove cell

[<JavaScript>]
let cellState (liveCells:Generation) (cell:Cell) : CellState =
    let liveNeighborCount = neighbors cell |> Set.intersect liveCells |> Set.count
    let isCellAlive = liveCells |> Set.contains cell 
    (cell, isCellAlive, liveNeighborCount)

[<JavaScript>]
let survives (cellState:CellState) : bool = 
    match cellState with
        | _, _,    3 -> true
        | _, true, 2 -> true
        | _          -> false

[<JavaScript>]
let nextGeneration (livingCells:Generation) : Generation = 
    livingCells |> Set.map neighborhood 
                |> Set.unionMany 
                |> Set.map (cellState livingCells) 
                |> Set.filter survives 
                |> Set.map (fun (cell,_,_) -> cell)
