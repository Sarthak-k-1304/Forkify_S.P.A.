import { useState, useEffect } from 'react';

export function useSearchRecipieInfo(query) {
  const [search, setsearch] = useState({});
  async function fetchRecipie() {
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      let rec = data.data;
      rec = {
        recipies: rec.recipes,
      };
      setsearch(rec);
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchRecipie();
  }, [query]);
  console.log(search);
  return search;
}
