exports.up = function(knex) {
  return knex.schema.createTable('academicUnities', table => {
    table.increments('id').primary()
    table
      .string('name', 255)
      .notNullable()
      .defaultTo('')
      .unique()
    table
      .string('acronym', 50)
      .notNullable()
      .unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('academicUnities')
}
