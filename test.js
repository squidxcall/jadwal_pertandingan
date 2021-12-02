import db from './config/db.js';

let sql = `
    SELECT
        tournament.id AS tournamentID,
        tournament.name AS tournamentName,
        tournament.team AS tournamentTeam,
        mode.name AS tournamentMode
    FROM
        tournament
    INNER JOIN
        mode ON tournament.modeID = mode.id 
    WHERE tournament.id = 3;`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        var team = results[0].tournamentTeam.split(',\r\n');
        
        console.log(team.length)
    })