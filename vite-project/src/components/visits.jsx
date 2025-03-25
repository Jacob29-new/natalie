import crowd from "./images/year.svg"
import day from "./images/day.svg"
import moon from "./images/moon.svg"
import year from "./images/year.svg"
import { useState } from "react";
import { useEffect } from "react";

function Visits() {

    const [visitCountAllTime, setVisitCountAllTime] = useState(0);
    const [visitCountDay, setVisitCountDay] = useState(0);
    const [visitCountMonth, setVisitCountMonth] = useState(0);
    const [visitCountYear, setVisitCountYear] = useState(0);

    useEffect(() => {

        fetch('http://localhost:3000/visit')
            .then((response) => response.json())
            .then((data) => {
                setVisitCountAllTime(data.visitCount)
                setVisitCountDay(data.dailyVisitCount)
                setVisitCountMonth(data.monthlyVisitCount)
                setVisitCountYear(data.yearlyVisitCount)
            });
    }, []);
    
    return (
          <div className="w-full h-full flex justify-center">
                    
                        <div className="w-11/12 mt-16">
        
                            <div className="w-full grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 p-4 border-t border-black">
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center">  
                                       
                                       <div className="text-xl">Visits today</div>
                                       <div className="justify-center flex w-9/10">
                                            <img src={day} alt=""  className="h-14 w-14"/>
                                       </div>
                                       <div className="text-4xl">{visitCountDay}</div>
                                </div>
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center">  
                                       
                                       <div className="text-xl">Visits this month</div>
                                       <div className="justify-center flex w-9/10">
                                            <img src={moon} alt=""  className="h-14 w-14"/>
                                       </div>
                                       <div className="text-4xl">{visitCountMonth}</div>
                                </div>
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center">  
                                       
                                       <div className="text-xl">Visits this Year</div>
                                       <div className="justify-center flex w-9/10">
                                            <img src={year} alt=""  className="h-14 w-14"/>
                                       </div>
                                       <div className="text-4xl">{visitCountYear}</div>
                                </div>
                                <div className="h-45 border-2 border-black flex items-center flex-col justify-center">  
                                       
                                       <div className="text-xl">Visits - all time</div>
                                       <div className="justify-center flex w-9/10">
                                            <img src={crowd} alt=""  className="h-14 w-14"/>
                                       </div>
                                       <div className="text-4xl">{visitCountAllTime}</div>
                                </div>
                            </div>  

                        </div>
        
            </div>
    );
}

export default Visits;