const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {

  all(callback) {

    db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id', function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows);
    });

  },
  create(data, callback) {

    const query = `
      INSERT INTO receipts (
        image,
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(`SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) WHERE receipts.id = ${id} GROUP BY chefs.name, receipts.id`, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback(results.rows[0]);
    });
  },
  update(data, callback) {
    const query = `
      UPDATE receipts SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id=($6)
        WHERE id = $7
    `

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback()
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM receipts WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback();
    });
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback(results.rows);
    });
  }

}