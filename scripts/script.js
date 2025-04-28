import { expButton1, expButton2, expButton3, timers, swapFuncTimer, stopFuncTimer, skillButtons, player1, player2, fireButtons} from "./items.js";
import { lowHp } from "./functions.js";
import { defaultButtons } from "./buttons.js";
import { startGame } from "./settings.js";
import { attacking, healing, rolling, fireball } from "./skill.js";

eventHandler([expButton1], () => lowHp(currentPlayer, passivePlayer));
eventHandler([expButton2], () => fireball());
eventHandler([expButton3], () => stopFuncTimer(currentPlayer));

//Кнопка Старта
import { startButtons } from "./items.js";

//Актуальный игрок
import { currentPlayer } from "./items.js"; //Активный игрок
import { passivePlayer } from "./items.js"; //Пассивный игрок


//Кубики
import { AllDices } from "./items.js"; // Все кубики вместе

//Кнопки игроков
import { allPlayers } from "./items.js"; //Все кнопки
import { attackButtons } from "./items.js"; //Кнопки атаки
import { rollButtons } from "./items.js"; //Кнопки броска
import { thirdDiceButtons } from "./items.js"; //Кнопка добавления кубика
import { healButtons } from "./items.js"; //Кнопки лечения

//Импортированные функции
import { changeStyle } from "./functions.js"; // Вкл/Выкл скелетон
import { eventHandler } from "./functions.js"; //Функция обработки нажатия на кнопку
import { switchStyle } from "./functions.js"; // Функция смены стиля
import { delElem } from "./functions.js"; // Спрятать элемент
import { switchPlayer } from "./items.js"; //Функция свитча актуального игрока
import { GameOver } from "./functions.js"; // func of finish
import { settings } from "./items.js";

// Самое начало игры. Включаем скелетоны для всех кнопок
window.onload = function(){
    changeStyle(allPlayers, switchStyle);
    changeStyle(skillButtons, switchStyle);
    delElem(settings);
    changeStyle(timers, delElem);
};

export function switchFunc(){
    if(switchPlayer()){
        defaultButtons(currentPlayer, passivePlayer);
        } else {
            GameOver(allPlayers, AllDices, settings); 
        }
}

eventHandler(startButtons, startGame);
eventHandler(attackButtons, attacking);
eventHandler(healButtons, healing);
eventHandler(rollButtons, rolling);
eventHandler(fireButtons, fireball);
eventHandler(thirdDiceButtons, currentPlayer.thirdDiceAdd);