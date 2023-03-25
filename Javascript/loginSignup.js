"use strict";
// url = https://taskplanner-production-b2a1.up.railway.app/taskscheduler/user = post , signup, return type user

// url = https://taskplanner-production-b2a1.up.railway.app/taskscheduler/login = post, login  return type token

class User {
  constructor() {}
  #checkPassword(str) {
    if (!str.length >= 6 && !str.length <= 12) {
      return false;
    }
    for (let i of str) {
      if (!isNaN(i)) {
        return this.#checkLower(str);
      }
    }
  }

  #checkLower(str) {
    for (let i of str) {
      if (i.toLowerCase() == i) {
        return this.#checkUpper(str);
      }
    }
  }

  #checkUpper(str) {
    for (let i of str) {
      if (i.toUpperCase() == i) {
        return this.#checkSymbol(str);
      }
    }
  }

  #checkSymbol(str) {
    if (
      str.includes("#") ||
      str.includes("*") ||
      str.includes("%") ||
      str.includes("$") ||
      str.includes("@")
    ) {
      return true;
    }
    return false;
  }

  #checkUsername(str) {
    if (
      str.includes("#") ||
      str.includes("*") ||
      str.includes("%") ||
      str.includes("$")
    ) {
      return false;
    }
    return true;
  }
  async Signup(firstName, lastName, email, password) {
    try {
      if (
        this.#checkUsername(firstName) &&
        this.#checkUsername(lastName) &&
        this.#checkPassword(password)
      ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;

        let url = `http://localhost:8080/taskscheduler/user`;
        let res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        console.log(data);
        alert("SignUp Success");
        toggle();
      } else {
        alert("Invalid Input data");
      }
    } catch (err) {
      alert(err);
    }
  }

  async #Authenticate(token) {
    // let url = `https://masai-api-mocker.herokuapp.com/user/${username}`;
    // try {
    //   let res = await fetch(url, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   localStorage.setItem("name", JSON.stringify(username[0]));
    //   location.href = "./index.html";
    // } catch (err) {
    //   alert("Invalid Credentials");
    // }

    localStorage.setItem("token", token);

    location.href = "../index.html";
  }
  async Login(email, password) {
    let myData = {
      email,
      password,
    };
    try {
      let url = `http://localhost:8080/taskscheduler/login`;

      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(myData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log(data);
      if (data.message == undefined) {
        this.#Authenticate(data.token);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Invalid Credentials");
    }
  }

  async logout(token) {
    let url = `http://localhost:8080/taskscheduler/login`;

    try {
      let res = await fetch(url, {
        method: "GET",
        headers: {
          Token: token,
        },
      });
    } catch (err) {
      alert(err);
    }
  }
}

let container = document.getElementById("container");

let toggle = () => {
  container.classList.toggle("sign-in");
  container.classList.toggle("sign-up");
};

setTimeout(() => {
  container.classList.add("sign-in");
}, 200);

function select(el) {
  return document.querySelector(el).value;
}

let user = new User();
function Register() {
  let firstName = select("#firstName");
  let lastName = select("#lastName");
  let email = select("#email");
  let password = select("#password");

  console.log(firstName, " ", lastName, " ", email, " ", password);
  user.Signup(firstName, lastName, email, password);
}

function LoginUser() {
  let email = select("#userLogin");
  let password = select("#passwordLogin");

  user.Login(email, password);
}
