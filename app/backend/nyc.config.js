module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/database/models',
    'src/Interfaces',
    'src/services/validations',
  ],
  include: ['src/**/*.ts']
};
