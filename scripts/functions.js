import { currentPlayer, passivePlayer, showWinner } from "./items.js";

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
export function showElem(elem){
    elem.style.display = 'block';
};

//Как заменить кнопку скелетоном
export function enable(element){
    if(element.classList.contains('disable-bt')){
        element.classList.remove('disable-bt');
        element.querySelector('img').style.display = 'block';
    }
};

//Функция скрытия элемента/кнопок
export function disable(element){
    if(!element.classList.contains('disable-bt')){
        element.classList.add('disable-bt');
        element.querySelector('img').style.display = 'none';
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
export function changeStyle(elements, func){
    for(let i=0; i < elements.length; i++){
        func(elements[i]);
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
    activepers.showHP.innerHTML = activepers.hp;
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
    passivepers.showHP.innerHTML = passivepers.hp;
};

//Обработчик событий (Кнопки/Функция)
export function eventHandler(array, func){
    for (let i=0; i<array.length; i++){
        array[i].addEventListener('click', func);
    }
};

//Прячем кнопку и убираем блюр
export function startStyle(el, bck){
    bck.classList.remove('blur-test');
    el.style.display = 'none';
};

//Логика откатов
// Надо внедрить логику в disable-bt
export function rollCheckerHeal(checked){
    if (checked.rollback[0]){
        if(checked.rollback[1] === 2){
            checked.rollback[0] = false;
            checked.rollback[1] = 0;
            return false;
        } else{
        checked.rollback[1]++;
        return true;
        }
    }
}

//Функция проверяющая есть ли 3ий кубик и запускает откат
export function rollCheckerDice(checked){
    if (checked.rollback[2]){
        if(checked.rollback[3] === 3){
            checked.rollback[2] = false;
            checked.rollback[3] = 0;
            return false;
        } else{
        checked.rollback[3]++;
        return true;
        }
    }
}

//функция проверяет финиш и прячет кнопки
export function checkFinish(first, second){
    if(first.hp <= 0){
        changeStyle(first.buttons, disable);
        changeStyle(second.buttons, disable);
        return false;
    }
    return true;
}

//Функция финиша, отображение победителя и кнопки старт
export function GameOver(buttons, dices, setng){
    changeStyle(buttons, disable);
    changeStyle(dices, delElem);
    showElem(setng);
    showWinner();
    // Добавить сюда обнуление откатов
}

//Проверка, что у игроков не полные hp (для рестарта)
export function checkHp(activePlr, PassivePlr){
     if((activePlr.hp || PassivePlr.hp) !== 50){
            activePlr.hp = 50;
            PassivePlr.hp = 50;
        }
};

//Стартовый откат способностей
export function startsRollBack(){
    currentPlayer.rollback = [false, 0, true, 3];
    passivePlayer.rollback = [false, 0, false, 0];
};

