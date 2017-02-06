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
                                    DISPLAY COMPANY INFO IN TABLE
    ===========================================================================================================*/

    "selectCompany"       : function selectCompany ( callback, param )
    {
        var sql = "SELECT * FROM companies ORDER BY name";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

	/*========================================================================================================
                                               SAVE COMPANY
    ===========================================================================================================*/

    "addNewCompany"    : function addNewCompany ( callback, param )
    {
        var sql = "INSERT INTO companies SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               UPDATE COMPANY
    ===========================================================================================================*/

    "updateCompany"    : function updateCompany ( callback, param )
    {
        console.log(param)
        var sql = "UPDATE companies SET name= ?, code= ?, contactno= ?, email= ?, website= ? WHERE id= ?";
        pool.query( sql, [param.name, param.code, param.contactno, param.email, param.website, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteCompanyType"    : function deleteCompanyType ( callback, param )
    {
        var sql = "DELETE FROM companies WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};
