import headerimg from "../assets/chef-claude-icon.png"
import "../App.css"
import { FaBars } from "react-icons/fa";

import { useState } from "react"

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const [back , setback] = useState("black")
  const [instructions, setInstructions] = useState(false)
  return (
    <div>
         {/* header  */}
            <header className="flex justify-center items-center gap-3  bg-white" > 
       <img src={headerimg} alt="logo" />
       <h1 className="text-5xl bold ">Chef 4U </h1>
            </header>
           

            {/* toggle  hey/bye*/}
            <button className="toggle rounded-full  text-white w-12 h-12 flex justify-center items-center"
            style={{backgroundColor: back}}
            aria-label="welcome"
            onClick={()=> 
            {
              setToggle(prev => !prev)
              setback(toggle ? "black" : "orange" )
            }
            }
            >{toggle ? 'hey' : "bye"}
            </button>
            {/* for instructions  */}
            <button 
            className="toggle-button rounded-full   w-12 h-12 flex justify-center items-center border-2 border-black m-2" 
            aria-label="instructions for how to use the website"
            onClick={()=> setInstructions(prev => !prev)}
            > 
            <FaBars size={24} />
            </button>
           
        {
          instructions && (
             <div className=" instructions ">
              <button className="absolute top-4 right-4 text-red-500" onClick={()=> setInstructions(false)}>X</button>
          <h2 className="text-2xl font-semibold mb-4 text-center text-orange-500">How to Use the Recipe Generator</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Add ingredients you have into the input field. You must add at least <strong>3 ingredients</strong> to generate a recipe.</li>
            <li>You can <strong>add more ingredients</strong> or <strong>delete existing ones</strong> anytime before generating.</li>
            <li>Click the <strong>“Get Recipe”</strong> button to generate a recipe based on your selected ingredients.</li>
            <li>Once the recipe is generated, it will appear below the button. You can <strong>regenerate another recipe</strong> as many times as you like.</li>
           
            <li>If you want to start fresh, click the <strong>“Restart”</strong> button to clear your ingredients and start over.</li>
          </ol>
        </div>
          )
          
        }
           
    </div>
  )
}

export default Header
