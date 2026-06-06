document.addEventListener("DOMContentLoaded", ()=>{
    let taskName= document.getElementById("taskName");
    let taskDate= document.getElementById("taskDate");
    let addTask= document.getElementById("addTask");
    
    let taskArr= JSON.parse(localStorage.getItem("user")) || [];
    console.log(taskArr);
    
    addTask.addEventListener("click", ()=>{
        if(taskName.value.trim()=== ""){
            return;
        }
        let obj= {
            name: "",
            id: "",
            date: ""
        };
        obj.name= taskName.value;
        obj.date= taskDate.value;
        obj.id= Date.now();
        taskArr.push(obj);
        localStorage.setItem("user", JSON.stringify(taskArr));
        taskName.value= "";
        taskDate.value= "";
    });






})
