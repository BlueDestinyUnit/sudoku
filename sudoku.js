const [create,submitR]=document.querySelectorAll('button')
const inputs = document.querySelectorAll('tbody input');

let arr = [];
for (let i = 0; i < 9; i++) {
    arr[i] = [];
    for (let j = 0; j < 9; j++) {
        arr[i][j] = null;
    }
}
let subArr = []

// 스도쿠 배열 초기화 함수
function firstArr(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j] = null; // 초기값 null으로 설정
        }
    }
}

// 스도쿠 생성 함수
function sudoku(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (arr[i][j] === null) {
                let random = randomNumber(arr, i, j);
                if (random !== null) {
                    arr[i][j] = random;
                } else {
                    firstArr(arr);
                    sudoku(arr); // 재귀 호출
                }
            }
        }
    }
    if (ValidSudoku(arr)) {
        sudoku(arr); // 재귀 호출
    }
    return true; // 모든 조건을 통과하면 true 반환
}

// 랜덤한 숫자를 입력하기 함수
function randomNumber(arr, row, col) {
    const set = new Set();
    const min = 1;
    const max = 9;
    let randomNumber
    while (true) {
        randomNumber= Math.floor(Math.random() * 9)+1;
        if (!ValueInSection(arr, row, col, randomNumber) && !set.has(randomNumber)) {
            break; // 유효한 숫자이고, set에 중복되지 않은 경우 반복문 종료
        }
        set.add(randomNumber);
        if (set.size === 9) {
            return null; // size가 9가 되면 비정상이므로 종료
        }
    }
    return randomNumber;
}

// 숫자가 유효한지 검사하는 함수
function ValueInSection(arr, row, col, random) {
    let sectionRow = Math.floor(row / 3) * 3;
    let sectionCol = Math.floor(col / 3) * 3;
    for (let j = 0; j < arr[0].length; j++) { // 열을 검사하는 반복문
        if (arr[row][j] === random) {
            return true;
        }
    }
    for (let i = 0; i < arr.length; i++) { // 행을 검사하는 반복문
        if (arr[i][col] === random) {
            return true;
        }
    }
    for (let i = sectionRow; i < sectionRow + 3; i++) { // 3x3 섹션을 검사하는 반복문
        for (let j = sectionCol; j < sectionCol + 3; j++) {
            if (arr[i][j] === random) {
                return true;
            }
        }
    }
    return false;
}

// 유효검사
function ValidSudoku(arr) {
    // 각 행에 중복된 숫자가 있는지 확인
    for (let i = 0; i < 9; i++) {
        const set = new Set();
        for (let j = 0; j < 9; j++) {
            let num = arr[i][j];
            if (num !== 0 && !set.has(num)) {
                set.add(num);
            } else {
                return true;
            }
        }
    }
    // 각 열에 중복된 숫자가 있는지 확인
    for (let j = 0; j < 9; j++) {
        const set = new Set();
        for (let i = 0; i < 9; i++) {
            let num = arr[i][j];
            if (num !== 0 && !set.has(num)) {
                set.add(num);
            } else {
                return true;
            }
        }
    }
    // 각 3x3 섹션에 중복된 숫자가 있는지 확인
    for (let section = 0; section < 9; section++) {
        const set = new Set();
        let sectionRow = Math.floor(section / 3) * 3;
        let sectionCol = Math.floor(section / 3) * 3;
        for (let i = sectionRow; i < sectionRow + 3; i++) {
            for (let j = sectionCol; j < sectionCol + 3; j++) {
                let num = arr[i][j];
                if (num !== 0 && !set.has(num)) {
                    set.add(num);
                } else {
                    return true;
                }
            }
        }
    }
    return false; // 스도쿠가 모든 조건을 만족하면 flase 반환
}

// 스도쿠 배열 출력
function pSudoku(arr) {
    for (let i = 0; i < arr.length; i++) {
        let row = "";
        for (let j = 0; j < arr[i].length; j++) {
            row += arr[i][j] + " ";
        }
        console.log(row)
    }
}

// 문제 빈칸 비우기
function RandomProblem(arr, number) {
    for (let i = 0; i < number; i++) {
        let randomNumberX = Math.floor(Math.random() * 9);
        let randomNumberY = Math.floor(Math.random() * 9);
        if(arr[randomNumberX][randomNumberY] !== null){
            arr[randomNumberX][randomNumberY] = null
        }else {
            number++;
        }
    }
}

// 문제 해결 알고리즘
function sudokuSolve1(arr) {
    let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 0) {
                for (let a of arr2) {
                    if (!ValueInSection(arr, i, j, a)) {
                        arr[i][j] = a; // 유효조건 충족
                        if (sudokuSolve1(arr)) { // 해당값으로 계속 실행 백트래킹
                            return true;
                        }
                        arr[i][j] = null; // 해를 찾지 못하면 다시 빈 칸으로 복원
                    }
                }
                return false; // 가능한 숫자를 모두 대입해봤지만 해를 찾지 못한 경우
            }
        }
    }
    return true;
}


// 스도쿠만드는 이벤트
function createF(arr){
    sudoku(arr);
    pSudoku(arr)
    subArr = JSON.parse(JSON.stringify(arr));
    console.log(levels())
    RandomProblem(subArr,levels())
    pSudoku(subArr)
    if(sudokuSolve1(subArr)){
        alert('생성성공')
    }
    else{
        alert('다시 생성을 눌러주세요')
        return
    }
    clear()
    matching(subArr)
    pSudoku(arr)
}

// 배열을 테이블 위치로 복제
function matching(subArr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = inputs[i * 9 + j];
            console.log(subArr[i][j] !== null)
            if (subArr[i][j] !== null) {
                input.value = subArr[i][j];
                input.disabled = true;
                input.style.color = "darkgrey"
            }
        }
    }
}

// html 스도쿠판 리셋
function clear(){
    [...inputs].forEach((input)=>{
        input.value = null;
        input.disabled = false;
    })
}



// 정답을 확인하는 이벤트
function check(arr){
    pSudoku(arr)
    for(let i =0; i<9;i++){
        for(let j =0; j<9;j++){
            const input = inputs[i * 9 + j];
            if(!(input.value === arr[i][j]+"")){
                return alert('틀렸습니다')
            }
        }
    }
    alert('정답')
}


// 레벨을 선택하기위한 함수
function levels(){
    const radios = document.querySelectorAll('input[type="radio"]');
    for (const radio of radios) {
        if (radio.checked === true) {
            const level = +radio.value;
            return level;
        }
    }
}

create.addEventListener('click',()=> createF(arr));
submitR.addEventListener('click', () => check(arr))
