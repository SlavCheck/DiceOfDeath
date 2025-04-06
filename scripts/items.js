//Импортируемые элементы
import { addDice, clearDisplay, changeStyle, disable, checkFinish, delElem} from "./functions.js";

//Эксп. элементы
export const expButton1 = document.getElementById('exp1');
export const expButton2 = document.getElementById('exp2');
export const expButton3 = document.getElementById('exp3');
export const expButton4 = document.getElementById('exp4');
export const expButton5 = document.getElementById('exp5');
export const expButton6 = document.getElementById('exp6');
export const attackBT = document.querySelector('.attack-bt');

//"Настройки"
export const settings = document.querySelector('.settings');
export const restartBT = document.getElementById('restartButton');
export const wonText1 = document.querySelector('.winner-1');
export const wonText2 = document.querySelector('.winner-2');

//Кнопки
export const gameStart = document.querySelector('.under-table');

export const startButton = document.getElementById('startBT');
export const attackButton = document.getElementById('attack-bt');
export const rollButton = document.getElementById('roll-active');
export const thirdDiceButton = document.getElementById('add-third-dice');
export const healButton = document.getElementById('heal-button');

export const attackButton2 = document.getElementById('attack-bt2');
export const rollButton2 = document.getElementById('roll-active2');
export const thirdDiceButton2 = document.getElementById('add-third-dice2');
export const healButton2 = document.getElementById('heal-button2');

export const attackButtons = [attackButton, attackButton2];
export const rollButtons = [rollButton, rollButton2];
export const thirdDiceButtons = [thirdDiceButton, thirdDiceButton2];
export const healButtons = [healButton, healButton2];
export const startButtons = [restartBT, startButton];

//Все элементы игроков
export const playersStyle = document.querySelectorAll('.players');
export const backTable = document.querySelector('.under-table');

//Кубики и их грани (dice - кубик / face - грани)
export const dice1 = document.getElementById('dice1');
export const facesDice1 = dice1 ? dice1.querySelectorAll('.face'):[];
export const dice2 = document.getElementById('dice2');
export const facesDice2 = dice2 ? dice2.querySelectorAll('.face'):[];
export const dice3 = document.getElementById('dice3')
export const facesDice3 = dice3 ? dice3.querySelectorAll('.face'):[];

export const AllDices = [dice1, dice2, dice3];

//Кнопки всех игроков для скрытия(скелетон)
export const allPlayers = document.querySelectorAll('.bt-4-switch');
export const scndPlayer = document.querySelectorAll('.scnd-plr');
export const frstPlayer = document.querySelectorAll('.frst-plr');



//Значение hp игроков
export var hpFrstPlr = document.getElementById('hp-frst');
export var hpScndPlr = document.getElementById('hp-scnd');

//Переменные
export let maxHpFrst = 50;
export let maxHpScnd = 50;
let rollbackP1 = [false, 0, false, 0]; //первый элемент heal; второй элемент +button
let rollbackP2 = [false, 0, false, 0]; //первый элемент heal; второй элемент +button


export var sumDice = [];//Массив кубиков на момент броска.

//Класс игрока
export class Player {
    constructor(name, hp, buttons, showHP, rollback){
        this.name = name;
        this.hp = hp;
        this.buttons = buttons || [];
        this.showHP = showHP;
        this.rollback = rollback;
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
    };
};

//Создание персонажей (надо убрать в кнопку старт)
export const player1 = new Player(
    'player1', 
    50, 
    frstPlayer, 
    hpFrstPlr,
    rollbackP1);
export const player2 = new Player(
    'player2', 
    50, 
    scndPlayer, 
    hpScndPlr,
    rollbackP2);

//Выбор актуального игрока
export let currentPlayer = player1;
export let passivePlayer = player2;

//Функция свитча актуального игрока
export function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    passivePlayer = passivePlayer === player1 ? player2 : player1;
    if(checkFinish(currentPlayer, passivePlayer)){
        return true; 
    } else {
        delElem(dice1);
        delElem(dice2);
        return false;
    };
}

//Отображение экрана победы игрока
export function showWinner(){
    if (currentPlayer === player1){
        wonText1.style.display = 'none';
        wonText2.style.display = 'block';
    } else {
        wonText1.style.display = 'block';
        wonText2.style.display = 'none';
    }
}

//Функция случайного выбора первого игрока
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