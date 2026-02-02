import Markdown from "react-markdown";
const RecipeResult = ({ Recipe }) => {
  return (
    <>
    <section className="mt-10 w-[100%] md:w-[70%] mx-auto bg-gray-50 p-8 rounded-lg shadow-lg suggested-recipe-container mb-12" aria-live="polite">
      {<Markdown>{Recipe}</Markdown>}
    </section>
    <button 
    onClick={()=> window.location.reload()}
    className="get-recipe  transform active:scale-95 transition-transform duration-150 ml-[50%] mb-10  " aria-label="close">restart</button>
    </>
  );
};

export default RecipeResult;
