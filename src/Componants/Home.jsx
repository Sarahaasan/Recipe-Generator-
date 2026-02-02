import Header from "./Header";
import "../App.css";
import { useState , useRef , useEffect } from "react";
import Ingrediants from "./Ingrediants.jsx";
import RecipeResult from "./RecipeResult.jsx";

const Home = () => {
  const [ingrediants, setIngrediants] = useState([]);
  //for  warning for empty input
  const [empty, setEmpty] = useState(false);
  // wether we got the recipe from api or not
  const [recipeshown, setRecipeshown] = useState(false);
  const [Recipe, setRecipe] = useState("");
  // redrict to recipe result 
  const RecipeRef = useRef(null);


  // prev handle submit
  // const prevHandlesubmit = (e) => {
  //     e.preventDefault();
  //     // form data
  //     const formData = new FormData(e.currentTarget)
  //     const item = formData.get("ingrediant")
  //     setIngrediants([...ingrediants, item])
  //     console.log(item)
  //     e.currentTarget.reset();
  //   }

  // new uncontrolled handle submit react 19
  const handlesubmit = (formData) => {
    const item = formData.get("ingrediant");
    if (item.trim() === "") {
      setEmpty(true);
      return;
    }
    setEmpty(false);
    setIngrediants([...ingrediants, item]);
    
  };

  // handle recipe
  const handlerecipe = async () => {
    setRecipeshown(true);
    setRecipe("");
 
    try {
      setRecipe("Generating recipe...");
      const result = await getRecipeFromMistral(ingrediants);
 
      setRecipe(result);
    } catch {
      setRecipe("Something went wrong refresh the page and try again");
    }
  };

  // delting item from ingqrediants array
 const deleteItem = (index) => {
 setIngrediants([...ingrediants.slice(0, index), ...ingrediants.slice(index + 1)]);
 if (ingrediants.length - 1 < 3) {
      setRecipeshown(false);
    }
  
  };

  // scroll to recipe result when recipe is updated
  useEffect( () => 
  {
    if (RecipeRef.current && Recipe) {
      // RecipeRef.current.scrollIntoView({ behavior: 'smooth' });
      // another approach because scrollIntoView smooth behavior may have some issues in some browsers
   const y =
      RecipeRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      20;

    window.scrollTo({ top: y, behavior: "smooth" });
    }

  }, [ Recipe]);


  return (
    <>
      <Header />

      {/* form */}
      <form
        action={handlesubmit}
        // onSubmit={handlesubmit}
        className="flex justify-center items-center flex-col md:flex-row gap-10 mt-[3rem] "
      >
        <input
          aria-label="Add ingrediants"
          placeholder="e.g. Lemonada "
          name="ingrediant"
          className="border  p-2 w-[22em] rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
         autocomplete="off"
        />

        <button className="bg-black text-white w-[12rem] rounded h-[3rem] transform active:scale-95 transition-transform duration-150:">
          + Add ingrediant
        </button>
      </form>

      {/*  warning for empty input */}
      {empty && (
        <p className="text-red-500 text-center mt-4 bold">
          Please enter a valid ingrediant.
        </p>
      )}

      {/* main */}
      {/* pass array of ingrediants + handle recipe function  */}
      <Ingrediants ingrediants={ingrediants} handlerecipe={handlerecipe}  deleteItem={deleteItem} RecipeRef={RecipeRef} />
       
       {
        ingrediants.length ==2 && (
          <p className="text-gray-500 text-center mt-4 bold">
          Please add at least 3 ingrediants to generate a recipe.
        </p>
        )
       }
      {/* recipe result */}
      {recipeshown && <RecipeResult Recipe={Recipe} />}
    </>
  );
};

export default Home;
