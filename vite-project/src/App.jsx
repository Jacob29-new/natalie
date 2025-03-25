import { useState } from 'react';
import './App.css'
import Concerts from "./components/concerts.jsx"
import Settings from "./components/settings.jsx"
import Visits from "./components/visits.jsx"

function App() {
  
 
    const [currentRoute, setCurrentRoute] = useState("concerts")


  return (
        <div className="h-screen w-screen flex flex-col">

            <div className="w-full h-16 border border-black flex items-center justify-center bg-gray-800 sticky top-0"> 
                <div className="w-full xl:w-[30%] sm:w-full flex flex-row xl:text-xl justify-between items-center p-4 font-bold cursor-pointer text-white font-mono"> 
                    <div className={`hover:underline ${currentRoute === "concerts" ? "underline" : ""}`} onClick={() => setCurrentRoute("concerts")}>Concerts</div> 
                    <div>|</div> 
                    <div className={`hover:underline ${currentRoute === "visits" ? "underline" : ""}`} onClick={() => setCurrentRoute("visits")}>Visits</div> 
                    <div>|</div> 
                    <div className={`hover:underline ${currentRoute === "settings" ? "underline" : ""}`} onClick={() => setCurrentRoute("settings")}>Settings</div> 
                </div> 
            </div> 
            
            <div className="flex-1 overflow-auto">
                {currentRoute === "settings" && <Settings />} 
                {currentRoute === "concerts" && <Concerts />} 
                {currentRoute === "visits" && <Visits />} 
            </div>
        </div>


  )
}

export default App
