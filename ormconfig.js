module.exports = [
    {
        name:        'default',
        type:        'postgres',
        url:         'this file is for typeorm migrations',
        dropSchema:  false,
        synchronize: false,
        logging:     false,
        entities:    [ 'src/bus/**/*.entity.ts' ],
        migrations:  [ 'src/database/migration/*.ts' ],
        subscribers: [ 'src/subscriber/**/*.ts' ],
        cli:         {
            // entitiesDir:    'src/entity',
            migrationsDir:  'src/database/migration',
            subscribersDir: 'src/subscriber',
        },
    },
];
