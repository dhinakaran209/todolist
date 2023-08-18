let todoContainer = document.getElementById("todoItemsContainer");
let buttonElement = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveTodoButton");

function getItemFromLocalStorage() {
    let stringified = localStorage.getItem("updated");
    let parsified = JSON.parse(stringified);
    if (parsified === null) {
        return [];
    } else {
        return parsified;
    }
}

let todoList = getItemFromLocalStorage();

function todoUpdateStatus(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
}

function todoDelete(todoId) {
    let todoElement = document.getElementById(todoId);
    todoContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}


function createAndAppendTodo(todo) {
    let todoInput = document.getElementById("todo");

    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoContainer.appendChild(todoElement);

    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;


    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        todoUpdateStatus(checkboxId, labelId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        todoDelete(todoId)
    };
    deleteIconContainer.appendChild(deleteIcon);
}

function addtodo() {
    let userInput = document.getElementById("todoUserInput");
    let userInputValue = userInput.value;
    let todoCount = todoList.length;
    todoCount = todoCount + 1;
    let todoUpdated = {
        text: userInputValue,
        todoCount: todoCount
    };
    todoList.push(todoUpdated);
    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    createAndAppendTodo(todoUpdated);
    userInput.value = "";
}

buttonElement.onclick = function() {
    addtodo();
};

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function saveTodos() {
    localStorage.setItem("updated", JSON.stringify(todoList));
}

saveButton.onclick = function() {
    saveTodos();
};