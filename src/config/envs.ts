import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT:number;
    POSTGRES_USER:string;
    POSTGRES_PASSWORD:string;
    POSTGRES_DB:string;
    DATABASE_URL:string;
    SECRET_JWT_KEY:string;
}

const envsSchema = joi.object({
    PORT: joi.number().required()
})
.unknown(true);

const {error, value} = envsSchema.validate(process.env);

if( error ) throw new Error(`Config validation error: ${error.message}`);

const envVars:EnvVars = value;

export const envs = {
    port: envVars.PORT,
    postgres_user: envVars.POSTGRES_USER,
    postgres_password: envVars.POSTGRES_PASSWORD,
    postgres_db: envVars.POSTGRES_DB,
    database_url: envVars.DATABASE_URL,
    secret_jwt_key: envVars.SECRET_JWT_KEY,
}