<% if (usemssql) { %>
import sql from 'mssql';

const dbConfiguration = {
    user: 'ugdbm',
    password: 'ebm4589',
    server: 'KKOSTOV-PC',
    database: 'UltraGendaPro',
    port: '1433',
    requestTimeout: '5000'
}

<% } %>

export default callback => {
<% if (usemssql) { %>
	
	 const connection = new sql.Connection(dbConfiguration);
    connection.connect()
        .then(
            () => {
                console.log('SQL CONNECTED');
                callback(connection);
            },
            (err) => console.log('SQL CONNECTION ERROR: ' + err)
        );
	
<% } else { %>
		// connect to a database if needed, the pass it to `callback`:
	callback();
<% } %>
}



