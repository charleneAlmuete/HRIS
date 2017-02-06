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
                                               SAVE INCIDENTS / ACCIDENTS
    ===========================================================================================================*/

    "addNewIncident"    : function addNewIncident ( callback, param )
    {
        var sql = "INSERT INTO incident SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                               UPDATE INCIDENTS / ACCIDENTS
    ===========================================================================================================*/

    "updateIncident"    : function updateIncident ( callback, param )
    { 
        var sql = "UPDATE incident SET occurence= ?, natureOfAccident= ?, injuryType= ?, coreActivity= ?, location= ?, details= ?, dateOfOccurence= ?, employee_id=?, damagedProperty= ? WHERE id= ?";
        pool.query( sql, [ param.occurence, param.natureOfAccident, param.injuryType, param.coreActivity, param.location, param.details, param.dateOfOccurence, param.employee_id, param.damagedProperty, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results ); 
        });
    }, 

    /*========================================================================================================
                                            RETRIEVE INCIDENTS / ACCIDENTS
    ===========================================================================================================*/

    "selectIncident"    : function selectIncident ( callback, param )
    {
        var sql = "SELECT inc.id, inc.occurence, inc.natureOfAccident, inc.injuryType, inc.coreActivity, inc.location, inc.details, DATE_FORMAT(inc.dateOfOccurence, '%Y-%m-%d') AS dateOfOccurence, CONCAT(emp.fName, ' ', emp.lName) AS employee, inc.damagedProperty FROM incident inc LEFT JOIN employees emp ON inc.employee_id= emp.id";
        pool.query( sql, param, function ( err, results )
        { 
            callback ( results );
        });
    }
};
