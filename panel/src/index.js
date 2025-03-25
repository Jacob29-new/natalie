import { Database } from "bun:sqlite";
import express from 'express';
import cors from 'cors';
import path from 'path';

const db = new Database("./test.db");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'vite-project/dist')));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'vite-project/dist', 'index.html'));
});

console.log("third change confirmed")

console.log("second change confirmed")
app.get("/api/data", (req, res) => {
  res.json({ message: "Here is your data!" });
});
console.log("this is the synced server")

let visitorCount = 0
let DailyVisitorCount = 0;
let MonthlyVisitorCount = 0;
let YearlyVisitorCount = 0; 

try {
    db.run(`
        CREATE TABLE IF NOT EXISTS years (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER NOT NULL
        );
    `);
    console.log("Table created or already exists");
} catch (error) {
    console.error("Error creating table:", error);
}

function resetDailyVisitorCount() {
    DailyVisitorCount = 0;
    console.log("Daily count reset (it's Monday)");
}

function resetMonthlyVisitorCount() {
    MonthlyVisitorCount = 0;
    console.log("Monthly count reset (it's the 1st of the month)");
}

function resetYearlyVisitorCount() {
    YearlyVisitorCount = 0;
    console.log("Yearly count reset (it's January 1st)");
}


const interval = 10 * 1000; 

setInterval(() => {
    const now = new Date();

    if (now.getHours() === 0 && now.getMinutes() === 0) {
        
        resetDailyVisitorCount();
      
        if (now.getDate() === 1) {
            resetMonthlyVisitorCount();
        }
      
        if (now.getMonth() === 0 && now.getDate() === 1) {
            resetYearlyVisitorCount();
        }
    }
}, interval);

function createTable() {
    db.run(` CREATE TABLE IF NOT EXISTS concerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        program TEXT,
        year INTEGER
    )`)
}

app.post('/create', (req, resp) => {

   createTable()

   
   const {name, date, location, program, year} = req.body

   const insertQuery = db.query(`INSERT INTO concerts (name, date, location, program, year) VALUES ('${name}', '${date}', '${location}', '${program}', ${Number(year)});`);
   insertQuery.run();


   const query = db.query('SELECT * FROM concerts');
   const concerts = query.all();  
   console.log(concerts);

   console.log("Received data:", req.body); 
   resp.json({ message: 'Hello World!' }); 
})

app.post('/delete', (req, resp) => {
    const { name } = req.body;
    
    const deleteQuery = db.prepare('DELETE FROM concerts WHERE name = ?');
    
    deleteQuery.run(name);
    
    resp.json({ message: 'Concert removed successfully' });
});



app.post('/increment', (req, resp) => {
    visitorCount++
    DailyVisitorCount++
    MonthlyVisitorCount++
    YearlyVisitorCount++ 
    resp.json({ message: 'Visit recorded' });
});



app.post('/addyear', (req, resp) => {

    const { year } = req.body;

    db.run(`INSERT INTO years (year) VALUES (?)`, [year])

    resp.json({ message: 'Year added successfully', year });

    console.log("im inside /addyear")
    
});

app.get('/visit', (req, res) => {
    res.json({ visitCount: visitorCount , dailyVisitCount: DailyVisitorCount, monthlyVisitCount: MonthlyVisitorCount, yearlyVisitCount: YearlyVisitorCount });
});

app.get('/getyear', (req, res) => {

    const query = db.query('SELECT year FROM years');
    const years = query.all();  
    res.json({ years: years });
    console.log("im inside /getyear")
});

app.post('/removeyear', (req, res) => {
    const { year } = req.body;  
    db.run('DELETE FROM years WHERE year = ?', [year]);
    res.json({ message: 'Year removed successfully' });
});

app.post('/load', (req, resp) => {

    const { year } = req.body;

    const query = db.query(`SELECT * FROM concerts WHERE year = ${Number(year)}`);
    const concerts = query.all();

    resp.json({ data: concerts });
});


app.get('/loadall', (req, resp) => {

    const query = db.query(`SELECT * FROM concerts`);
    const concerts = query.all();

    resp.json({ data: concerts });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

