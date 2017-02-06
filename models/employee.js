var mysql   = require ( 'mysql' )
,   pool    = mysql.createPool(
{
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'hris'
});

pool.getConnection( function ( err, connection )
{
    if ( err ) throw err;
    console.log( "connected" );
});


module.exports = {

    /*========================================================================================================
                                    DISPLAY LIST OF EMPLOYEES IN SEARCH TABLE
    ===========================================================================================================*/

    "selectAllEmployee" : function selectAllEmployee ( callback )
    { 
        var sql = "SELECT (users.id) AS user_id, emp.employee_id, emp_status, rol.role, emp.role_id, emp.id, emp.image, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, DATE_FORMAT(emp.dateHired, '%Y-%m-%d') AS dateHired, (pos.name) AS position, (com.name) AS company, com.code, (bra.name) AS branch, serv.employmentStatus  FROM employees emp  LEFT JOIN positions pos ON pos.id= emp.position_id LEFT JOIN branches bra ON bra.id= emp.branch_id LEFT JOIN companies com ON com.id= emp.company_id LEFT JOIN role rol ON rol.id= emp.role_id LEFT JOIN users ON users.employee_id= emp.id LEFT JOIN services serv ON serv.employee_id= emp.id GROUP BY emp.employee_id ORDER BY lName";
        pool.query( sql, function ( err, results )
        {
            callback( results );
        });
    },

    "selectUserTable" : function selectUserTable ( callback )
    { 
        var sql = "SELECT u.id, CONCAT(emp.lName, ' ', emp.fName, ' ', emp.mi) AS employee, u.password, r.role, u.role_id, (com.code) AS company, (bra.name) AS branch, (pos.name) AS position, u.userStatus FROM users u LEFT JOIN employees emp ON emp.id= u.employee_id LEFT JOIN role r ON r.id= u.role_id LEFT JOIN companies com ON com.id= emp.company_id LEFT JOIN branches bra ON bra.id= emp.branch_id LEFT JOIN positions pos ON pos.id= emp.position_id";
        pool.query( sql, function ( err, results )
        {
            callback( results );
        });
    }, 
 

     /*========================================================================================================
                                    DISPLAY NAVBAR INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectNavbarEmployee" : function selectNavbarEmployee ( callback, param )
    { 
        //var sql = "SELECT emp.id, emp.employee_id, emp.shiftgroup_id, emp.image, emp.fName, emp.mi, emp.lName, DATE_FORMAT(emp.dateHired, '%Y-%m-%d') AS dateHired, emp.position_id, (pos.name) AS position, emp.company_id, emp.branch_id, emp.salary, emp.sss, emp.phic, emp.hdmf, emp.tax, role.role FROM employees emp LEFT JOIN positions pos ON  pos.id= emp.position_id LEFT JOIN shiftsgroup sh ON  sh.id= emp.shiftgroup_id LEFT JOIN role ON role.id= emp.role_id WHERE  emp.id = ?";
        var sql = "SELECT emp.id, emp.employee_id, emp.shiftgroup_id, (shift.shiftName) AS shift,   emp.fName, emp.mi, emp.lName, DATE_FORMAT(emp.dateHired, '%Y-%m-%d') AS dateHired, emp.position_id, (pos.name) AS position, emp.company_id, (com.code) AS company, emp.branch_id, (bra.name) AS branch, role.role, emp.emp_status FROM employees emp LEFT JOIN positions pos ON  pos.id= emp.position_id LEFT JOIN shiftsgroup sh ON  sh.id= emp.shiftgroup_id LEFT JOIN shiftsgroup shift ON shift.id= emp.shiftgroup_id LEFT JOIN role ON role.id= emp.role_id LEFT JOIN companies com ON com.id= emp.company_id LEFT JOIN branches bra ON bra.id= emp.branch_id WHERE  emp.id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    }, 
    
     /*========================================================================================================
                                    DISPLAY PERSONAL INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectEmployee" : function selectEmployee ( callback, param )
    {
        var sql = "SELECT biometric_id, employee_id, placeBirth, DATE_FORMAT(dateBirth, '%Y-%m-%d') AS dateBirth, gender, civilStatus, taxstatus_id, citizenship, religion, language, height, weight, bloodType, hair, complexion, sssNo, phicNo, hdmfNo, taxNo FROM employees emp LEFT JOIN taxstatus tax ON emp.taxstatus_id= tax.id WHERE emp.employee_id <> '' AND emp.id = ?";
        pool.query( sql, param, function ( err, results )
        {
            callback( results );
        });
    },

    /*========================================================================================================
                                    DISPLAY BASIC CONTACT IN TEXTBOXES
    ===========================================================================================================*/

    "selectEmployeeBasicContact" : function selectEmployeeBasicContact ( callback, param )
    { 
        /*var sql = "SELECT resAdd, resTel, resMobile1, resMobile2, resEmail, perAdd, proAdd FROM employees WHERE resAdd <> '' AND id = ?";*/
        var sql = "SELECT resAdd, resTel1, resTel2, resMobile1, resMobile2, resEmail, perAdd, proAdd, fatherName, faAdd, faOccupation, faCompany, faNo, motherName, moAdd, moOccupation, moCompany, moNo, spouseName, spAdd, spOccupation, spCompany, spNo FROM employees WHERE id = ?";
        pool.query( sql, param, function ( err, results )
        { 
            callback( results );
        });
    }, 

     /*========================================================================================================
                                    DISPLAY CHILDREN INFO IN TEXTBOXES
    ===========================================================================================================*/

    "selectChildren" : function selectChildren ( callback, param )
    {  
        var sql = "SELECT id, employee_id, name, gender, DATE_FORMAT(dateBirth, '%Y-%m-%d') AS dateBirth, civilStatus, occupation, company FROM empchildren WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {   
            callback( results );
        });
    },

     /*========================================================================================================
                                    GET ROLE ID THROUGH EMPLOYEE ID 
    ===========================================================================================================*/

    "selectRoleId" : function selectRoleId ( callback, param )
    {   
        var sql = "SELECT role_id FROM users WHERE employee_id = ?";
        pool.query( sql, param, function ( err, results )
        {     
            callback( results );
        });
    },

    /*========================================================================================================
                                            GET TAX STATUS 
    ===========================================================================================================*/

    "selectTaxStatus" : function selectTaxStatus ( callback, param )
    {   
        var sql = "SELECT * FROM taxstatus";
        pool.query( sql, param, function ( err, results )
        {     
            callback( results );
        });
    },

    /*========================================================================================================
                                        SAVE EMPLOYEES IN NAVBAR FIELDS
    ===========================================================================================================*/

    "addNewEmployeeNavbar"    : function addNewEmployeeNavbar ( callback, param )
    {  
        var sql = "INSERT INTO employees SET ?";  
        pool.query( sql, param, function ( err, results )
        {
            if (err) throw err;
            callback( results.insertId ); 
        });  
    }, 

    /*"selectLastEmployeeId"    : function selectLastEmployeeId ( callback )
    { 
        var sql = "SELECT @@last_insert_id AS last_id;"; 
        pool.query( sql, function ( err, results )
        { 
            console.log(results)
            callback( results);
        });

    },*/

    "insertLastEmployeeId"    : function insertLastEmployeeId ( callback, param )
    {  
        var crypto = require('crypto');
        var name= param.fName + param.lName;
        var hash = crypto.createHash('md5').update(name).digest('hex');
  
        var fields = { employee_id: param.employee_id, username: param.fName.toLowerCase() + '.' + param.lName.toLowerCase() , password: hash, role_id: param.role_id, userStatus: 'New' }

        var sql = "INSERT INTO users SET ?";
        pool.query( sql, fields, function ( err, results )
        {
            if (err) throw err;
            callback( results);
        });  
 

    },   
 
    /*========================================================================================================
                                                SAVE USER
    ===========================================================================================================*/

    "addNewUser"    : function addNewUser ( callback, param )
    {   
        var crypto = require('crypto');
        var pass= param.password;
        var hash = crypto.createHash('md5').update(pass).digest('hex'); 

        var sql = "UPDATE users SET password= ?, userStatus= ? WHERE id= ?";
        pool.query( sql, [ hash, 'Active', param.id ], function ( err, results )
        {
            if (err) throw err;
            callback( results ); 
        });
    }, 

    /*========================================================================================================
                                                SAVE CHILDREN
    ===========================================================================================================*/

    "addNewChildren"    : function addNewChildren ( callback, param )
    {
        var sql = "INSERT INTO empchildren SET ?";
        pool.query( sql, param, function ( err, results )
        {
            if (err) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                            UPDATE NAVBAR FIELD
    ===========================================================================================================*/

    "updateNavbarField"    : function updateNavbarField ( callback, param )
    { 
        var sql = "UPDATE employees SET image= ?,  shiftgroup_id= ?, employee_id= ?, fName= ?, mi= ?, lName= ?, dateHired= ?, position_id= ?, company_id= ?, branch_id= ? WHERE id = ?";
        pool.query( sql, [ param.image, param.shiftgroup_id, param.employee_id, param.fName, param.mi, param.lName, param.dateHired, param.position_id, param.company_id, param.branch_id, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    "updateEmploymentStatus"    : function updateEmploymentStatus ( callback, param )
    { 
        var sql = "UPDATE employees SET emp_status= ? WHERE id = ?";
        pool.query( sql, [ param.emp_status, param.id ], function ( err, results )
        { 
            if ( err ) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                            UPDATE CHILDREN
    ===========================================================================================================*/

    "updateChildren"    : function updateChildren ( callback, param )
    {
        var sql = "UPDATE empchildren SET image= ?, name= ?, gender= ?, dateBirth= ?, civilStatus= ?, occupation= ?, company= ? WHERE id = ?";
        pool.query( sql, [ param.image, param.name, param.gender, param.dateBirth, param.civilStatus, param.occupation, param.company, param.id ], function ( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                            UPDATE PERSONAL INFO
    ===========================================================================================================*/

    "updateEmployee"    : function updateEmployee ( callback, param )
    { 
        //var sql = "UPDATE employees SET employee_id= ?, fName = ?, lName = ?,placeBirth = ?, dateBirth = ?, gender = ?, civilStatus = ?, citizenship = ?, religion = ?,language = ?, height = ?, weight = ?, bloodType = ?, hair = ?, complexion = ?, image= ?, dateHired= ?, position_id= ?, company_id= ?, branch_id= ?, salary= ?, sss= ?, phic= ?, hdmf= ?, tax= ? WHERE id = ?";
        //var sql = "UPDATE employees SET biometric_id= ?, placeBirth = ?, dateBirth = ?, gender = ?, civilStatus = ?, citizenship = ?, religion = ?,language = ?, height = ?, weight = ?, bloodType = ?, hair = ?, complexion = ?, salary= REPLACE(?, ',', ''), sss= REPLACE(?, ',', ''), phic= REPLACE(?, ',', ''), hdmf= REPLACE(?, ',', ''), tax= REPLACE(?, ',', '') WHERE id = ?";
        var sql = "UPDATE employees SET biometric_id= ?, placeBirth = ?, dateBirth = ?, gender = ?, civilStatus = ?, taxstatus_id = ?, citizenship = ?, religion = ?,language = ?, height = ?, weight = ?, bloodType = ?, hair = ?, complexion = ?, sssNo= ?, phicNo= ?, hdmfNo= ?, taxNo= ? WHERE id = ?";
        pool.query( sql, [ param.biometric_id, param.placeBirth, param.dateBirth, param.gender, param.civilStatus, param.taxstatus_id, param.citizenship, param.religion, param.language, param.height, param.weight, param.bloodType, param.hair, param.complexion, param.sssNo, param.phicNo, param.hdmfNo, param.taxNo, param.id ], function ( err, results )
        { 
            if ( err ) throw err;
            callback( results );
        });
    },

    /*========================================================================================================
                                            UPDATE BASIC CONTACT INFO
    ===========================================================================================================*/

    "updateBasicContact"    : function updateBasicContact ( callback, param )
    {
        var sql = "UPDATE employees SET resAdd = ?, resTel1= ?, resTel2 = ?, resMobile1 = ?, resMobile2 = ?, resEmail = ?, perAdd = ?, proAdd = ?, fatherName = ?, faAdd = ?, faOccupation = ?, faCompany = ?, faNo = ?, motherName = ?, moAdd = ?, moOccupation = ?, moCompany = ?, moNo = ?, spouseName = ?, spAdd = ?, spOccupation = ?, spCompany = ?, spNo = ?  WHERE id= ?";
        pool.query( sql, [ param.resAdd, param.resTel1, param.resTel2, param.resMobile1, param.resMobile2, param.resEmail, param.perAdd, param.proAdd, param.fatherName, param.faAdd, param.faOccupation, param.faCompany, param.faNo, param.motherName, param.moAdd, param.moOccupation, param.moCompany, param.moNo, param.spouseName, param.spAdd, param.spOccupation, param.spCompany, param.spNo, param.id ], function( err, results )
        {
            if ( err ) throw err;
            callback( results );
        });
    }, 

    /*========================================================================================================
                                                    GET ID WHEN LOGIN
    ===========================================================================================================*/

    "verifyUser" : function verifyUser ( callback, param )
    {   
       /* var sql = "SELECT id, CONCAT(fName, mi, lName) AS fName, role_id FROM employees WHERE CONCAT(fName, mi, lName) = ?";*/
         var sql = "SELECT id, employee_id, username, role_id, userStatus FROM users WHERE username = ?";
        pool.query( sql, param, function ( err, results )
        {    
            callback( results );
        });
    }, 

    /*========================================================================================================
                                                    LOGIN ELSE
    ===========================================================================================================*/

    "differentPass" : function differentPass ( callback, param )
    {    
        var sql = "SELECT password,username FROM users WHERE  username= ?";
        pool.query( sql, param, function ( err, results )
        {    
            callback( results );
        });
    },

    /*========================================================================================================
                                                    DELETE CHILDREN
    ===========================================================================================================*/

    "deleteChildren" : function deleteChildren ( callback, param )
    {      
        var sql = "DELETE FROM empChildren WHERE id= ?";
        pool.query( sql, param, function ( err, results )
        {    
            if ( err ) throw err;
            callback( results );  
        });
    }   
};