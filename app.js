// Функция для создания доски
function createBoard() {
    let board = document.createElement('div');
    document.body.appendChild(board);
    board.classList.add('board');
    let x = 1;
    let y = 1;

    for (let i = 1; i < 65; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', x);
        cell.setAttribute('data-y', y);
        cell.id = i;
        ((x + y) % 2) !== 0 ? cell.classList.add('even') : null;
        board.appendChild(cell);
        x++;
        x > 8 ? (x = 1, y++) : null
    }
}

// Функция для перемещения коня доски
function placeHorse(position) {
    let nowHorse = document.getElementsByClassName('horse')[0];
    nowHorse ? nowHorse.parentNode.innerText = iter : null;
    let cell = document.getElementById(position);
    cell.appendChild(horse);
    cell.classList.add('stop');
    iter++
}

// Функция для расчета возможных шагов
function steps(position) {
    let cell = document.getElementById(position);
    let x = cell.getAttribute('data-x');
    let y = cell.getAttribute('data-y');
    let cases = [
        document.querySelector('[data-x="' + (+x - 1) + '"][data-y="' + (+y - 2) + '"]'),
        document.querySelector('[data-x="' + (+x - 1) + '"][data-y="' + (+y + 2) + '"]'),
        document.querySelector('[data-x="' + (+x - 2) + '"][data-y="' + (+y - 1) + '"]'),
        document.querySelector('[data-x="' + (+x - 2) + '"][data-y="' + (+y + 1) + '"]'),
        document.querySelector('[data-x="' + (+x + 1) + '"][data-y="' + (+y - 2) + '"]'),
        document.querySelector('[data-x="' + (+x + 1) + '"][data-y="' + (+y + 2) + '"]'),
        document.querySelector('[data-x="' + (+x + 2) + '"][data-y="' + (+y - 1) + '"]'),
        document.querySelector('[data-x="' + (+x + 2) + '"][data-y="' + (+y + 1) + '"]')
    ];
    cases = cases.filter(function (el) {
        if (el && !el.classList.contains('stop')) {
            return el;
        }
    });
    return cases
}

// Функция для выбора следующей позиции
function next(position) {
    let cases = steps(position);
    let casesLength = cases.length;
    if (casesLength > 1) {
        cases = cases.filter(function (el) {
            if (steps(el.id).length !== 0) {
                return el;
            }
        });
        casesLength = cases.length;
        cases = cases.sort(function (el1, el2) {
            let count1 = steps(el1.id).length;
            let count2 = steps(el2.id).length;
            if (count1 < count2) return -1;
            if (count1 > count2) return 1;
            return 0;
        });

        cases = cases.sort(function (el) {
            return steps(el.id).length;
        })
    }
    setTimeout(function () {
        if (casesLength === 0) {
            alert('Success')
        } else {
            let newPosition = cases[0].id;
            placeHorse(newPosition);
            next(newPosition)
        }
    }, 300)
}

let iter = 0;
// Создание доски
createBoard();
// Создание коня
let horse = document.createElement("i");
horse.classList.add('fas');
horse.classList.add('fa-horse-head');
horse.classList.add('horse');
// Размещение коня на первой позиции
let firsPosition = Math.round(Math.random() * 63);
placeHorse(firsPosition);
// Начало обхода
setTimeout(function () {
    next(firsPosition)
}, 300);
