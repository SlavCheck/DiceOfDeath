//Импортированные функции
import { changeStyle, unFreeze } from "./functions.js"; // Вкл/Выкл скелетон
import { disable } from "./functions.js"; //Функция отключения кнопок
import { enable } from "./functions.js"; //Функция включения кнопок
import { freezeDisable } from "./functions.js"; //Freeze buttons
import { currentPlayer, passivePlayer } from "./items.js";
import { freezeActivation } from "./skill.js";
//Состояние кнопок на начало игры

export function defaultButtons(active, passive){
    if(passive.freeze[0]){
        freezeActivation(active, passive)
        changeStyle(passive.buttons, disable);
        changeStyle(passive.skills, disable);
    }  
    else{  
    if (!active.rollback[2]){
        changeStyle([active.buttons[2]],enable);
    }
    changeStyle([active.buttons[1]], enable);
    changeStyle([active.buttons[0], active.buttons[3]], disable);
    changeStyle(active.skills, disable);
    changeStyle(passive.buttons, disable);
    changeStyle(passive.skills, disable);
}
};

export function freezingButton(plr){
    changeStyle(plr.buttons, freezeDisable), 
    changeStyle(plr.skills, freezeDisable)
};