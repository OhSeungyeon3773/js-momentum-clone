const addedTodoList = document.getElementById("addedTodo");
const addTodoInput = document.getElementById("addTodo");
const toDoForm = document.getElementById("todo-form");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function deleteTodo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}
  
function addTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteTodo);
    li.appendChild(span);
    li.appendChild(button);
    addedTodoList.appendChild(li);
}
 
function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = addTodoInput.value.trim();
    addTodoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    addTodo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(addTodo);
}


// Event listener for adding a new todo item using Enter key

// addTodoInput.addEventListener("keydown", function(event) {
//   if (event.key === "Enter") {
//     addTodo();
//   }
// });


// function addTodo() {
//     const todoText = addTodoInput.value.trim();
//     if (todoText !== "") {
//       const li = document.createElement("li");
//       const div = document.createElement("div");
//       div.textContent = todoText;
//       li.appendChild(div);
//       addedTodoList.appendChild(li);
//       addTodoInput.value = "";
//     }
//   }

