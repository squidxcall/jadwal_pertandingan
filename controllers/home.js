import db from '../config/db.js';

export const getComps = (req, res) => {
    let sql1 = `SELECT * FROM tournament;`;
    let sql2 = `SELECT * FROM mode;`;
    let full = sql1 + sql2;
    let query = db.query(full, (err, results) => {
        if (err) throw err;
        res.render('home', {
            tournament: results[0],
            mode: results[1]
        })
    })
};

export const createComps = (req, res) => {
    let data = { name: req.body.name, team: req.body.team, modeID: req.body.mode };
    let sql = `INSERT INTO tournament SET ?`;
    let query = db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/home')
    })
};

export const updateComps = (req, res) => {
    let data = { name: req.body.name, team: req.body.team, modeID: req.body.mode };
    let sql = `UPDATE tournament SET ? WHERE id = '${req.body.id}'`;
    let query = db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect(`/tournament/${req.body.id}`)
    })
};

export const deleteComps = (req, res) => {
    let sql = `DELETE FROM tournament where id = '${req.body.id}'`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/home')
    })
};