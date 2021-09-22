{
   let tasks = [];
   let hideDoneTasks = false;

   const addNewTask = (newTaskContent) => {
      tasks = [
         ...tasks,
         { content: newTaskContent, }
      ];
      render();
   };

   const removeTask = (index) => {
      tasks = [
         ...tasks.slice(0, index),
         ...tasks.slice(index + 1),
      ];
      render();
   };

   const toggleTaskDone = (index) => {
      tasks = [
         ...tasks.slice(0, index),
         { ...tasks[index], done: !tasks[index].done, },
         ...tasks.slice(index + 1),
      ];
      render();
   };

   const markAllTasksDone = () => {
      tasks = tasks.map(task => ({
         ...task,
         done: true,
      }));
      render();
   };

   const toggleHideDoneTasks = () => {
      hideDoneTasks = !hideDoneTasks;
      render();
   };

   const bindTasksEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         });
      });

      const toggleDoneButtons = document.querySelectorAll(".js-done");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
         });
      });
   };

   const renderTasks = () => {
      const taskToHTML = task => `
         <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
            <button class="list__button js-done">
               ${task.done ? "&#10004;" : ""}
            </button>
            <span class="list__span ${task.done ? "list__span--done" : ""}">
               ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">
               &#128465;
            </button>
         </li>
         `;
      const tasksElement = document.querySelector(".js-taskList");
      tasksElement.innerHTML = tasks.map(taskToHTML).join("");
   };

   const renderButtons = () => {
      const buttonsElement = document.querySelector(".js-textButtons");

      if (tasks.length === 0) {
         buttonsElement.innerHTML = "";
         return;
      }

      buttonsElement.innerHTML = `
         <button class="textButtons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
         </button>
         <button class="textButtons__button textButtons__button--last js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
               Ukończ wszystkie
         </button>
      `;
   };

   const bindButtonsEvents = () => {
      const markAllTasksDoneButton = document.querySelector(".js-markAllDone");

      if (markAllTasksDoneButton) {
         markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
      }

      const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

      if (toggleHideDoneTasksButton) {
         toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
      }
   };

   const render = () => {
      renderTasks();
      bindTasksEvents();
      renderButtons();
      bindButtonsEvents();
   };

   const clearInput = (newTaskElement) => {
      newTaskElement.value = "";
      newTaskElement.focus();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskElement = document.querySelector(".js-newTask");
      const newTaskContent = newTaskElement.value.trim();

      if (newTaskContent === "") {
         return;
      }
      addNewTask(newTaskContent);
      clearInput(newTaskElement);
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);
   };

   init();
}