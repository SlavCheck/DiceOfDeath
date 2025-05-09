import { swapFuncTimer} from "./items.js";

//Актуальный игрок
import { currentPlayer } from "./items.js"; //Активный игрок
import { passivePlayer } from "./items.js"; //Пассивный игрок


//Кубики
import { facesDice1, facesDice2, facesDice3} from "./items.js"; //лица кубиков
import { sumDice } from "./items.js"; // Массив для суммы кубов
import { dice3} from "./items.js" // дивы всех кубиков

//HP
import { maxHp } from "./items.js"; // Максимальное hp для 1 игрока

//Импортированные функции
import { changeStyle } from "./functions.js"; // Вкл/Выкл скелетон
import { disable } from "./functions.js"; //Функция отключения кнопок
import { enable } from "./functions.js"; //Функция включения кнопок
import { updateHp } from "./functions.js"; //Функция обновления состояния hp 
import { rollDice } from "./functions.js"; // Бросок кубиков
import { clearDisplay } from "./functions.js"; // Очистить кубик (спрятать все лица)
import { checkThirdDice } from "./functions.js"; // Проверка наличия третьего кубика
import { sumOfDice } from "./functions.js"; // Сумма кубиков - для операций над hp
import { freezingButton } from "./buttons.js"; // Freeze disable buttons


//Attacking button
export function attacking(){
    if(passivePlayer.def[0]){
        currentPlayer.attack(Math.ceil(sumOfDice(sumDice)/2), passivePlayer);
        passivePlayer.def = [false, 0];
    }else{currentPlayer.attack(sumOfDice(sumDice), passivePlayer);}  
    updateHp(passivePlayer, currentPlayer, maxHp);
    swapFuncTimer(currentPlayer);
};

//Healing buttons
export function healing(){
    currentPlayer.rollback[0] = true;
    currentPlayer.heal(sumOfDice(sumDice), currentPlayer);
    updateHp(currentPlayer, passivePlayer, maxHp);
    swapFuncTimer(currentPlayer);

};

//Rolling button
export function rolling(){
    clearDisplay(facesDice1);
    clearDisplay(facesDice2);
    rollDice(facesDice1, sumDice);
    rollDice(facesDice2, sumDice);
    if (checkThirdDice(dice3)){
        clearDisplay(facesDice3);
        rollDice(facesDice3, sumDice);
    }   
    changeStyle([currentPlayer.buttons[1],currentPlayer.buttons[2]], disable);
    changeStyle([currentPlayer.buttons[0]], enable);
    if(!currentPlayer.buttons[2].classList.contains('disable-bt')){
        changeStyle([currentPlayer.buttons[2]], enable);}
    if(!currentPlayer.rollback[0]){
    changeStyle([currentPlayer.buttons[3]],enable);
    }
    if (!currentPlayer.rollback[4]){
        changeStyle([currentPlayer.skills[0]], enable);
    }
    if(!currentPlayer.rollback[8]){
        changeStyle([currentPlayer.skills[1]], enable);
    }
    if(!currentPlayer.rollback[6]){
        changeStyle([currentPlayer.skills[2]], enable);
    }
    
};

//Fire buttons
export function fireball(){
    currentPlayer.fireball[0] = Math.ceil(sumOfDice(sumDice)/2);
    currentPlayer.fireball[1] = 2;
    currentPlayer.rollback[4] = true;
    currentPlayer.rollback[5] = 5;
    if(!currentPlayer.rollback[6]){
        currentPlayer.rollback[6] = true;
        currentPlayer.rollback[7] = 2;
    };
    if(!currentPlayer.rollback[8]){
        currentPlayer.rollback[8] = true;
        currentPlayer.rollback[9] = 2;
    };
    changeStyle(currentPlayer.skills, disable);
}

export function fireCount(p1, p2){
    if(p1.fireball[1]>0){
        p1.attack(p1.fireball[0], p2);
        updateHp(p2, p1, maxHp);
        p1.fireball[1]--;
        p1.fireball[0] = Math.ceil(p1.fireball[0]/2);
} else {p1.fireball[0]=0};
}    


//Freeze buttons
export function freezing(){
    currentPlayer.freeze[0] = true;
    currentPlayer.freeze[1] = 1;
    currentPlayer.rollback[6] = true;
    currentPlayer.rollback[7] = 5;
    if(!currentPlayer.rollback[4]){
    currentPlayer.rollback[4] = true;
    currentPlayer.rollback[5] = 2;
    }
    if(!currentPlayer.rollback[8]){
        currentPlayer.rollback[8] = true;
        currentPlayer.rollback[9] = 2;
        }
    changeStyle(currentPlayer.skills, disable);
}

export function freezeActivation(p1, p2){
    if(p2.freeze[0]){
        freezingButton(p1);
        p2.freeze[0] = false;
        p2.freeze[1] = 0;
    }
}

//Defence buttons
export function defending(){
    currentPlayer.def = [true, 1];
    currentPlayer.rollback[8] = true;
    currentPlayer.rollback[9] = 5;
    if(!currentPlayer.rollback[4]){
        currentPlayer.rollback[4] = true;
        currentPlayer.rollback[5] = 2;
    }
    if(!currentPlayer.rollback[6]){
        currentPlayer.rollback[6] = true;
        currentPlayer.rollback[7] = 2;
    }
    changeStyle(currentPlayer.skills, disable);
}