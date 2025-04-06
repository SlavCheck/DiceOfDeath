import { expButton1, expButton2, player1, player2} from "./items.js";
import { choiceFrstPlr } from "./items.js";

eventHandler([expButton1], choiceFrstPlr);

//Переменные
//Background
import { backTable } from "./items.js";

//Кнопка Старта
import { startButton } from "./items.js";
import { startButtons } from "./items.js";


//Актуальный игрок
import { currentPlayer } from "./items.js"; //Активный игрок
import { passivePlayer } from "./items.js"; //Пассивный игрок


//Кубики
import { facesDice1, facesDice2, facesDice3} from "./items.js"; //лица кубиков
import { sumDice } from "./items.js"; // Массив для суммы кубов
import { AllDices } from "./items.js"; // Все кубики вместе
import { dice1, dice2, dice3} from "./items.js" // дивы всех кубиков

//Кнопки игроков
import { allPlayers } from "./items.js"; //Все кнопки
import { attackButtons } from "./items.js"; //Кнопки атаки
import { rollButtons } from "./items.js"; //Кнопки броска
import { thirdDiceButtons } from "./items.js"; //Кнопка добавления кубика
import { healButtons } from "./items.js"; //Кнопки лечения

//HP
import { maxHpFrst } from "./items.js"; // Максимальное hp для 1 игрока
// import { maxHpScnd } from "./items.js"; // Максимальное hp для 2 игрока

//Импортированные функции
import { changeStyle, showElem } from "./functions.js"; // Вкл/Выкл скелетон
import { disable } from "./functions.js"; //Функция отключения кнопок
import { enable } from "./functions.js"; //Функция включения кнопок
import { eventHandler } from "./functions.js"; //Функция обработки нажатия на кнопку
// import { heal } from "./items.js"; //Функция лечения
import { switchStyle } from "./functions.js"; // Функция смены стиля
import { updateHp } from "./functions.js"; //Функция обновления состояния hp 
import { rollDice } from "./functions.js"; // Бросок кубиков
import { clearDisplay } from "./functions.js"; // Очистить кубик (спрятать все лица)
import { checkThirdDice } from "./functions.js"; // Проверка наличия третьего кубика
// import { addDice } from "./functions.js"; // Добавить кубик
import { sumOfDice } from "./functions.js"; // Сумма кубиков - для операций над hp
import { clearSum } from "./functions.js"; // Очистка массива суммы кубиков
import { delElem } from "./functions.js"; // Спрятать третий кубик
import { switchPlayer } from "./items.js"; //Функция свитча актуального игрока
// import { attack } from "./items.js"; //Функция атаки
import { rollCheckerDice } from "./functions.js";
import { rollCheckerHeal } from "./functions.js";
// import { checkFinish } from "./functions.js";
import { GameOver } from "./functions.js";
import { checkHp } from "./functions.js";
import { startStyle } from "./functions.js";
import { startsRollBack } from "./functions.js";
import { settings } from "./items.js";

// Самое начало игры. Включаем скелетоны для всех кнопок
window.onload = function(){
    changeStyle(allPlayers, switchStyle);
    delElem(settings);
};

//Состояние кнопок на начало игры
function defaultButtons(active, passive,){
    if (!rollCheckerDice(active)){
    changeStyle([active.buttons[1], active.buttons[2]], enable);
    }else{changeStyle([active.buttons[1]], enable);}
    changeStyle([active.buttons[0], active.buttons[3]], disable);
    changeStyle(passive.buttons, disable);
};

//Старт
function startGame(){
    choiceFrstPlr();
    checkHp(currentPlayer, passivePlayer);
    delElem(settings);
    changeStyle([dice1, dice2], showElem);
    changeStyle([facesDice1, facesDice2], clearDisplay);
    let mainButtons = [currentPlayer.buttons[1]];
    startStyle(startButton, backTable);
    changeStyle(mainButtons, enable);
    updateHp(passivePlayer, currentPlayer, maxHpFrst);
    updateHp(currentPlayer, passivePlayer, maxHpFrst);
    startsRollBack();
};
eventHandler(startButtons, startGame);


//Атака
function attacker(){
    currentPlayer.attack(sumOfDice(sumDice), passivePlayer);
    clearSum(sumDice);
    delElem(dice3);
    updateHp(passivePlayer, currentPlayer, maxHpFrst);
    if(switchPlayer()){
    defaultButtons(currentPlayer, passivePlayer);
    } else {
        GameOver(allPlayers, AllDices, settings); 
    }
};
eventHandler(attackButtons, attacker);

//Лечение
function healing(){
    currentPlayer.heal(sumOfDice(sumDice), currentPlayer);
    clearSum(sumDice);
    updateHp(currentPlayer, passivePlayer, maxHpFrst);
    switchPlayer();
    defaultButtons(currentPlayer,passivePlayer);
    delElem(dice3);
};
eventHandler(healButtons, healing);

//Кнопка броска
function rolling(){
    clearDisplay(facesDice1);
    clearDisplay(facesDice2);
    rollDice(facesDice1, sumDice);
    rollDice(facesDice2, sumDice);
    if (checkThirdDice(dice3)){
        clearDisplay(facesDice3);
        rollDice(facesDice3, sumDice);
    }   
    if(currentPlayer.buttons[2].classList.contains('disable-bt')){
    changeStyle([currentPlayer.buttons[1]], disable);}
    else {changeStyle([currentPlayer.buttons[1],currentPlayer.buttons[2]],switchStyle);}
    if(!rollCheckerHeal(currentPlayer)){
    changeStyle([currentPlayer.buttons[0],currentPlayer.buttons[3]],switchStyle);
    }else{changeStyle([currentPlayer.buttons[0]],switchStyle);}
};
eventHandler(rollButtons, rolling);

//Третий кубик
eventHandler(thirdDiceButtons, currentPlayer.thirdDiceAdd);

// eventHandler(expButton1, GameOver(allPlayers, AllDices, settings));


//exp