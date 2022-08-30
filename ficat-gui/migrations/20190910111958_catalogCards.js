exports.up = function(knex) {
  return knex.schema.createTable('catalogCards', table => {
    table.increments('id').primary()
    table
      .enum('type', ['tccGraduation', 'tccExpert', 'dissertation', 'thesis'])
      .notNullable()
      .defaultTo('tccGraduation')
    table.timestamp('datetime').defaultTo(knex.fn.now())
    table.string('unityName', 120).notNullable()
    table.string('courseName', 120).notNullable()
    table.foreign('courseName').references('courses.name')
    table.foreign('unityName').references('academicUnities.name')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('catalogCards')
}
