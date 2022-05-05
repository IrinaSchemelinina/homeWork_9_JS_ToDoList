const addBtn = document.querySelector('.add');
const addTaskInput = document.getElementById('input_task');
const listTask = document.querySelector('.list');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let todoItem = [];

function Task(description){
  this.description = description;
  this.end = false;
}
const createTemplate = (task, index) => {
  return `
    <div class="item ${task.end ? 'checked' : ''}">
      <div class="description">${task.description}</div>
      <div class="btn">
        <input onclick="endTask(${index})" class = "btn-end" type="checkbox" ${task.end ? 'checked' : ''}>
        <button onclick="deleteTask(${index})" class = "btn-clear"></button>
      </div>
    </div>
  `
}
const filterTask = () => {
  const doneNotTask = tasks.length && tasks.filter(item => item.end == false);
  const doneTask = tasks.length && tasks.filter(item => item.end == true);
  tasks = [...doneNotTask,...doneTask];
}

const htmlList = () => {
  listTask.innerHTML = "";
  if(tasks.length > 0){
    filterTask();
    tasks.forEach((item, index) => {
      listTask.innerHTML += createTemplate(item, index);
    });
    todoItem = document.querySelectorAll('.item');
  }
}

htmlList();

const actualLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const endTask = index => {
  tasks[index].end = !tasks[index].end;
  if(tasks[index].end){
    todoItem[index].classList.add('checked');
  } else {
    todoItem[index].classList.remove('checked');
  }
  actualLocal();
  htmlList();
}
 
addBtn.addEventListener('click', () => {
  tasks.push(new Task(addTaskInput.value));
  actualLocal();
  htmlList();
  addTaskInput.value = '';
});

const deleteTask = index => {
  todoItem[index].classList.add('delition');
  setTimeout(() => {
    tasks.splice(index, 1);
    actualLocal();
    htmlList();
  },500)
}
