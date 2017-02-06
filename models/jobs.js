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

    "selectJob" : function selectJob ( callback, param )
    { 
        var sql = "SELECT j.id, j.branch_id, (p.name) AS position, j.position_id, (c.code) AS company, j.company_id, (b.name) AS branch, j.empStatus, j.dutiesResponsibility, j.qualification, j.dateFiled, j.status FROM jobs j LEFT JOIN  branches b ON b.id= j.branch_id LEFT JOIN positions p ON p.id= j.position_id LEFT JOIN companies c ON c.id= j.company_id LEFT JOIN jobskill js ON js.job_id= j.id";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "selectPosSkills": function selectPosSkills ( callback, param )
    {  
        var sql = "SELECT ps.id, ps.skills FROM positionskill ps, positions pos WHERE ps.position_id= pos.id and ps.position_id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    /*========================================================================================================
                                            	SAVE EXAMS
    ===========================================================================================================*/

    "addNewJob"	: function addNewJob ( callback, param )
    {
    	var sql = "INSERT INTO jobs SET ?";
    	pool.query (sql, param, function ( err, results )
    	{ 
    		if ( err ) throw err;
    		callback( results ); 
    	});
    },

    "addPosSkills" : function addPosSkills ( callback, param )
    {  
        console.log(param)
        var sql = "INSERT INTO jobskill SET ?";
        pool.query (sql, [param], function ( err, results )
        {
            console.log(results)
            if ( err ) throw err;
            callback( results ); 
        });
    },

    /*========================================================================================================
                                         	 UPDATE EXAMS
    ===========================================================================================================*/

    "updateJob"	: function updateJob ( callback, param )
    {
    	var sql = "UPDATE jobs SET position_id= ?, company_id= ?, branch_id= ?, empStatus= ?, dutiesResponsibility= ?, qualification= ?, positionskill_id= ?, dateFiled= ?, status= ? WHERE id= ?";
    	pool.query ( sql, [ param.position_id, param.company_id, param.branch_id, param.empStatus, param.dutiesResponsibility, param.qualification, param.positionskill_id, param.dateFiled, param.status, param.id ], function ( err, results )
    	{
    		if ( err ) throw err;
    		callback ( results );
    	});
    },

    "unavailableJob" : function unavailableJob ( callback, param )
    {  
        var sql = "UPDATE jobs SET status= ? WHERE id= ?";
        pool.query ( sql, [ "Not Available", param.id ], function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "availableJob" : function availableJob ( callback, param )
    {  
        var sql = "UPDATE jobs SET status= ? WHERE id= ?";
        pool.query ( sql, [ "Available", param.id ], function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    },

    "deleteJobs" : function deleteJobs ( callback, param )
    {  
        var sql = "DELETE FROM jobs WHERE id= ?";
        pool.query ( sql, param, function ( err, results )
        { 
            if ( err ) throw err;
            callback ( results );
        });
    }
};