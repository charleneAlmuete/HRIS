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
                                               SAVE BRANCH
    ===========================================================================================================*/

    "addNewBranch"    : function addNewBranch ( callback, param )
    {
        var sql = "INSERT INTO branches SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               UPDATE BRANCH
    ===========================================================================================================*/

    "updateBranch"    : function updateBranch ( callback, param )
    {
        var sql = "UPDATE branches SET name= ? WHERE id= ?";
        pool.query( sql, [ param.name,  param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteBranchType"    : function deleteBranchType ( callback, param )
    {
        var sql = "DELETE FROM branches WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};
