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
                                            SAVE RECOGNITION & AWARDS
    ===========================================================================================================*/

    "addNewRecognition"    : function addNewRecognition ( callback, param )
    {
        var sql = "INSERT INTO recognition SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                            SAVE RECOGNITION & AWARDS
    ===========================================================================================================*/

    "updateRecognition"    : function updateRecognition ( callback, param )
    {
        var sql = "UPDATE recognition SET awardGiven= ?, citation= ? WHERE id= ?";
        pool.query( sql, [ param.awardGiven, param.citation, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                            SAVE RECOGNITION & AWARDS
    ===========================================================================================================*/

    "selectRecognition"    : function selectRecognition ( callback, param )
    {
        var sql = "SELECT reg.id, reg.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, reg.awardGiven, reg.citation FROM recognition reg, employees emp WHERE emp.id= reg.employee_id ORDER BY CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi)";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    }, 

    "selectRecognitionId"    : function selectRecognitionId ( callback, param )
    {
        var sql = "SELECT reg.id, reg.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, reg.awardGiven, reg.citation FROM recognition reg, employees emp WHERE emp.id= reg.employee_id AND reg.employee_id= ? ORDER BY CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi)";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    },

    "deleteRecognition"    : function deleteRecognition ( callback, param )
    {
        var sql = "DELETE FROM recognition WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    }
};
