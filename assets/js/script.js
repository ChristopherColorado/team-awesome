//Let's code!!

document
  .getElementById("stateSelector")
  .addEventListener("change", function () {
    console.log("Selected state:", this.value);
  });

//add an event listener to the state selector to call redirectToResultPage function when the selected state changes
//this will eventually be changed to happen when we hit a submit button
document
  .getElementById("stateSelector")
  .addEventListener("change", redirectToResultPage);

// Function to redirect to result page with the selected state code as a query parameter
function redirectToResultPage() {
  const stateCode = document.getElementById("stateSelector").value;
  if (stateCode) {
    window.location.href = `result.html?state=${stateCode}`;
  }
}
