if (process.env.MIGRATE) {
  require("dotenv").config();
}

const dev = {
  host: process.env.DEV_HOST,
  username: process.env.DEV_USER,
  password: process.env.DEV_PASSWORD,
  port: process.env.DEV_PORT,
  database: process.env.DEV_DATABASE,
  dialect: process.env.DEV_DIALECT,
  logging: (msg) => {
    console.log(msg);
  },
  define: { timestamps: true },
};

module.exports = { development: dev, test: null, production: null };
