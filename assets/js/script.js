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

//activity URL = developer.nps.gov/api/v1/activities?q=activities&limit=5&start=0&sort=desc&(apiKey)
//topic URL = developer.nps.gov/api/v1/topics?q=topics&limit=5&start=0&sort=desc&(apiKey)
// I have no idea if the q= is correct

//Lightmode/Darmkmode

document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.createElement("button");
  themeToggleButton.textContent = "Toggle Light/Dark Mode";
  themeToggleButton.classList.add("btn", "btn-secondary");
  themeToggleButton.style.position = "absolute";
  themeToggleButton.style.top = "10px";
  themeToggleButton.style.right = "10px";

  document.querySelector(".header").appendChild(themeToggleButton);

  const setTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);

  themeToggleButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";
    setTheme(newTheme);
  });
});
