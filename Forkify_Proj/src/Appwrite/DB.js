import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";

export class DBService {
  client = new Client();
  account;
  db;
  constructor() {
    this.client
      .setEndpoint(conf.appwrite_url)
      .setProject(conf.appwrite_project_id);
    this.db = new Databases(this.client);
  }
  async createBookmark({ user_id, id, publisher, img, title }) {
    try {
      return await this.db.createDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        id,
        {
          user_id,
          id,
          publisher,
          img,
          title,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async getBookmarksByUserId(user_id) {
    try {
      const result = await this.db.listDocuments(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        [Query.equal("user_id", user_id)]
      );
      return result.documents; // This will be an array of bookmarks for the user
    } catch (error) {
      throw error;
    }
  }
  async deleteBookmark(id) {
    try {
      await this.db.deleteDocument(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        id
      );
    } catch (error) {
      throw error;
    }
  }
  async isPresent(user_id, recipe_id) {
    try {
      const result = await this.db.listDocuments(
        conf.appwrite_database_id,
        conf.appwrite_collection_id,
        [
          Query.equal("user_id", user_id),
          Query.equal("recipe_id", recipe_id), // Assuming the field for recipe ID in your document is named "recipe_id"
        ]
      );
      return result.documents.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

const Dbservice = new DBService();
export default Dbservice;
