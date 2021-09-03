exports.jwtConfig = {
    secret: 'abcdefg',      // 自定义token密钥(随便)
    expiresIn: '2h'         // 处定义token令牌过期时间
};

exports.dbConfig = {
    host: 'localhost',
    database: 'mall',
    user: 'root',
    password: '123'
};