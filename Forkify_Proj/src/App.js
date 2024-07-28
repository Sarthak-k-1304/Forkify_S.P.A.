import { Header } from "./Components/Header";
import { Search_res } from "./Components/SidePage";
import { MainContent } from "./Components/MainContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDispatch } from "react-redux";
import authservice from "./Appwrite/Auth";
import { useEffect, useState } from "react";
import { login, logout } from "./Features/AuthSlice";
import { Login_page } from "./Components/LoginPage";
import { Register_page } from "./Components/RegisterPage";
// function CombinedContent() {
//   return (
//     <>
//       <Search_res />
//       <MainContent />
//     </>
//   );
// }
export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return !isLoading ? (
    <div className="container">
      <Router>
        <Header />
        <Search_res />
        <Routes>
          <Route path=":id" element={<MainContent />} />
          <Route path="/signup" element={<Register_page />} />
          <Route path="/login" element={<Login_page />} />
        </Routes>
      </Router>
    </div>
  ) : null;
}
