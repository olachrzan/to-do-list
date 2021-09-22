{
   let tasks = [];

   const addNewTask = (newTaskContent) => {
      tasks = [
         ...tasks,
         { content: newTaskContent, }
      ]
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

   const bindEvents = () => {
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

   const render = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
         <li class="list__item">
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
      }
      document.querySelector(".js-taskList").innerHTML = htmlString;

      bindEvents();
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