import {DataSource} from "typeorm";
export const connection = new DataSource({
        type: "postgres",
        host: "localhost",
        username: "postgres",
        password: "12345678",
        database: 'task2',
        synchronize: false,
        entities: ["src/entities/**.ts"]
    }
);
