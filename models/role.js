var mysql 	= require( 'mysql' )
,	pool 	= mysql.createPool(
{
	connectionLimit	: 10,
	host			: 'localhost',
	user			: 'root',
	password		: '',
	database		: 'hris'	
});

pool.getConnection( function ( err, connection )
{
	if ( err ) throw err;
	console.log( "connected" );
});

module.exports = {

	/*========================================================================================================
                                               ROLE
    ===========================================================================================================*/

    "addNewRole"    : function addNewRole ( callback, param )
    {
        var sql = "INSERT INTO role SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updateRole"    : function updateRole ( callback, param )
    {
        var sql = "UPDATE users SET role_id= ? WHERE id= ?";
        pool.query( sql, [ param.role_id, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updateStatus"    : function updateStatus ( callback, param )
    {
        var sql = "UPDATE users SET userStatus= ? WHERE id= ?";
        pool.query( sql, [ param.userStatus, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "resetPass"    : function resetPass ( callback, param )
    {
        var sql = "UPDATE users SET password= ?, userStatus= ? WHERE id= ?";
        pool.query( sql, [ param.password, 'New', param.id ], function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectRole"    : function selectRole ( callback )
    {
        var sql = "SELECT * FROM role";
        pool.query( sql, function ( err, results )
        { 
            callback ( results );
        });
    } 
};
