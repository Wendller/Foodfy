const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {

  all(callback) {
    db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id', function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows);
    });
  },
  findBy(filter, callback) {
    db.query(`SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) WHERE receipts.title ILIKE '%${filter}%' GROUP BY chefs.name, receipts.id`, function(err, results) {
      if(err) throw `Database error! ==> ${err}`

      callback(results.rows);
    });
  },
  paginate(params, callback) {
    const { filter, limit, offset } = params;

    let query = "",
        filterQuery = "",
        totalQuery = ` (
          SELECT count(*) FROM receipts
        ) AS total`


    if(filter) {
      filterQuery = `
      WHERE receipts.title ILIKE '%${filter}%'
      `
      totalQuery = `(
        SELECT count(*) FROM receipts ${filterQuery}
      ) AS total`
    }

    query = `
    SELECT receipts.*, ${totalQuery}, chefs.name AS chef 
    FROM receipts
    LEFT JOIN chefs ON (chefs.id = receipts.chef_id)
    ${filterQuery}
    GROUP BY chefs.name, receipts.id
    LIMIT ${limit} OFFSET ${offset}
    `

    db.query(query, function(err, results) {
      if(err) throw `Database! ==> ${err}`

      callback(results.rows);
    });
  }

}