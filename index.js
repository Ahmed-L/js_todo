var list = []
const dom_user_input =  document.getElementById("input");
const dom_task_container = document.getElementById("task-container");
const dom_task = document.getElementById("dom-task");
const add_btn = document.getElementById("add_btn")
add_btn.addEventListener("click", addTask);

class Task{
    constructor(content){this.content = content;this.id = new Date().getTime();this.isComplete = false;}
}
function addTask()
{
    const task_input_string = dom_user_input.value.trim();
    if(task_input_string==="")
        return;
    let task = new Task(task_input_string);
    dom_user_input.value = "";
    list.push(task);
    const success = updateLocalStorage();
    if(success)
        addToDOM(task);
}
function addToDOM(task)
{
    let task_node = dom_task.cloneNode(true);
    task_node.hidden = false;
    task_node.id = task.id;
    task_node.getElementsByTagName("input")[1].value = task.content;
    dom_task_container.insertAdjacentElement("afterbegin", task_node);
    setCheckedStatus(task_node.querySelector(".checkbox"), task)
}

dom_task_container.addEventListener("click", function(event)
{
    const parent_element = event.target.parentElement.parentElement;
    if(event.target.classList.contains("checkbox"))
    {
        const id = event.target.parentElement.parentElement.id;
        const t = list.find(x => x.id == id);
        t.isComplete = !t.isComplete;
        const success = updateLocalStorage();
        if(success)
            setCheckedStatus(event.target, t);
    }
    else if(event.target.classList.contains("delete"))
    {   
        let flag = confirm("Are you sure you want to delete the task?");
        if(!flag) return;
        list.forEach((ele, index)=> {
            if(ele.id == parent_element.id)
                list.splice(index, 1);
        })
        const success = updateLocalStorage();
        if(success)
            parent_element.parentElement.removeChild(parent_element);
    }
    else if(event.target.classList.contains("edit_btn"))
    {
        let input_ele = event.target.parentElement.getElementsByTagName("input")[1];
        if(event.target.textContent==="Edit")
        {
            input_ele.disabled = false;
            event.target.textContent = "Save";
            input_ele.focus();
        }
        else
        {
            const content = input_ele.value;
            list.forEach((ele)=> {
                if(ele.id == parent_element.id)
                    ele.content = content;
            });
            const success = updateLocalStorage();
            if(!success)
                return;
            input_ele.disabled = true;
            event.target.textContent = "Edit";
        }
    }
});
function updateLocalStorage()
{
    try{window.localStorage.setItem("tasks", JSON.stringify(list)); return true;}
    catch(e){console.log("Error occured in saving data to local storage", e.message); return false;}
}
function setCheckedStatus(event, task){
    event.checked = task.isComplete;
    event.parentElement.getElementsByTagName("input")[1].style.textDecoration = task.isComplete? "line-through":"none";
}

if(window.localStorage.getItem("tasks")!==null)
    list = JSON.parse(window.localStorage.getItem("tasks"));

window.onload = ()=>{
    list.forEach(x => addToDOM(x));
}