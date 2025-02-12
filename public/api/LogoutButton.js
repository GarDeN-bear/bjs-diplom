
class LogoutButton {
  constructor() {
    [this.logoutBtn] = document.getElementsByClassName('logout');
    this.action = (f) => f;
    this.logoutBtn.addEventListener('click', this.logoutClick.bind(this));
  }

  logoutClick(event) {
    event.preventDefault();
    this.action();
  }
}

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};