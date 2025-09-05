import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
config()
export const dataSourceOption:DataSourceOptions={
    type:'postgres',
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/db/migration/*{.ts,.js'],
    logging:true,
    synchronize:true
}
const dataSource=new DataSource(dataSourceOption);
export default dataSource;