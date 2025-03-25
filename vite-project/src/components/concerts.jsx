import piano from "./images/piano.webp"
import check from "./images/check.gif"
import { useState } from "react";
import { useEffect } from "react";



function Concerts() {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [program, setProgram] = useState("")
    const [year, setYear] = useState("")
    const data = { name, date ,location, program, year}
    const [deleteName, setDeleteName] = useState("")
    const [concertData, setConcertData] = useState([]);
    const [show, changeShow] = useState(false)
    const [showDelete, changeShowDelete] = useState(false)
    const [input, setInput] = useState("");
    const [isGif, setIsGif] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    function renderItems(value) {

        if(value !== "" ) {
            const newData = concertData.filter(item => item.year.toString().includes(value));
            return newData.map((concert, index) => (
                <div key={index} className="h-45 border-2 border-black flex items-center flex-col text-center">
                    <h1 className="text-xl mt-1">{concert.year === 2000 ? "Upcoming" : concert.year}</h1>
                    <div>{concert.name}</div>
                    <div>{concert.date}</div>
                    <div>{concert.location}</div>
                    <div>{concert.program}</div>
                    <div className="w-1/2 font-bold mt-auto mb-2 flex justify-center">
                        <button className="text-red-600 cursor-pointer" onClick={() => prepDeleteConcert(concert.name)}>remove</button>
                    </div>
                </div>
            ));
        }
        else {
            return concertData.map((concert, index) => (
                <div key={index} className="h-45 border-2 border-black flex items-center flex-col text-center">
                    <h1 className="text-xl mt-1">{concert.year === 2000 ? "Upcoming" : concert.year}</h1>
                    <div>{concert.name}</div>
                    <div>{concert.date}</div>
                    <div>{concert.location}</div>
                    <div>{concert.program}</div>
                    <div className="w-1/2 font-bold mt-auto mb-2 flex justify-center">
                        <button className="text-red-600 cursor-pointer" onClick={() => prepDeleteConcert(concert.name)}>remove</button>
                    </div>
                </div>
            ));
        }   
    }

    function prepDeleteConcert(name) {
        changeShowDelete(true)
        setDeleteName(name)
    }

    function fetchItems() {
    
        fetch("http://95.111.232.71:3000/loadall", {
            method: "GET",
            headers: { "Content-Type":"application/json" },
        }).then(data => data.json())
           .then(resp => {
                console.log(resp.data)
                setConcertData(resp.data)
                renderItems()
        })
    }

    function createConcert() {

        changeShow(false)

        fetch("http://95.111.232.71:3000/create", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(data),
        }).then(data => data.json())
        .then(resp => {
                console.log(resp.message) 
                setTimeout(() => {
                    setIsGif(true)
                }, 1000);
                setTimeout(() => {
                    setIsGif(false)
                }, 2000);
                fetchItems()
            })
    }

    function deleteConcert(name) {

        changeShowDelete(false)

        fetch("http://95.111.232.71:3000/delete", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({ name }),
        }).then(data => data.json())
        .then(resp => {
                console.log(resp.message) 
                fetchItems()
            })
    }

    return (
        <div className="w-full h-full flex justify-center">
            
                <div className="w-11/12 mt-16 flex flex-col">
                    <div className="flex p-3 w-full">
                        <div className="flex flex-row font-bold justify-between sm:w-full xl:w-3/10 items-center">
                            <div>Find concert by year: </div>
                            <input type="text" className="border border-black p-1" value={input} onChange={(e) => {setInput(e.target.value);  renderItems(e.target.value); }} />
                        </div>
                    </div>

                    <div className="w-full grid xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 p-4 border-t border-black">
                        <div className="h-45 border-2 border-dashed flex items-center flex-col justify-center">
                                    <img src={!isGif ? piano : check} alt="Piano" className="h-27 w-27 mt-1" />
                                    <div className="font-bold  cursor-pointer border-black p-1 hover:bg-gray-100" onClick={() => changeShow(true)}>{!isGif ? "Add concert" : "" }</div>
                        </div>
                        {renderItems(input)}
                
                    </div>
                       
                </div>

            {show && (
            <div className="w-full h-full bg-black/60 fixed flex items-center justify-center">
                <div className="h-3/5 w-5/6 xl:w-1/2 bg-white border-3 border-black flex items-center flex-col">
                        <input type="text" placeholder="Concert name" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="Concert date" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={date} onChange={(e) => setDate(e.target.value)}/>
                        <input type="text" placeholder="Concert location" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <input type="text" placeholder="Concert program" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={program} onChange={(e) => setProgram(e.target.value)}/>
                        <input type="text" placeholder="Concert year (2000 if upcoming concert)" className="w-3/5 h-[5vh] border border-black m-4 p-2" value={year} onChange={(e) => setYear(e.target.value)}/>
                        <div className="w-3/5 h-[5vh] flex justify-between flex-row m-3">
                                <button className="w-5/12 h-full border border-black bg-green-600 font-bold cursor-pointer" onClick={() => createConcert()}>Create</button>
                                <button className="w-5/12 h-full border border-black bg-red-600 font-bold cursor-pointer" onClick={() => changeShow(false)}>Cancel</button>
                        </div>
                </div>
            </div>
            )}
            {showDelete && (
            <div className="w-full h-full bg-black/60 fixed flex items-center justify-center">
                <div className="h-1/5 w-5/6 xl:w-1/2 bg-white border-2 border-red-800 flex items-center flex-col text-center">
                       <div className="text-2xl mt-1">Are you sure you want to delete this concert?</div>
                       <div className="w-3/5 h-2/7 mt-3 flex-row">
                            <button className="h-full w-2/5 text-2xl text-green-500 cursor-pointer" onClick={() => deleteConcert(deleteName)}>Yes</button>
                            <button className="h-full w-2/5 text-2xl text-red-500 cursor-pointer" onClick={() => changeShowDelete(false)}>No</button>
                       </div>
                </div>
            </div>
            )}

      </div>
    )
}

export default Concerts;