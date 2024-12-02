class auth {
  constructor() {
    this.token = "";
  }
  async getAsyncToken() {
    try {
      if (!this.token) {
        const user = localStorage.userJWT;
        this.token = user;
      }
      return this.token;
    } catch {
      this.token = this.token;
      // return this.signOut();
    }
  }
  isAuthenticated() {
    this.token = localStorage.userJWT;
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }
  removeStorage() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }
  clearToken() {
    this.token = "";
  }
}
const Auth = new auth();
export default Auth;
