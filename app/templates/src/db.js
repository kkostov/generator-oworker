<% if (usemssql) { %>
import sql from 'mssql';

const dbConfiguration = {
    user: '',
    password: '',
    server: '', // use hostname//name for named instances
    database: '',
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



