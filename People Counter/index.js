let count = 0;
let history = [];

const displayCountPara = document.getElementById("displayCount");

document.getElementById("increment").addEventListener("click", increment);
document.getElementById("save").addEventListener("click", save);

displayCountPara.innerText = count;

function increment() {
    count++;
    displayCountPara.innerText = count;
}

function save() {
    history.push(count);

    const historyPara = document.querySelector("ol");

    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item";
    newListItem.innerText = count;
    historyPara.insertBefore(newListItem, historyPara.firstChild);

    count = 0;
    displayCountPara.innerText = count;
}