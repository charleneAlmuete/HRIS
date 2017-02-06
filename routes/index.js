	var express 	 = require( 'express' )
, 	employee	 = require( '../models/employee.js' )
,	awards		 = require( '../models/awards.js' )
,	education	 = require( '../models/education.js' )
, 	exam		 = require( '../models/exam.js' )
,	medical		 = require( '../models/medical.js' )
,	organization = require( '../models/organization.js' )
,	service		 = require( '../models/service.js' )
,	skills		 = require( '../models/skills.js' )
,	training	 = require( '../models/training.js' )
,	work		 = require( '../models/work.js' )
,	allowance	 = require( '../models/allowance.js' )
,	benefit	 	 = require( '../models/benefit.js' )
,	branch	 	 = require( '../models/branch.js' )
,	position	 = require( '../models/position.js' )
,	company	 	 = require( '../models/company.js' )
,	violation	 = require( '../models/violation.js' ) 
,	leaveApp	 = require( '../models/leaveApp.js' ) 
,	loan	 	 = require( '../models/loan.js' )
,	jobs	 	 = require( '../models/jobs.js' )
,	performance	 = require( '../models/performance.js' )
,	trainDev	 = require( '../models/trainDev.js' )
,	recognition	 = require( '../models/recognition.js' )
,	incident	 = require( '../models/incident.js' )
,	benefitPay	 = require( '../models/benefitPay.js' )
,	main	 	 = require( '../models/main.js' )
,	role	 	 = require( '../models/role.js' )
,	credits	 	 = require( '../models/leaveCredits.js' )
,	shift	 	 = require( '../models/shift.js' )
,	overtime	 = require( '../models/overtime.js' )
,	bank	 	 = require( '../models/bank.js' )
,	router 		 = express.Router()
,	multer  	 = require('multer')
,	upload 		 = multer({ dest: 'public/uploads/' });
/*var images		 = require('./images.js');*/


/*==============================================
				GET HOMEPAGE
================================================*/

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/*router.post('/updateNavbarField', upload.single(), function(req, res) {
	res.send(req.file); 
	console.log(req.file)
});*/
 
			/*========================================================================================================
			                                       		LOGIN
			===========================================================================================================*/

/*==============================================
				VERIFY USER
================================================*/

router.get( '/verifyUser/:empId', function ( req, res ) 
{
	employee.verifyUser( function ( result )
	{
		res.json( result ); 
	}, req.params.empId)
});

router.get( '/differentPass/:account', function ( req, res ) 
{
	employee.differentPass( function ( result )
	{
		res.json( result ); 
	}, req.params.account)
});
  
			/*========================================================================================================
			                                       		PERSONAL INFORMATION
			===========================================================================================================*/

/*==============================================
			INSERT FIELD IN USER TABLE 
================================================*/

/*router.post('/insertUserFieldTable/:userFieldId', function ( req, res )
{ 
	employee.insertUserFieldTable( function ( result )
	{ 
		console.log(result)
        res.json( result ); 
    }, req.params.userFieldId ); 
});*/
   
/*==============================================
				ADD EMPLOYEE NAVBAR
================================================*/

router.post('/addEmployeeNavbar', function ( req, res )
{ 
	employee.addNewEmployeeNavbar( function ( result )
	{ 
        res.json( result ); 
    }, req.body ); 
});

router.get('/selectLastEmployeeId', function ( req, res )
{ 
	employee.selectLastEmployeeId( function ( result )
	{ 
        res.json( result ); 
    }, req.body ); 
});

router.post('/insertLastEmployeeId', function ( req, res )
{ 
	employee.insertLastEmployeeId( function ( result )
	{ 
        res.json( result ); 
    }, req.body ); 
}); 

/*==============================================
				ADD USER
================================================*/

router.post('/addUser', function ( req, res )
{ 
	employee.addNewUser( function ( result )
	{ 
        res.json( result ); 
    }, req.body ); 
});

/*==============================================
				ADD CHILDREN
================================================*/

router.post('/addChildren', function ( req, res )
{ 
	employee.addNewChildren( function ( result )
	{ 
        res.json( result ); 
    }, req.body ); 
});
 

/*==============================================
				RETRIEVE EMPLOYEE
================================================*/

router.get( '/getAllEmployee', function ( req, res ) 
{
	employee.selectAllEmployee( function ( result )
	{
		res.json( result ); 
	})
});

router.get( '/getUserTable', function ( req, res ) 
{
	employee.selectUserTable( function ( result )
	{
		res.json( result ); 
	})
});

/*==============================================
		RETRIVE  EMPLOYEE INFO IN TEXTBOXES
================================================*/

