const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {

  all(callback) {

    db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id', function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows);
    });

  },
  create(data) {

    const query = `
      INSERT INTO receipts (
        title,
        ingredients,
        preparation,
        information,
        created_at,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso,
      data.chef
    ]

    return db.query(query, values)
  },
  find(id, callback) {
    db.query(`SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) WHERE receipts.id = ${id} GROUP BY chefs.name, receipts.id`, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback(results.rows[0]);
    });
  },
  update(data) {
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

    return db.query(query, values) 
  },
  delete(id) {
    return db.query(`DELETE FROM receipts WHERE id = ${id}`) 
  },
  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback(results.rows);
    });
  }

}