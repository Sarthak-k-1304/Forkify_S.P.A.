import { useRecipieInfo } from "../Customhooks/hook";
import React from "react";
import icons from "../img/icons.svg"; // Adjust the path according to your project structure
import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook } from "../Features/RecipieSlice";
import Dbservice from "../Appwrite/DB";
import authservice from "../Appwrite/Auth";
export function MainContent() {
  const recipie = useRecipieInfo();
  const [bookmarkedRecipes, setBookmarkedRecipes] = React.useState({});

  const isP = async () => {
    try {
      const user = await authservice.getCurrentUser();
      if (user) {
        const check = await Dbservice.isPresent(user.$id, recipie.id);
        if (check) {
          setBookmarkedRecipes({
            ...bookmarkedRecipes,
            [recipie.id]: true,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  isP();

  const dispatch = useDispatch();
  const isBookmarked = !!bookmarkedRecipes[recipie.id];
  const Db = async () => {
    try {
      const user = await authservice.getCurrentUser();

      if (user) {
        Dbservice.createBookmark({
          user_id: user.$id,
          id: recipie.id,
          publisher: recipie.publisher,
          img: recipie.image,
          title: recipie.title,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBookmark = () => {
    setBookmarkedRecipes({
      ...bookmarkedRecipes,
      [recipie.id]: !isBookmarked,
    });
    if (!isBookmarked) {
      dispatch(
        addBook({
          id: recipie.id,
          title: recipie.title,
          img: recipie.image,
          publisher: recipie.publisher,
        })
      );
      Db();
    } else {
      dispatch(deleteBook(recipie.id));
      Dbservice.deleteBookmark(recipie.id);
    }
  };

  let path = isBookmarked ? "#icon-bookmark-fill" : "#icon-bookmark";
  console.log(isBookmarked);
  return (
    <div className="recipe">
      {/* <div className="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div> */}

      {/* <!-- <div className="spinner">
          <svg>
            <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div> --> */}

      {/* <!-- <div className="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>No recipes found for your query. Please try again!</p>
          </div> --> */}

      <figure className="recipe__fig">
        <img src={recipie.image} alt={recipie.title} className="recipe__img" />
        <h1 className="recipe__title">
          <span>{recipie.title}</span>
        </h1>
      </figure>

      <div className="recipe__details">
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${icons}#icon-clock`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--minutes">
            {recipie.cookingTime}
          </span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <svg className="recipe__info-icon">
            <use href={`${icons}#icon-users`}></use>
          </svg>
          <span className="recipe__info-data recipe__info-data--people">
            {recipie.servings}
          </span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button className="btn--tiny btn--increase-servings">
              <svg>
                <use href={`${icons}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div className="recipe__user-generated">
          <svg>
            <use href={`${icons}#icon-user`}></use>
          </svg>
        </div>
        <button className="btn--round" onClick={toggleBookmark}>
          <svg className="">
            <use href={`${icons}${path}`}></use>
          </svg>
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {recipie &&
            recipie.ingredients &&
            recipie.ingredients.map((ing, ind) => {
              return (
                <li key={ind} className="recipe__ingredient">
                  <svg className="recipe__icon">
                    <use href={`${icons}#icon-check`}></use>
                  </svg>
                  <div className="recipe__quantity">{ing.quantity}</div>
                  <div className="recipe__description">
                    <span className="recipe__unit">{ing.unit}</span>
                    {ing.description}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="recipe__directions">
        <h2 className="heading--2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__publisher">{recipie.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          className="btn--small recipe__btn"
          href={recipie.sourceUrl}
          target="_blank"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href={`${icons}#icon-arrow-right`}></use>
          </svg>
        </a>
      </div>
    </div>
  );
}
