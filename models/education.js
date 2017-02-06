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
                                    DISPLAY EMPLOYEE EDUCATION INFO IN TABLE
    ===========================================================================================================*/

    "selectAllEducation"       : function selectAllEducation ( callback, param )
    {
        console.log(param)
        var sql = "SELECT * FROM educations WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    /*========================================================================================================
                                               SAVE EDUCATION
    ===========================================================================================================*/

    "addNewEducation"		: function addNewEducation ( callback, param )
    {
    	var sql = "INSERT INTO educations SET ?";
        console.log ( param );
    	pool.query( sql, param, function ( err, results )
    	{
            console.log( results );
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                         	   UPDATE EDUCATION
    ===========================================================================================================*/

    "updateEducation" 	: function updateEducation ( callback, param )
    {
    	var sql = "UPDATE educations SET levelType = ?, course = ?, school = ?, yearGrad = ? WHERE id = ?";
    	pool.query ( sql, [ param.levelType, param.course, param.school, param.yearGrad, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    /*========================================================================================================
                                               DELETE EDUCATION
    ===========================================================================================================*/

    "deleteEducation"   : function deleteEducation ( callback, param )
    {
        var sql = "DELETE FROM educations WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};