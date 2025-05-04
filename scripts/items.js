//Импортируемые элементы
import { rollCheckerHeal, rollCheckerDice, addDice, clearDisplay, changeStyle, disable, checkFinish, delElem, showElem, clearSum, rollCheckerFire, rollCheckerFreeze} from "./functions.js";
import { switchFunc } from "./script.js";
import { fireCount } from "./skill.js";
//Эксп. элементы
export const expButton1 = document.getElementById('exp1');
export const expButton2 = document.getElementById('exp2');
export const expButton3 = document.getElementById('exp3');
export const expButton4 = document.getElementById('exp4');
export const expButton5 = document.getElementById('exp5');
export const expButton6 = document.getElementById('exp6');

//Таймеры
export const timers = document.querySelectorAll('.timers');
export const timerStopFrst = document.querySelectorAll('.timer-frst-plr .LinesX');
export const timerStopScnd = document.querySelectorAll('.timer-scnd-plr .LinesX');
export const timerStartFrst = document.querySelector('.timer-frst-plr .showTime');
export const timerStartScnd = document.querySelector('.timer-scnd-plr .showTime');
export const timerDuration = 5;

const frstTimer = [
    timerStartFrst,
    timerStopFrst
];
const scndTimer = [
    timerStartScnd,
    timerStopScnd
];

//"Settings"
export const settings = document.querySelector('.settings');
export const restartBT = document.getElementById('restartButton');
export const wonText1 = document.querySelector('.winner-1');
export const wonText2 = document.querySelector('.winner-2');

//Buttons
export const gameStart = document.querySelector('.under-table');

export const startButton = document.getElementById('startBT');
export const attackButton = document.getElementById('attack-bt');
export const rollButton = document.getElementById('roll-active');
export const thirdDiceButton = document.getElementById('add-third-dice');
export const healButton = document.getElementById('heal-button');
export const fireButton = document.getElementById('fireBall');
export const freezeButton = document.getElementById('freezeBT');

export const attackButton2 = document.getElementById('attack-bt2');
export const rollButton2 = document.getElementById('roll-active2');
export const thirdDiceButton2 = document.getElementById('add-third-dice2');
export const healButton2 = document.getElementById('heal-button2');
export const fireButton2 = document.getElementById('fireBall2');
export const freezeButton2 = document.getElementById('freezeBT2');

export const attackButtons = [attackButton, attackButton2];
export const rollButtons = [rollButton, rollButton2];
export const thirdDiceButtons = [thirdDiceButton, thirdDiceButton2];
export const healButtons = [healButton, healButton2];
export const fireButtons = [fireButton, fireButton2];
export const freezeButtons = [freezeButton, freezeButton2];
export const startButtons = [restartBT, startButton];

export const skillButtons = document.querySelectorAll('.skill-item');
export const scndSkillButtons = document.querySelectorAll('.second-player .skill-item');
export const frstSkillButtons = document.querySelectorAll('.first-player .skill-item');

// Rollback of buttons
// 0 and 2 - third dice, 1 and 3 - heal
export const buttonsWithRollback = [
    thirdDiceButton,
    healButton,
    thirdDiceButton2,
    healButton2
]
export const showRollbackButtons = document.querySelectorAll('.showRollback');
export const showRollbackP1 = document.querySelectorAll('.frst-plr .showRollback');
export const showRollbackP2 = document.querySelectorAll('.scnd-plr .showRollback');
export const skillRollBackP1 = document.querySelectorAll('.first-player .skill-rollback');
export const skillRollBackP2 = document.querySelectorAll('.second-player .skill-rollback');

//All elements of players
export const playersStyle = document.querySelectorAll('.players');
export const backTable = document.querySelector('.under-table');

//Dices and his faces (dice - кубик / face - грани)
export const dice1 = document.getElementById('dice1');
export const facesDice1 = dice1 ? dice1.querySelectorAll('.face'):[];
export const dice2 = document.getElementById('dice2');
export const facesDice2 = dice2 ? dice2.querySelectorAll('.face'):[];
export const dice3 = document.getElementById('dice3')
export const facesDice3 = dice3 ? dice3.querySelectorAll('.face'):[];

export const AllDices = [dice1, dice2, dice3];

//All buttons of all players for function "disable"
export const allPlayers = document.querySelectorAll('.bt-4-switch');
export const scndPlayer = document.querySelectorAll('.scnd-plr');
export const frstPlayer = document.querySelectorAll('.frst-plr');

//Hp count
export var hpFrstPlr = document.getElementById('hp-frst');
export var hpScndPlr = document.getElementById('hp-scnd');

//Hp summ
export let maxHp = 50;

              // check/heal, check/thrdDice, check/flame check/freeze
let rollbackP1 = [false, 0, false, 0, false, 0, false, 0]; 
let rollbackP2 = [false, 0, false, 0, false, 0, false, 0];

//SKILLS
//Fireball
export var fireItemsFrst = [];
export var fireItemsScnd = [];

//Freeze
export var freezeItemFrst = [];
export var freezeItemScnd = [];
 

export var sumDice = [];//Массив кубиков на момент броска.

