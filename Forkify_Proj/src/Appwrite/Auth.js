import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;
  // i want client to form when someone calls the object;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id);
    this.account = new Account(this.client);
  }

  async Register({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) return this.Login({ email, password });
      else return user;
    } catch (error) {
      throw error;
    }
  }
  async Login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      // Check if user is logged in before fetching data

      const user_curr = await this.account.get();
      if (user_curr) return user_curr;
      else return null;
    } catch (error) {
      throw error;
    }
  }
  async Logout() {
    try {
      return await this.account.deleteSessions("current");
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();
export default authservice;
