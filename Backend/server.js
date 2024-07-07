import express from "express";
import mysql from "mysql2";
import cors from "cors";

require('dotenv').config();

const app = express();

var corsOptions = {
    origin: ['*']
  };

app.use(cors(corsOptions))

//Allows client to send json data
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
// If there's an authentication problem,
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourPasswordHere;'

app.get("/", (req, res) => {
     res.json("This is a response from the backend.")
})

app.get("/journals", (req, res) => {

    const q = "SELECT * FROM journals";

    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    });
});

app.post("/journals", (req, res) => {
    const q = "INSERT INTO journals (`title`,  `content`, `category`, `date`) VALUES (?)"
    const values = [
        req.body.title, 
        req.body.content, 
        req.body.category,
        req.body.date
    ]

    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            console.log(`Journal titled "${req.body.title}" successfully added!`);
            return res.json(`Journal titled "${req.body.title}" successfully added with ID ${data.insertId}!`);
        }
    })
});

app.delete("/journals/:id", (req, res) => {
    const journalId = req.params.id;
    const q = "DELETE FROM journals WHERE id = ?"

    db.query(q, [journalId], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(`Journal successfully deleted`);
        }
    })
})

app.put("/journals/:id", (req, res) => {
    const journalId = req.params.id;
    const q = "UPDATE journals SET `title` = ?, `content` = ?, `category` = ?, `date` = ? WHERE id = ?"

    const values = [
        req.body.title, 
        req.body.content, 
        req.body.category,
        req.body.date
    ]

    db.query(q, [...values, journalId], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(`Journal titled "${req.body.title}" successfully UPDATED with ID ${data.insertId}!`);
        }
    })
})

app.listen(8090, () => {
    console.log("Connected to the Backend!");
    
});