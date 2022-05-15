const b = null; //empty cell

//empty board
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

var numSelected = null;
var tileSelected =null;

var errors= 0;

window.onload = function(){
    setGame();
}

// populate the game and the digits
function setGame(){
    //digits 1-9

    for (let i=1;i<=9;i++){
        //<div id='1'></div>
        let number = document.createElement ('div');
        number.id = i;
        number.innerHTML = i;
        number.addEventListener("click",selectNumber)
        number.classList.add("numbers");
        document.getElementById('digits').appendChild(number);
    }

    //board 9*9
    for (let i =0;i<9;i++){
        for (let j=0;j<9;j++){
            let tile = document.createElement("div");
            tile.id = i.toString()+"-"+j.toString();
            // to not display the '-'
 
            if (board[i][j] != '-'){
                tile.innerText = board[i][j];
                tile.classList.add("tile-start")
            }
            if (i ==2 || i ==5 ){
               tile.classList.add("horizontal-line");
            }
            if(j==2 || j == 5){
               tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",selectTile);
            tile.classList.add("tile");
            document.getElementById('playBoard').append(tile);
        }
    }
    let btn = document.createElement("button");
    btn.innerHTML = "View Solution";
    document.body.appendChild(btn);
    btn.classList.add("bn3637");
    btn.classList.add("bn36");
    btn.addEventListener("click",fillUpSolution)

}

function selectNumber (){
    // the number selected earlier is removed
    if (numSelected!= null){
        numSelected.classList.remove('numberSelected')
    }
     numSelected = this;
     numSelected.classList.add("numberSelected")
}

function selectTile (){
    if (numSelected){
        // to remove duplication
        if (this.innerText != ''){
            return;
        }
        // '0-0','0-1'
        let coords = this.id.split("-"); // ['0','0']
        // get the coordinates
        let r = parseInt(coords[0]);
        let c = parseFloat(coords[1]);

        if (solution[r][c] == numSelected.id){
            // as id contains the value of the number selected
            this.innerText = numSelected.id;
        }else{
            errors+=1;
            document.getElementById("error").innerText = errors;
        }
    }
}

function fillUpSolution(){
    for (let i =0;i<9;i++){
        for (let j=0;j<9;j++){
            let tile = document.getElementById(i.toString()+"-"+j.toString());
           tile.innerText = solution[i][j];
        }
    }
}

