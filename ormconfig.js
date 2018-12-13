const defaultConfig = {
  type: "mysql",
  host: process.env.TYPEORM_HOST || "localhost",
  port: process.env.TYPEORM_PORT || 3306,
  username: process.env.TYPEORM_USERNAME || 'root',
  password: process.env.TYPEORM_PASSWORD || 'get@pHd!',
  database: process.env.TYPEORM_DATABASE || "TaggerML",
  entities: ["src/entities/**/*.ts"],
  debug: false,
  logging: ["query", "error"]
};

module.exports = [
  {
    name: "default",
    ...defaultConfig,
  },
  {
    name: "test",
    ...defaultConfig,
  }
];