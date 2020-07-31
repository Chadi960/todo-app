var todoList ={
  todos: [],
  addTodo: function(todoText){ //Adds a Todo to the list
    this.todos.push({
      todoText: todoText,
      completed: false,
    });
  },
  changeTodo: function(position, todoText){ //Change the task of a Todo in the list
    this.todos[position].todoText = todoText;
    
  },
  deleteTodo: function(position){ //Delete a Todo
    this.todos.splice(position,1);
  },
  ToggleComplete: function(position){ //Changes the status of a ToDo from not complete to complete and vice versa
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){ //Toggles all todos to either true or false.
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //Get number of completed todos.
     this.todos.forEach((todo)=>{
       if (todo.completed===true){
         completedTodos++;
       }
     });
     //Toggle all to either True or false
     this.todos.forEach(function(todo){
      todo.completed = completedTodos === totalTodos ? false : true;
      }
    )
  }
};

var handlers = {
  displayTodos: function(){
    todoList.displayTodos();
    view.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function(){
    var addtodoTextInput = document.getElementById('addtodoTextInput');
    todoList.addTodo(addtodoTextInput.value);
    addtodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function(){
    var positionInput = document.getElementById('positionInput');
    var textInput = document.getElementById('textInput');
    todoList.changeTodo(positionInput.valueAsNumber,textInput.value);
    positionInput.value = "";
    textInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  ToggleComplete: function(){
    var togglePosition = document.getElementById('togglePosition');
    todoList.ToggleComplete(togglePosition.valueAsNumber);
    togglePosition.value = "";
    view.displayTodos();
  },
  CheckToggleComplete: function(position){
    todoList.ToggleComplete(position);
    view.displayTodos();
  },
};


var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    let completedTodos = document.getElementById('ul2');
    let flag1, flag2 = false; //This variable is used to handle when to apply display: block
    completedTodos.innerHTML = '';
    todosUl.innerHTML = '';
  
    todoList.todos.forEach((todos, position)=>{
      var todoLi = document.createElement('li');
      todoLi.id = position;
      todoLi.textContent = todos.todoText;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createCheckIcon());
      if (todos.completed){
        flag1 = true;
        todoLi.style.setProperty("text-decoration", "line-through");
        completedTodos.appendChild(todoLi);
      }else{
        flag2 = true; 
        todosUl.appendChild(todoLi);}
    }, this) //"this" here refers to the displayTodos function (Look up ForEach syntax).

    todosUl.parentNode.style.display = flag2 ? "block" : ""; //If there's a non completed Todo, make the <ul> visible
    completedTodos.parentNode.style.display = flag1 ? "block" : "none"; //If there's a completed Todo, make the <ul> visible
  },

  createCheckIcon: function(){
    var emCheck = document.createElement('em');
    emCheck.className = 'fas fa-check';
    return emCheck;
  },

  createDeleteButton: function(){
    var deleteButton = document.createElement('em');
    deleteButton.className = 'fas fa-trash-alt';
    return deleteButton;
  },
  
  setUpEventListeners: function(){
    let ul = document.getElementById("ulDiv"); //Wrapped all ul's inside a div to use even bubbling
    ul.addEventListener('click', function(event){
      //Gets the element that was clicked on.
      var elementClicked = event.target;
      //Check if element clicked is a delete button
      if(elementClicked.className ==='fas fa-trash-alt'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    })
  },

  ToggleCheckEventListeners: function(){
    let ul = document.getElementById("ulDiv");
    ul.addEventListener('click', function(event){
      //Gets the element that was clicked on.
      var elementClicked1 = event.target;
      //Check if element clicked is a check button
      if(elementClicked1.className ==='fas fa-check'){
        handlers.CheckToggleComplete(parseInt(elementClicked1.parentNode.id));
      }
    })
  },

  textEnterEventListener: function(){
    document.getElementById("addtodoTextInput").addEventListener("keyup", (event) => {
      if (event.keyCode === 13) { //13 refers to the "Enter" key
          document.getElementById("btnAdd").click();
      }
    })
  },
};

view.setUpEventListeners();
view.textEnterEventListener();
view.ToggleCheckEventListeners();