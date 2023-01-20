import {DataSource} from "typeorm";
export const connection = new DataSource({
        type: "postgres",
        host: "localhost",
        username: "postgres",
        password: "12345678",
        database: 'bankSystem',
        synchronize: true,
        entities: ["src/entities/**.ts"]
    }
);
