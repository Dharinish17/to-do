document.addEventListener("DOMContentLoaded", () => {
  let taskName = document.getElementById("taskName");
  let taskDate = document.getElementById("taskDate");
  let addTask = document.getElementById("addTask");
  let taskList = document.getElementById("taskList");

  let taskArr = JSON.parse(localStorage.getItem("user")) || [];

  addTask.addEventListener("click", () => {
    //adding the values to local storage
    if (taskName.value.trim() === "") {
      return;
    }
    let obj = {
      name: "",
      id: "",
      date: "",
      completed: false
    };
    obj.name = taskName.value;
    obj.date = taskDate.value;
    obj.id = Date.now();
    taskArr.push(obj);
    localStorage.setItem("user", JSON.stringify(taskArr));
    taskName.value = "";
    taskDate.value = "";
    display(); //displays the task when added by the add task btn
});
display(); //makes sure the display function keeps the taks in the web even when the web is re-loaded

  function display() {
    // retrieving values from the local storage
    taskList.innerHTML = ""
    let val = JSON.parse(localStorage.getItem("user"));
    if(val=== null)
    {
        return;
    }

    val.forEach(task => {
        taskList.appendChild(createTaskCard(task));
    });
  }

  function createTaskCard(task) {
    let taskCard = document.createElement("div");
    taskCard.className = "task";

    taskCard.innerHTML = `
        <div class="md:flex md:justify-between">
            <p class="font-semibold">${task.name}</p>
            <p class="text-gray-900 md:font-semibold">${task.date}</p>
            </div>
            <div class="md:flex md:gap-4">
            <button
              class="bg-[#22C55E] rounded-sm p-1 font-semibold block mt-4 md:mt-4 hover:bg-[#05ad42]"
            >
              Mark As Complete
            </button>
            <button
              class="bg-[#EF4444] rounded-sm p-1 font-semibold block mt-2 md:mt-4 hover:bg-[#8f0707]"
            >
              Delete
            </button>
          </div>
        `;

        taskCard.dataset.id= `${task.id}`;

    return taskCard;
  }











});
