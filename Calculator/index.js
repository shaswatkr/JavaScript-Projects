let result = 0;
let curNumber = 0;
let operator = null;

document.getElementById("btnAdd").addEventListener("click", clickedAddBtn);
document.getElementById("btnSub").addEventListener("click", clickedSubBtn);
document.getElementById("btnMul").addEventListener("click", clickedMulBtn);
document.getElementById("btnDiv").addEventListener("click", clickedDivBtn);
document.getElementById("btnToTotal").addEventListener("click", clickedBtnToTotal);
document.getElementById("btnToReset").addEventListener("click", clickedBtnToReset);
document.getElementById("btnToChangeSign").addEventListener("click", clickedBtnToChangeSign);
document.getElementById("btnToStoreHistory").addEventListener("click", clickedBtnToStoreHistory);

let btns = document.querySelectorAll(".btn-dark");
for (const each of btns) {
    each.addEventListener("click", clickedNumBtn);
}

function clickedNumBtn(event) {
    curNumber = 10 * curNumber + parseInt(event.srcElement.innerText);
    document.getElementById("resultBox").value = curNumber;
}

function clickedAddBtn() {
    clickedBtnToTotal();
    operator = '+';
}

function clickedSubBtn() {
    clickedBtnToTotal();
    operator = '-';
}

function clickedMulBtn() {
    clickedBtnToTotal();
    operator = '*';
}

function clickedDivBtn() {
    clickedBtnToTotal();
    operator = '/';
}

function clickedBtnToTotal() {
    switch (operator) {
        case '+': {
            result += curNumber;
            break;
        }
        case '-': {
            result -= curNumber;
            break;
        }
        case '/': {
            result /= curNumber;
            break;
        }
        case '*': {
            result *= curNumber;
            break;
        }
        default: {
            result = curNumber;
        }
    }

    curNumber = 0;
    document.getElementById("resultBox").value = 0;
    operator = null;
    document.getElementById("total").innerText = result;
}

function clickedBtnToReset() {
    result = 0;
    document.getElementById("resultBox").value = 0;
    operator = null;
    document.getElementById("total").innerText = result;
}

function clickedBtnToChangeSign() {
    curNumber *= -1;
    document.getElementById("resultBox").value = curNumber;
}

function clickedBtnToStoreHistory() {
    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item text-muted";
    newListItem.innerText = result;

    const historyList = document.getElementById("history");
    historyList.insertBefore(newListItem, historyList.firstChild);
}