class EthersServiceProvider {
  provider;
  currentUserId;
  tgUsername = "User";
  photoUrl =
    "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png";
  authLoadedStatus = false;

  constructor() {}

  async setCurrentUserId(value) {
    this.currentUserId = value;
  }
  async setTGUsername(value) {
    this.tgUsername = value;
  }
  async setTGPhotoUrl(value) {
    this.photoUrl = value;
  }

  async setAuthLoadedStatus(flag) {
    this.authLoadedStatus = flag;
  }
}

const ethersServiceProvider = new EthersServiceProvider();

export default ethersServiceProvider;
