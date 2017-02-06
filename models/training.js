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
                                    DISPLAY TRAINING INFO IN TABLE
    ===========================================================================================================*/

    "selectTraining" : function selectTraining ( callback, param )
    { 
        var sql = "SELECT id, employee_id, name, DATE_FORMAT(started, '%Y-%m-%d') AS started, DATE_FORMAT(ended, '%Y-%m-%d') AS ended, institution, venue, speaker, remarks FROM trainings WHERE employee_id= ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               SAVE TRAINING
    ===========================================================================================================*/

    "addNewTraining"		: function addNewTraining ( callback, param )
    {
    	var sql = "INSERT INTO trainings SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                         	   UPDATE TRAINING
    ===========================================================================================================*/

    "updateTraining" 	: function updateTraining ( callback, param )
    { 
    	var sql = "UPDATE trainings SET name = ?, started = ?, ended = ?, institution = ?, venue = ?, speaker = ?, remarks = ? WHERE id = ?";
    	pool.query ( sql, [ param.name, param.started, param.ended, param.institution, param.venue, param.speaker, param.remarks, param.id], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results ); 
    	});
    },

    "deleteTraining"    : function deleteTraining ( callback, param )
    { 
        var sql = "DELETE FROM trainings WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results ); 
        });
    }
};