//Класс игрока
export class Player {
    constructor(name, hp, buttons, showHP, rollback, itemsRollback, showTimer, timer, skills, skillsShowRollback, fireball, freeze){
        this.name = name;
        this.hp = hp;
        this.buttons = buttons || [];
        this.showHP = showHP;
        this.rollback = rollback;
        this.itemsRollback = itemsRollback;
        this.showTimer = showTimer;
        this.timer = timer;
        this.skills = skills;
        this.skillsShowRollback = skillsShowRollback;
        this.fireball = fireball;
        this.freeze = freeze  
    }
    attack(damage, passivePlayer) {
        passivePlayer.hp -= damage;
    }
    heal(hpoints, currentPlayer) {
        currentPlayer.hp += hpoints;
        currentPlayer.rollback[0] = true;    
    }
    thirdDiceAdd(){
        addDice(dice3, clearDisplay(facesDice3));
        changeStyle([currentPlayer.buttons[2]], disable);
        currentPlayer.rollback[2] = true;
    }
    timerStart() {
        if(passivePlayer.freeze[0]){
            this.timer = 3;
        }else{this.timer = 10;}
        timerActivation(this, passivePlayer);
        startTimer(this);
    }
    rollbackFunc(){
        if(this.rollback[6]){
            this.skillsShowRollback[2].style.display = 'block';
            this.skillsShowRollback[2].textContent = this.rollback[7];
        } else {this.skillsShowRollback[2].style.display = 'none'}
        if(this.rollback[4]){
            this.skillsShowRollback[0].style.display = 'block';
            this.skillsShowRollback[0].textContent = this.rollback[5];
        } else {this.skillsShowRollback[0].style.display = 'none';}
        if(this.rollback[0]){
            this.itemsRollback[1].style.display = 'block';
            this.itemsRollback[1].textContent = this.rollback[1];
        } else {this.itemsRollback[1].style.display = 'none';}
        if(this.rollback[2]){
            this.itemsRollback[0].style.display = 'block';
            this.itemsRollback[0].textContent = this.rollback[3];
        } else {this.itemsRollback[0].style.display = 'none'}
    }
};

//Create a player (maybe inside a start button will be better)
export const player1 = new Player(
    'player1', 
    50, 
    frstPlayer, 
    hpFrstPlr,
    rollbackP1,
    showRollbackP1,
    frstTimer,
    null,
    frstSkillButtons,
    skillRollBackP1,
    fireItemsFrst,
    freezeItemFrst
);
export const player2 = new Player(
    'player2', 
    50, 
    scndPlayer, 
    hpScndPlr,
    rollbackP2,
    showRollbackP2,
    scndTimer,
    null,
    scndSkillButtons,
    skillRollBackP2,
    fireItemsScnd,
    freezeItemScnd
);


let checkTimer = true;

export function timerToTrue(){
    checkTimer = true;
}

//Choice the active player
export let currentPlayer = player1;
export let passivePlayer = player2;

export var swapFuncTimer;
export var stopFuncTimer;

export function startTimer(player) {
    if (checkTimer){
    player.showTimer[0].textContent = player.timer;
    const intervalID = setInterval(() => {
        player.timer -= 1;
        player.showTimer[0].textContent = player.timer;
        if (player.timer <= 0 || checkTimer === false) {
            swapTimer();
        }
    }, 1000);
    function swapTimer() {
        stopTimer();
        switchFunc();
    }
    function stopTimer() {
        clearInterval(intervalID);
        player.timer = null;
        player.showTimer[0].textContent = "";
    }
    swapFuncTimer = swapTimer;
    stopFuncTimer = stopTimer;
}
}

function timerActivation(activ, passiv){
    changeStyle(activ.showTimer[0], showElem);
    changeStyle(activ.showTimer[1], delElem);
    changeStyle(passiv.showTimer[0], delElem);
    changeStyle(passiv.showTimer[1], showElem);
}

//Function for switch player 
export function switchPlayer() {
    fireCount(currentPlayer, passivePlayer);
    timerToTrue();
    delElem(dice3);
    clearSum(sumDice);
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    passivePlayer = passivePlayer === player1 ? player2 : player1;
    currentPlayer.timerStart();
    if(currentPlayer.rollback[4]){
        rollCheckerFire(currentPlayer);
    }
    if(currentPlayer.rollback[2]){
        rollCheckerDice(currentPlayer);
    }
    if(currentPlayer.rollback[0]){
        rollCheckerHeal(currentPlayer);
    }
    if(currentPlayer.rollback[6]){
        rollCheckerFreeze(currentPlayer);
    }
    currentPlayer.rollbackFunc();
    passivePlayer.rollbackFunc();
    if(checkFinish(currentPlayer, passivePlayer)){
        return true; 
    } else {
        stopFuncTimer();
        delElem(dice1);
        delElem(dice2);
        changeStyle(timers, delElem);
        return false;
    }
}

//Function for random choice player
export function choiceFrstPlr(){
    const randN = Math.floor(Math.random()*2);
    if(randN === 0){
        currentPlayer = player1;
        passivePlayer = player2;
    }
    else{
        currentPlayer = player2;
        passivePlayer = player1;
    }
}
console.log(currentPlayer.rollback);
console.log(currentPlayer.skillsShowRollback);