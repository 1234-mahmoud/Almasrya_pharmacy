import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pg;

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    port:process.env.PORT,
    ssl:{
        rejectUnauthorized:false,
    }
})

export default pool;