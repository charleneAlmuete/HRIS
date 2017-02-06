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
                                               SAVE LEAVE APP
    ===========================================================================================================*/

    "addNewLeaveApp"    : function addNewLeaveApp ( callback, param )
    { 
        var sql = "INSERT INTO leaveapp SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               UPDATE LEAVE APP
    ===========================================================================================================*/

    "updateNewLeaveApp"    : function updateNewLeaveApp ( callback, param )
    { 
        var sql = "UPDATE leaveapp SET employee_id= ?, durFrom= ?, durTo= ?, dateFiled= ?, leave_id= ?, days_applied = ?, mode= ?, reason= ?, status= ? WHERE id= ?";
        pool.query ( sql, [ param.employee_id, param.durFrom, param.durTo, param.dateFiled, param.leave_id, param.days_applied, param.mode, param.reason, param.status, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               DELETE LEAVE APP             
    ===========================================================================================================*/

    "deleteLeaveApp"    : function deleteLeaveApp ( callback, param )
    { 
        var sql = "DELETE FROM leaveapp WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    }, 

    /*========================================================================================================
                                               RETRIEVE LEAVE APP
    ===========================================================================================================*/

    "selectLeaveApp"       : function selectLeaveApp ( callback, param )
    { 
        var sql = "SELECT la.id, la.employee_id, la.days_applied, la.mode, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(la.durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(la.durTo, '%Y-%m-%d') AS durTo, DATE_FORMAT(la.dateFiled, '%Y-%m-%d') AS dateFiled, l.name, (l.id) AS leave_id, la.reason, la.status, users.role_id FROM leaveapp la LEFT JOIN leaves l ON l.id = la.leave_id LEFT JOIN employees emp ON emp.id= la.employee_id LEFT JOIN users ON users.employee_id= la.employee_id ORDER BY la.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectUserLeaveApp"       : function selectUserLeaveApp ( callback, param )
    { 
        var sql = "SELECT la.id, la.employee_id, la.days_applied, la.mode, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(la.durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(la.durTo, '%Y-%m-%d') AS durTo, DATE_FORMAT(la.dateFiled, '%Y-%m-%d') AS dateFiled, l.name, (l.id) AS leave_id, la.reason, la.status, users.role_id FROM leaveapp la LEFT JOIN leaves l ON l.id = la.leave_id LEFT JOIN employees emp ON emp.id= la.employee_id LEFT JOIN users ON users.employee_id= la.employee_id WHERE la.employee_id= ? ORDER BY la.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectManagerLeaveApp"       : function selectManagerLeaveApp ( callback, param )
    { 
        var sql = "SELECT la.id, la.employee_id, la.days_applied, la.mode, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(la.durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(la.durTo, '%Y-%m-%d') AS durTo, DATE_FORMAT(la.dateFiled, '%Y-%m-%d') AS dateFiled, l.name, (l.id) AS leave_id, la.reason, la.status, users.role_id FROM leaveapp la LEFT JOIN leaves l ON l.id = la.leave_id LEFT JOIN employees emp ON emp.id= la.employee_id LEFT JOIN users ON users.employee_id= la.employee_id WHERE emp.company_id= ? ORDER BY la.dateFiled DESC";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectRoleCompany"       : function selectRoleCompany ( callback, param )
    { 
        var sql = "SELECT company_id FROM employees  WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },
 
    /*"selectDateFilters"       : function selectDateFilters ( callback, param )
    { 
        var sql = "SELECT la.id, la.employee_id, la.days_applied, la.mode, CONCAT(emp.lName, ' ', emp.fName) AS employee, DATE_FORMAT(la.durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(la.durTo, '%Y-%m-%d') AS durTo, DATE_FORMAT(la.dateFiled, '%Y-%m-%d') AS dateFiled, l.name, (l.id) AS leave_id, la.reason, la.status FROM leaveapp la, leaves l, employees emp WHERE l.id = la.leave_id AND emp.employee_id= la.employee_id  ORDER BY la.dateFiled";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },*/

    "selectLeavePending"       : function selectLeavePending ( callback, param )
    { 
        var sql = "SELECT la.id, la.employee_id, la.days_applied, la.mode, CONCAT(emp.fName, ' ', emp.lName, ' ', emp.mi) AS employee, DATE_FORMAT(la.durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(la.durTo, '%Y-%m-%d') AS durTo, DATE_FORMAT(la.dateFiled, '%Y-%m-%d') AS dateFiled, l.name, la.reason, la.status FROM leaveapp la, leaves l, employees emp WHERE l.id = la.leave_id AND emp.id= la.employee_id AND la.status = '' ORDER BY la.dateFiled";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    /*========================================================================================================
                                               UPDATE LEAVE APP
    ===========================================================================================================*/

    "approveNewLeaveApp"     : function approveNewLeaveApp ( callback, param )
    {  
        var sql = "UPDATE leaveapp SET status = ? WHERE id = ?";
        pool.query ( sql, [ param.status, param.id ], function ( err, results )
        /*pool.query ( sql, [ "Approved", param ], function ( err, results )*/
        {
            console.log(results)
            if ( err ) throw err;
            callback ( results ); 
        });
    },

    /*========================================================================================================
                                               UPDATE LEAVE APP
    ===========================================================================================================*/

    "declineNewLeaveApp"     : function declineNewLeaveApp ( callback, param )
    {   
        var sql = "UPDATE leaveapp SET status = ? WHERE id = ?";
        pool.query ( sql, [ param.status, param.id ], function ( err, results )
        /*pool.query ( sql, [ "Declined", param ], function ( err, results )*/
        {
            if ( err ) throw err;
            callback ( results ); 
        });
    }


};
