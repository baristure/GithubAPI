// Selecting elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();
/*

*/
eventListeners();
function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}
/*

*/
function getData(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    alert("Please Enter a Correct Username");
  } else {
    github
      .getGithubData(username)
      .then(response => {
        if (response.user.message === "Not Found") {
          //Error Message
          ui.showError("User Not Found");
        } else {
          ui.addSearchedUserToUI(username); // Call before the storage
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch(err => ui.showError(err));
  }
  ui.clearInput(); //Clearing Input Field
  e.preventDefault();
}
/*

*/
function clearAllSearched() {
  //clear all search
  if (confirm("Are You Sure?")) {
    //Delete
    Storage.clearAllSearchedUsersFromStorage(); //Delete from storage
    ui.clearAllSearchedFromUI();
  }
}
/*

*/
function getAllSearched() {
  //Add Searched From Storage and Add UI

  let users = Storage.getSearchedUsersFromStorage();

  let result = "";
  users.forEach(user => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}
