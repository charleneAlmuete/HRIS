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
                                                SAVE LOAN
    ===========================================================================================================*/

    "addNewLoan"    : function addNewLoan ( callback, param )
    {
        var sql = "INSERT INTO loans SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if ( err ) throw err;
            callback ( results );
        });
    }, 

    /*========================================================================================================
                                                UPDATE LOAN
    ===========================================================================================================*/

    "updateLoan"    : function updateLoan( callback, param )
    {
        var sql = "UPDATE loans SET loanType_id= ?, lendingCompany_id= ?, amount= REPLACE(?, ',', ''), term= ?, monthlyAmortization= REPLACE(?, ',', ''), startDate= ?, endDate= ?, remarks= ? WHERE id= ?";
        pool.query( sql, [ param.loanType_id, param.lendingCompany_id, param.amount, param.term, param.monthlyAmortization, param.startDate, param.endDate, param.remarks, param.id ], function( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    "updateLending"    : function updateLending( callback, param )
    {
        var sql = "UPDATE lendingcompany SET name= ? WHERE id= ?";
        pool.query( sql, [ param.name, param.id ], function( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    "updateLoanType"    : function updateLoanType( callback, param )
    {
        var sql = "UPDATE loantype SET loanType= ? WHERE id= ?";
        pool.query( sql, [ param.loanType, param.id ], function( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                               RETRIEVE LOAN
    ===========================================================================================================*/

    "selectLoan"       : function selectLoan ( callback, param )
    { 
        var sql = "SELECT l.id, l.employee_id, concat(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, (lt.loanType) AS type, l.loanType_id, (lc.name) AS lendingcompany,  l.lendingCompany_id, FORMAT(l.amount, 2) AS amount, l.term, FORMAT(l.monthlyAmortization, 2) AS amortization, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, l.remarks FROM loans l LEFT JOIN loantype lt ON lt.id= l.loanType_id LEFT JOIN lendingcompany lc ON lc.id= l.lendingCompany_id LEFT JOIN employees emp ON emp.id= l.employee_id";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectLoanId"       : function selectLoanId ( callback, param )
    { 
        var sql = "SELECT l.id, l.employee_id, concat(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, (lt.loanType) AS type, l.loanType_id, (lc.name) AS lendingcompany,  l.lendingCompany_id, FORMAT(l.amount, 2) AS amount, l.term, FORMAT(l.monthlyAmortization, 2) AS amortization, DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate, l.remarks FROM loans l LEFT JOIN loantype lt ON lt.id= l.loanType_id LEFT JOIN lendingcompany lc ON lc.id= l.lendingCompany_id LEFT JOIN employees emp ON emp.id= l.employee_id WHERE l.employee_id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectLoanType"       : function selectLoanType ( callback, param )
    { 
        var sql = "SELECT * FROM loantype";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "selectLending"       : function selectLending ( callback, param )
    { 
        var sql = "SELECT * FROM lendingcompany";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "deleteLoan"       : function deleteLoan ( callback, param )
    { 
        var sql = "DELETE FROM loans WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "deleteLending"       : function deleteLending ( callback, param )
    { 
        var sql = "DELETE FROM lendingcompany WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    },

    "deleteLoanType"       : function deleteLoanType ( callback, param )
    { 
        var sql = "DELETE FROM loantype WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    }
};
