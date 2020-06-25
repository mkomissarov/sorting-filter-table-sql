const express = require('express');
const app = express();
const mysql = require('mysql2');
const env = require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) {
    return console.error('Ошибка: ' + err.message);
  } else {
    console.log('Подключение к серверу MySQL успешно установлено');
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/createtable', (req, res) => {
  /*   const sql = `CREATE TABLE if not exists cars (
    date varchar(255) not null,
    name varchar(255) not null,
    counter int not null,
    track varchar(255) not null
  )`;

  connection.query(sql, function (err, results) {
    if (err) console.log(err);
    else console.log('Таблица создана');
  });

  const cars = [
    [Date.now(), 'Gazelle', 123, '5km'],
    [Date.now(), 'Lada', 70, '15km'],
    [Date.now(), 'Toyota', 15, '65km'],
  ];
  const insert = `INSERT INTO cars(date, name, counter, track) VALUES ?`;

  connection.query(insert, [cars], function (err, results) {
    if (err) console.log(err);
    console.log(results);
  });
  connection.end(); */
  res.send('База данных успешно заполнена');
});

app.get('/getdata', async (req, res) => {
  await connection.query('SELECT * FROM cars', function (err, results, fields) {
    console.log(results); // собственно данные
    res.json(results);
  });
  connection.end();
});

app.listen(4000, () => {
  console.log('Starting Port 4000');
});
