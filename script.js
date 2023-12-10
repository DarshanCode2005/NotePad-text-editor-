const addnote = document.querySelector('button.add-btn')
const notesList = document.querySelector('div.notes-list')

// editor variables
const heading = document.querySelector('#text-input')
const textBlob = document.querySelector('textarea')

function storage(head,content,time){
    if(localStorage.getItem('list') == null){
        localStorage.setItem('list',JSON.stringify([]))
    }
    else{
        const list = JSON.parse(localStorage.getItem('list'))
        list.push({
            head: head,
            content:content,
            time:time
        })

        localStorage.setItem('list',JSON.stringify(list))
    }
}

function tellDay(day){
    const arrayOfDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    return arrayOfDay[day]
}

function tellMonth(month){
    const arrayOfMonth = ['Jan','Feb','March','April','May','June','July','August','Sept','Oct','Nov','Dec']
    return arrayOfMonth[month]
}

function tellTimeDev(){
    const date = new Date()

    const time = `${tellDay(date.getDay())},${date.getDate()} ${tellMonth(date.getMonth())} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
    return time
}

addnote.addEventListener('click',() => {
    const time = tellTimeDev()
    notesList.innerHTML += `
                                 <div class="note" onclick="active(this)">
                                    <!-- active class -->
                                    <h4>Add Head</h4>
                                    <p>Add Content</p>
                                    <label>${time}</label>
                                </div>
    `;

    storage('Add Head','Add Content',time)
})

function renderEditor(){
    const element = notesList.children
    const list = JSON.parse(localStorage.getItem('list'))
    for(let i=0;i<element.length;i++){
        if(element[i].classList.contains('active')){
            heading.value = list[i].head
            textBlob.value = list[i].content
        }
    }
}

function active(e){
    const allNotes = document.querySelectorAll('.note')
    allNotes.forEach(note => {
        note.classList.remove('active')
    })
    e.classList.add('active')
    renderEditor()
}

document.addEventListener("DOMContentLoaded",() => {
    const list = JSON.parse(localStorage.getItem('list'))
    list.forEach(elem => {
        notesList.innerHTML += 
        `
                                 <div class="note" onclick="active(this)">
                                    <h4>${elem.head}</h4>
                                    <p>${elem.content}</p>
                                    <label>${elem.time}</label>
                                </div>
    `
    }) 

    notesList.firstElementChild.classList.add('active')
    heading.value = notesList.firstElementChild.firstElementChild.textContent
    textBlob.value = notesList.firstElementChild.children[1].textContent
    // console.log(list)
})

function refreshfunc(){
    location.reload()
}

heading.addEventListener("focusout",() => {
    const element = notesList.children
    if(heading.value != ''){
    for(let i=0;i<element.length;i++){
        if(element[i].classList.contains('active')){
            const array = JSON.parse(localStorage.getItem('list'))
            array[i].head = heading.value
            array[i].time = tellTimeDev()

            localStorage.setItem('list',JSON.stringify(array))
        }
    }
}
    refreshfunc()
})

textBlob.addEventListener("focusout",() => {
    const element = notesList.children
    if(textBlob.value != ''){
    for(let i=0;i<element.length;i++){
        if(element[i].classList.contains('active')){
            const array = JSON.parse(localStorage.getItem('list'))
            array[i].content = textBlob.value
            array[i].time = tellTimeDev()

            localStorage.setItem('list',JSON.stringify(array))
        }
    }
    }

    refreshfunc()
})