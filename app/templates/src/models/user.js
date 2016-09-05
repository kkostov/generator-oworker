import sql from 'mssql';

// sample model definition
// place domain logic for reading and updating a model here

const getById = (connection, id) => {
	const request = new sql.Request(connection);
    return request.query(`select TOP 1 * from usertable where Id=${id}`)
		.then(recordset => {
			return recordset[0];
		},
		(err) => console.log('SQL QUERY ERROR: ' + err)
		);
};



const getAll = (connection) => {
	const request = new sql.Request(connection);
    return request.query(`select * from usertable`)
		.then(recordset => {
			return recordset;
		},
		(err) => console.log('SQL QUERY ERROR: ' + err)
		);
};

const create = (name) => {
	const connection = new sql.Connection(dbConfiguration);
	return connection.connect().then(cn => {
		const request = new sql.Request(cn);
		request.input('param_name', sql.NVarChar, name);
		return request.query(`insert into usertable (name)
		values (@param_name);select TOP 1 * from usertable WHERE Id=@@IDENTITY`)
			.then(recordset => {
				return recordset[0];
			},
			(err) => console.log('SQL QUERY ERROR: ' + err)
			);
	},
		(err) => console.log('SQL CONNECTION ERROR: ' + err)
	);
}


export {
	/** retrieves a user with the given Id */
	getById,

    /** retrieve all users */
    getAll,

	/** creates a user with the given name */
	create
}