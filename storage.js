class Storage {
  static getSearchedUsersFromStorage() {
    // Get All Users

    let users;

    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }
    return users;
  }
  static addSearchedUserToStorage(username) {
    //Add Users
    let users = this.getSearchedUsersFromStorage(); //we can use this or storage class

    //IndexOf

    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("searched", JSON.stringify(users));
  }
  static clearAllSearchedUsersFromStorage() {
    //Delete All Users
    localStorage.removeItem("searched");
  }
}
