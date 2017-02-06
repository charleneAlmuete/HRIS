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
                                               SAVE BANK
    ===========================================================================================================*/

    "addNewBank"    : function addNewBank ( callback, param )
    {
        var sql = "INSERT INTO bank SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               SAVE BANK
    ===========================================================================================================*/

    "updateBank"    : function updateBank ( callback, param )
    {
        var sql = "UPDATE bank SET bank= ?, accountNo= ? WHERE id= ?";
        pool.query( sql, [ param.bank, param.accountNo, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               SAVE LENDING
    ===========================================================================================================*/

    "addNewLending"    : function addNewLending ( callback, param )
    {
        var sql = "INSERT INTO lendingcompany SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               SAVE LOAN TYPE
    ===========================================================================================================*/

    "addNewLoanType"    : function addNewLoanType ( callback, param )
    {
        var sql = "INSERT INTO loantype SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};
