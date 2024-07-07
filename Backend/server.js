import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import tedious from "tedious";
import { Request, TYPES } from "tedious";

var Connection = tedious.Connection;

dotenv.config({ path: '../.env' });


var config = {  
    server: 'shamiri.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.AzureDB_USER,
            password: process.env.AzureDB_PASSWORD 
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.AzureDB_NAME 
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    if (err) {
        console.error("Error connecting: ", err);
    } else {
        console.log("Connected to Azure SQL Database!");  
    } 
});

connection.connect();

const app = express();

app.use(cors({ origin: ['*'] }));

//Allows client to send json data
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get("/journals", (req, res) => {
    const query = "SELECT * FROM journals";
    const request = new Request(query, (err, rowCount, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    });

    let result = [];
    request.on('row', function(columns) {
        let row = {};
        columns.forEach(function(column) {
            row[column.metadata.colName] = column.value;
        });
        result.push(row);
    });

    request.on('requestCompleted', function() {
        res.json(result);
    });

    connection.execSql(request);
});

app.post("/journals", (req, res) => {
    const query = "INSERT INTO journals (title, content, category, date) OUTPUT INSERTED.id VALUES (@title, @content, @category, @date);";
    const request = new Request(query, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    });

    request.addParameter('title', TYPES.NVarChar, req.body.title);
    request.addParameter('content', TYPES.NVarChar, req.body.content);
    request.addParameter('category', TYPES.NVarChar, req.body.category);
    request.addParameter('date', TYPES.DateTime, new Date(req.body.date));

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("Inserted journal id is " + column.value);
        });
    });

    request.on('requestCompleted', function() {
        res.json("Journal successfully added.");
    });

    connection.execSql(request);
});

app.put("/journals/:id", (req, res) => {
    const query = "UPDATE journals SET title = @title, content = @content, category = @category, date = @date WHERE id = @id;";
    const request = new Request(query, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    });

    request.addParameter('id', TYPES.Int, req.params.id);
    request.addParameter('title', TYPES.NVarChar, req.body.title);
    request.addParameter('content', TYPES.NVarChar, req.body.content);
    request.addParameter('category', TYPES.NVarChar, req.body.category);
    request.addParameter('date', TYPES.DateTime, new Date(req.body.date));

    request.on('requestCompleted', function() {
        res.json("Journal successfully updated.");
    });

    connection.execSql(request);
});

app.delete("/journals/:id", (req, res) => {
    const query = "DELETE FROM journals WHERE id = @id;";
    const request = new Request(query, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    });

    request.addParameter('id', TYPES.Int, req.params.id);

    request.on('requestCompleted', function() {
        res.json("Journal successfully deleted.");
    });

    connection.execSql(request);
});


app.listen(8090, () => {

    console.log("Connected to the Backend!");
    
});