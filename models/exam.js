var mysql	= require( 'mysql' )
,	pool	= mysql.createPool(
{
	connectionLimit		: 10,
	host				: 'localhost',
	user				: 'root',
	password			: '',
	database			: 'hris'
});

pool.getConnection ( function ( err, connection )
{
	if ( err ) throw err;
	console.log( "connected" );
});

module.exports = {


    /*========================================================================================================
                                    DISPLAY EMPLOYEE PERSONAL INFO IN TABLE
    ===========================================================================================================*/

    "selectExam" : function selectExam ( callback, param )
    { 
        var sql = "SELECT * FROM licensures WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                            	SAVE EXAMS
    ===========================================================================================================*/

    "addNewExam"	: function addNewExam ( callback, param )
    {
    	var sql = "INSERT INTO licensures SET ?";
    	pool.query (sql, param, function ( err, results )
    	{
    		if ( err ) throw err;
    		callback( results ); 
    	});
    },

    /*========================================================================================================
                                         	 UPDATE EXAMS
    ===========================================================================================================*/

    "updateExam"	: function updateExam ( callback, param )
    {
    	var sql = "UPDATE licensures SET name = ?, rating = ?, licenseNo = ?, image = ? WHERE id = ?";
    	pool.query ( sql, [ param.name, param.rating, param.licenseNo, param.image, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    "deleteExam"    : function deleteExam ( callback, param )
    {
        var sql = "DELETE FROM licensures WHERE id = ?";
        pool.query ( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }
};