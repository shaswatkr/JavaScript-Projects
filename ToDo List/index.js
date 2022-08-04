let toDoItems = [];

document.getElementById("toDoForm").addEventListener("submit", addNewItem);

function addNewItem(e) {
    e.preventDefault();

    const itemText = e.target[0].value;

    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item";
    newListItem.innerText = itemText

    const deleteButton = document.createElement("i");
    deleteButton.className = "bi bi-trash text-danger float-end";
    deleteButton.addEventListener("click", deleteListItem);

    newListItem.appendChild(deleteButton);

    const toDoList = document.getElementById("toDoItems");
    toDoList.appendChild(newListItem);

    toDoItems.push(itemText);
    document.getElementById("addItemBox").value = "";
}

function deleteListItem(e) {
    const indexOfItem = toDoItems.indexOf(e.path[1].innerText);
    toDoItems.splice(indexOfItem, 1);

    e.path[1].remove();
}