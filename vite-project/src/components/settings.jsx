import { useState } from "react";
import { useEffect } from "react";
import yearImage from "./images/year.svg"

function Settings() {

    const [show, changeShow2] = useState(false)
    const [year, setYear] = useState("")
    const [years, setYears] = useState([]);

    useEffect(() => {
        getYears();  
      }, []); 

    function createYear2(date) {
        changeShow2(false)

        const stringedDate = date.toString()
        const data = { year: stringedDate }

        fetch("http://localhost:3000/addyear", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(data),
        }).then(data => data.json())
           .then(resp => {
            getYears(); 
        })
    }

    function getYears() {
        fetch("http://localhost:3000/getyear", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((data) => data.json())  
          .then((resp) => {

            const yearArray = resp.years.map(yearObj => yearObj.year);  
            setYears(yearArray);  
          })
          .catch((error) => {
            console.error("Error fetching years:", error);
          });
    }

    function removeYear(year) {

        const data = {year: year}

        fetch("http://localhost:3000/removeyear", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(data),
        }).then(data => data.json())
           .then(resp => {
            getYears() 
        })
    }

    
    return (
          <div className="w-full h-full flex justify-center">
                    
                        <div className="w-11/12 mt-16">
        
                            <div className="w-full grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 p-4 border-t border-black">
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center"> 
                                   <img src={yearImage} className="h-27 w-27 mt-1" />
                                    <div className="font-bold  cursor-pointer border-black p-1 hover:bg-gray-100" onClick={() => changeShow2(true)}>Add a new year</div>
                                </div>
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center"> 
                                    <div className="text-3xl mt-2 mb-5">Years</div>
                                    <div className="flex flex-row grid grid-cols-5 years-container">
                                        {years.map((year, index) => (
                                            <div
                                            key={index} className="m-2 hover:line-through cursor-pointer" onClick={() => removeYear(year)}>{year}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>  

                         

                        </div>
                        {show && (
                            <div className="w-full h-full bg-black/60 fixed flex items-center justify-center">
                                <div className="h-3/5 w-5/6 xl:w-1/2 bg-white border-3 border-black flex items-center flex-col">
                                        <input type="text" placeholder="year" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={year} onChange={(e) => setYear(e.target.value)}/>
                                        <div className="w-3/5 h-[5vh] flex justify-between flex-row m-3">
                                                <button className="w-5/12 h-full border border-black bg-green-600 font-bold cursor-pointer" onClick={() => createYear2(year)}>Add</button>
                                                <button className="w-5/12 h-full border border-black bg-red-600 font-bold cursor-pointer" onClick={() => changeShow2(false)}>Cancel</button>
                                        </div>
                                </div>
                            </div>
                            
                        )}
            </div>
    );
}

export default Settings;