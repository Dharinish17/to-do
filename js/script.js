document.addEventListener("DOMContentLoaded", () => {
  let taskName = document.getElementById("taskName");
  let taskDate = document.getElementById("taskDate");
  let addTask = document.getElementById("addTask");
  let taskList = document.getElementById("taskList");
  let total = document.getElementById("totalCount");
  let done = document.getElementById("doneCount");
  let pending = document.getElementById("pendingCount");
  let editCard = document.getElementById("EditTaskCard");
  let editChange = document.getElementById("EditTask");
  let EditTaskName = document.getElementById("EditTaskName");
  let EditTaskDate = document.getElementById("EditTaskDate");
  let cancelEdit = document.getElementById("cancelEdit");
  let searchTask;
  let searchTaskBtn;

  let taskArr = JSON.parse(localStorage.getItem("user")) || [];

  addTask.addEventListener("click", () => {
    //adding the values to local storage
    if (taskName.value.trim() === "" || taskDate.value.trim() === "") {
      return;
    }
    let obj = {
      name: "",
      id: "",
      date: "",
      completed: false,
    };
    obj.name = taskName.value;
    obj.date = taskDate.value;
    obj.id = Date.now();
    taskArr.push(obj);
    localStorage.setItem("user", JSON.stringify(taskArr));
    taskName.value = "";
    taskDate.value = "";
    display(); //displays the task when added by the add task btn
    chkCounters();
    changeMarkComplete();
  });
  display(); //makes sure the display function keeps the taks in the web even when the web is re-loaded
  chkCounters();
  changeMarkComplete();

  function display() {
    // retrieving values from the local storage
    taskList.innerHTML =
      '<div class="bg-slate-800 rounded-sm p-4"><h1 class="text-4xl mb-2 font-bold">Tasks</h1><div id="heading"><div class="border border-white bg-white flex items-center justify-between p-2 pr-0 border-r-0 h-10 mb-4 rounded md:w-[38%] md:mr-2"><input type="text" placeholder="Search Tasks" id="searchTask" class="bg-white text-black w-[90%] border-none outline-none caret-black rounded"/><div class="bg-gray-500 h-10 rounded-r w-10 flex p-3 items-center hover:bg-gray-700" id="searchTaskBtn"><i class="fa-solid text-black fa-magnifying-glass"></i></div></div></div></div>';
    let val = JSON.parse(localStorage.getItem("user"));
    if (val === null) {
      return;
    }
    let heading = document.getElementById("heading");
    searchTask = document.getElementById("searchTask");
    searchTaskBtn = document.getElementById("searchTaskBtn");

    val.forEach((task) => {
      heading.appendChild(createTaskCard(task));
    });

    //this is for search field:
    searchTask = document.getElementById("searchTask");

    searchTask.addEventListener("input", () => {
      srh = searchTask.value;
      srhBtn();
    });
  }

  function createTaskCard(task) {
    let taskCard = document.createElement("div");
    taskCard.className = "task";

    taskCard.innerHTML = `
        <div class="md:flex md:justify-between">
            <p class="font-semibold text-xl md:text-2xl lg:text-3xl">${task.name}</p>
            <p class="text-gray-900 font-semibold">${task.date.split("-").reverse().join("-")}</p>
            </div>
            <div class="md:flex md:gap-4">
            <button
              class="complete-btn bg-[#22C55E] rounded-sm p-1 font-semibold block mt-4 md:mt-4 hover:bg-[#05ad42]"
              id= "${task.id}"
            >
              Mark As Complete
            </button>
            <button
              class="delete-btn bg-[#EF4444] rounded-sm p-1 font-semibold block mt-2 md:mt-4 hover:bg-[#8f0707]"
              id= "${task.id}"
            >
              Delete
            </button>
            <button
              class="edit-btn bg-[#2d07d5] rounded-sm p-1 font-semibold block mt-2 md:mt-4 hover:bg-[#170372]"
              id= "${task.id}E"
            >
              Edit Task
            </button>
          </div>
        `;

    taskCard.dataset.id = `${task.id}`;
    // changeMarkComplete();

    return taskCard;
  }

  function chkCounters() {
    let t = JSON.parse(localStorage.getItem("user")) || [];
    let ttl = 0;
    let dne = 0;
    let pen = 0;

    t.forEach((t) => {
      ttl++;
      if (t.completed) {
        dne++;
      } else {
        pen++;
      }
    });
    total.innerText = ttl;
    done.innerText = dne;
    pending.innerText = pen;
  }

  function changeMarkComplete() {
    let t = JSON.parse(localStorage.getItem("user")) || [];
    t.forEach((task) => {
      if (task.completed) {
        let cid = task.id;
        let des = document.getElementById(String(cid));
        if (!des) return;
        des.classList.remove(
          "bg-[#22C55E]",
          "rounded-sm",
          "p-1",
          "hover:bg-[#05ad42]",
        );
        des.classList.add("taskComplete");
        des.innerText = "Task Completed";
        let EditTask = document.getElementById(String(cid) + "E");
        EditTask.classList.add("hidden");
      }
    });
  }

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete-btn")) {
      let completeId = e.target.id;

      taskArr = [];
      let tsk = JSON.parse(localStorage.getItem("user"));
      tsk.forEach((task) => {
        if (task.id == completeId) {
          task.completed = true;
        }
      });
      taskArr = tsk;
      localStorage.setItem("user", JSON.stringify(tsk));
      changeMarkComplete();
    }
    chkCounters();
  });

  //   deleting the task in local storage
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      let deleteId = e.target.id;

      taskArr = [];
      let tsk = JSON.parse(localStorage.getItem("user")) || [];
      tsk = tsk.filter((task) => task.id != deleteId);
      localStorage.setItem("user", JSON.stringify(tsk));
      taskArr = tsk;
      display();
      changeMarkComplete();
    }
    chkCounters();
  });

  //editing tasks
  let editId;
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      editId = String(e.target.id);

      editCard.classList.remove("hidden");
    }
  });

  editChange.addEventListener("click", () => {
    if (EditTaskName.value.trim() === "" || EditTaskDate.value.trim() === "") {
      return;
    }
    let tsk = JSON.parse(localStorage.getItem("user"));
    tsk.forEach((task) => {
      if (String(task.id) + "E" == editId) {
        task.name = EditTaskName.value;
        task.date = EditTaskDate.value;
      }
    });
    localStorage.setItem("user", JSON.stringify(tsk));
    taskArr = tsk;
    EditTaskName.value = "";
    EditTaskDate.value = "";
    display();
    chkCounters();
    changeMarkComplete();
    editCard.classList.add("hidden");
  });

  cancelEdit.addEventListener("click", () => {
    editCard.classList.add("hidden");
    EditTaskName.value = "";
    EditTaskDate.value = "";
  });

  // search task filter

  let srh;

  searchTask.addEventListener("input", () => {
    srh = searchTask.value;
    srhBtn();
  });

  function srhBtn() {
    let tsk = JSON.parse(localStorage.getItem("user")) || [];
    let filtered = tsk.filter((task) =>
      task.name.toLowerCase().includes(srh.toLowerCase()),
    );

    let heading = document.getElementById("heading");

    // remove only task cards
    document.querySelectorAll(".task").forEach((task) => task.remove());

    filtered.forEach((task) => {
      heading.appendChild(createTaskCard(task));
    });

    changeMarkComplete();
  }
});
