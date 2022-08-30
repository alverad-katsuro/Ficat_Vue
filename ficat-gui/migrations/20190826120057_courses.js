exports.up = function(knex) {
  return knex.schema.createTable('courses', table => {
    table.increments('id').primary()
    table
      .string('name', 255)
      .notNullable()
      .unique()
    table
      .string('program', 120)
      .notNullable()
      .unique()
    table
      .enum('type', ['graduação', 'especialização', 'mestrado', 'doutorado'])
      .notNullable()
      .defaultTo('graduação')
    table.string('unityAcronym', 12).notNullable()
    table.foreign('unityAcronym').references('academicUnities.acronym')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('courses')
}
