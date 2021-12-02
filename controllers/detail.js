import db from '../config/db.js';

export const getDetailCompe = (req, res) => {
    let sql1 = `
    SELECT
        tournament.id AS tournamentID,
        tournament.name AS tournamentName,
        tournament.team AS tournamentTeam,
        mode.name AS tournamentMode
    FROM
        tournament
    INNER JOIN
        mode ON tournament.modeID = mode.id 
    WHERE tournament.id = '${req.params.id}';`;
    let sql2 = `SELECT * FROM mode;`;
    let full = sql1 + sql2;
    let query = db.query(full, (err, results) => {
        if (err) throw err;
        var team = results[0][0].tournamentTeam.split(',\r\n');
        var match = [];
        var sortTeam = team.sort();
        if (results[0][0].tournamentMode == 'Full Competition') {
            for (let i = 0; i < sortTeam.length; i++) {
                for (let j = 0; j < sortTeam.length; j++) {
                    if (sortTeam[i] !== sortTeam[j]) {
                        match.push({
                            left: sortTeam[i],
                            right: sortTeam[j]
                        })
                    }
                }
            }
        } else if (results[0][0].tournamentMode == 'Half Competition') {
            for (let i = 0; i < sortTeam.length; i++) {
                for (let j = i + 1; j < sortTeam.length; j++) {
                    match.push({
                        left: sortTeam[i],
                        right: sortTeam[j]
                    })
                }
            }
        } else if (results[0][0].tournamentMode == 'Knockout') {
            for (let i = 0; i < sortTeam.length; i++) {
                for (let j = i + 1; j % 2 == 1; j++) {
                    match.push({
                        left: sortTeam[i],
                        right: sortTeam[j]
                    })
                }
            }
        }
        match.sort();

        res.render('detail', {
            tournamentID: results[0][0].tournamentID,
            tournamentName: results[0][0].tournamentName,
            tournamentMode: results[0][0].tournamentMode,
            tournamentTeam: results[0][0].tournamentTeam,
            team: results[0][0].tournamentTeam.split(',\r\n'),
            totalTeam: team.length,
            totalMatch: match.length,
            match: match,
            mode: results[1]
        })
    })
}