var mysql	= require( 'mysql' )
,	pool	= mysql.createPool(
{
	connectionLimit		: 10,
	host				: 'localhost',
	user				: 'root',
	password			: '',
	database			: 'hris'
});

pool.getConnection ( function ( err, connection )
{
	if ( err ) throw err;
	console.log( "connected" );
});

module.exports = {


    /*========================================================================================================
                                        DISPLAY TRAIN DEVELOPMENT
    ===========================================================================================================*/

    "selectPerformance" : function selectPerformance ( callback, param )
    { 
        var sql = "SELECT per.id, per.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, per.rating, per.monthReview, per.remarks FROM performance per, employees emp WHERE per.employee_id= emp.id ORDER BY CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi)";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "selectPerformanceId" : function selectPerformanceId ( callback, param )
    { 
        var sql = "SELECT per.id, per.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, per.rating, per.monthReview, per.remarks FROM performance per, employees emp WHERE per.employee_id= emp.id AND per.employee_id= ? ORDER BY CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi)";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                            SAVE TRAIN DEVELOPMENT
    ===========================================================================================================*/

    "addNewPerformance"	: function addNewPerformance ( callback, param )
    {
    	var sql = "INSERT INTO performance SET ?";
    	pool.query (sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback( results ); 
    	});
    },

    /*========================================================================================================
                                            SAVE TRAIN DEVELOPMENT
    ===========================================================================================================*/

    "updatePerformance" : function updatePerformance ( callback, param )
    {
        var sql = "UPDATE performance SET rating= ?, monthReview= ?, remarks= ? WHERE id= ?";
        pool.query (sql, [ param.rating, param.monthReview, param.remarks, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback( results ); 
        });
    },

    "deletePerformance" : function deletePerformance ( callback, param )
    {
        var sql = "DELETE FROM performance WHERE id= ?";
        pool.query (sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback( results ); 
        });
    }
};