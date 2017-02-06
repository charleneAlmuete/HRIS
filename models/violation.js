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
                                               SAVE VIOLATION
    ===========================================================================================================*/

    "addNewViolation"    : function addNewViolation ( callback, param )
    {
        var sql = "INSERT INTO violation SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results.insertId );
        });
    }, 
 

    /*========================================================================================================
                                            UPDATE VIOLATION
    ===========================================================================================================*/

    "updateViolation"    : function updateViolation ( callback, param )
    { 
        var sql = "UPDATE violation SET memoNo= ?, memo= ?, subject= ?, dateOfMemo= ?, signedBy= ?, noOfOffense= ?, categoryOfOffense= ?, penalties= ?, effectOnPenalties= ?, effectivePeriod= ? WHERE id= ?";
        pool.query( sql, [ param.memoNo, param.memo, param.subject, param.dateOfMemo, param.signedBy, param.noOfOffense, param.categoryOfOffense, param.penalties, param.effectOnPenalties, param.effectivePeriod, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    }, 

    /*========================================================================================================
                                               RETRIEVE VIOLATION
    ===========================================================================================================*/

    "selectViolation"    : function selectViolation ( callback)
    { 
        var sql = "SELECT v.id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, v.employee_id, v.memoNo, v.memo, subject, DATE_FORMAT(v.dateOfMemo, '%Y-%m-%d') AS dateOfMemo, v.signedBy, v.noOfOffense, v.categoryOfOffense, v.penalties, v.effectOnPenalties, v.effectivePeriod FROM violation v, employees emp WHERE v.employee_id= emp.id";
        pool.query( sql, function ( err, results )
        { 
            callback ( results );
        });
    },

    "selectViolationId"    : function selectViolationId ( callback, param )
    { 
        var sql = "SELECT v.id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, v.employee_id, v.memoNo, v.memo, subject, DATE_FORMAT(v.dateOfMemo, '%Y-%m-%d') AS dateOfMemo, v.signedBy, v.noOfOffense, v.categoryOfOffense, v.penalties, v.effectOnPenalties, v.effectivePeriod FROM violation v, employees emp WHERE v.employee_id= emp.id AND v.employee_id= ?";
        pool.query( sql, param,  function ( err, results )
        { 
            callback ( results );
        });
    },

    "deleteViolation"    : function deleteViolation ( callback, param )
    { 
        var sql = "DELETE FROM violation WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    }
};
