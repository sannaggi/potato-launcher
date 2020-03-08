(function() {
    document.getElementsByClassName("input-to-do-div")[0].addEventListener("submit",addToDo)
    document.getElementsByClassName("add-to-do")[0].addEventListener("click",showInput)
    document.getElementsByClassName("input-to-do")[0].addEventListener("focusout",removeInput)

    loadToDo()
})()

function showInput(){
    var inputToDoContainer = document.getElementsByClassName("input-to-do-container")[0]
    var addButton = document.getElementsByClassName("add-to-do")[0]
    inputToDoContainer.style = "display:block"
    addButton.style = "display:none"
}

function removeInput(){
    var inputToDoContainer = document.getElementsByClassName("input-to-do-container")[0]
    var addButton = document.getElementsByClassName("add-to-do")[0]
    var inputToDo = document.getElementsByClassName("input-to-do")[0]
    inputToDoContainer.style = "display:none"
    inputToDo.value = ""
    addButton.style = "display:flex"
}

function addToDo(e){
    e.preventDefault()
    var toDoList = JSON.parse(localStorage.getItem("to-do"))
    if(toDoList===null){
        toDoList = new Array()
    }
    var newToDo = {todo:document.getElementsByClassName("input-to-do")[0].value, status:0}
    toDoList[toDoList.length] = newToDo
    localStorage.setItem("to-do",JSON.stringify(toDoList))
    loadToDo()
    removeInput()
}

function loadToDo(){
    var toDoListContainer = document.getElementsByClassName("to-do-list")[0]
    var toDoList = JSON.parse(localStorage.getItem("to-do"))
    if(toDoList===null){
        return
    }
    toDoListContainer.innerHTML = ""
    for(let i = 0; i<toDoList.length;i++){
        toDoListContainer.innerHTML+='<div class="todo-item"><span class="check-icon" id="'+i+'-todo'+'"></span>'+toDoList[i].todo+'</div>'
    }
    for(let i = 0; i<toDoList.length;i++){
        document.getElementById(i+"-todo").addEventListener("click",function(){
            var toDoList = JSON.parse(localStorage.getItem("to-do"))
            toDoList.splice(i,1)
            localStorage.setItem("to-do",JSON.stringify(toDoList))
            loadToDo()
        })
    }    
}