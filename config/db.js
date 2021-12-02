import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jadwal_pertandingan',
    multipleStatements: true
});

export default db;