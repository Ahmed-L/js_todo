class Tasks
{
    static id = 0;
    constructor(task_string, isCompleted)
    {
        this.task_string = task_string;
        this.isCompleted = isCompleted || false;
        this.id = ++this.constructor.id;
    }

    setCompleted() {
        if(this.isCompleted)
            this.isCompleted=false;
        else
            this.isCompleted=true;
    }
}


const taskList = []

function createTask()
{
    var get_input = document.getElementById("input");
    const text = get_input.value;
    var task = new Tasks(text);
    taskList.push(task);

    console.log("printing input: " + text);
    console.log("printing object:" + task.task_string);
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
    listNode_form_delete_btn.type = "button"; listNode_form_delete_btn.classList ="btn btn-primary";
    listNode_form_delete_btn.innerText = "Delete";

    // setting vals Tasks -> listNode forms
    // listNode_form_completed.checked = task.isCompleted;
    listNode_form_completed.checked = false;
    listNode_form_span.textContent = task.task_string;
    listNode.id = task.id;
    listNode.classList = " form-group";

    // combine form elements
    listNode_form.appendChild(listNode_form_completed);
    listNode_form.appendChild(listNode_form_span);
    listNode_form.appendChild(listNode_form_delete_btn);

    listNode.appendChild(listNode_form);

    // add to task-list
    console.log(listNode);
    document.getElementById("list").appendChild(listNode);


    // add EventListeners()
    listNode_form_completed.addEventListener("click", function(e)
    {
        if(e.target==listNode_form_completed)
        {
            console.log("printing target");
            console.log(e.target);
            console.log("printing parent Node:" + e.target.parentNode);
            console.log("printing parent Element:" + e.target.parentElement);
            console.log("printing parent Element's get element:" + e.target.parentElement.getElementsByTagName("span")[0]);
            // console.log(e.target)
            // console.log(typeof e.target.checked)
            if(e.target.checked===false)
            { 
                e.target.parentNode.getElementsByTagName("span")[0].style.textDecoration = "none";
                e.target.checked = false;
               
                
                console.log('1', e.target.checked)
            }
            else
            { 
                e.target.parentNode.getElementsByTagName("span")[0].style.textDecoration = "line-trough";
                e.target.checked = true;
               
                console.log(2, e.target.checked)
            }
        }
    })

    listNode_form_delete_btn.addEventListener("click", function(e)
    {
        if(e.target==listNode_form_delete_btn)
        {
            var id = e.target.parentElement.parentElement.id;
            document.getElementById("list").removeChild(document.getElementById(id));
            
        }
    })
}

function entry()
{
    var task = createTask();
    console.log(task.task_string);
    addTask(task);
}