const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("server is up and running")
});

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    type: 'mysql',
    user: 'root',
    password: 'W@2915djkq#',
    database: 'world'
})

app.get('/data', (req, res) => {

    const sort = req.query.sort;
    const order = req.query.order;
    const pageNumber = req.query.page;
    let query;
    let limit = 10;
    let offset = (limit * pageNumber) - limit;
    if (sort) {
        query = `SELECT Name, Continent, Region, LifeExpectancy FROM country ORDER BY ${sort} ${order} LIMIT ${limit} OFFSET ${offset}`;
    }
    else {
        query = `SELECT Name, Continent, Region, LifeExpectancy FROM country LIMIT ${limit} OFFSET ${offset}`;
    }
    pool.query(query, (error, results) => {
        if (error) {
            res.send(error)
        } else {
            res.json(results);
        }
    });
});

app.listen(port, () => console.log(`server is running at port ${port}`))