router.get( '/getEmployee/:id', function ( req, res ) 
{
	employee.selectEmployee( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

/*==============================================
	RETRIVE  EMPLOYEE INFO IN NAVBAR TEXTBOXES
================================================*/

router.get( '/getNavbarEmployee/:id', function ( req, res ) 
{
	employee.selectNavbarEmployee( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

/*==============================================
	RETRIVE BASIC CONTACT IN TEXTBOXES
================================================*/

router.get( '/getEmployeeBasicContact/:id', function ( req, res ) 
{
	employee.selectEmployeeBasicContact( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});
 

/*==============================================
				RETRIVE  CHILDREN 
================================================*/

router.get( '/getChildren/:id', function ( req, res )
{
	employee.selectChildren( function ( result )
	{  
		res.json( result );
	}, req.params.id) 
});

/*==============================================
				RETRIVE  CHILDREN 
================================================*/

router.get( '/getRoleId/:id', function ( req, res )
{
	employee.selectRoleId( function ( result )
	{   
		res.json( result );
	}, req.params.id) 
});

/*==============================================
				TAX STATUS
================================================*/

router.get( '/getTaxStatus', function ( req, res )
{
	employee.selectTaxStatus( function ( result )
	{   
		res.json( result );
	}, req.body) 
});

/*==============================================
				UPDATE EMPLOYEE
================================================*/

router.post('/updateEmployee', function ( req, res )
{
	employee.updateEmployee( function ( result )
	{ 
        res.json( result );
    }, req.body ); 
});

router.post('/updateNavbarField', function ( req, res )
{
	employee.updateNavbarField( function ( result )
	{ 
        res.json( result );
    }, req.body ); 
});

router.post('/updateEmploymentStatus', function ( req, res )
{
	employee.updateEmploymentStatus( function ( result )
	{ 
        res.json( result );
    }, req.body ); 
});


/*==============================================
				UPDATE CHILDREN
================================================*/

router.post('/updateChildren', function ( req, res )
{
	employee.updateChildren( function ( result )
	{ 
        res.json( result );
    }, req.body ); 
});

router.delete('/deleteChildren/:id', function ( req, res )
{
	employee.deleteChildren( function ( result )
	{ 
        res.json( result );
    }, req.params.id ); 
});

/*==============================================
			UPDATE BASIC CONTACT
================================================*/

router.post('/updateBasicContact', function ( req, res )
{
	employee.updateBasicContact( function ( result )
	{ 
        res.json( result );
    }, req.body ); 
});
 

			/*========================================================================================================
			                                      AWARDS AND ACHIEVEMENTS
			===========================================================================================================*/

/*==============================================
				ADD AWARDS
================================================*/

router.post('/addAward', function ( req, res )
{
	awards.addNewAward( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE AWARDS
================================================*/

router.post('/updateAward', function ( req, res )
{
	awards.updateAwards( function ( result )
	{
		res.json( result );
	}, req.body);
});

/*==============================================
		RETRIVE  AWARDS INFO IN TABLE
================================================*/

router.get( '/getAward/:id', function ( req, res ) 
{
	awards.selectAward( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

/*==============================================
		DELETE  AWARDS INFO IN TABLE
================================================*/

router.delete( '/deleteAward/:id', function ( req, res ) 
{
	awards.deleteAward( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

			/*========================================================================================================
			                                      EDUCATIONAL BACKGROUND
			===========================================================================================================*/

/*==============================================
				ADD EDUCATION
================================================*/

router.post('/addEducation', function ( req, res )
{
	education.addNewEducation( function ( result ) 
	{ 
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE EDUCATION
================================================*/

router.post('/updateEducation', function ( req, res )
{
	education.updateEducation( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
		RETRIVE EDUCATION INFO IN TABLE
============================ss====================*/

router.get( '/getAllEducation/:id', function ( req, res ) 
{
	education.selectAllEducation( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

/*==============================================
		DELETE EDUCATION INFO IN TABLE
============================ss====================*/

router.delete( '/deleteEducation/:id', function ( req, res ) 
{
	education.deleteEducation( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});



			/*========================================================================================================
			                                      LICENSURE AND EXAMINATION
			===========================================================================================================*/

/*==============================================
					ADD EXAM
================================================*/

router.post('/addExam', function ( req, res )
{
	exam.addNewExam( function ( result )
	{
		res.json( result );
	}, req.body);
});

/*==============================================
				UPDATE EXAM
================================================*/

router.post('/updateExam', function ( req, res )
{
	exam.updateExam( function ( result)
	{
		res.json( result );
	}, req.body);
});

/*==============================================
		RETRIVE  EXAM INFO IN TABLE
================================================*/

router.get( '/getExam/:id', function ( req, res ) 
{
	exam.selectExam( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteExam/:id', function ( req, res ) 
{
	exam.deleteExam( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

			/*========================================================================================================
			                                      MEDICAL INFORMATION
			===========================================================================================================*/

/*==============================================
				ADD MEDICAL
================================================*/

router.post('/addMedical', function ( req, res )
{
	medical.addNewMedical( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE MEDICAL
================================================*/

router.post('/updateMedical', function ( req, res )
{
	medical.updateMedical( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
		RETRIVE  MEDICAL INFO IN TABLE
================================================*/

router.get( '/getMedical/:id', function ( req, res ) 
{
	medical.selectMedical( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

router.get( '/getMedHealth', function ( req, res ) 
{
	medical.selectMedHealth( function ( result )
	{
		res.json( result ); 
	}, req.body)
});

router.delete( '/deleteMedical/:id', function ( req, res ) 
{
	medical.deleteMedical( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

			/*========================================================================================================
			                                     		 ORGANIZATION
			===========================================================================================================*/

/*==============================================
				ADD ORGANIZATION
================================================*/

router.post('/addOrganization', function ( req, res )
{
	organization.addNewOrganization( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE ORGANIZATION
================================================*/

router.post('/updateOrganization', function ( req, res )
{
	organization.updateOrganization( function ( result )
	{
		res.json( result );
	}, req.body );
}); 

/*==============================================
		RETRIVE  ORGANIZATION INFO IN TABLE
================================================*/

router.get( '/getAllOrganization/:id', function ( req, res ) 
{
	organization.selectAllOrganization( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

router.delete( '/deleteOrganization/:id', function ( req, res ) 
{
	organization.deleteOrganization( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});



			/*========================================================================================================
			                                     		SKILLS
			===========================================================================================================*/

/*==============================================
				ADD SKILLS
================================================*/

router.post('/addSkill', function ( req, res )
{
	skills.addNewSkill( function ( result ) 
	{ 
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE SKILLS
================================================*/

router.post('/updateSkill', function ( req, res )
{
	skills.updateSkill( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
		RETRIVE  SKILL INFO IN TEXTBOXES
================================================*/

router.get( '/getSkill/:id', function ( req, res ) 
{
	skills.selectSkill( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteSkill/:id', function ( req, res ) 
{
	skills.deleteSkill( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

			/*========================================================================================================
			                                     	TRAINING AND SEMINARS
			===========================================================================================================*/

/*==============================================
				ADD TRAINING
================================================*/

router.post('/addTraining', function ( req, res )
{
	training.addNewTraining( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE TRAINING
================================================*/

router.post('/updateTraining', function ( req, res )
{
	training.updateTraining( function ( result )
	{
		res.json( result ); 
	}, req.body );
});

/*==============================================
	RETRIVE  TRAINING INFO IN TEXTBOXES
================================================*/

router.get( '/getTraining/:id', function ( req, res ) 
{
	training.selectTraining( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

			/*========================================================================================================
			                                     		WORK EXPERIENCES
			===========================================================================================================*/

/*==============================================
				ADD WORK
================================================*/

router.post('/addWork', function ( req, res )
{
	work.addNewWork( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE WORK
================================================*/

router.post('/updateWork', function ( req, res )
{
	work.updateWork( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
		RETRIVE  WORK INFO IN TEXTBOXES
================================================*/

router.get( '/getWork/:id', function ( req, res ) 
{
	work.selectWork( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteWork/:id', function ( req, res ) 
{
	work.deleteWork( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

			/*========================================================================================================
			                                     		TRAINING
			===========================================================================================================*/

/*==============================================
				ADD TRAINING
================================================*/

router.post('/addTraining', function ( req, res )
{
	training.addNewTraining( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE TRAINING
================================================*/

router.post('/updateTraining', function ( req, res )
{
	training.updateTraining( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				RETRIEVE TRAINING
================================================*/

router.get('/getAllTraining', function ( req, res )
{
	training.selectAllTraining( function ( result )
	{
		res.json( result );
	});
});

router.delete( '/deleteTraining/:id', function( req, res )
{
	training.deleteTraining( function( result )
	{
		res.json( result )
	}, req.params.id )
});


			/*========================================================================================================
			                                     			SERVICE
			===========================================================================================================*/

/*==============================================
		ADD, UPDATE, RETRIEVE SERVICE
================================================*/

router.post('/addService', function ( req, res )
{
	service.addNewService( function ( result ) 
	{
		res.json( result );
	}, req.body );
});
 
router.post('/updateService', function ( req, res )
{
	service.updateService( function ( result )
	{
		res.json( result );
	}, req.body );
});

router.get( '/getService/:id', function ( req, res ) 
{
	service.selectService( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteAppointment/:id', function ( req, res ) 
{
	service.deleteAppointment( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteLeave/:id', function ( req, res ) 
{
	service.deleteLeave( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteBenefit/:id', function ( req, res ) 
{
	service.deleteBenefit( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.delete( '/deleteAllowance/:id', function ( req, res ) 
{
	service.deleteAllowance( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.get( '/getServiceIntoTextboxes/:id', function ( req, res ) 
{
	service.selectServiceIntoTextboxes( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.get( '/getOtherLeaveService/:id', function ( req, res ) 
{
	service.selectOtherLeaveService( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.get( '/getleaveZero', function ( req, res ) 
{
	service.selectleaveZero( function ( result )
	{
		res.json( result );
	}, req.body )
});

router.get( '/getOtherBenefitService/:id', function ( req, res ) 
{
	service.selectOtherBenefitService( function ( result )
	{
		res.json( result );
	}, req.params.id )
});

router.get( '/getOtherAllowanceService/:id', function ( req, res ) 
{
	service.selectOtherAllowanceService( function ( result )
	{
		res.json( result );
	}, req.params.id )
});
 
/*==============================================
  RETRIVE POSITION, COMPANY, BRANCH IN COMBOBOX
================================================*/

router.get( '/getPosition', function ( req, res ) 
{
	service.selectPosition( function ( result )
	{
		res.json( result );
	}, req.param.id );
});

router.get( '/getCompany', function( req, res )
{
	service.selectCompany( function( result )
	{
		res.json( result );
	}, req.param.id);
}); 

router.get( '/getBranch', function( req, res )
{
	service.selectBranch( function( result )
	{
		res.json( result );
	}, req.param.id);
});

/*==============================================
 RETRIEVE ALLOWANCES, LEAVE, BENEFIT IN CHECKBOX
================================================*/

router.get( '/getAllowance', function( req, res )
{
	service.selectAllowance( function( result )
	{
		res.json( result );
	}, req.param.id);
}); 

router.get( '/getBenefit', function( req, res )
{
	service.selectBenefit( function( result )
	{
		res.json( result );
	}, req.body);
}); 

router.get( '/getLeave', function( req, res )
{ 
	service.selectLeave( function( result )
	{
		res.json( result );
	}, req.body);
});

router.get( '/getDays/:leaveId', function( req, res )
{ 
	service.selectDays( function( result )
	{   
		res.json( result );
	}, 	req.params.leaveId);
}); 

router.get( '/getLeaveWithDays', function( req, res )
{ 
	service.selectLeaveWithDays( function( result )
	{  
		res.json( result );
	}, 	req.body);
}); 



/*==============================================
		ADD, RETRIEVE BENEFIT TEMP TABLE
================================================*/

router.post('/addOtherBenefit', function ( req, res )
{
	service.addOtherBenefit( function ( result ) 
	{
		res.json( result );
	}, req.body );
}); 

router.get( '/getBenefitTemp/:id', function( req, res )
{
	service.selectBenefitTemp( function( result )
	{
		res.json( result );
	}, req.params.id);
})

/*==============================================
		ADD, RETRIEVE LEAVE TEMP TABLE
================================================*/

router.post('/addOtherLeave', function ( req, res )
{
	service.addOtherLeave( function ( result ) 
	{ 
		res.json( result );
	}, req.body );
}); 

router.get( '/getLeaveTemp/:id', function( req, res )
{
	service.selectLeaveTemp( function( result )
	{
		res.json( result );
	}, req.params.id);
})

/*==============================================
		ADD, RETRIEVE ALLOWANCE TEMP TABLE
================================================*/

router.post('/addOtherAllowance', function ( req, res )
{
	service.addOtherAllowance( function ( result ) 
	{
		res.json( result );
	}, req.body );
}); 

router.get( '/getAllowanceTemp/:id', function( req, res )
{
	service.selectAllowanceTemp( function( result )
	{
		res.json( result );
	}, req.params.id);
})

/*==============================================
				ADD DELETE LEAVE TABLE
================================================*/

router.post( '/addLeave', function( req, res )
{
	service.addLeave( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/addLeaveWithDays', function( req, res )
{
	service.addLeaveWithDays( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post('/updateLeaveWithDays', function ( req, res )
{
	service.updateLeaveWithDays( function ( result )
	{
		res.json( result );
	}, req.body );
});

router.post('/updateLeaveType', function ( req, res )
{
	service.updateLeaveType( function ( result )
	{
		res.json( result );
	}, req.body );
});


/*==============================================
			UPDATE-DELETE TEMPORARY TABLES
================================================*/

router.post( '/updateLeaveWithDays', function( req, res )
{  
	service.updateLeaveWithDays( function( result )
	{  
		res.json( result )
	}, req.body) 
});

router.post( '/updateOtherBenefit', function( req, res )
{  
	service.updateOtherBenefit( function( result )
	{  
		res.json( result )
	}, req.body) 
});

router.post( '/updateOtherAllowance', function( req, res )
{   
	service.updateOtherAllowance( function( result )
	{  
		res.json( result )
	}, req.body) 
});

 
 
 
			/*========================================================================================================
			                                     			ALLOWANCE
			===========================================================================================================*/

/*==============================================
				ADD ALLOWANCE
================================================*/

router.post('/addAllowance', function ( req, res )
{
	allowance.addNewAllowance( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				RETRIVE COMPANY
================================================*/

router.delete( '/deleteAllowanceType/:id', function ( req, res ) 
{
	allowance.deleteAllowanceType( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

/*==============================================
			UPDATE BENEFIT/INCENTIVES
================================================*/

router.post('/updateAllowance', function ( req, res )
{
	allowance.updateAllowance( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

			/*========================================================================================================
			                                     		BENEFIT/INCENTIVES
			===========================================================================================================*/

/*==============================================
			ADD BENEFIT/INCENTIVES
================================================*/

router.post('/addBenefit', function ( req, res )
{
	benefit.addNewBenefit( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

/*==============================================
			UPDATE BENEFIT/INCENTIVES
================================================*/

router.post('/updateBenefit', function ( req, res )
{
	benefit.updateBenefit( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

router.delete('/deleteBenifitType/:id', function ( req, res )
{
	benefit.deleteBenifitType( function ( result ) 
	{
		res.json( result );
	}, req.params.id );
});

			/*========================================================================================================
			                                     		BRANCH LOCATION
			===========================================================================================================*/

/*==============================================
			ADD BRANCH LOCATION
================================================*/

router.post( '/addBranch', function ( req, res )
{
	branch.addNewBranch( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
			UPDATE BENEFIT/INCENTIVES
================================================*/

router.post('/updateBranch', function ( req, res )
{
	branch.updateBranch( function ( result ) 
	{
		res.json( result );
	}, req.body );
});

router.delete('/deleteBranchType/:id', function ( req, res )
{
	branch.deleteBranchType( function ( result ) 
	{
		res.json( result );
	}, req.params.id );
});

			/*========================================================================================================
			                                     		POSITION
			===========================================================================================================*/

/*==============================================
				ADD POSITION & SKILLS
================================================*/

router.post( '/addPosition', function ( req, res )
{
	position.addNewPosition( function ( result )
	{
		res.json( result );
	}, req.body );
}); 

router.post( '/addPositionSkills', function( req, res )
{
	position.addNewPositionSkills( function ( result )
	{
		res.json( result );
	}, req.body );
})

/*==============================================
			UPDATE POSITION & SKILL
================================================*/
  
router.post( '/updatePosition', function ( req, res )
{
	position.updatePosition( function ( result )
	{ 
		res.json( result );
	}, req.body );
});  

router.post( '/updatePositionSkills', function ( req, res )
{
	position.updatePositionSkills( function ( result )
	{ 
		res.json( result );
	}, req.body );
});  

/*==============================================
			RETRIEVE POSITION & SKILL
================================================*/
  
router.get( '/getPositionSkill', function ( req, res )
{
	position.selectPositionSkill( function ( result )
	{ 
		res.json( result );
	}, req.body );
}); 

/*==============================================
			DELETE POSITION & SKILL
================================================*/
  
router.delete( '/deletePositionWithSkill/:id', function ( req, res )
{
	var id= req.params.id;
	position.deletePositionWithSkill( function ( result )
	{ 
		res.json( result );
	}, id );
}); 

router.delete( '/deletePositionType/:id', function ( req, res )
{ 
	position.deletePositionType( function ( result )
	{ 
		res.json( result );
	}, req.params.id );
});


			/*========================================================================================================
			                                     		COMPANY
			===========================================================================================================*/

/*==============================================
				ADD COMPANY
================================================*/

router.post( '/addCompany', function ( req, res )
{
	company.addNewCompany( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				UPDATE COMPANY
================================================*/

router.post('/updateCompany', function ( req, res )
{
	company.updateCompany( function ( result )
	{
		res.json( result );
	}, req.body );
});

/*==============================================
				RETRIVE COMPANY
================================================*/

router.get( '/getCompany', function ( req, res ) 
{
	company.selectCompany( function ( result )
	{
		res.json( result ); 
	}, req.body )
});

router.delete( '/deleteCompanyType/:id', function ( req, res ) 
{
	company.deleteCompanyType( function ( result )
	{
		res.json( result ); 
	}, req.params.id )
});

  
			/*========================================================================================================
			                                     			VIOLATION
			===========================================================================================================*/

/*==============================================
				ADD VIOLATION
================================================*/

router.post( '/addViolation', function( req, res )
{
	violation.addNewViolation( function( result )
	{
		res.json( result )
	}, req.body );
	});
  
/*==============================================
				UPDATE VIOLATION
================================================*/

router.post('/updateViolation', function ( req, res )
{
	violation.updateViolation( function ( result )
	{ 
		res.json( result );
	}, req.body );
});
  
/*==============================================
				RETRIVE VIOLATION
================================================*/

router.get( '/getViolation', function ( req, res ) 
{
	violation.selectViolation( function ( result )
	{
		res.json( result ); 
	}, req.body)
});

router.get( '/getViolationId/:id', function ( req, res ) 
{
	violation.selectViolationId( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

router.delete( '/deleteViolation/:id', function ( req, res ) 
{
	violation.deleteViolation( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});
 

			/*========================================================================================================
			                                     			LEAVE APPLICATION
			===========================================================================================================*/

/*==============================================
			RETRIVE LEAVE APP
================================================*/

router.get( '/getLeaveApp', function ( req, res ) 
{
	leaveApp.selectLeaveApp( function ( result )
	{
		res.json( result ); 
	}, req.body)
});

router.get( '/getUserLeaveApp/:id', function ( req, res ) 
{
	leaveApp.selectUserLeaveApp( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

router.get( '/getManagerLeaveApp/:id', function ( req, res ) 
{
	leaveApp.selectManagerLeaveApp( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

router.get( '/getRoleCompany/:id', function ( req, res ) 
{
	leaveApp.selectRoleCompany( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

/*router.get( '/getDateFilters', function ( req, res ) 
{
	leaveApp.selectDateFilters( function ( result )
	{
		res.json( result ); 
	}, req.body)
});*/

/*==============================================
			RETRIVE LEAVE TYPE
================================================*/
 
router.get( '/getLeavePending', function ( req, res ) 
{
	leaveApp.selectLeavePending( function ( result )
	{
		res.json( result ); 
	}, req.body)
});

/*==============================================
				ADD LEAVE APP
================================================*/

router.post( '/addLeaveApp', function( req, res )
{
	leaveApp.addNewLeaveApp( function( result )
	{
		res.json( result )
	}, req.body );
});

/*==============================================
				UPDATE LEAVE APP
================================================*/

router.post( '/updateLeaveApp', function( req, res )
{
	leaveApp.updateNewLeaveApp( function( result )
	{
		res.json( result )
	}, req.body );
});

/*==============================================
				DELETE LEAVE APP
================================================*/

router.delete( '/deleteLeaveApp/:id', function( req, res )
{
	var id= req.params.id;
	leaveApp.deleteLeaveApp( function( result )
	{
		res.json( result )
	}, id );
});

/*==============================================
				APPROVE LEAVE APP
================================================*/

router.post( '/approveLeaveApp', function( req, res )
{
	//var id= req.params.id; 
	leaveApp.approveNewLeaveApp( function( result )
	{
		res.json( result )
	}, req.body );
});

/*==============================================
				DECLINE LEAVE APP
================================================*/

router.post( '/declineLeaveApp', function( req, res )
{
	//var id= req.params.id; 
	leaveApp.declineNewLeaveApp( function( result )
	{
		res.json( result )
	}, req.body );
});

			/*========================================================================================================
			                                     			LOAN / BANK
			===========================================================================================================*/
			
/*==============================================
					ADD LOAN
================================================*/

router.post( '/addLoan', function( req, res )
{
	loan.addNewLoan( function( result )
	{
		res.json( result )
	}, req.body );
});

/*==============================================
				RETRIEVE LOAN
================================================*/

router.get( '/getLoan', function( req, res )
{
	loan.selectLoan( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getLoanId/:id', function( req, res )
{
	loan.selectLoanId( function( result )
	{
		res.json( result )
	}, req.params.id )
});

router.get( '/getLoanType', function( req, res )
{
	loan.selectLoanType( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getLending', function( req, res )
{
	loan.selectLending( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
				UPDATE LOAN
================================================*/

router.post( '/updateLoan', function( req, res )
{
	loan.updateLoan( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/updateLending', function( req, res )
{
	loan.updateLending( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/updateLoanType', function( req, res )
{
	loan.updateLoanType( function( result )
	{
		res.json( result )
	}, req.body )
});

router.delete( '/deleteLoan/:id', function( req, res )
{
	loan.deleteLoan( function( result )
	{
		res.json( result )
	}, req.params.id )
});

router.delete( '/deleteLending/:id', function( req, res )
{
	loan.deleteLending( function( result )
	{
		res.json( result )
	}, req.params.id )
});

router.delete( '/deleteLoanType/:id', function( req, res )
{
	loan.deleteLoanType( function( result )
	{
		res.json( result )
	}, req.params.id )
});

			/*========================================================================================================
			                                     			JOBS ENTRY
			===========================================================================================================*/

/*==============================================
				SAVE JOBS
================================================*/

router.post( '/addJob', function( req, res )
{
	jobs.addNewJob( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
				RETRIEVE JOBS
================================================*/

router.get( '/getJob', function( req, res )
{
	jobs.selectJob( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getPosSkills/:posId', function( req, res )
{
	jobs.selectPosSkills( function( result )
	{
		res.json( result )
	}, req.params.posId )
});

router.delete( '/deleteJobs/:id', function( req, res )
{
	jobs.deleteJobs( function( result )
	{
		res.json( result )
	}, req.params.id )
});

/*==============================================
				UPDATE JOBS
================================================*/

router.post( '/updateJob', function( req, res )
{
	jobs.updateJob( function( result )
	{
		res.json( result )
	}, req.body )
})

router.post( '/unavailableJob', function( req, res )
{
	jobs.unavailableJob( function( result )
	{
		res.json( result )
	}, req.body )
})

router.post( '/availableJob', function( req, res )
{
	jobs.availableJob( function( result )
	{
		res.json( result )
	}, req.body )
})

/*router.rrequest({
	url: '/addPosSkills',
	method: ''
})*/

router.post( '/addPosSkills', function( req, res )
{
	
	jobs.addPosSkills( function( result )
	{
		res.json( result )
	}, req.body )
})

			/*========================================================================================================
			                                     	PERFORMANCES REVIEW
			===========================================================================================================*/

/*==============================================
			ADD PERFORMANCES REVIEW
================================================*/

router.post( '/addPerformance', function( req, res )
{
	performance.addNewPerformance( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			UPDATE PERFORMANCES REVIEW
================================================*/

router.post( '/updatePerformance', function( req, res )
{
	performance.updatePerformance( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			RETRIEVE PERFORMANCES REVIEW
================================================*/

router.get( '/getPerformance', function( req, res )
{
	performance.selectPerformance( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getPerformanceId/:id', function( req, res )
{
	performance.selectPerformanceId( function( result )
	{
		res.json( result )
	}, req.params.id )
});

router.delete( '/deletePerformance/:id', function( req, res )
{
	performance.deletePerformance( function( result )
	{
		res.json( result )
	}, req.params.id )
});


			/*========================================================================================================
			                                     	TRAINING & DEVELOPMENT
			===========================================================================================================*/

/*==============================================
				ADD TRAIN DEV
================================================*/

router.post( '/addTrainDev', function( req, res )
{
	trainDev.addNewTrainDev( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/addTrainee', function( req, res )
{
	trainDev.addNewTrainee( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
				UPDATE TRAIN DEV
================================================*/

router.post( '/updateTrainDev', function( req, res )
{
	trainDev.updateTrainDev( function( result )
	{
		res.json( result )
	}, req.body )
});

router.delete( '/deleteTrainingDev/:id', function( req, res )
{
	trainDev.deleteTrainingDev( function( result )
	{  
		res.json( result )
	}, req.params.id )
});

/*==============================================
				GET TRAIN DEV
================================================*/

router.get( '/getTrainDev', function( req, res )
{
	trainDev.selectTrainDev( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getTrainees/:id', function( req, res )
{
	trainDev.selectTrainees( function( result )
	{
		console.log(result)
		res.json( result )
	}, req.params.id )
});

/*==============================================
				DELETE TRAIN DEV
================================================*/

router.delete( '/deleteTrainee/:id', function( req, res )
{
	trainDev.deleteTrainee( function( result )
	{
		res.json( result )
	}, req.params.id )
});
 
 		/*========================================================================================================
			                                     	AWARDS & RECOGNITION
			===========================================================================================================*/

/*==============================================
			ADD AWARDS & RECOGNITION
================================================*/

router.post( '/addRecognition', function( req, res )
{
	recognition.addNewRecognition( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			UPDATE AWARDS & RECOGNITION
================================================*/

router.post( '/updateRecognition', function( req, res )
{
	recognition.updateRecognition( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			RETRIEVE AWARDS & RECOGNITION
================================================*/

router.get( '/getRecognition', function( req, res )
{
	recognition.selectRecognition( function( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getRecognitionId/:id', function( req, res )
{
	recognition.selectRecognitionId( function( result )
	{
		res.json( result )
	}, req.params.id )
});

router.delete( '/deleteRecognition/:id', function( req, res )
{
	recognition.deleteRecognition( function( result )
	{
		res.json( result )
	}, req.params.id )
});

			/*========================================================================================================
			                                     	INCIDENTS / ACCIDENTS
			===========================================================================================================*/

/*==============================================
			ADD INCIDENTS / ACCIDENTS
================================================*/

router.post( '/addIncident', function( req, res )
{
	incident.addNewIncident( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			UPDATE INCIDENTS / ACCIDENTS
================================================*/

router.post( '/updateIncident', function( req, res )
{
	incident.updateIncident( function( result )
	{
		res.json( result )
	}, req.body )
});
 
/*==============================================
			RETRIEVE INCIDENTS / ACCIDENTS
================================================*/

router.get( '/getIncident', function( req, res )
{
	incident.selectIncident( function ( result )
	{
		res.json( result )
	}, req.body )
});

			/*========================================================================================================
			                                     	BENEFIT SHOW
			===========================================================================================================*/

/*==============================================
			RETRIEVE BENEFIT
================================================*/

router.get( '/getBenefitShow', function( req, res )
{
	benefitPay.selectBenefitShow( function ( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			RETRIEVE BANKINGS
================================================*/

router.get( '/getBankingShow', function( req, res )
{
	benefitPay.selectBankingShow( function ( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getBankingShowId/:id', function( req, res )
{
	benefitPay.selectBankingShowId( function ( result )
	{
		res.json( result )
	}, req.params.id )
});

router.delete( '/deleteBanking/:id', function( req, res )
{
	benefitPay.deleteBanking( function ( result )
	{
		res.json( result )
	}, req.params.id )
});


/*==============================================
			RETRIEVE COMPENSATION
================================================*/

router.get( '/getCompensationShow', function( req, res )
{
	benefitPay.selectCompensationShow( function ( result )
	{
		res.json( result )
	}, req.body )
});

			/*========================================================================================================
			                                     			MAIN
			===========================================================================================================*/

/*==============================================
			RETRIEVE LEAVE COUNT
================================================*/

router.get( '/getLeaveCountHR', function( req, res )
{
	main.selectLeaveCountHR( function ( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getLeaveCountManager/:id', function( req, res )
{
	main.selectLeaveCountManager( function ( result )
	{
		res.json( result )
	}, req.params.id )
});

/*==============================================
				OVERTIME COUNT
================================================*/

router.get( '/getOvertimeCountHR', function( req, res )
{
	main.selectOvertimeCountHR( function( result )
	{
		res.json( result )
	}, req.body)
});

router.get( '/getOvertimeCountManager/:id', function( req, res )
{
	main.selectOvertimeCountManager( function( result )
	{
		res.json( result )
	}, req.params.id)
});
  
/*==============================================
		RETRIEVE RENEWAL/REGULARIZATION
================================================*/

router.get( '/getRenewalCount', function( req, res )
{
	main.selectRenewalCount( function ( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getRenewalList', function( req, res )
{
	main.selectRenewalList( function ( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
			RETRIEVE BIRTHDAY COUNT
================================================*/

router.get( '/getBirthdayCount', function( req, res )
{
	main.selectBirthdayCount( function ( result )
	{
		res.json( result )
	}, req.body )
});

router.get( '/getBirthdayList', function( req, res )
{
	main.selectBirthdayList( function ( result )
	{
		res.json( result )
	}, req.body )
});
 

 			/*========================================================================================================
			                                     			ROLE
			===========================================================================================================*/

/*==============================================
				ADD ROLE
================================================*/

router.post( '/addRole', function( req, res )
{
	role.addNewRole( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/updateRole', function( req, res )
{
	role.updateRole( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/updateStatus', function( req, res )
{
	role.updateStatus( function( result )
	{
		res.json( result )
	}, req.body )
});

router.post( '/resetPass', function( req, res )
{
	role.resetPass( function( result )
	{
		res.json( result )
	}, req.body )
});

/*==============================================
				SELECT ROLE
================================================*/

router.get( '/getRole', function( req, res )
{
	role.selectRole( function ( result )
	{
		res.json( result )
	}, req.body )
}) 

			/*========================================================================================================
			                                     			LEAVE CREDITS
			===========================================================================================================*/

/*==============================================
			VACATION LEAVE CREDITS
================================================*/

router.get( '/getLeaveCredit', function( req, res )
{
	credits.selectLeaveCredit( function( result )
	{
		res.json( result )
	}, req.body)
});

router.get( '/getLeaveType', function( req, res )
{
	credits.selectLeaveType( function( result )
	{
		res.json( result )
	}, req.body)
});

router.post( '/updateLeaveType', function( req, res )
{
	credits.updateLeaveType( function( result )
	{
		res.json( result )
	}, req.body )
});

router.delete( '/deleteLeaveType/:id', function( req, res )
{
	credits.deleteLeaveType( function( result )
	{
		res.json( result )
	}, req.params.id )
});

			/*========================================================================================================
			                                     			SHIFT
			===========================================================================================================*/

/*==============================================
				ADD	SHIFT
================================================*/

router.post( '/addShift', function( req, res )
{
	shift.addNewShift( function( result )
	{
		res.json( result )
	}, req.body)
});

router.post( '/addShiftGroup', function( req, res )
{
	shift.addNewShiftGroup( function( result )
	{
		res.json( result )
	}, req.body)
});

router.post( '/updateShift', function( req, res )
{
	shift.updateShift( function( result )
	{
		res.json( result )
	}, req.body)
});

router.post( '/updateShiftGroup', function( req, res )
{
	shift.updateShiftGroup( function( result )
	{
		res.json( result )
	}, req.body)
});

router.delete( '/deleteShiftType/:id', function( req, res )
{
	shift.deleteShiftType( function( result )
	{
		res.json( result )
	}, req.params.id)
});

router.delete( '/deleteSchedule/:id', function( req, res )
{
	shift.deleteSchedule( function( result )
	{
		res.json( result )
	}, req.params.id)
});

/*==============================================
			RETRIEVE SHIFT GROUP
================================================*/

router.get( '/getShiftGroup', function ( req, res ) 
{
	shift.selectShiftGroup( function ( result )
	{
		res.json( result );  
	})
});

router.get( '/getShift', function ( req, res ) 
{
	shift.selectShift( function ( result )
	{
		res.json( result );  
	})
});

			/*========================================================================================================
			                                     			OVERTIME
			===========================================================================================================*/
 
/*==============================================
				ADD	OVERTIME
================================================*/

router.post( '/addOvertime', function( req, res )
{
	overtime.addNewOvertime( function( result )
	{
		res.json( result )
	}, req.body)
});

/*==============================================
				UPDATE	OVERTIME
================================================*/

router.post( '/updateOvertime', function( req, res )
{
	overtime.updateOvertime( function( result )
	{
		res.json( result )
	}, req.body)
});

/*==============================================
				SELECT OVERTIME
================================================*/

router.get( '/getOvertime', function ( req, res ) 
{
	overtime.selectOvertime( function ( result )
	{
		res.json( result );  
	})
});

router.get( '/getOvertimeUser/:id', function ( req, res ) 
{
	overtime.selectOvertimeUser( function ( result )
	{
		res.json( result )  
	}, req.params.id )
});

router.get( '/getOvertimeRoleCompany/:id', function ( req, res ) 
{
	overtime.selectOvertimeRoleCompany( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

router.get( '/getOvertimeManager/:id', function ( req, res ) 
{
	overtime.selectOvertimeManager( function ( result )
	{
		res.json( result ); 
	}, req.params.id)
});

/*==============================================
				APPROVE LEAVE APP
================================================*/

router.post( '/approveOvertime', function( req, res )
{ 
	overtime.approveNewOvertime( function( result )
	{
		res.json( result )
	}, req.body );
});

/*==============================================
				DECLINE LEAVE APP
================================================*/

router.post( '/declineOvertime', function( req, res )
{ 
	overtime.declineNewOvertime( function( result )
	{
		res.json( result )
	}, req.body );
});

			/*========================================================================================================
			                                     			BANK
			===========================================================================================================*/

/*==============================================
				ADD	BANK
================================================*/

router.post( '/addBank', function( req, res )
{
	bank.addNewBank( function( result )
	{
		res.json( result )
	}, req.body)
}); 

router.post( '/updateBank', function( req, res )
{
	bank.updateBank( function( result )
	{
		res.json( result )
	}, req.body)
}); 

router.post( '/addLending', function( req, res )
{
	bank.addNewLending( function( result )
	{
		res.json( result )
	}, req.body)
}); 

router.post( '/addLoanType', function( req, res )
{
	bank.addNewLoanType( function( result )
	{
		res.json( result )
	}, req.body)
}); 

module.exports = router;	
