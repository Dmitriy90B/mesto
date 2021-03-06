export default class UserInfo {
  constructor({profileName, profileJob, profileAvatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);

  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo({name, job}) {
   this._profileName.textContent = name;
   this._profileJob.textContent = job;
  }

  setUserAvatar({avatar}) {
   this._profileAvatar.src = avatar;
  }
}
