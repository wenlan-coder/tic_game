/*
 * @Descripttion:
 * @version:
 * @Author: wenlan
 * @Date: 2021-12-17 18:40:53
 * @LastEditors: wenlan
 * @LastEditTime: 2021-12-18 17:53:25
 */
//单元格列表
let cells = document.querySelectorAll('.cell');
let winner = document.querySelector('#winner') as HTMLParagraphElement;
let message = document.querySelector('.game-message') as HTMLDivElement;
let restart = document.querySelector('#restart') as HTMLButtonElement;
let isWin: boolean;
let count: number = 0;
let winType = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 3 block
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 3 row
    [0, 4, 8],
    [2, 4, 6], // 3 diagonal
];
enum Player {
    X = 'X',
    O = 'O',
}
let currentPlayer: Player = Player.X;
//初次加载游戏重置游戏
restartGame();

restart.addEventListener('click', restartGame);

//下棋事件
function clickCell(event: MouseEvent): void {
    let target = event.target as HTMLDivElement;
    target.classList.add(currentPlayer, 'no-hover'); //显示x/o
    count++;
    // console.log(count);
    //调用函数判断输赢
    isWin = chechWin(currentPlayer);
    // console.log(isWin);

    if (isWin) {
        console.log('获胜了', currentPlayer);
        message.style.display = 'block';
        winner.innerHTML = currentPlayer + 'Won 🐱‍🚀!!';
        return; //推出
    }
    if (count === 9) {
        console.log('平局');
        message.style.display = 'block';
        winner.innerHTML = 'Draw 🐷';
        return; //退出
    }
    currentPlayer = currentPlayer === Player.X ? Player.O : Player.X;
    changeTip(); //修改提示 x/o
}

//切换下一次显示函数
function changeTip(): void {
    for (let i = 0; i < cells.length; i++) {
        cells[i].setAttribute('data-hover', currentPlayer);
    }
}

//判断输赢 x/o函数
function chechWin(player: Player): boolean {
    return winType.some(item => {
        //判断获胜比如 [3,4,5]则获胜
        let cellIndex1 = item[0]; //3
        let cellIndex2 = item[1]; //4
        let cellIndex3 = item[2]; //5
        // let cell1 = cells[cellIndex1]; //拿到每个 cell
        // let cell2 = cells[cellIndex2];
        // let cell3 = cells[cellIndex3];
        //判断三个元素都是同一个x或者o
        if (
            hasClass(cells[cellIndex1], player) &&
            hasClass(cells[cellIndex2], player) &&
            hasClass(cells[cellIndex3], player)
        ) {
            return true;
        }
        return false;
    });
}

//判断赢数组是否包含class类名
function hasClass(el: Element, name: string): boolean {
    return el.classList.contains(name);

//重新开始游戏
function restartGame(): void {
    console.log('呵呵呵');
    count = 0; //重置count
    message.style.display = 'none'; //隐藏消息
    currentPlayer = Player.X; //重置默认玩家
    cells.forEach(item => {
        let cell = item as HTMLDivElement;
        item.classList.remove(Player.X, Player.O, 'no-hover'); //隐藏棋子  重置hover
        cell.removeEventListener('click', clickCell); //解除上次绑定事件
        cell.addEventListener('click', clickCell, { once: true });
    });
    changeTip(); //修改提示 x/o
}
