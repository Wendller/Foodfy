const db = require("../../config/db");
const { date } = require("../../lib/utils");
const fs = require("fs");

module.exports = {

  all(callback) {

    db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id', function(err, results) {
      if(err) throw `Database error: ${err}`

      callback(results.rows);
    });

  },
  async create(data, recipeId) {

    const query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id
    `

    const values = [
      data.filename,
      data.path
    ]

    await db.query(query, values)

    const connectQuery = `
      INSERT INTO recipe_files (
        recipe_id,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `
      
    return db.query(`SELECT id FROM files WHERE name = $1`, [data.filename], function(err, results) {
              if (err) throw `Database error! ==> ${err}`

              return db.query(connectQuery, [recipeId, results.rows[0].id], function(err, results) {
                if (err) throw `Database final error! ==> ${err}`
              }) ;
            });
    
  },
  async delete(id) {

    try {
      const result = await db.query(`SELECT * FROM files WHERE id = '${id}'`);
      const file = result.rows[0];

      fs.unlink(file.path, (err) => {
        if (err) throw `Delete file error: ${err}`

        db.query(`DELETE FROM recipe_files WHERE file_id = '${id}'`);

        return db.query(`DELETE FROM files WHERE id = '${id}'`);
      });

      
    }catch(err) {
      console.error(err);
    }

  }

}