let mongodbOption = {
    host: 'localhost',
    db: 'echart',
}

let mysqlOption = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'echart',
    password: '123456',
}

let options = {
    mongodb: mongodbOption,
    mysql: mysqlOption,
}

export default options;
