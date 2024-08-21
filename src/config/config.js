import 'dotenv/config'

const config = {
    port: process.env.PORT || 5334,
    dbHost: process.env.PG_HOST,
    dbPort: process.env.PG_PORT,
    dbUser: process.env.PG_USER,
    dbPassword: process.env.PG_PASSWORD,
    dbName: process.env.PG_DATABASE_NAME,
    huggingFaceToken: process.env.HUGGINGFACE_TOKEN,
    environment: process.env.NODE_ENV || 'development',
  };
  
  export default config
  