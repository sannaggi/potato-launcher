(function() {
    // CHANGE IMAGE COUNT HERE
    // !! The image name provided in the images folder must be in correct order [1.jpg - n.jpg] !!s
    const IMAGE_COUNT = 43

    initBackgroundImage(IMAGE_COUNT)
    initTime()
    initDate()

})()

function initBackgroundImage(IMAGE_COUNT) {
    const image_paths = []

    for (let i = 1; i <= IMAGE_COUNT; i++) {
        image_paths.push(`../images/background-images/${i}.jpg`)
    }
    
    const background = document.getElementsByClassName('background-image')[0]
    let index = parseInt(Math.random() * IMAGE_COUNT)
    const INTERVAL = 10000
    
    background.style.backgroundImage = `url(${image_paths[index]})`

    setInterval(() => {
        let newIndex = 0
        do {
            newIndex = parseInt(Math.random() * IMAGE_COUNT)
        } while(index == newIndex)

        index = newIndex
        background.style.backgroundImage = `url(${image_paths[index]})`
    }, INTERVAL)
}

function initTime() {
    const timeContainer = document.getElementsByClassName('time')[0]
    const secondContainer = document.getElementsByClassName('second')[0]
    const nextSecondContainer = document.getElementsByClassName('next-second')[0]
    const secondSubContainer = document.getElementsByClassName('second-subcontainer')[0]
    const INTERVAL = 1000

    printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer)

    setInterval(() => {
        printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer)
    }, INTERVAL);
}

var animating = false

function printNewTime(timeContainer, secondContainer, secondSubContainer, nextSecondContainer) {
    const date = new Date()
    const oldSecond = secondContainer.innerHTML

    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    timeContainer.innerHTML = `${hour}:${minute}`
    if (second != oldSecond && !animating) {
        animating = true
        animateSeconds(secondSubContainer, secondContainer, second, nextSecondContainer, setNotAnimating)
    }

    function setNotAnimating() {
        animating = false
    }
}

function animateSeconds(secondSubContainer, secondContainer, newSecond, nextSecondContainer, callback) {
    const TIMEOUT = 400
    secondSubContainer.classList.toggle('animate-second')
    nextSecondContainer.innerHTML = newSecond

    setTimeout(() => {
        secondSubContainer.classList.toggle('animate-second')
        callback()
    }, TIMEOUT);

    setTimeout(() => {
        secondContainer.innerHTML = newSecond
    }, TIMEOUT / 2);
}

function initDate() {
    const dateContainer = document.getElementsByClassName('date')[0]
    const extraContainer = document.getElementsByTagName('sup')[0]

    dateContainer.innerHTML = getCurrentDateString();
    extraContainer.innerHTML = getExtra()
}

function getCurrentDateString() {
    const date = new Date()
    const currentDate = date.getDate()
    return `${getCurrentDay(date)} - ${getCurrentMonth(date)} ${currentDate}`
}

function getExtra() {
    const currentDate = new Date().getDate()
    if (currentDate % 10 > 3 || currentDate / 10 == 1)
        return 'th'
    if (currentDate % 10 == 1)
        return 'st'
    if (currentDate % 10 == 2)
        return 'nd'
    return 'rd'
}

function getCurrentDay(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satuday']
    return days[date.getDay()]
}

function getCurrentMonth(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[date.getMonth()]
}

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
        toDoListContainer.innerHTML+='<div><span class="check-icon" id="'+i+'-todo'+'"></span>'+toDoList[i].todo+'</div>'
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

document.getElementsByClassName("input-to-do-div")[0].addEventListener("submit",addToDo)
document.getElementsByClassName("add-to-do")[0].addEventListener("click",showInput)
document.getElementsByClassName("input-to-do")[0].addEventListener("focusout",removeInput)

loadToDo()