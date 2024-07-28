const conf = {
  appwrite_url: String(process.env.REACT_APP_APPWRITE_URL),
  appwrite_project_id: String(process.env.REACT_APP_PROJECT_ID),
  appwrite_database_id: String(process.env.REACT_APP_DATABASE_ID),
  appwrite_collection_id: String(process.env.REACT_APP_COLLECTION_ID),
  appwrite_bucket_id: String(process.env.REACT_APP_BUCKET_ID),
};
export default conf;
