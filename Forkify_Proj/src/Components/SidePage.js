import { Link, useNavigate } from "react-router-dom";
import { useSearchRecipieInfo } from "../Customhooks/SearchHook";
import icons from "../img/icons.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function Search_res() {
  const AuthStatus = useSelector((state) => state.auth.isAuth);
  const query = useSelector((state) => state.recipes.search);
  const search = useSearchRecipieInfo(query);

  const [currPage, setCurrPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  useEffect(() => {
    setCurrPage(1);
  }, [query]);

  const itemsPerPage = 10;
  const indexOfLastItem = currPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  useEffect(() => {
    if (search && search.recipies) {
      setCurrentItems(search.recipies.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [search, indexOfFirstItem, indexOfLastItem]);
  return AuthStatus ? (
    <div className="search-results">
      <ul className="results">
        {/* <Link to="664c8f193e7aa067e94e8534">Recipe1</Link>
        <Link to="664c8f193e7aa067e94e8531">Recipe2</Link> */}
        {currentItems.map((recipe) => {
          // console.log(recipe.image);
          return (
            <li className="preview" key={recipe.id}>
              <Link
                className="preview__link preview__link--active"
                to={`/${recipe.id}`}
              >
                <figure className="preview__fig">
                  <img src={recipe.image_url} alt="Test" />
                </figure>
                <div className="preview__data">
                  <h4 className="preview__title">{recipe.title}</h4>
                  <p className="preview__publisher">{recipe.publisher}</p>
                  <div className="preview__user-generated">
                    <svg>
                      <use href={`${icons}#icon-user`}></use>
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="pagination">
        {currPage > 1 && (
          <button
            className="btn--inline pagination__btn--prev"
            onClick={() => setCurrPage(currPage - 1)}
          >
            <svg className="search__icon">
              <use href={icons + "#icon-arrow-left"}></use>
            </svg>
            <span>Page {currPage - 1}</span>
          </button>
        )}
        {currentItems.length === itemsPerPage && (
          <button
            className="btn--inline pagination__btn--next"
            onClick={() => setCurrPage(currPage + 1)}
          >
            <span>Next</span>
            <svg className="search__icon">
              <use href={icons + "#icon-arrow-right"}></use>
            </svg>
          </button>
        )}
      </div>
    </div>
  ) : (
    <div>
      <h1>Please Login to view search results</h1>
    </div>
  );
}
