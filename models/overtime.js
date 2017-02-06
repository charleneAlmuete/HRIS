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
                                                SAVE OVERTIME
    ===========================================================================================================*/

    "addNewOvertime"    : function addNewOvertime ( callback, param )
    {
        var sql = "INSERT INTO overtime SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                                UPDATE OVERTIME
    ===========================================================================================================*/

    "updateOvertime"    : function updateOvertime( callback, param )
    {
        var sql = "UPDATE overtime SET dateFiled= ?, dateRequested= ?, totalHours= ?, reason= ?, status= ? WHERE id= ?";
        pool.query( sql, [ param.dateFiled, param.dateRequested, param.totalHours, param.reason, param.status, param.id ], function( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                               RETRIEVE OVERTIME
    ===========================================================================================================*/

    "selectOvertime"       : function selectOvertime ( callback, param )
    { 
        var sql = "SELECT o.id, o.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(o.dateFiled, '%Y-%m-%d') AS dateFiled, DATE_FORMAT(o.dateRequested, '%Y-%m-%d') AS dateRequested, o.totalHours, o.reason, o.status FROM overtime o LEFT JOIN employees emp ON emp.id= o.employee_id ORDER BY o.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectOvertimeUser"       : function selectOvertimeUser ( callback, param )
    { 
        var sql = "SELECT o.id, o.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(o.dateFiled, '%Y-%m-%d') AS dateFiled, DATE_FORMAT(o.dateRequested, '%Y-%m-%d') AS dateRequested, o.totalHours, o.reason, o.status FROM overtime o LEFT JOIN employees emp ON emp.id= o.employee_id WHERE o.employee_id= ? ORDER BY o.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectOvertimeRoleCompany"       : function selectOvertimeRoleCompany ( callback, param )
    { 
        var sql = "SELECT company_id FROM employees  WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectOvertimeManager"       : function selectOvertimeManager ( callback, param )
    { 
        var sql = "SELECT o.id, o.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(o.dateFiled, '%Y-%m-%d') AS dateFiled, DATE_FORMAT(o.dateRequested, '%Y-%m-%d') AS dateRequested, o.totalHours, o.reason, o.status FROM overtime o LEFT JOIN employees emp ON emp.id= o.employee_id WHERE emp.company_id= ? ORDER BY o.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    /*========================================================================================================
                                               UPDATE LEAVE APP
    ===========================================================================================================*/

    "approveNewOvertime"     : function approveNewOvertime ( callback, param )
    {  
        var sql = "UPDATE overtime SET status = ? WHERE id = ?";
        pool.query ( sql, [ param.status, param.id ], function ( err, results )
        /*pool.query ( sql, [ "Approved", param ], function ( err, results )*/
        {
            console.log(results)
            if ( err ) throw err;
            callback ( results ); 
        });
    },
 

    "declineNewOvertime"     : function declineNewOvertime ( callback, param )
    {   
        var sql = "UPDATE overtime SET status = ? WHERE id = ?";
        pool.query ( sql, [ param.status, param.id ], function ( err, results )
        /*pool.query ( sql, [ "Declined", param ], function ( err, results )*/
        {
            if ( err ) throw err;
            callback ( results ); 
        });
    }

};
