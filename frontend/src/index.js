//DOM Login Elements
let gameScreen = document.querySelector('#screen');
let loginForm = document.querySelector('#login');
let registerForm = document.querySelector('#register');
let registerButton = document.querySelector('#register-button');
let debugParagraph = document.querySelector('#debug')

let canvas = document.querySelector('#canvas');
let context = canvas.getContext('2d');

loginForm.addEventListener('submit', handleLogin)
registerButton.addEventListener('click', switchToRegister)

//WEBSOCKET!
let socket = io('http://localhost:4000/');

//MVC Architecture
import {Player} from './Model/player'
import {World} from './Model/world'
import {Renderer} from './View/renderer'

//Images
let playerImage = new Image()
playerImage.src = './dist/Player.png'

let enemyImage = new Image()
enemyImage.src = './dist/Enemy.png'

let grassImage = new Image()
grassImage.src = './dist/Grass.png'

let wallImage = new Image()
wallImage.src = './dist/Wall.png'

//Utils
import {levelOne, levelTwo} from './Model/levels'

//ENUMS
let UNIT = 32

//Controller:
function controller(e) {
    if (e.type == "keydown") {
        switch (e.code) {
            case 'KeyW': player.upPressed = true;        break;
            case 'KeyS': player.downPressed = true;      break;
            case 'KeyA': player.leftPressed = true;      break;
            case 'KeyD': player.rightPressed = true;     break;
        }
    }
    else if (e.type == 'keyup') {
        switch (e.code) {
            case 'KeyW': player.upPressed = false;       break;
            case 'KeyS': player.downPressed = false;     break;
            case 'KeyA': player.leftPressed = false;     break;
            case 'KeyD': player.rightPressed = false;    break;
        }
    }
}

function gameLoop(){
    //DEV
    debugParagraph.innerText = `X:${player.x},  Y:${player.y}`;

    //Model
    world.update();
    //View
    renderer.render(world);
}

//CONTROL PLAYER
document.addEventListener('keydown', controller);
document.addEventListener('keyup', controller);
let player = new Player("ERROR", 100, 100, socket, playerImage)

//WORLD INSTANTIATION
let world = new World("Wordie", player, 1024, 768, UNIT, socket, grassImage, wallImage, enemyImage)
world.loadLevel(levelTwo)

//VIEW HANDLER
let renderer = new Renderer('Rendie', context, UNIT);

//START:
function handleLogin(e) {
    e.preventDefault();
    let data = {
        'username': e.target.elements[0].value,
        'password': e.target.elements[1].value
    }
    axios.post('http://localhost:4000/user', data)
        .then((response)=> {     
            if (response.data.error == 'error')
                {
                    alert('Invalid User Credentials')
                }
            else if (response.data.character) {
                socket.emit('join', {name: response.data.character, room: 'room 1'})
                loginForm.className = "hidden";
                registerButton.className = 'hidden';
                gameScreen.className = "visible";
                debugParagraph.className = "visible";
            }
        });
}

function switchToRegister(e) {
    loginForm.className = "hidden";
    registerForm.className = "visible";
}

function handleRegister() {
    console.log('register')
}

//UPDATE: ------------------------------------------------------
setInterval(gameLoop, 33); // ----------------------------------
// -------------------------------------------------------------