class Task{
    constructor(str){this.content = str;this.id = new Date().getTime();this.isComplete = false;}
}

var list = []
if(window.localStorage.getItem("tasks")!==null)
    list = JSON.parse(window.localStorage.getItem("tasks"));

document.getElementById("add_btn").addEventListener("click", addTask);

function addTask()
{
    const str = document.getElementById("input").value;
    if(str==="")
        return;
    let task = new Task(str);
    document.getElementById("input").value = "";
    list.push(task);
    if(updateLocalStorage())
        addToDOM(task);
}
function addToDOM(t)
{
    let task_node = document.getElementById("0").cloneNode(true);
    task_node.hidden = false;
    task_node.id = t.id;
    task_node.getElementsByTagName("input")[1].value = t.content;
    document.getElementById("list").insertAdjacentElement("afterbegin", task_node);
    setCheckedStatus(task_node.querySelector(".checkbox"), t)
}

window.onload = ()=>{
    list.forEach(x => addToDOM(x));
}

var x = document.getElementById("list");
x.addEventListener("click", function(e)
{
    const c = e.target.parentElement.parentElement;
    if(e.target.classList.contains("checkbox"))
    {
        const id = e.target.parentElement.parentElement.id;
        const t = list.find(x => x.id == id);
        t.isComplete = !t.isComplete;
        if(updateLocalStorage())
            setCheckedStatus(e.target, t);
    }
    else if(e.target.classList.contains("delete"))
    {   
        let flag = confirm("Are you sure you want to delete the task?");
        if(!flag) return;
        list.forEach((x, i)=> {
            if(x.id == c.id)
                list.splice(i, 1);
        })
        if(updateLocalStorage())
            c.parentElement.removeChild(c);
    }
    else if(e.target.classList.contains("edit_btn"))
    {
        let input_ele = e.target.parentElement.getElementsByTagName("input")[1];
        if(e.target.textContent==="Edit")
        {
            input_ele.disabled = false;
            e.target.textContent = "Save";
            input_ele.focus();
        }
        else
        {
            const content = input_ele.value;
            list.forEach((x)=> {
                if(x.id == c.id)
                    x.content = content;
            });
            if(!updateLocalStorage())
                return;
            input_ele.disabled = true;
            e.target.textContent = "Edit";
        }
    }
});
function updateLocalStorage()
{
    try{window.localStorage.setItem("tasks", JSON.stringify(list)); return true;}
    catch(e){console.log("Error occured in saving data to local storage", e.message); return false;}
}
function setCheckedStatus(e, t){
    e.checked = t.isComplete;
    e.parentElement.getElementsByTagName("input")[1].style.textDecoration = t.isComplete? "line-through":"none";
}