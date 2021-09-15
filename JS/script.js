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

   const render = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
         <li class="list__item ${task.done ? "list__item--done" : ""}">
         ${task.content}
         <button class="button button--remove js-remove">usuń</button>
         </li>
         `;
      }
      document.querySelector(".js-taskList").innerHTML = htmlString;

      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
         removeButton.addEventListener("click", () => {
            removeTask(index);
         });
      });
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