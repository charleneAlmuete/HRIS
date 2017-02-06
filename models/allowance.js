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
                                               SAVE ALLOWANCE
    ===========================================================================================================*/

    "addNewAllowance"    : function addNewAllowance ( callback, param )
    {
        var sql = "INSERT INTO allowances SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                    DISPLAY ALLOWANCE INFO IN TABLE
    ===========================================================================================================*/

    "deleteAllowanceType"       : function deleteAllowanceType ( callback, param )
    {
        var sql = "DELETE FROM allowances WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               UPDATE BANK
    ===========================================================================================================*/

    "updateOtherAllowance"    : function updateOtherAllowance ( callback, param )
    {
        var sql = "UPDATE allowances SET name= ?, amount= ?, WHERE id= ?";
        pool.query( sql, [ param.name, param.amount,  param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};
