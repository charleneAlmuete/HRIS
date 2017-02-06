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

   "selectLeaveCredit"       : function selectLeaveCredit ( callback, param )
    { 
        var sql = "SELECT emp.id,CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, total_vl, used_vl, rem_vl, total_sl, used_sl, rem_sl, total_el, used_el, rem_el FROM employees emp LEFT JOIN (SELECT emp.id, a.leavedays AS total_vl, SUM(IF(c.status= 'approve', c.days_applied, '0')) AS used_vl, IF(c.status= 'approve', a.leavedays - SUM(c.days_applied), a.leavedays) AS rem_vl FROM  serviceleave a  LEFT JOIN employees emp ON emp.id= a.employee_id LEFT JOIN leaves b ON b.id = a.leave_id LEFT JOIN leaveapp c ON c.leave_id = a.leave_id AND c.employee_id= a.employee_id WHERE   b.name= 'Vacation Leave' GROUP BY a.employee_id) AS a ON a.id= emp.id LEFT JOIN (SELECT emp.id, a.leavedays AS total_sl, SUM(IF(c.status= 'approve', c.days_applied, '0')) AS used_sl, IF(c.status= 'approve', a.leavedays - SUM(c.days_applied), a.leavedays) AS rem_sl FROM  serviceleave a LEFT JOIN employees emp ON emp.id= a.employee_id LEFT JOIN leaves b ON b.id = a.leave_id LEFT JOIN leaveapp c ON c.leave_id = a.leave_id AND c.employee_id= a.employee_id WHERE   b.name= 'Sick Leave'  GROUP BY a.employee_id) AS b ON b.id= emp.id LEFT JOIN (SELECT emp.id,  a.leavedays AS total_el,  SUM(IF(c.status= 'approve', c.days_applied, '0')) AS used_el, IF(c.status= 'approve', a.leavedays - SUM(c.days_applied), a.leavedays) AS rem_el FROM serviceleave a  LEFT JOIN employees emp ON emp.id= a.employee_id LEFT JOIN leaves b ON b.id = a.leave_id  LEFT JOIN leaveapp c ON c.leave_id = a.leave_id AND c.employee_id= a.employee_id  WHERE   b.name= 'Emergency Leave'  GROUP BY a.employee_id) AS c ON c.id= emp.id" ;
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectLeaveType"       : function selectLeaveType ( callback, param )
    { 
        var sql = "SELECT * FROM leaves ORDER BY name" ;
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "updateLeaveType" : function updateLeaveType ( callback, param )
    {
        var sql = "UPDATE leaves SET name= ? WHERE id= ?";
        pool.query ( sql, [ param.name, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteLeaveType" : function deleteLeaveType ( callback, param )
    {
        var sql = "DELETE FROM leaves WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }



};
