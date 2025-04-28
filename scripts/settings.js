import {timers} from "./items.js";
import { wonText1, wonText2, player1, player2 } from "./items.js";

//Переменные
//Background
import { backTable } from "./items.js";

//Кнопка Старта
import { startButton } from "./items.js";


//Актуальный игрок
import { currentPlayer } from "./items.js"; //Активный игрок
import { passivePlayer } from "./items.js"; //Пассивный игрок


//Кубики
import { facesDice1, facesDice2, facesDice3} from "./items.js"; //лица кубиков
import { dice1, dice2} from "./items.js" // дивы всех кубиков

//HP
import { maxHp } from "./items.js"; // Максимальное hp для 1 игрока

//Импортированные функции
import { changeStyle, showElem } from "./functions.js"; // Вкл/Выкл скелетон
import { enable } from "./functions.js"; //Функция включения кнопок
import { updateHp } from "./functions.js"; //Функция обновления состояния hp 
import { clearDisplay } from "./functions.js"; // Очистить кубик (спрятать все лица)
import { delElem } from "./functions.js"; // Спрятать элемент
import { checkHp } from "./functions.js"; // refresh hp
import { startStyle } from "./functions.js"; //
import { startsRollBack } from "./functions.js";
import { settings } from "./items.js";
import { choiceFrstPlr } from "./items.js";

//Старт
export function startGame(){
    choiceFrstPlr();
    currentPlayer.timerStart();
    changeStyle(timers, showElem, 'flex');
    checkHp(currentPlayer, passivePlayer);
    delElem(settings);
    changeStyle([dice1, dice2], showElem);
    changeStyle([facesDice1, facesDice2], clearDisplay);
    let mainButtons = [currentPlayer.buttons[1]];
    startStyle(startButton, backTable);
    changeStyle(mainButtons, enable);
    updateHp(passivePlayer, currentPlayer, maxHp);
    updateHp(currentPlayer, passivePlayer, maxHp);
    startsRollBack();
    currentPlayer.rollbackFunc();
    passivePlayer.rollbackFunc();
};

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