// // ____FUNCTION DEFINITIONS____ // //
b = null;
let arr =[[]];
// // ____FUNCTION DEFINITIONS____ // //
window.onload = function(){
    for (var i = 1; i <= 81; i++){
        let tile = document.getElementById(String(i));
        tile.classList.add("tile");
    }
}
function initiate() {
    // null -> null
    // populate the board with whatever the user inputted
    var startingBoard = [[]]
    var j = 0
    for (var i = 1; i <= 81; i++){
        let tile = document.getElementById(String(i));
        if (i ==2 || i ==5 ){
            tile.classList.add("horizontal-line");
        }
        tile.classList.add("tile");
        let val = document.getElementById(String(i)).value;
        
        if (val == ""){
            startingBoard[j].push(null);
        }
        else { 
            startingBoard[j].push(Number(val));
        }
        if (i % 9 == 0 && i < 81){
            startingBoard.push([]);
            j++;
        }
    }
    // console.log(startingBoard)
    const inputValid = validBoard(startingBoard)
    if (!inputValid){
        inputIsInvalid()
    }
    else{
        const answer = solve(startingBoard)
        updateBoard(answer, inputValid)
    }
}

function solve(board) {
//check if the board is already solved
    if (solved(board)) {
        return board;
    }
    else {
        //get all avilable states
        const possibilities = nextBoards(board);
        //get only the valid states
        const validBoards = keepOnlyValid(possibilities);
        // for the backtracking algorithm
        return searchForSolution(validBoards);
    }
}

function searchForSolution(boards){
// if no valid possibilities are avilable
    if (boards.length < 1){
        return false
    }
    else {
        // using backtracking
        var first = boards.shift();
        const tryPath = solve(first); //solve the first board(mutual referencing)
        if (tryPath != false){
            return tryPath;
        }
        else{
            // search for solution on the remaninig boards
            return searchForSolution(boards);
        }
    }
}


function solved(board){
    // Board -> Boolean
    // if all the values are filled then the board is solved
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

//generate 9 possibilities of a board
function nextBoards(board){ 
    // Board -> List[Board]
    // finds the first emply square and generates 9 different boards filling in that square with numbers 1...9
    var res = [];
    const firstEmpty = findEmptySquare(board);// returns the coordinates of the empty(y,x)
    if (firstEmpty != undefined){
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        // fill out all the numbers from 1-9 for the empty board
        for (var i = 1; i <= 9; i++){
            var newBoard = [...board];
            var row = [...newBoard[y]];
            row[x] = i;
            newBoard[y] = row;
            res.push(newBoard);
        }
    }
    return res;
}

function findEmptySquare(board){
    // Board -> [Int, Int] 
    // (get the i j coordinates for the first empty square)
    // return the tuple of the first empty square
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null) {
                return [i, j]
            }
        }
    }
}

//filtering function
function keepOnlyValid(boards){
    // List[Board] -> List[Board]
    // filters out all of the invalid boards from the list
    var res = []
    for (var i = 0; i < boards.length; i++){
        if (validBoard(boards[i])){
            res.push(boards[i])
        }
    }
    return res
}

function validBoard(board){
    // checks to see if given board is valid
    return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each row
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[i][j])){
                return false
            }
            else if (board[i][j] != null){
                cur.push(board[i][j])
            }
        }
    }
    return true
}

function columnsGood(board){
    // THIS FUNCTION WORKS.
    // Board -> Boolean
    // makes sure there are no repeating numbers for each column
    for (var i = 0; i < 9; i++){
        var cur = []
        for (var j = 0; j < 9; j++){
            if (cur.includes(board[j][i])){
                return false
            }
            else if (board[j][i] != null){
                cur.push(board[j][i])
            }
        }
    }
    return true
}


function boxesGood(board){
    // represent the upperleft box of the 2D array board
    const boxCoordinates = [[0, 0], [0, 1], [0, 2],
                            [1, 0], [1, 1], [1, 2],
                            [2, 0], [2, 1], [2, 2]]
    //traverse the board vertically by 3 boxes
    for (var y = 0; y < 9; y += 3){
        //traverse the board horizontally
        for (var x = 0; x < 9; x += 3){
            // each traversal should examine each box
            var cur = []
            for (var i = 0; i < 9; i++){
                var coordinates = [...boxCoordinates[i]]
                coordinates[0] += y
                coordinates[1] += x
                if (cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false
                }
                else if (board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]])
                }
            }
        }
    }
    return true
}

function updateBoard(board) {
    let solution=[];
    document.getElementById("error").innerHTML = "";
    if (board == false){ 
        return;
    }else{
        for (let i=0;i<9;i++){
            solution[i] = board[i].join("");
        }
    }
    setGame();
    console.log(solution);
    // populate the game and the digits
    function setGame(){
        //board 9*9
        for (let i =0;i<9;i++){
            for (let j=0;j<9;j++){
                if (document.getElementById(i.toString()+"-"+j.toString())!=null){
                    var elem = document. getElementById(i.toString()+"-"+j.toString());
                    elem. remove();
                }
            }
        }
        console.log('1');
        for (let i =0;i<9;i++){
            for (let j=0;j<9;j++){
                let tile = document.createElement("div");
                tile.id = i.toString()+"-"+j.toString();
                // to not display the '-'
                if (solution[i][j] != '-'){
                    tile.innerText = solution[i][j];
                    tile.classList.add("tile-start")
                }
                if (i ==2 || i ==5 ){
                    tile.classList.add("horizontal-line")
                }
                if(j==2 || j == 5){
                    tile.classList.add("vertical-line")
                }
                tile.classList.add("tile");
                document.getElementById('playBoard').append(tile);
            }
        }

    }
}

function inputIsInvalid(){
    // starting board is invalid or puzzle is insolvable
    for (let i =0;i<9;i++){
        for (let j=0;j<9;j++){
            if (document.getElementById(i.toString()+"-"+j.toString())!=null){
                var elem = document. getElementById(i.toString()+"-"+j.toString());
                elem.remove();
            }
        }
    }
    document.getElementById("error").innerHTML = "<h3>Cannot be solved.</h3><h3>Please enter correct values.</h3>";
    // document.getElementById("error").innerHTML += "<h3>Please enter correct values.</h3>";
    let e = document.getElementById("error");
    e.classList.add("errors");

    // let err = Document.createElement("h3");
    // err.append("Cannot be solved.")
    // err.setAttribute("id","err");
    // // err.innerHTML +="<h3></h3>";
    // // document.getElementById("error").remove();
    // let e = document.getElementById("error");
    // e.append(err);
    // e.classList.add("errors")
}

