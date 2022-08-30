exports.up = function(knex) {
  return knex.schema.createTable('knowledgeAreas', table => {
    table.increments('id').primary()
    table
      .string('code', 30)
      .notNullable()
      .defaultTo('')
    table
      .string('description', 255)
      .notNullable()
      .defaultTo('')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('knowledgeAreas')
}
