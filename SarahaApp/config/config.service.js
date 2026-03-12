import dotenv from "dotenv";
import {resolve} from "node:path";

const envPath={
    Dev:"./config/.env.dev"
}
dotenv.config({path:resolve(`${envPath.Dev}`)})

export const PORT=process.env.PORT||6000;
export const DB_URL=process.env.DB_URL
export const SALT=Number(process.env.SALT)
export const SECRET_KEY=process.env.SECRET_KEY