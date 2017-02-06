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
                                               SAVE BENEFIT
    ===========================================================================================================*/

    "addNewBenefit"    : function addNewBenefit ( callback, param )
    {
        var sql = "INSERT INTO benefits SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               UPDATE BENEFIT
    ===========================================================================================================*/

    "updateBenefit"    : function updateBenefit ( callback, param )
    {
        var sql = "UPDATE benefits SET name= ? WHERE id= ?";
        pool.query( sql, [ param.name,  param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteBenifitType"    : function deleteBenifitType ( callback, param )
    {
        var sql = "DELETE FROM benefits WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};
