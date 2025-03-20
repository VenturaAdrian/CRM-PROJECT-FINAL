const config = {
    user      : 'ComRelAdmin',
    password  : 'admin1433',
    server    : 'DESKTOP-0M81F64',
    database  : 'ComRel',
    options   : {
        trustServerCertificate: true,
        trustedConnection     : false,
        enableArithAbort      : true,
        instancename          : 'SQLEXPRESS'
    },
    port: 1433
}
module.exports = config;
