import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function useRecipieInfo() {
  const { id } = useParams();
  const [reqrecipe, setRecipe] = useState({});
  async function fetchRecipie() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      let { recipe } = data.data;
      recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
      setRecipe(recipe);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchRecipie();
  }, [id]);
  console.log(reqrecipe.ingredients);
  return reqrecipe;
}
