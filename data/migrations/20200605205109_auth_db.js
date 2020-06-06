
exports.up = function (knex) {
    return knex.schema.createTable('admin', tbl => {
        tbl.increments()
        tbl.text('username')
            .notNullable()
            .unique()
        tbl.text('password')
    })
        .createTable('users', tbl => {
            tbl.increments()
            tbl.text('username')
                .notNullable()
                .unique()
            tbl.text('first_name')
                .notNullable()
            tbl.text('last_name')
                .notNullable()
            tbl.text('address')

        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
        .dropTable('admin')
};
