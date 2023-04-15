// set global variables
var tiles = [
    {id: 0, xCoord: 1, yCoord:1, image: '16.jpg'},
    {id: 1, xCoord: 2, yCoord:1, image: '15.jpg'},
    {id: 2, xCoord: 3, yCoord:1, image: '14.jpg'},
    {id: 3, xCoord: 4, yCoord:1, image: '13.jpg'},
    {id: 4, xCoord: 1, yCoord:2, image: '12.jpg'},
    {id: 5, xCoord: 2, yCoord:2, image: '11.jpg'},
    {id: 6, xCoord: 3, yCoord:2, image: '10.jpg'},
    {id: 7, xCoord: 4, yCoord:2, image: '9.jpg'},
    {id: 8, xCoord: 1, yCoord:3, image: '8.jpg'},
    {id: 9, xCoord: 2, yCoord:3, image: '7.jpg'},
    {id: 10, xCoord: 3, yCoord:3, image: '6.jpg'},
    {id: 11, xCoord: 4, yCoord:3, image: '5.jpg'},
    {id: 12, xCoord: 1, yCoord:4, image: '4.jpg'},
    {id: 13, xCoord: 2, yCoord:4, image: '3.jpg'},
    {id: 14, xCoord: 3, yCoord:4, image: '2.jpg'},
        // 15 is the empty tile
    {id: 15, xCoord: 4, yCoord: 4, image:'blank.jpg'}];
const solution = [
    {id: 0, xCoord: 1, yCoord:1, image: '16.jpg'},
    {id: 1, xCoord: 2, yCoord:1, image: '15.jpg'},
    {id: 2, xCoord: 3, yCoord:1, image: '14.jpg'},
    {id: 3, xCoord: 4, yCoord:1, image: '13.jpg'},
    {id: 4, xCoord: 1, yCoord:2, image: '12.jpg'},
    {id: 5, xCoord: 2, yCoord:2, image: '11.jpg'},
    {id: 6, xCoord: 3, yCoord:2, image: '10.jpg'},
    {id: 7, xCoord: 4, yCoord:2, image: '9.jpg'},
    {id: 8, xCoord: 1, yCoord:3, image: '8.jpg'},
    {id: 9, xCoord: 2, yCoord:3, image: '7.jpg'},
    {id: 10, xCoord: 3, yCoord:3, image: '6.jpg'},
    {id: 11, xCoord: 4, yCoord:3, image: '5.jpg'},
    {id: 12, xCoord: 1, yCoord:4, image: '4.jpg'},
    {id: 13, xCoord: 2, yCoord:4, image: '3.jpg'},
    {id: 14, xCoord: 3, yCoord:4, image: '2.jpg'},
        // 15 is the empty tile
    {id: 15, xCoord: 4, yCoord: 4, image:'blank.jpg'}];
var turnCounter = 9999;   
var isPlaying = false;        

// renderTiles sets the initial configuration of the tiles and creates the html objects.
function renderTiles() {
    const len = tiles.length;

  // generate html string
    let html = '';
    for (let i = 0; i < len; i++) {
      html += 
      '<div id = "' + tiles[i].id + 
      '" class = "tile" style="'+
      //insert style here
      'left: ' + `${(75 * (tiles[i].xCoord - 1))+25}` + 'px; '+
      'top: ' + `${(75 * (tiles[i].yCoord - 1))+25}` + 'px; '+
      'z-index: ' + tiles[i].id +'">'+
      '<img src = "'+tiles[i].image+'"/></div>'
    }
    document.getElementById('playspace').innerHTML += html;
}

// tileUpdate changes the location of the html tile object identified in the argument by its index. 
function tileUpdate(tile){
    document.getElementById(tile).style.left = 75 * (tiles[tile].xCoord - 1) +25 +'px';
    document.getElementById(tile).style.top = 75 * (tiles[tile].yCoord - 1) +25 + 'px';
};

