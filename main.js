const table = document.querySelector('table');
const todo = document.getElementById('todo');
const priority = document.querySelector('select');
const deadline = document.querySelector('input[type = "date"]');
const submit = document.getElementById('submit');
const storage = localStorage;
let list = [];
const main = document.querySelector('main');
const filterButton = document.createElement('button');
const remove = document.createElement('button');
const br = document.createElement('br');

document.addEventListener('DOMContentLoaded',JSONList);
submit.addEventListener('click',submitFunction);

filterButton.textContent = 'only high priority';
filterButton.id = 'priority';
main.appendChild(filterButton);
filterButton.addEventListener('click',filterButtonFunction);

main.appendChild(br);

remove.textContent = 'remove checked element';
remove.id = 'remove';
main.appendChild(remove);
remove.addEventListener('click',removeFunction);

function JSONList(){
    const json = storage.todoList;
    if(json == undefined){return;}
    list = JSON.parse(json);
    for(const item of list){
	addItem(item);
    }
}

function submitFunction(){
    const item = {}
    if(todo.value !=''){item.todo = todo.value}else{item.todo = 'none'};
    item.priority = priority.value;
    if(deadline.value !=''){item.deadline = deadline.value}else{item.deadline = new Date().toLocaleDateString()};
    item.done = false;

    todo.value = '';
    priority.value = 'middle';
    deadline.value = '';

    addItem(item);
    list.push(item);
    storage.todoList=JSON.stringify(list);
}

function filterButtonFunction(){
    clearTable();
    for(const item of list){
	if(item.priority=='high'){
	    addItem(item);
	}
    }
}

function removeFunction(){
    clearTable();
    list = list.filter((item)=>item.done == false);
    list.forEach((item)=>addItem(item));
    storage.todoList = JSON.stringify(list);
}

function clearTable(){
    const trList = Array.from(document.getElementsByTagName('tr'));
    trList.shift();
    for(const tr of trList){
	tr.remove();
    }
}

function addItem(item){
    const tr = document.createElement('tr');
    for(const prop in item){
	const td = document.createElement('td');
	if(prop =='done'){
	    const checkbox = document.createElement('input');
	    checkbox.type = 'checkbox';
	    checkbox.checked = item[prop];
	    td.appendChild(checkbox);
	    checkbox.addEventListener('change',checkBoxListener);
	}else{
	    td.textContent = item[prop];
	}
	tr.appendChild(td);
    }
    table.append(tr);
}

function checkBoxListener(e){
    const currentTr = e.currentTarget.parentElement.parentElement;
    const trList = Array.from(document.getElementsByTagName('tr'));
    const idx = trList.indexOf(currentTr) - 1;
    list[idx].done = e.currentTarget.checked;
    storage.todoList = JSON.stringify(list);
}
