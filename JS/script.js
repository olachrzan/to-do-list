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

   const render = () => {
      let htmlString = "";

      for (const task of tasks) {
         htmlString += `
         <li class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
         </li>
         `;
      }

      document.querySelector(".js-taskList").innerHTML = htmlString;
   };


   const init = () => {
      render();
   };

   init();
}