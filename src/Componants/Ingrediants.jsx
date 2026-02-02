import { AiOutlineClose } from "react-icons/ai";
const Ingrediants = ({ingrediants  , handlerecipe , deleteItem , RecipeRef}) => {

   const ingrediantsItems = ingrediants.map((ingrediant, index) => {
    return ( 
      <div className="flex justify-between align-center " key={index}> 
    <li >- {ingrediant}</li>
    <button onClick={()=> deleteItem(index)}><AiOutlineClose size={20} color="red" /> </button>
    </div>
    )
  });
  return (
  <>
  <main className="data">
        {ingrediants.length > 0 && (
          <>
            <h1 className="text-3xl md:text-5xl mb-5">Ingrediants you added! </h1>
            <ul>{ingrediantsItems}</ul>
      
          </>
        )}
            {/* ready for recipe section */}
        { ingrediants.length > 2 && (
          <>
            <section className="get-recipe flex flex-col  gap-4 mt-10 w-fit md:w-[550px] w-[100%]">
              <h3>Ready for the recipe ? </h3>
              <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4 "
              ref={RecipeRef}
              >
              <p>Generate a recipe from your list of ingrediants.. </p>
              <button className="transform active:scale-95 transition-transform duration-150;" 
              onClick={handlerecipe}
              > Get the  Recipe </button>
              </div>
               </section>
               </>
)}
      </main>
  </>
  ) 
}

export default Ingrediants
