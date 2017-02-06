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
                                            DISPLAY TRAIN DEV
    ===========================================================================================================*/

    "selectTrainDev" : function selectTrainDev ( callback)
    { 
        var sql = "SELECT id, training, topic, DATE_FORMAT(dateConduct, '%Y-%m-%d') AS dateConduct, duration, FORMAT(cost, 2) AS cost, venue, speaker, benefit FROM trainingdev";
        pool.query( sql, function ( err, results )
        {
            callback( results );
        });
    },

    "selectTrainees" : function selectTrainees ( callback, param )
    { 
        var sql = "SELECT  atr.id, tr.training, CONCAT(emp.lName, ' ', emp.fName) AS employee  FROM trainingdev tr, attendedtrainees atr, employees emp WHERE atr.employee_id= emp.id AND atr.traindev_id= tr.id AND atr.traindev_id= ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },


    /*========================================================================================================
                                               SAVE TRAIN DEV
    ===========================================================================================================*/

    "addNewTrainDev"		: function addNewTrainDev ( callback, param )
    {
    	var sql = "INSERT INTO trainingdev SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    "addNewTrainee"       : function addNewTrainee ( callback, param )
    {
        var sql = "INSERT INTO attendedtrainees SET ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                         	   UPDATE TRAIN DEV
    ===========================================================================================================*/

    "updateTrainDev" 	: function updateTrainDev ( callback, param )
    { 
    	var sql = "UPDATE trainingDev SET training = ?, topic = ?, dateConduct = ?, duration = ?, cost = REPLACE(?, ',', ''), venue = ?, speaker = ?, benefit = ? WHERE id = ?";
    	pool.query ( sql, [ param.training, param.topic, param.dateConduct, param.duration, param.cost, param.venue, param.speaker, param.benefit, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results ); 
    	});
    },

    /*========================================================================================================
                                               DELETE TRAINEE
    ===========================================================================================================*/

    "deleteTrainee"        : function deleteTrainee ( callback, param )
    {
        var sql = "DELETE FROM attendedtrainees WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteTrainingDev"        : function deleteTrainingDev ( callback, param )
    { 
        var sql = "DELETE FROM trainingDev WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};