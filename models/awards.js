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
                                        DISPLAY EMPLOYEE AWARD INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectAward"       : function selectAward ( callback, param )
    {
        var sql = "SELECT id, employee_id, name, institution, DATE_FORMAT(dateGiven, '%Y-%m-%d') AS dateGiven FROM awards WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               SAVE AWARDS
    ===========================================================================================================*/

    "addNewAward"    : function addNewAward ( callback, param )
    {
        var sql = "INSERT INTO awards SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                         	   UPDATE AWARDS
    ===========================================================================================================*/

    "updateAwards" 	: function updateAwards ( callback, param )
    { 
    	var sql = "UPDATE awards SET  name = ?, institution = ?, dateGiven = ? WHERE id= ?";
    	pool.query ( sql, [ param.name, param.institution, param.dateGiven, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                               DELETE AWARDS
    ===========================================================================================================*/

    "deleteAward"  : function deleteAward ( callback, param )
    { 
        var sql = "DELETE FROM awards WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};