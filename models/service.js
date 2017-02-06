var mysql	= require( 'mysql' )
,	pool	= mysql.createPool(
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
                                        DISPLAY, ADD, UPDATE LIST OF SERVICES
    ===========================================================================================================*/

    "addNewService"     : function addNewService ( callback, param )
    {     
        var sql = "INSERT INTO services SET ?";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    }, 

    "updateService"     : function updateService ( callback, param )
    { 
        var sql = "UPDATE services SET dateAssigned = ?, datePrompt = ?, position_id = ?, employmentStatus = ?, company_id = ?, branch_id = ?, basicSalary = REPLACE(?, ',', ''), sss = REPLACE(?, ',', ''), phic = REPLACE(?, ',', ''), hdmf = REPLACE(?, ',', ''), tax = REPLACE(?, ',', '') WHERE id = ?";
        pool.query ( sql, [ param.dateAssigned, param.datePrompt, param.position_id, param.employmentStatus, param.company_id, param.branch_id, param.basicSalary, param.sss, param.phic, param.hdmf, param.tax, param.id ],  function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectService"     : function selectAllService ( callback, param )
    {
        var sql = "SELECT s.id, DATE_FORMAT(s.dateAssigned, '%Y-%m-%d') AS dateAssigned, DATE_FORMAT(s.datePrompt, '%Y-%m-%d') AS datePrompt, (p.id) AS position_id, (p.name) AS position, s.employmentStatus, (c.id) AS company_id, (c.code) AS company, (b.id) AS branch_id, (b.name) AS branch, FORMAT(s.basicSalary,2) AS basicSalary, FORMAT(s.sss,2) AS sss, FORMAT(s.phic,2) AS phic, FORMAT(s.hdmf,2) AS hdmf, FORMAT(s.tax,2) AS tax, s.remarks FROM services s, positions p, companies c, branches b WHERE p.id= s.position_id AND c.id= s.company_id AND b.id= s.branch_id AND s.employee_id= ? ORDER BY DATE_FORMAT(s.dateAssigned, '%Y-%m-%d')"; 
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        }); 
    },

    "selectServiceIntoTextboxes"     : function selectServiceIntoTextboxes ( callback, param )
    {
        var sql = "SELECT s.id, DATE_FORMAT(s.dateAssigned, '%Y-%m-%d') AS dateAssigned, (p.id) AS position_id, (p.name) AS position, s.employmentStatus, (c.id) AS company_id, (c.code) AS company, (b.id) AS branch_id, (b.name) AS branch, FORMAT(s.basicSalary,2) AS basicSalary, FORMAT(s.sss,2) AS sss, FORMAT(s.phic,2) AS phic, FORMAT(s.hdmf,2) AS hdmf, FORMAT(s.tax,2) AS tax FROM services s, positions p, companies c, branches b WHERE p.id= s.position_id AND c.id= s.company_id AND b.id= s.branch_id AND s.id= ?"; 
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        }); 
    },

    "selectOtherLeaveService"     : function selectOtherLeaveService ( callback, param )
    {  
        var sql = "SELECT sl.id, (l.id) AS leave_id, l.name, sl.leavedays FROM serviceleave sl, leaves l WHERE l.id= sl.leave_id AND sl.employee_id= ?";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectleaveZero"     : function selectleaveZero ( callback )
    {  
        var sql = "SELECT IFNULL(0, name) AS name FROM leaves;";
        pool.query (  sql, function ( err, results )
        {  
            callback ( results );
        });
    },

    "selectOtherBenefitService"     : function selectOtherBenefitService ( callback, param )
    {   
        var sql = "SELECT sb.id, (b.id) AS benefit_id, (b.name) AS benefit, FORMAT(sb.amount, 2) AS amount FROM servicebenefit sb, benefits b WHERE b.id= sb.benefit_id AND sb.employee_id= ?;";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "selectOtherAllowanceService"     : function selectOtherAllowanceService ( callback, param )
    {   
        var sql = "SELECT sa.id, FORMAT(sa.amount,2) AS amount, a.name FROM serviceallowance sa, allowances a WHERE a.id= sa.allowance_id AND sa.employee_id= ?;";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                    DISPLAY POSITION, COMPANY, BRANCH IN COMBOBOX
    ===========================================================================================================*/

    "selectPosition"    : function selectPosition ( callback )
    {
        var sql = "SELECT * FROM positions";
        pool.query( sql, function ( err, results ) 
        {
            callback( results );
        });
    }, 

    "selectCompany"     : function selectCompany ( callback )
    {
        var sql = "SELECT * FROM companies";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    }, 

    "selectBranch"     : function selectBranch ( callback )
    {
        var sql = "SELECT * FROM branches";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                    DISPLAY ALLOWANCE, LEAVE, BENEFIT TYPES IN CHECKBOX
    ===========================================================================================================*/

    "selectAllowance"     : function selectAllowance ( callback )
    {
        var sql = "SELECT * FROM allowances";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    }, 

    "selectBenefit"     : function selectBenefit( callback )
    {
        var sql = "SELECT * FROM benefits";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    },

    "selectLeave"     : function selectLeave ( callback )
    {
        var sql = "SELECT * FROM leaves WHERE name IN('Sick Leave', 'Vacation Leave', 'Emergency Leave') ORDER BY name";
        pool.query( sql, function( err, results )
        {
            callback( results );
        }); 
    },

    "selectDays"     : function selectDays ( callback, param )
    { 
        var sql = "SELECT * FROM leavedays WHERE leave_id = ?";
        pool.query( sql, param, function( err, results )
        {
            callback( results );
        });
    },
 
    /*========================================================================================================
                                        ADD AND DISPLAY BENEFIT TEMP IN TABLE
    ===========================================================================================================*/

    "selectBenefitTemp"     : function selectBenefitTemp( callback, param )
    {
        var sql = "SELECT bentemp.id, (ben.id) AS benefit_id, ben.name, bentemp.amount FROM servicebenefit_temp bentemp, benefits ben WHERE bentemp.benefit_id= ben.id AND employee_id= ?";
        pool.query( sql, param, function( err, results )
        {
            callback( results );
        });
    }, 

    "addOtherBenefit"     : function addOtherBenefit ( callback, param )
    {  
        var sql  = "INSERT INTO servicebenefit  SET ?";
        pool.query (  sql , param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                        ADD AND DISPLAY LEAVE TEMP IN TABLE
    ===========================================================================================================*/

    "selectLeaveTemp"     : function selectLeaveTemp( callback, param )
    {
        var sql = "SELECT serviceleave_temp.id, serviceleave_temp.leave_id, leaves.name, leavedays.days, serviceleave_temp.leavedays FROM  serviceleave_temp, leaves, leavedays WHERE serviceleave_temp.leavedays= leavedays.id AND serviceleave_temp.leave_id= leaves.id AND employee_id= ?";
        pool.query( sql, param, function( err, results )
        {
            callback( results );
        });
    }, 

    "addOtherLeave"     : function addOtherLeave ( callback, param )
    {   
        var sql  = "INSERT INTO serviceleave SET ?";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                    ADD AND DISPLAY ALLOWANCE TEMP IN TABLE
    ===========================================================================================================*/

    "selectAllowanceTemp"     : function selectAllowanceTemp( callback, param )
    {
        var sql = "SELECT serviceallowance_temp.id, allowances.name FROM allowances, serviceallowance_temp WHERE allowances.id= serviceallowance_temp.allowance_id AND employee_id= ?";
        pool.query( sql, param, function( err, results )
        {
            callback( results );
        });
    }, 

    "addOtherAllowance"     : function addOtherAllowance ( callback, param )
    {   
        var sql  = "INSERT INTO serviceallowance SET ?";
        pool.query (  sql , param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    }, 

    /*========================================================================================================
                                    ADD LEAVE TYPE IN SETTINGS PAGE
    ===========================================================================================================*/

    "selectLeaveWithDays"     : function selectLeaveWithDays ( callback )
    { 
        var sql = "SELECT leaves.id AS leaveId, leavedays.id, leaves.name, leavedays.days FROM leavedays, leaves WHERE leaves.id= leavedays.leave_id ORDER BY leaves.name";
        pool.query( sql, function( err, results )
        { 
            callback( results );
        });
    },

    "addLeave"     : function addLeave ( callback, param )
    {    
        var sql = "INSERT INTO leaves SET ?";
        pool.query (  sql , param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "addLeaveWithDays"     : function addLeaveWithDays ( callback, param )
    {  
        var sql = "INSERT INTO leavedays SET ?";
        pool.query (  sql , param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updateLeaveWithDays"     : function updateLeaveWithDays ( callback, param )
    {
        var sql = "UPDATE leavedays SET days = ? WHERE id = ?";
        pool.query ( sql, [ param.days, param.id ],  function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updateLeaveType"     : function updateLeaveType ( callback, param )
    {
        var sql = "UPDATE leaves SET name = ? WHERE id = ?";
        pool.query ( sql, [ param.name, param.id ],  function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },
  
    /*========================================================================================================
                                    UPDATE-DELETE RECORDS IN ORIGINAL TABLES
    ===========================================================================================================*/

    "updateLeaveWithDays"   : function updateLeaveWithDays ( callback, param )
    {    
        var sql = "UPDATE serviceleave SET leave_id= ?, leavedays= ? WHERE id = ?";
        pool.query ( sql, [ param.leave_id, param.leavedays, param.id ], function ( err, results )
        {  
            callback( results );
        });
    },

    "updateOtherBenefit"   : function updateOtherBenefit ( callback, param )
    {    
        var sql = "UPDATE servicebenefit SET benefit_id= ?, amount= REPLACE(?, ',', '') WHERE id = ?";
        pool.query ( sql, [ param.benefit_id, param.amount, param.id ], function ( err, results )
        {  
            callback( results );
        });
    }, 

    "deleteAppointment"   : function deleteAppointment ( callback, param )
    {    
        var sql = "DELETE FROM services WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {  
            callback( results );
        });
    },

    "deleteLeave"   : function deleteLeave ( callback, param )
    {    
        var sql = "DELETE FROM serviceleave WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {  
            callback( results );
        });
    },

    "deleteBenefit"   : function deleteBenefit ( callback, param )
    {    
        var sql = "DELETE FROM servicebenefit WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {  
            callback( results );
        });
    },

    "deleteAllowance"   : function deleteAllowance ( callback, param )
    {    
        var sql = "DELETE FROM serviceallowance WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {  
            callback( results );
        });
    } 


};