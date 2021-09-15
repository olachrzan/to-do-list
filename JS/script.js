{
   const tasks = [
      {
         content: "Zrobić zakupy",
         done: true,
      },
      {
         content: "Ugotować obiad",
         done: false,
      },
   ];

   const addNewTask = (newTaskContent) => {
      tasks.push({
         content: newTaskContent,
      });
      render();
   };

   const removeTask = (index) => {
      tasks.splice(index, 1);
      render();
   };

   const toggleTaskDone = (index) => {
      tasks[index].done = !tasks[index].done;
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
         <button class="list__button js-done">${task.done ? "&#10004;" : ""}</button>
         <p class="list__paragraph ${task.done ? "list__paragraph--done" : ""}">${task.content}</p>
         <button class="list__button list__button--remove js-remove">&#128465;</button>
         </li>
         `;
      }
      document.querySelector(".js-taskList").innerHTML = htmlString;

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();

      if (newTaskContent === "") {
         return;
      }
      addNewTask(newTaskContent);
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);
   };

   init();
}