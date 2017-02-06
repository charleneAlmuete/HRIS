var mysql 	= require( 'mysql' )
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
                                    DISPLAY MEDICAL INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectMedical" : function selectMedical ( callback, param )
    { 
        var sql = "SELECT * FROM medicals WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "selectMedHealth" : function selectMedHealth ( callback, param )
    { 
        var sql = "SELECT CONCAT(emp.fName, ' ', emp.lName) AS employee, med.conditions, med.started, med.physician, med.disability FROM medicals med, employees emp WHERE med.employee_id= emp.id";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               SAVE EDUCATION
    ===========================================================================================================*/

    "addNewMedical"		: function addNewMedical ( callback, param )
    {
    	var sql = "INSERT INTO medicals SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                         	   UPDATE EDUCATION
    ===========================================================================================================*/

    "updateMedical" 	: function updateMedical ( callback, param )
    { 
    	var sql = "UPDATE medicals SET conditions = ?, started = ?, physician = ?, disability= ? WHERE id = ?";
    	pool.query ( sql, [ param.conditions, param.started, param.physician, param.disability, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results ); 
    	});
    },

    "deleteMedical"     : function deleteMedical ( callback, param )
    { 
        var sql = "DELETE FROM medicals WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results ); 
        });
    }
};