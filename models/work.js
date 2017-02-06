var mysql 	= require( 'mysql' )
,	pool	= mysql.createPool(
{
	connectionLimit	: 10,
	host			: 'localhost',
	user			: 'root',
	password		: '',
	database		: 'hris'	
})

pool.getConnection( function ( err, connection )
{
	if ( err ) throw err;
	console.log( "connected" );
});

module.exports = {

    /*========================================================================================================
                                    DISPLAY WORK INFO IN TABLE
    ===========================================================================================================*/

    "selectWork" : function selectWork ( callback, param )
    {
        var sql = "SELECT id, employee_id, position, company, DATE_FORMAT(durFrom, '%Y-%m-%d') AS durFrom, DATE_FORMAT(durTo, '%Y-%m-%d') AS durTo, empStatus, FORMAT(salary, 2) AS salary, reason FROM works WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                            SAVE WORK EXPERIENCE
    ===========================================================================================================*/

    "addNewWork"		: function addNewWork ( callback, param )
    {
    	var sql = "INSERT INTO works SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                         	   UPDATE WORK EXPERIENCE
    ===========================================================================================================*/

    "updateWork" 	: function updateWork ( callback, param )
    {
    	var sql = "UPDATE works SET position = ?, company = ?, durFrom = ?, durTo = ?, empStatus = ?, salary = ?, reason = ? WHERE id = ?";
    	pool.query ( sql, [ param.position, param.company, param.durFrom, param.durTo, param.empStatus, param.salary, param.reason, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    "deleteWork"    : function deleteWork ( callback, param )
    {
        var sql = "DELETE FROM works WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};