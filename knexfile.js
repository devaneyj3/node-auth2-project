// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/auth.sqlite3'
        },
        useNullAsDefault: false,
        migrations: {
            directory: './data/migrations'
        }
    }

};
