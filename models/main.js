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
                                                LEAVE COUNT
    ===========================================================================================================*/

    "selectLeaveCountManager"    : function selectLeaveCountManager ( callback, param )
    {
        var sql = "SELECT COUNT(la.employee_id) AS leaveCount FROM leaveapp la, employees emp WHERE la.employee_id= emp.id AND la.status ='For Manager Approval' AND emp.company_id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    },

    "selectLeaveCountHR"    : function selectLeaveCountHR ( callback, param )
    {
        var sql = "SELECT COUNT(employee_id) AS leaveCount FROM leaveapp WHERE status ='Approved by Manager'";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    },

    /*========================================================================================================
                                                OVERTIME COUNT
    ===========================================================================================================*/

    "selectOvertimeCountManager"    : function selectOvertimeCountManager ( callback, param )
    { 
        var sql = "SELECT COUNT(o.employee_id) AS overtimeCount FROM overtime o, employees emp WHERE o.employee_id= emp.id AND o.status ='For Manager Approval' AND emp.company_id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            console.log(results)
            callback ( results );
        });
    },

    "selectOvertimeCountHR"    : function selectOvertimeCountHR ( callback, param )
    {
        var sql = "SELECT COUNT(employee_id) AS overtimeCount FROM overtime WHERE status ='Approved by Manager'";
        pool.query( sql, param, function ( err, results )
        {
            console.log(results) 
            callback ( results );
        });
    },

    /*========================================================================================================
                                                BIRTHDAY COUNT
    ===========================================================================================================*/

    "selectBirthdayCount"    : function selectBirthdayCount ( callback, param )
    {
        var sql = "SELECT COUNT(DATE_FORMAT(dateBirth, '%Y-%m-%d')) AS dateBirth FROM employees WHERE DATE_FORMAT(dateBirth, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')";
        pool.query( sql, [ param.dateBirth ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectBirthdayList"    : function selectBirthdayList ( callback, param )
    {
        var sql = "SELECT CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, YEAR(CURDATE()) - YEAR(emp.dateBirth) AS age, (com.code) AS company, (bra.name) as location FROM employees emp LEFT JOIN companies com ON com.id= emp.company_id LEFT JOIN branches bra ON bra.id= emp.branch_id WHERE DATE_FORMAT(emp.dateBirth, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d') ORDER BY CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi)";
        pool.query( sql, [ param.employee, param.age, param.company, param.location ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                                LEAVE COUNT
    ===========================================================================================================*/

    "selectRenewalCount"    : function selectRenewalCount ( callback, param )
    {
        var sql = "SELECT COUNT(employee_id) AS renewalCount, diffDate FROM (SELECT employee_id, DATEDIFF(datePrompt, CURDATE()) AS diffDate FROM services WHERE employmentStatus <> 'Regular' HAVING (diffDate <= 7) OR (diffDate = 30)) AS A";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectRenewalList"    : function selectRenewalList ( callback, param )
    {
        var sql = "SELECT ser.employee_id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(ser.dateAssigned, '%Y-%m-%d') AS dateAssigned, DATE_FORMAT(ser.datePrompt, '%Y-%m-%d') AS datePrompt, (pos.name) AS position, (com.code) AS company, (bra.name) AS location, DATEDIFF(ser.datePrompt, CURDATE()) as diffDate FROM employees emp LEFT JOIN services ser ON ser.employee_id= emp.id LEFT JOIN companies com ON com.id= emp.company_id LEFT JOIN positions pos ON pos.id= emp.position_id LEFT JOIN branches bra ON bra.id= emp.branch_id WHERE ser.employmentStatus <> 'Regular' HAVING (diffDate <= 7) OR (diffDate = 30) ORDER BY ser.dateAssigned";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },
}; 