//Let's code!!

// document
//   .getElementById("stateSelector")
//   .addEventListener("change", function () {
//     console.log("Selected state:", this.value);
//   });

// //add an event listener to the state selector to call redirectToResultPage function when the selected state changes
// //this will eventually be changed to happen when we hit a submit button
// document
//   .getElementById("stateSelector")
//   .addEventListener("change", redirectToResultPage);

// // Function to redirect to result page with the selected state code as a query parameter
// function redirectToResultPage() {
//   const stateCode = document.getElementById("stateSelector").value;
//   if (stateCode) {
//     window.location.href = `result.html?state=${stateCode}`;
//   }
// }

const searchOptions = ["", "", ""];

function formInput() {
  const selectContentEl = document.getElementById("selection-content");
  console.log(selectContentEl);

  const optionFormEl = document.getElementById("task-form");
  // optionFormEl.classList.add("classForm");
  // optionFormEl.setAttribute("id", "formId");
  // optionFormEl.textContent = "Options Selected";
  console.log(optionFormEl);

  const stateInput = document.getElementById("stateSelector");
  const topicInput = document.getElementById("topicSelector");
  const activityInput = document.getElementById("activitiesSelector");
  const submitButtonEl = document.getElementById("submit-options");

  optionFormEl.addEventListener("submit", function (event) {
    event.preventDefault();

    // Update selectContentEl with form inputs
    selectContentEl.innerHTML =
      stateInput.value +
      "<br>" +
      topicInput.value +
      "<br>" +
      activityInput.value +
      "<br>";
  });

  selectContentEl.appendChild(optionFormEl);
  optionFormEl.appendChild(stateInput);
  optionFormEl.appendChild(topicInput);
  optionFormEl.appendChild(activityInput);
  optionFormEl.appendChild(submitButtonEl);

  document.addEventListener("DOMContentLoaded", function () {
    formInput();
  });
}
