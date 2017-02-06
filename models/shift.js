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
                                               ADD SHIFT
    ===========================================================================================================*/

    "addNewShift"    : function addNewShift ( callback, param )
    {
        var sql = "INSERT INTO shifts SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "addNewShiftGroup"    : function addNewShiftGroup ( callback, param )
    {
        var sql = "INSERT INTO shiftsgroup SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    "updateShift"    : function updateShift ( callback, param )
    {
        var sql = "UPDATE shifts SET dayShift= ?, timein= ?, timeout= ?, shiftgroup_id= ? WHERE id= ?";
        pool.query( sql, [ param.dayShift, param.timein, param.timeout, param.shiftgroup_id, param.id], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }, 

    "updateShiftGroup"    : function updateShiftGroup ( callback, param )
    {
        var sql = "UPDATE shiftsgroup SET shiftName= ? WHERE id= ?";
        pool.query( sql, [ param.shiftName, param.id], function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    },

    /*========================================================================================================
                                    DISPLAY SHIFT TYPE  IN COMBOBOX
    ===========================================================================================================*/

    "selectShiftGroup" : function selectShiftGroup ( callback, param )
    {
        var sql = "SELECT * FROM shiftsgroup  ORDER BY shiftName";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "selectShift" : function selectShift ( callback, param )
    {
        var sql = "SELECT s.id, s.dayShift, (sg.id) AS shiftgroup_id, s.timein, s.timeout, sg.shiftName FROM shifts s, shiftsgroup sg WHERE s.shiftgroup_id= sg.id ORDER BY sg.shiftName";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "deleteShiftType" : function deleteShiftType ( callback, param )
    {
        var sql = "DELETE FROM shiftsgroup WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    "deleteSchedule" : function deleteSchedule ( callback, param )
    {
        var sql = "DELETE FROM shifts WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    }
};
