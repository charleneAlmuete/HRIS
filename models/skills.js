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
                                    DISPLAY SKILLS INFO IN TABLE
    ===========================================================================================================*/

    "selectSkill" : function selectSkill ( callback, param )
    {
        var sql = "SELECT * FROM skills WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               SAVE SKILLS
    ===========================================================================================================*/

    "addNewSkill"		: function addNewSkill ( callback, param )
    {
    	var sql = "INSERT INTO skills SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results ); 
    	});
    },

    /*========================================================================================================
                                         	   UPDATE SKILLS
    ===========================================================================================================*/

    "updateSkill"   : function updateSkill ( callback, param )
    {
        var sql = "UPDATE skills SET level = ?, name = ?, level = ? WHERE id = ?";
        pool.query ( sql, [ param.level, param.name, param.level, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteSkill"   : function deleteSkill ( callback, param )
    {
        var sql = "DELETE FROM skills WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }

};