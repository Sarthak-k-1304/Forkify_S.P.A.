import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import icons from "../img/icons.svg";
import logo from "../img/logo.png"; // Adjust the path according to your project structur
import { useState } from "react";
import { newSearch, resetState } from "../Features/RecipieSlice";
import { Link, useNavigate } from "react-router-dom";
import { AddR } from "./AddR";
import { logout } from "../Features/AuthSlice";
import authservice from "../Appwrite/Auth";
import Dbservice from "../Appwrite/DB";

function Logout_btn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authservice
      .Logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again."); // Optionally, handle the error more gracefully
      });
  };
  return (
    <button className="nav__btn nav__btn--bookmarks" onClick={logoutHandler}>
      <span>Logout</span>
    </button>
  );
}

export function Header() {
  const AuthStatus = useSelector((state) => state.auth.isAuth);
  const [text, setText] = useState("");
  const [showAddR, setShowAddR] = useState(false);
  const [status, setStatus] = useState(AuthStatus);

  const handleAddRecipeClick = () => {
    setShowAddR(!showAddR);
  };
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.recipes.bookmarks);

  const handllesubmit = (e) => {
    j;
    e.preventDefault();
    dispatch(newSearch(text));
  };
  useEffect(() => {
    setText("");
    dispatch(resetState());
    setStatus(AuthStatus);
  }, [AuthStatus]);
  return status ? (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <form className="search" onSubmit={handllesubmit}>
        <input
          type="text"
          className="search__field"
          placeholder="Search over 1,000,000 recipes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn search__btn">
          <svg className="search__icon">
            <use href={`${icons}#icon-search`}></use>
          </svg>
          <span>Search</span>
        </button>
      </form>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <button
              className="nav__btn nav__btn--add-recipe"
              onClick={handleAddRecipeClick}
            >
              <svg className="nav__icon">
                <use href={`${icons}#icon-edit`}></use>
              </svg>
              <span>Add recipe</span>
            </button>
            {showAddR && <AddR />}
          </li>

          <li className="nav__item">
            <button className="nav__btn nav__btn--bookmarks">
              <svg className="nav__icon">
                <use href={`${icons}#icon-bookmark`}></use>
              </svg>
              <span>Bookmarks</span>
            </button>
            <div className="bookmarks">
              <ul className="bookmarks__list">
                {bookmarks.length === 0 && (
                  <div className="message">
                    <div>
                      <svg>
                        <use href={`${icons}#icon-smile`}></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
                )}
                {bookmarks.map((bookmark) => {
                  return (
                    <li key={bookmark.id} className="preview">
                      <Link to={`/${bookmark.id}`} className="preview__link">
                        <figure className="preview__fig">
                          <img src={bookmark.img} alt="Test" />
                        </figure>
                        <div className="preview__data">
                          <h4 className="preview__name">{bookmark.title}</h4>
                          <p className="preview__publisher">
                            {bookmark.publisher}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
          <li className="nav__item">
            <Logout_btn />
          </li>
          <li className="nav__item">
            {/* <div className="flex justify-center items-center h-full">
              <button class="btn search__btn">
                <svg class="search__icon" xmlns="http://www.w3.org/2000/svg">
                  <use href={`${icons}#icon-search`}></use>
                </svg>
                <span>Search</span>
              </button>
            </div> */}
          </li>
        </ul>
      </nav>
    </header>
  ) : (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/signup" className="nav__btn nav__btn--bookmarks">
              Register
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/login" className="nav__btn nav__btn--bookmarks">
              LogIn
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
