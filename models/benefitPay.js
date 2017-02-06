var mysql	= require( 'mysql' )
,	pool	= mysql.createPool(
{
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
                                               RETRIEVE BENEFIT SHOW
    ===========================================================================================================*/

	"selectBenefitShow"     : function selectBenefitShow( callback )
    {
        var sql = "SELECT CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, (b.name) AS benefit, FORMAT(sb.amount, 2) AS amount FROM servicebenefit sb, benefits b, employees emp WHERE b.id= sb.benefit_id AND sb.employee_id= emp.id ORDER BY CONCAT(emp.fName, ' ', emp.lName)";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                               RETRIEVE BANKING SHOW
    ===========================================================================================================*/

	"selectBankingShow"     : function selectBankingShow( callback )
    {
        var sql = "SELECT b.id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, b.bank, b.accountNo FROM bank b, employees emp WHERE emp.id= b.employee_id";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    }, 

    "selectBankingShowId"     : function selectBankingShowId( callback, param )
    {
        var sql = "SELECT b.id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, b.bank, b.accountNo FROM bank b, employees emp WHERE emp.id= b.employee_id AND b.employee_id= ?";
        pool.query( sql, param, function( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                            RETRIEVE COMPENSATION SHOW
    ===========================================================================================================*/

    "selectCompensationShow"     : function selectCompensationShow( callback )
    {
        var sql = "SELECT CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, pos.name, ser.employmentStatus, FORMAT(ser.basicSalary,2) AS basicSalary, FORMAT(ser.sss,2) AS sss, FORMAT(ser.phic,2) AS phic, FORMAT(ser.hdmf,2) AS hdmf, FORMAT(ser.tax,2) AS tax FROM employees emp, positions pos, services ser WHERE emp.id= ser.employee_id AND pos.id= ser.position_id ORDER BY CONCAT(emp.fName, ' ', emp.lName)";
        pool.query( sql, function( err, results )
        {
            callback( results );
        });
    },

    "deleteBanking"     : function deleteBanking( callback, param )
    {
        var sql = "DELETE FROM bank WHERE id= ?";
        pool.query( sql, param,  function( err, results )
        {
            callback( results );
        });
    }

}