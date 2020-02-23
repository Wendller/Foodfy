const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {

  all(callback) {
    db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id', function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows);
    });
  }

}