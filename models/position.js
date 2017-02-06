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
                                            SAVE POSITION & SKILLS
    ===========================================================================================================*/

    "addNewPosition"    : function addNewPosition ( callback, param )
    {
        var sql = "INSERT INTO positions SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "addNewPositionSkills"    : function addNewPositionSkills ( callback, param )
    { 
        var sql = "INSERT INTO positionskill SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                        UPDATE POSITION & SKILLS
    ===========================================================================================================*/

    "updatePosition"    : function updatePosition ( callback, param )
    { 
        var sql = "UPDATE positions SET name = ? WHERE id = ?";
        pool.query ( sql, [ param.name, param.id ], function ( err, results )
        {     
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updatePositionSkills"    : function updatePositionSkills ( callback, param )
    {
        console.log(param)
        var sql = "UPDATE positionskill SET position_id = ?, skills = ? WHERE id = ?";
        pool.query ( sql, [ param.position_id, param.skills, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                            RETRIEVE POSITION & SKILLS
    ===========================================================================================================*/
  
    "selectPositionSkill"    : function selectPositionSkill ( callback, param )
    {
        var sql = "SELECT (p.id) AS posId, ps.id, p.name, ps.position_id, ps.skills FROM positions p, positionskill ps WHERE ps.position_id= p.id";
        pool.query( sql, param, function ( err, results )
        {
            callback ( results );
        });
    },

    "deletePositionWithSkill"    : function deletePositionWithSkill ( callback, param )
    { 
        var sql = "DELETE FROM positionskill WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {     
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deletePositionType"    : function deletePositionType ( callback, param )
    { 
        var sql = "DELETE FROM positions WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {     
            if ( err ) throw err;
            callback ( results );
        });
    }
};
