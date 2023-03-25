let token = localStorage.getItem("token") || "";

let tBody = document.querySelector("tbody");
function appendData(data) {
  tBody.innerHTML = "";
}

let login = document.querySelector("#login");

if (token != "") {
  login.innerText = "Logout";
}

login.addEventListener("click", async (e) => {
  if (e.target.innerText == "Logout") {
    let url = `http://localhost:8080/taskscheduler/logout`;

    await fetch(url);
    localStorage.removeItem("token");
    location.reload();
  } else {
    location.href = "../HTML/loginSignup.html";
  }
});
