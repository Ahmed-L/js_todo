var taskList_hashmap = new Map();
var mapSize = 0;
try{
    const serializedMap = localStorage.getItem('taskList');
    taskList_hashmap = new Map(JSON.parse(serializedMap));
}
catch
{
    console.log("no task map found in local storage. ");
}
console.log("total tasks in map: " + taskList_hashmap.size);
mapSize = taskList_hashmap.size;




class Tasks
{
    static id = mapSize;
    constructor(task_string, isCompleted)
    {
        this.task_string = task_string;
        this.isCompleted = isCompleted || false;
        this.id = ++this.constructor.id;
    }

    setCompleted() {
        this.isCompleted = !this.isCompleted;
    }
}

function createTask()
{
    var get_input = document.getElementById("input");
    const text = get_input.value;
    var task = new Tasks(text);
    //taskList.push(task);
    taskList_hashmap.set(task.id, task);
    console.log("task ID is: " + task.id);
    let temp = taskList_hashmap.get(1);
    console.log(temp);
    get_input.value = "";
    
    return task;
}

function addTask(task) // Tasks object as args
{
    var listNode = document.createElement("ul");
    var listNode_form = document.createElement("form");
    var listNode_form_span = document.createElement("span");
    var listNode_form_delete_btn = document.createElement("button");
    var listNode_form_completed = document.createElement("input");

    listNode_form_completed.type = "checkbox";
    listNode_form_span.contentEditable = true;
    listNode_form_delete_btn.type = "button";
    listNode_form_delete_btn.innerText = "Delete";

    // setting vals Tasks -> listNode forms
    listNode_form_completed.value = task.isCompleted?"on":"off";
    listNode_form_span.textContent = task.task_string;
    listNode.id = task.id;
    listNode.classList = " form-group";

    // add .css classes
    listNode_form_delete_btn.classList = "delete-btn";
    listNode.classList = "task-item";

    // add strike-through
    //console.log()
    if(listNode_form_completed.value==="on")
    {
        listNode_form_span.style.textDecoration = "line-through";
        listNode_form_completed.checked = true
    }
    else
    {
        listNode_form_span.style.textDecoration = "none";
        listNode_form_completed.checked = false;
    }

    // combine form elements
    listNode_form.appendChild(listNode_form_completed);
    listNode_form.appendChild(listNode_form_span);
    listNode_form.appendChild(listNode_form_delete_btn);
    listNode.appendChild(listNode_form);

    // add to task-list -> list
    console.log(listNode);
    document.getElementById("list").appendChild(listNode);


    // add EventListeners()
    listNode_form_completed.addEventListener("click", function(e)
    {
        if(e.target.type==="checkbox")
        {
            //e.target.value
            console.log(e.target.checked);
            console.log(e.target.value);
            if(e.target.value==="off")
            {
                e.target.value = "on";
                e.target.parentNode.getElementsByTagName("span")[0].style.textDecoration = "line-through";
            }
            else
            {
                e.target.value = "off";
                e.target.parentNode.getElementsByTagName("span")[0].style.textDecoration = "none";
            }

            try{
                var idx = e.target.parentElement.parentElement.id;
                idx = (Number)(idx);
                console.log(idx);
                console.log(typeof(idx));
                var temp2 = taskList_hashmap.get(idx);
                console.log(temp2);
                console.log(temp2.isCompleted);
                console.log("reached");
                temp2.isCompleted = !temp2.isCompleted;
                console.log(temp2.isCompleted);
                updateLocalStorage();
            }
            catch{console.log("error in getting item at idx:", idx)}
        }
    })

    listNode_form_delete_btn.addEventListener("click", function(e)
    {
        if(e.target==listNode_form_delete_btn)
        {
            console.log("size of map before:" + taskList_hashmap.size);
            var id = e.target.parentElement.parentElement.id;
            id = (Number)(id);
            document.getElementById("list").removeChild(document.getElementById(id));
            taskList_hashmap.delete(id);
            console.log("size of map before:" + taskList_hashmap.size);
            updateLocalStorage();
        }
    })

    listNode_form.addEventListener("keydown", function(e)
    {
        if(e.keyCode===13)
        {
            e.preventDefault();
            e.target.blur();
        }
    })
    listNode_form_span.addEventListener("input", function(e)
    {
        if(e.target==listNode_form_span)
        {
            try{
                //console.log("after change/input:" + taskList_hashmap.size);
                let idx = e.target.parentElement.parentElement.id;
                idx = (Number)(idx);
                var temp2 = taskList_hashmap.get(idx);
                const updatedString = e.target.textContent;
                temp2.task_string = updatedString;
                updateLocalStorage();
            }
            catch{console.log("error in getting item at idx: ", idx)}
        }
    })
    // update local storage
    updateLocalStorage();
}

function entry()
{
    var task = createTask();
    console.log(task.task_string);
    addTask(task);
}


function on_start_render()
{
    //var size = taskList_hashmap.size;
    {
        for(const [key, value] of taskList_hashmap)
        {
            addTask(value);
        }
    }
}

window.onload = on_start_render;



function updateLocalStorage()
{
    // update local storage ->
    try{
        const serializedMap = JSON.stringify([...taskList_hashmap.entries()]);
        localStorage.setItem('taskList', serializedMap);
        }
        catch
        {
            console.log("failed to store map to the localstorage");
        }
}

function keypress_Submit(e)
{
    if(e.key!=="Enter")
        return;
    e.preventDefault();
    document.getElementById("add_btn").click();
}
