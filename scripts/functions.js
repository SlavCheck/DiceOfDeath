import { currentPlayer, maxHp, passivePlayer, skillButtons } from "./items.js";
import { showWinner } from "./settings.js";

//Создание рандомного числа от 1 до 6
export function callRand(){
    return Math.floor(Math.random() * 6);
};

//Бросок кубиков и запись значения в массив
export function rollDice(dice, sum){
    const randnum = callRand();
    for(let i=0; i < dice.length; i++){
        if (i === randnum){
            sum.push(i+1);
            dice[i].style.display = 'flex';
        }
    }
};

//Складывание всех значений из массива брошенных кубиков
export function sumOfDice(sum){
    let sumOfRoles = 0;
    for(let i=0; i < sum.length; i++){
        sumOfRoles += sum[i];
    }
    return sumOfRoles;
};

//Очистка массива
export function clearSum(sum){
    sum.length = 0;
};

//Скрываем все лица кубика
export function clearDisplay(dice){
    for (let i=0; i<dice.length; i++){
        dice[i].style.display = 'none';
    }
};

//Проверка наличия третьего кубика. Результат: true/false
export function checkThirdDice(dice){
    const displayCheck = getComputedStyle(dice);
    if(displayCheck.display === 'flex'){
        return true;
    }
    else {
        return false;
    }
};

//Добавление третьего кубика и очистка всех его граней
export function addDice(addThirdDice, clearDice){
    addThirdDice.style.display = 'flex';
    clearDice;
};

//Удаление элементов 
export function delElem(elem){
    elem.style.display = 'none';
};

//Отображение элементов
export function showElem(elem, displayType = 'block'){
    elem.style.display = displayType;
};

//Функция скрытия элемента/кнопок
export function disable(element){
    if(!element.classList.contains('disable-bt')){
        element.classList.add('disable-bt');
        element.querySelector('img').style.display = 'none'; 
    };
    
};

//Как заменить кнопку скелетоном
export function enable(element){
    if(element.classList.contains('disable-bt')){
        element.classList.remove('disable-bt');
        element.querySelector('img').style.display = 'block';
    }  
};

//Функция смены стиля (Скрыть/Показать)
export function switchStyle(element){
    if(element.classList.contains('disable-bt')){
        element.classList.remove('disable-bt');
        element.querySelector('img').style.display = 'block';
    }
    else{
        element.classList.add('disable-bt');
        element.querySelector('img').style.display = 'none';
    }
};

//Обработка массива элементов (Скрыть/Показать)
export function changeStyle(elements, func, typeDisplay){
    for(let i=0; i < elements.length; i++){
        func(elements[i], typeDisplay);
    }
};

//Вывести актуальное кол. HP
export function updateHp(activepers, passivepers, maxHp){
    var percentage = (activepers.hp/maxHp) * 100;
    if(percentage <= 0){
        percentage = 0;
        activepers.hp = 0;
    }
    if(percentage >= 100){
        percentage = 100;
        activepers.hp = 50;
    }
    activepers.showHP.style.width = `${percentage}%`;
    activepers.showHP.textContent = activepers.hp;
    var percentage2 = (passivepers.hp/maxHp) * 100;
    if(percentage2 <= 0){
        percentage2 = 0;
        passivepers.hp = 0;
    }
    if(percentage2 >= 100){
        percentage2 = 100;
        passivepers.hp = 50;
    }
    passivepers.showHP.style.width = `${percentage2}%`;
    passivepers.showHP.textContent = passivepers.hp;
};

//Обработчик событий (Кнопки/Функция)
export function eventHandler(array, func){
    for (let i=0; i<array.length; i++){
        array[i].addEventListener('click', func);
    }
};

//hide buttons and delete blur
export function startStyle(el, bck){
    bck.classList.remove('blur-test');
    el.style.display = 'none';
};


// Function for check heal or start rollback
export function rollCheckerHeal(checked){
    if (checked.rollback[0]){
        if(checked.rollback[1] === 1){
            checked.rollback[0] = false;
            checked.rollback[1] = 2;
        } else{
        checked.rollback[1]--;
        }
    }
}

//Function for check third dice or start rollback
export function rollCheckerDice(checked){
    if (checked.rollback[2]){
        if(checked.rollback[3] === 1){
            checked.rollback[2] = false;
            checked.rollback[3] = 3;
        } else{
        checked.rollback[3]--;
        }
    }
}

// Function for check fireball or start rollback
export function rollCheckerFire(checked){
    if (checked.rollback[4]){
        if(checked.rollback[5] === 1){
            checked.rollback[4] = false;
            checked.rollback[5] = 5;
        } else{
        checked.rollback[5]--;
        }
    }
}

//function for check finish
export function checkFinish(first, second){
    if(first.hp <= 0){
        changeStyle(first.buttons, disable);
        changeStyle(second.buttons, disable);
        return false;
    }
    return true;
}

//Game over function. Remove dices, disable buttons, show setng and winner 
export function GameOver(buttons, dices, setng){
    changeStyle(buttons, disable);
    changeStyle(skillButtons, disable);
    changeStyle(dices, delElem);
    showElem(setng);
    showWinner();
}

//check player's hp for restart game
export function checkHp(activePlr, PassivePlr){
     if((activePlr.hp || PassivePlr.hp) !== 50){
            activePlr.hp = 50;
            PassivePlr.hp = 50;
        }
}

//Starts rollback
export function startsRollBack(){
    currentPlayer.rollback = [false, 2, true, 1, false, 5];
    passivePlayer.rollback = [false, 2, false, 3, false, 5];
}

// function for end game
export function lowHp(p1,p2){
    p1.hp = 1;
    p2.hp = 1;
    updateHp(p1,p2,maxHp);
}