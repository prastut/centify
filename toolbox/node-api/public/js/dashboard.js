console.log("client side code is running");

const startMatchButton = document.getElementById("start-match");

startMatchButton.addEventListener("click", function(e) {
  console.log("start match was clicked");

  fetch("/api/simulate-match-now", { method: "GET" })
    .then(function(response) {
      if (response.ok) {
        console.log("Match is started");
        return;
      }
      throw new Error("Request failed.");
    })
    .catch(function(error) {
      console.log(error);
    });
});
