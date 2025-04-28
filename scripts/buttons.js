//Импортированные функции
import { changeStyle } from "./functions.js"; // Вкл/Выкл скелетон
import { disable } from "./functions.js"; //Функция отключения кнопок
import { enable } from "./functions.js"; //Функция включения кнопок

//Состояние кнопок на начало игры
export function defaultButtons(active, passive){
    if (!active.rollback[2]){
        changeStyle([active.buttons[2]],enable);
    }
    changeStyle([active.buttons[1]], enable);
    changeStyle([active.buttons[0], active.buttons[3]], disable);
    changeStyle(passive.buttons, disable);
    changeStyle(passive.skills, disable);
};



