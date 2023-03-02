const startContainer = document.querySelector('.start');
const gameContainer = document.querySelector('.game');
const scoreContainer = document.querySelector('.score');




let previousRenderedTime = 0;
let carPosition = {
    x:0,
    y:0
};

let player = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

function playGame(miliseconds){
    //console.log(miliseconds);
    //previousRenderedTime = miliseconds;


   window.requestAnimationFrame(playGame);
    // we can create animaton loop  
};

function moveLine(){
    const lines = document.querySelectorAll(".line");
    
    lines.forEach(line => {
        var top = line.offsetTop;
        const gameContainerDetails = gameContainer.getBoundingClientRect();
        if(line.offsetTop > gameContainerDetails.bottom) {
           top = 0; 
        }
        line.style.top = top + 5 + 'px';
    });
}





function renderGame(miliseconds){
    moveLine();
    const car = document.querySelector('.car');
    const gameContainerDetails = gameContainer.getBoundingClientRect();
    console.log("Game container", gameContainerDetails.right, carPosition.x);

    if (player.ArrowUp  && carPosition.y > gameContainerDetails.top){
        carPosition.y -= 5;
    }

    if(player.ArrowDown && carPosition.y < gameContainerDetails.bottom - 500){
        carPosition.y += 5;
    }
    if(player.ArrowRight && carPosition.x <  gameContainerDetails.right- 120 ){
        carPosition.x += 5;
    }
    if(player.ArrowLeft && carPosition.x > 0){
        carPosition.x -= 5;
    }

    car.style.top = carPosition.y + 'px';
    car.style.left = carPosition.x + 'px';
    window.requestAnimationFrame(renderGame);
};


function startGame(){
    // hide the start container
    startContainer.classList.add('hide');
    //another way startContainer.setAttribute('class','hide');


    //create a car 
    // add it inside game container
    const car= document.createElement('div');
    car.setAttribute('class', 'car');
    console.log("initializing car value", carPosition);

    // add it inside game container
    gameContainer.appendChild(car);
    const carTop = car.offsetTop;
    const carLeft = car.offsetLeft;
    carPosition.y = carTop;
    carPosition.x =  carLeft;
    var x = 0;

     // creat lines
     for(var i=0; i<4; i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = x + 'px';
        gameContainer.appendChild(line);
        x += 150;
    }


     // add then in game container
     //window.requestAnimationFrame('renderGame');

} 

function handleKeyUp(e){
    e.preventDefault();
    player[e.key] = true;
}

function handleKeyDown(e){
    e.preventDefault();
    console.log(e.key);
    player[e.key] = false;
}

window.requestAnimationFrame(playGame);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keydown', handleKeyDown);
startContainer.addEventListener('click', startGame);