// tileSwap exchanges the x and y coordinates of the tile ID sent via the tileIndex argument 
// with the coordinates of the blank tile and then sends the tile ID of the tileIndex and the 
// blank tile to the tileUpdate function.
// tileSwap also increments the turnCounter
function tileSwap(tileIndex){
    let xSwap = tiles[15].xCoord
    let ySwap = tiles[15].yCoord
    tiles[15].xCoord = tiles[tileIndex].xCoord;
    tiles[15].yCoord = tiles[tileIndex].yCoord;
    tiles[tileIndex].xCoord = xSwap;
    tiles[tileIndex].yCoord = ySwap; 
    turnCounter ++;
    tileUpdate(tileIndex);
    tileUpdate(15);
    winConCheck();
}
// Arrays can not be strictly equal, but if we stringify their contents they can be the same.
function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

// winConCheck checks if the win condition has been met. Win Condition is that all tiles match
// their original settings.
function winConCheck(){
    if(isPlaying = true){
        if (arraysEqual(tiles, solution)){
            alert('You won in '+ turnCounter + ' turns!');
        };
    }
}

// moveTile changes the x or y coordinate of the tile next to the blank space.
// It uses the key pressed to identify the tile to swap by filtering down the tiles array to 
// tiles on the same row or column, and then picking the one in the correct direction based
// on the key used.
// If the key would swap the blank tile out of bounds, the key press is ignored. 
function moveTile(key){
  switch(key){
    case 'ArrowUp':
        switch(tiles[15].yCoord){
            case 4:
                break;
            default:
                tilePicker = tiles.filter(tile => tile.xCoord === tiles[15].xCoord);
                tilePicker = tilePicker.filter(tile => tile.yCoord === tiles[15].yCoord + 1);
                tileSwap(tilePicker[0].id);
                break;
        }
        break;
    case 'ArrowDown':
        switch(tiles[15].yCoord){
            case 1:
                break;
            default:
                tilePicker = tiles.filter(tile => tile.xCoord === tiles[15].xCoord);
                tilePicker = tilePicker.filter(tile => tile.yCoord === tiles[15].yCoord - 1);
                tileSwap(tilePicker[0].id);
                break;
        }
        break;
    case 'ArrowLeft':
        switch(tiles[15].xCoord){
            case 4:
                break;
            default:
                tilePicker = tiles.filter(tile => tile.xCoord === tiles[15].xCoord + 1 );
                tilePicker = tilePicker.filter(tile => tile.yCoord === tiles[15].yCoord);
                tileSwap(tilePicker[0].id);
                break;
        }
        break;
    case 'ArrowRight':
        switch(tiles[15].xCoord){
            case 1:
                break;
            default:
                tilePicker = tiles.filter(tile => tile.xCoord === tiles[15].xCoord - 1 );
                tilePicker = tilePicker.filter(tile => tile.yCoord === tiles[15].yCoord);
                tileSwap(tilePicker[0].id);
                break;
        }
        break;
    }
}

// -----renderTiles -----
// this line of code configures the default state on page load.
renderTiles();


// ----- keydown listener -----
// Sends the value of the key to the moveTile function
document.addEventListener('keydown', (event) => {
    var name = event.key;
    moveTile(name);
  }, false);

const shuffleButton = document.getElementById("shuffle");
shuffleButton.addEventListener("click",shuffle);


// ----- shuffle function -----
// The shuffle function creates an array 'shuffler' and then pushes a number of values into it 
// equal to the length of the tiles array. The array is then sorted in order of the random 
// values. The ordered list is then assigned as x and y coordinates for each tile.
// The shuffle button also resets the turnCounter.
function shuffle(){
    isPlaying = true
    turnCounter = 0 ;
    let shuffler = []

    for(let i=0;i<tiles.length; i++){
        shuffler.push([i, Math.random()]);
    }

    shuffler.sort((a,b)=>a[1]-b[1]);
    
    for(let i=0;i<shuffler.length; i++){
        let a = shuffler[i];
        let n = a[0];
        let x = 1+ n%4;
        let y = parseInt((n+4)/4);

        console.log([i, a[0],x, y]);
        tiles[i].xCoord = x;
        tiles[i].yCoord = y;
        tileUpdate(i);
    }
}