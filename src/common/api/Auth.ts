class Auth {
  token: string;

  constructor() {
    this.token = "";
  }

  // Asynchronous method that retrieves the token
  async getAsyncToken(): Promise<string | undefined> {
    try {
      if (!this.token) {
        const user = localStorage.getItem("token");
        if (user) {
          this.token = user;
        }
      }
      return this.token;
    } catch {
      this.token = this.token; // If needed, you can add a fallback here
      // You can also handle an error case here, like return this.signOut();
    }
  }
  async setToken(token:string){
    if(token){
      this.token = token
    }
  } 
  // Checks if the user is authenticated based on the token
  isAuthenticated(): boolean {
    this.token = localStorage.getItem("token") || "";
    return this.token !== "";
  }

  // Removes the token and other credentials from local storage
  removeStorage(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }

  // Clears the token in memory
  clearToken(): void {
    this.token = "";
  }
}

// Creating an instance of the Auth class and exporting it
const AuthInstance = new Auth();
export default AuthInstance;
