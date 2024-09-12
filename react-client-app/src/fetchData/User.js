class User {
  constructor(userData) {
    this._userData = userData; // Declare and initialize the instance variable
      
  }
  get userData() {
    return this._userData;
  }
  set userData(value) {
    this._userData = value;
  }
  // Method to save the URL to local storage
  //https://stackoverflow.com/questions/38801959/storing-user-data-in-an-object-in-local-storage
  saveLocal() {
    if (this._userData) {
      localStorage.setItem('userUrl', this._userData);
    }
  }
  // Static method to load the URL from local storage
  //https://stackoverflow.com/questions/38801959/storing-user-data-in-an-object-in-local-storage
  static loadLocal() {
    return localStorage.getItem('userUrl');
  }
  // Static method to clear the URL from local storage
  //https://stackoverflow.com/questions/63412799/how-do-i-removeitem-from-localstorage
  static clearLocal() {
    localStorage.removeItem('userUrl');
  }
}

export default User;