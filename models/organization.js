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
                                    DISPLAY ORGANIZATION INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectAllOrganization" : function selectAllOrganization ( callback, param )
    { 
        var sql = "SELECT id, employee_id, institution, title, started, ended FROM organizations WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results ); 
        });
    },

    /*========================================================================================================
                                               SAVE ORGANIZATION
    ===========================================================================================================*/

    "addNewOrganization"		: function addNewOrganization ( callback, param )
    {
    	var sql = "INSERT INTO organizations SET ?";
    	pool.query ( sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                         	   UPDATE ORGANIZATION
    ===========================================================================================================*/

    "updateOrganization" 	: function updateOrganization ( callback, param )
    { 
    	var sql = "UPDATE organizations SET institution = ?, title = ?, started = ?, ended = ? WHERE id = ?";
    	pool.query ( sql, [ param.institution, param.title, param.started, param.ended, param.id ], function ( err, results )
    	{ 
    		if ( err ) throw err;
    		callback ( results );
    	}); 
    },

    "deleteOrganization"    : function deleteOrganization ( callback, param )
    { 
        var sql = "DELETE FROM organizations WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        }); 
    }
};