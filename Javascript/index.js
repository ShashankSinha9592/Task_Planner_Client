"use strict";

let token = localStorage.getItem("token") || "";
let pageNumber = 1;
// let tBody = document.querySelector("#tbody");

let gallery = document.querySelector(".gallery");

function showData(data) {
  gallery.innerHTML = "";
  data.forEach(({ sprinid, sprintName, date, tasks }, index) => {
    const sprintHeading = document.createElement("h2");

    sprintHeading.innerText = sprintName;

    sprintHeading.setAttribute("class", "sprintName");

    const table = document.createElement("table");

    const thead = document.createElement("thead");

    const tbody = document.createElement("tbody");

    const headTr = document.createElement("tr");

    const th1 = document.createElement("th");
    th1.innerText = "Task Type";

    const th2 = document.createElement("th");
    th2.innerText = "Summary";

    const th3 = document.createElement("th");
    th3.innerText = "Priority";

    const th4 = document.createElement("th");
    th4.innerText = "Status";

    const th5 = document.createElement("th");
    th5.innerText = "Delete";

    headTr.append(th1, th2, th3, th4, th5);

    thead.append(headTr);

    // sprintName.innerText = priorityName;

    tasks.forEach(
      ({ taskId, priority, summary, taskType, taskStatus }, ind) => {
        const tr = document.createElement("tr");

        const type = document.createElement("td");
        type.innerText = taskType;

        const taskSummary = document.createElement("td");
        taskSummary.innerText = summary;

        const taskPriority = document.createElement("td");
        taskPriority.innerText = priority;

        const status = document.createElement("td");
        status.innerText = taskStatus;

        const deleteBtn = document.createElement("td");
        deleteBtn.innerText = "DELETE";

        tr.append(type, taskSummary, taskPriority, status, deleteBtn);

        tbody.append(tr);
      }
    );
    table.append(thead, tbody);
    gallery.append(sprintHeading, table);
  });
}

let login = document.querySelector("#login");

if (token != "") {
  login.innerText = "Logout";
  fetchData(token);
} else {
  login.innerText = "Login/SignUp";
}

login.addEventListener("click", (e) => {
  if (e.target.innerText === "Logout") {
    logout(e);
  } else {
    location.href = "../HTML/loginSignup.html";
  }
});

let logout = async (el) => {
  try {
    let url = `https://taskplanner-production-b2a1.up.railway.app/taskscheduler/logout`;

    await fetch(url, {
      method: "GET",
      headers: {
        Token: token,
      },
    });
  } catch (err) {
    localStorage.removeItem("token");
    location.reload();
  }
};

async function fetchData(token) {
  let url = `https://taskplanner-production-b2a1.up.railway.app/taskscheduler/sprint`;

  let res = await fetch(url, {
    method: "GET",
    headers: {
      Token: token,
    },
  });

  let data = res.json();

  data = await data;

  showData(data);
}

// Card Carousal

const slider = document.querySelector(".gallery");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  console.log(startX, " ", scrollLeft);
});
slider.addEventListener("mouseleave", (_) => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", (_) => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;

  const SCROLL_SPEED = 3;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;
});
