// select tag 
const inputName = <HTMLInputElement>document.getElementById('name')
const inputSalary = <HTMLInputElement>document.getElementById('salary')
const btnSubmit = <HTMLButtonElement>document.getElementById('submit')
const nameAlert = <HTMLDivElement>document.getElementById('NameAlert')
const SalaryAlert = <HTMLDivElement>document.getElementById('salaryAlert')
const listItem = <HTMLUListElement>document.getElementById('listItem')
const btnDelteAll = <HTMLButtonElement>document.getElementById('delete-all')
const select = <HTMLSelectElement>document.getElementById('sort')
const btnFilter = <HTMLButtonElement>document.getElementById('filter')
// type

type objSalary ={
    id : number
    name: string;
    salary : number,
}

// global var
let users : Array<objSalary> = []
let editemode : boolean =  false
let iduser = 0
btnDelteAll.addEventListener('click' , ()=> {
    users = []
    RenderList(users)
})
const valid = () => {
    if(!inputName.value){
        nameAlert.classList.remove('hide')
    }
    if(!inputSalary.value){
        SalaryAlert.classList.remove('hide')
    }
    if(inputName.value){
        nameAlert.classList.add('hide')
        return true
    }
    if(inputSalary.value){
        SalaryAlert.classList.add('hide')
        return true
    }
}
const  addUser =() => {
    
    if(editemode){
        const id = users.findIndex(item => item.id === iduser)
        
        if(valid()){
            users.splice(id , 1 , {
                id : id , 
                name : inputName.value ,
                salary : Number(inputSalary.value)
            })
            editemode = false ,
            RenderList(users)
            inputName.value = ""
        inputSalary.value =""
        }
    }
    else {
        
    
    if(valid()){
        
        
        const objuser : objSalary = {
            id : users.length ,
            name : inputName.value ,
            salary : Number (inputSalary.value)
        }
        users.push(objuser);
        RenderList(users)
        inputName.value = ""
        inputSalary.value =""
        
    }
    }
    
    
}
btnSubmit.addEventListener("click" ,addUser )
const handleDelete = (id: number) => {
    
    
    const index = users.findIndex(item => item.id === id);
    
    
    if (index !== -1) {
        users.splice(index, 1);
        RenderList(users);
    }
}

function RenderList  (List : objSalary[])  {
    listItem.innerHTML = ""
    List.forEach(item => {
        const li = document.createElement ('li');
        li.classList.add("item")
        const name = document.createElement('h3')
        name.innerText = item.name ;
        const salary = document.createElement('h3')
        salary.innerText = String(item.salary)
        const btns = document.createElement('div')
        btns.classList.add('btns')
        const Delete = document.createElement('button')
        Delete.className = 'btn btn-sm btn-danger'
        const IconDelete = document.createElement('i')
        IconDelete.className ='fa-solid fa-trash-can'
        Delete.append(IconDelete)
        Delete.addEventListener('click' , ()=> handleDelete(item.id))
        const Edite = document.createElement('button')
        Edite.className ='btn btn-sm btn-warning'
        const IconEdite = document.createElement('i')
        IconEdite.className ='fa-solid fa-pen-to-square'
        Edite.append(IconEdite)
        Edite.addEventListener('click' , ()=> handleEdite(item.id))
        btns.append(Delete , Edite)
        li.append(name , salary , btns)
        listItem.append(li);

    })
}

const handleEdite = (id : number) =>{
    editemode = true
    iduser = id
    const user = users.find(item => item.id === id)
        inputName.value = user?.name!
        inputSalary.value = String(user?.salary!)
}

function sortBySalary (a:objSalary , b:objSalary) {
    return a.salary - b.salary
}
const handleSort = () =>{
    
    
    if(select.value == "low"){
        users.sort(sortBySalary)
        RenderList(users)
    }
    else{
        users.sort(sortBySalary)
        RenderList(users.reverse())
    }
}
btnFilter.addEventListener('click' , ()=> handleSort())