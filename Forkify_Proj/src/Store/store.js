import { configureStore } from "@reduxjs/toolkit";
import RecipieReducer from "../Features/RecipieSlice";
import AuthReducer from "../Features/AuthSlice";
export const store = configureStore({
  reducer: {
    recipes: RecipieReducer,
    auth: AuthReducer,
  },
});
