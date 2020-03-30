const db = require("../../config/db");
const { date } = require("../../lib/utils");

module.exports = {

  all() {

    return db.query('SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) GROUP BY chefs.name, receipts.id')

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

    return db.query(query, values);
  },
  find(id) {

    return db.query(`SELECT receipts.*, chefs.name AS chef FROM receipts LEFT JOIN chefs ON (chefs.id = receipts.chef_id) WHERE receipts.id = '${id}' GROUP BY chefs.name, receipts.id`)

  },
  update(data) {
    const query = `
      UPDATE receipts SET
        title=($1),
        ingredients=($2),
        preparation=($3),
        information=($4),
        chef_id=($5)
        WHERE id = $6
    `

    const values = [
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
  chefsSelectOptions() {
    return db.query(`SELECT name, id FROM chefs`)
  },
  files(fileId) {
    return db.query(`SELECT files.* FROM files LEFT JOIN recipe_files ON (files.id = recipe_files.file_id) WHERE recipe_files.recipe_id = '${fileId}'`);
  }
  
}