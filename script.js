var newTask = document.getElementById('receber')
var resultList = document.getElementById('list')
var toDo = document.querySelector('#FormInput')
var editForm = document.getElementById('edit-form')
var editInput = document.getElementById('edit-input')
var cancelEdit = document.getElementById('cancelEditBtn')
var searchInput = document.getElementById('search-input')
var eraseBtn = document.getElementById('erase-search')
var filterBtn = document.getElementById('filter-options')
let oldInput;

function saveList(text){
    var addDiv = document.createElement('div') //criando uma div para mostrar a lista
    addDiv.classList.add('results') //setando classe para a div

    var listTitle = document.createElement('h3') //criando elemento h3
    listTitle.innerText = text //atribuindo o "text" referente ao input do usuário
    addDiv.appendChild(listTitle) //incluindo o text dentro da div 

    var btnSubmit = document.createElement('button')
    btnSubmit.classList.add('btnSubmit')
    btnSubmit.innerHTML = '<i class="fa-solid fa-check"></i>' //atribuindo o icone referente ao butão submit
    addDiv.appendChild(btnSubmit)

    var btnEdit = document.createElement('button')
    btnEdit.classList.add('btnEdit')
    btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>' //atribuindo o icone referente ao butão submit
    addDiv.appendChild(btnEdit)

    var btnCancel = document.createElement('button')
    btnCancel.classList.add('btnCancel')
    btnCancel.innerHTML = '<i class="fa-solid fa-xmark"></i>' //atribuindo o icone referente ao butão submit
    addDiv.appendChild(btnCancel)

    resultList.appendChild(addDiv)

}

function showEditForm(){            //função para realizar o toggle do edit e esconder as outras informações
    editForm.classList.toggle("hide")
    toDo.classList.toggle("hide")
    resultList.classList.toggle("hide")
}

cancelEdit.addEventListener("click", (e) => {
    e.preventDefault();
    showEditForm();

})

toDo.addEventListener("submit", (e) => {
    e.preventDefault()
    
    var entrada = newTask.value

    if (entrada) {
        saveList(entrada)
    }

    newTask.value = ''
    newTask.focus()
})

document.addEventListener("click", (e) => { //criando evento de clique c/ referencia na página toda
    var element = e.target
    var parentElement = element.closest("div")
    let listTitle

    if(parentElement && parentElement.querySelector("h3")){     //criando verificao da existencia de titulo para edição
        listTitle = parentElement.querySelector("h3").innerText || ""
    }

    if(element.classList.contains("btnSubmit")){
        parentElement.classList.toggle("done")
    }

    if(element.classList.contains("btnEdit")){
        showEditForm()

        editInput.value = listTitle
        oldInput = listTitle
    }

    if(element.classList.contains("btnCancel")){
        parentElement.remove()
    }
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    var newInput = editInput.value

    if(newInput){
    updateInput(newInput)
    }

    showEditForm()
})

function updateInput(text){
    const allList = document.querySelectorAll('.results')

    allList.forEach((addDiv) => {
       
        let listTitle = addDiv.querySelector("h3")

        if(listTitle.innerText === oldInput){
            listTitle.innerText = text
        }
    })

}

function getSearched(search){
    const allList = document.querySelectorAll('.results')
  
    allList.forEach((addDiv) => {
      const listTitle = addDiv.querySelector("h3").innerText.toLowerCase()
  
      addDiv.style.display = "flex"
  
      if (!listTitle.includes(search)) {
        addDiv.style.display = "none"
      }
    })
  }

searchInput.addEventListener("keyup", (e) => {
    var search = e.target.value;
  
    getSearched(search)
  })

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()
  
    searchInput.value = ""
  
    searchInput.dispatchEvent(new Event("keyup"))
})

filterBtn.addEventListener("change", (e) => {
    var filterValue = e.target.value;
  
    filterAll(filterValue);
})

function filterAll(filterValue){
    const allList = document.querySelectorAll('.results')
  
    switch (filterValue) {
      case "all":
        allList.forEach((addDiv) => (addDiv.style.display = "flex"))
  
        break;
  
      case "done":
        allList.forEach((addDiv) =>
          addDiv.classList.contains("done")
            ? (addDiv.style.display = "flex")
            : (addDiv.style.display = "none")
        )
  
        break;
  
      case "to-do":
        allList.forEach((addDiv) =>
          !addDiv.classList.contains("done")
            ? (addDiv.style.display = "flex")
            : (addDiv.style.display = "none")
        )
  
        break;
  
      default:
        break;
    }
}