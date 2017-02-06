/* *************************************************************************************************** 
											ROUTING APP
****************************************************************************************************** */

var hris= angular.module( "hris", 
	[ 	"ui.router", 
		"ngDialog", 
		"ui.bootstrap", 
		"angularUtils.directives.dirPagination", 
		"xeditable", 
		"angucomplete-alt", 
		"moment-picker", 
		"angularjs-dropdown-multiselect", 
		"aurbano.multiselect", 
		"ngTagsInput", 
		"angular-md5", 
		"checklist-model", 
		"ngRoute", 
		"ngFileUpload", 
		"ngPrint",
		"input-ssn" 
	])

	.config ([
		"$stateProvider",
		"$urlRouterProvider", 

		function ( $stateProvider, $urlRouterProvider ) {
			$stateProvider
 
			.state( "login", {
				url: "/login",
				templateUrl: "./public/javascripts/login/login.html",
				controller: "loginCtrl"
			})
			.state( "user", { 
				url: "/user/:userId",	
				templateUrl : "./public/javascripts/admin/users/users.html",
				controller : "usersCtrl"
			}) 

			.state( "user.userForm", {
				url: "/search",	
				templateUrl : "./public/javascripts/admin/users/userForm.html",
				controller : "usersCtrl"
			}) 

			.state( "user.leave", {
				url: "/leave",	
				templateUrl : "./public/javascripts/admin/leave/leave.html",
				controller : "leaveUserCtrl"
			}) 

			.state( "user.overtime", {
				url: "/overtime",	
				templateUrl : "./public/javascripts/admin/overtime/overtime.html",
				controller : "overtimeUserCtrl"
			}) 

			.state( "user.attendance", {
				url: "/attendance",	
				templateUrl : "./public/javascripts/admin/attendance/attendance.html",
				controller : "attendanceCtrl"
			}) 

			.state( "user.ipaddress", {
				url: "/ipaddress",	
				templateUrl : "./public/javascripts/admin/ipadd/ipadd.html",
				controller : "ipaddCtrl"
			})

			.state( "user.payslip", {
				url: "/payslip",	
				templateUrl : "./public/javascripts/admin/payslip/payslip.html",
				controller : "payslipCtrl"
			}) 

			.state( "user.profile", {
				url: "/profile",	
				templateUrl : "./public/javascripts/admin/profile/search/navbar.html",
				controller : "navbarCtrl"
			}) 

			.state( "user.profile.personal", {
				url: "/personal",	
				templateUrl : "./public/javascripts/admin/profile/personal/personal.html",
				controller : "personalCtrl"
			})  

			.state( "user.profile.contact", {
				url: "/contact",	
				templateUrl : "./public/javascripts/admin/profile/contact/basic_contact.html",
				controller : "contactCtrl"
			})   

			.state( "user.profile.education", {
				url: "/education",	
				templateUrl : "./public/javascripts/admin/profile/education/education.html",
				controller : "educationCtrl"
			}) 

			.state( "user.profile.awards", {
				url: "/awards",	
				templateUrl : "./public/javascripts/admin/profile/awards/awards.html",
				controller : "awardsCtrl"
			})

			.state( "user.profile.exam", {
				url: "/exam",	
				templateUrl : "./public/javascripts/admin/profile/exam/exam.html",
				controller : "examCtrl"
			}) 

			.state( "user.profile.work", {
				url: "/work",	
				templateUrl : "./public/javascripts/admin/profile/work/work.html",
				controller : "workCtrl" 
			})  

			.state( "user.profile.skills", {
				url: "/skills",	
				templateUrl : "./public/javascripts/admin/profile/skills/skills.html",
				controller : "skillsCtrl"
			}) 

			.state( "user.profile.organization", {
				url: "/organization",	
				templateUrl : "./public/javascripts/admin/profile/organization/organization.html",
				controller : "organizationCtrl"
			})     

			.state( "user.profile.training", {
				url: "/training",	
				templateUrl : "./public/javascripts/admin/profile/training/training.html",
				controller : "trainingCtrl"
			}) 

			.state( "user.profile.medical", {
				url: "/medical",	
				templateUrl : "./public/javascripts/admin/profile/medical/medical.html",
				controller : "medicalCtrl"
			}) 

			.state( "user.profile.memo", {
				url: "/memo",	
				templateUrl : "./public/javascripts/admin/profile/memo/memo.html",
				controller : "memorandumCtrl"
			}) 

			.state( "user.profile.performance", {
				url: "/performance",	
				templateUrl : "./public/javascripts/admin/profile/performance/performance.html",
				controller : "empPerformanceCtrl"
			}) 

			.state( "user.profile.recognition", {
				url: "/recognition",	
				templateUrl : "./public/javascripts/admin/profile/recognition/recognition.html",
				controller : "empRecognitionCtrl"
			}) 

			.state( "user.profile.appointment", {
				url: "/appointment",	
				templateUrl : "./public/javascripts/admin/profile/appointment/appointment.html",
				controller : "appointmentCtrl"
			}) 

			.state( "user.profile.service", {
				url: "/service",	
				templateUrl : "./public/javascripts/admin/profile/service/service.html",
				controller : "serviceCtrl"
			}) 

			.state( "user.profile.loan", {
				url: "/loan",	
				templateUrl : "./public/javascripts/admin/profile/loans/loans.html",
				controller : "empLoansCtrl"
			}) 

			.state( "user.profile.bank", {
				url: "/bank",	
				templateUrl : "./public/javascripts/admin/profile/banking/banking.html",
				controller : "bankCtrl"
			}) 

			.state( "main", { 
				url: "/main/:userId",
				templateUrl : "./public/javascripts/main/main.html",
				controller : "mainCtrl"
			}) 

			.state( "main.dashboard", {
				url: "/dashboard",	
				templateUrl : "./public/javascripts/main/dashboard.html" 
			}) 

			.state( "main.trainDev", {
				url: "/trainDev",
				templateUrl : "./public/javascripts/development/training/trainDev.html",
				controller : "trainDevCtrl"
			})
 
			.state( "main.incident", {
				url: "/incident",
				templateUrl : "./public/javascripts/health/incident/incident.html",
				controller : "incidentCtrl"
			})

			.state( "main.medHealth", {
				url: "/medHealth",
				templateUrl : "./public/javascripts/health/medical/medical.html",
				controller : "medHealthCtrl"
			})

			.state( "main.benefitShow", {
				url: "/benefitShow",
				templateUrl : "./public/javascripts/benefitPay/benefits/benefitShow.html",
				controller : "benefitShowCtrl"
			})

			.state( "main.bankingShow", {
				url: "/bankingShow",
				templateUrl : "./public/javascripts/benefitPay/banking/bankingShow.html",
				controller : "bankingShowCtrl"
			})

			.state( "main.compensationShow", {
				url: "/compensationShow",
				templateUrl : "./public/javascripts/benefitPay/compensation/compensationShow.html",
				controller : "compensationShowCtrl"
			})

			.state( "main.overtime", {
				url: "/overtime",
				templateUrl : "./public/javascripts/employee/overtime/overtime.html",
				controller : "overtimeCtrl"
			})

			.state( "main.leaveShow", {
				url: "/leaveShow",
				templateUrl : "./public/javascripts/benefitPay/leave/leaveShow.html",
				controller : "leaveShowCtrl"
			})

			.state( "main.loans", {
				url: "/loans",
				templateUrl : "./public/javascripts/benefitPay/loans/loans.html",
				controller : "loansCtrl"
			})

			.state( "main.attendance", {
				url: "/attendance",
				templateUrl : "./public/javascripts/employee/attendance/attendance.html",
				controller : "attendanceCtrl"
			})

			.state( "main.leave", {
				url: "/leave",
				templateUrl : "./public/javascripts/employee/leave/leave.html",
				controller : "leaveAppCtrl" 
			})

			.state( "main.leavePending", {
				url: "/leavePending",
				templateUrl : "./public/javascripts/employee/leave/leavePending.html",
				controller : "leaveAppCtrl"
			})

			.state( "main.violation", {
				url: "/violation",
				templateUrl : "./public/javascripts/employee/violation/violation.html",
				controller : "violationCtrl"
			})

			.state( "main.jobs", {
				url: "/jobs",
				templateUrl : "./public/javascripts/jobs/jobs.html",
				controller : "jobsCtrl"
			})

			.state( "main.birthday", {
				url: "/birthday",
				templateUrl : "./public/javascripts/main/birthday.html",
				controller : "jobsCtrl" 
			})

			.state( "main.renewal", {
				url: "/renewal",
				templateUrl : "./public/javascripts/main/renewal.html" 
			})

			.state( "main.settings", {
				url: "/settings",	
				templateUrl : "./public/javascripts/employee/settings/settings.html"
			}) 

			.state( "main.settings.allowance", {
				url: "/allowance",	
				templateUrl : "./public/javascripts/employee/settings/allowance/allowance.html",
				controller : "allowanceCtrl"
			})

			.state( "main.settings.benefit", {
				url: "/benefit",	
				templateUrl : "./public/javascripts/employee/settings/benefit/benefit.html",
				controller : "benefitCtrl"
			})  

			.state( "main.settings.branch", {
				url: "/branch",	
				templateUrl : "./public/javascripts/employee/settings/branch/branch.html",
				controller : "branchCtrl"
			}) 

			.state( "main.settings.company", {
				url: "/company",	
				templateUrl : "./public/javascripts/employee/settings/company/company.html",
				controller : "companyCtrl"
			}) 

			.state( "main.settings.leave", {
				url: "/leave",	
				templateUrl : "./public/javascripts/employee/settings/leaves/leave.html",
				controller : "leaveCtrl"
			})

			.state( "main.settings.position", {
				url: "/position",	
				templateUrl : "./public/javascripts/employee/settings/position/position.html",
				controller : "posCtrl"
			}) 
  
			.state( "main.settings.account", {
				url: "/account",	
				templateUrl : "./public/javascripts/employee/settings/account/account.html",
				controller : "accountCtrl"
			})  

			.state( "main.settings.shifts", {
				url: "/shifts",	
				templateUrl : "./public/javascripts/employee/settings/shifts/shifts.html",
				controller : "shiftsCtrl"
			})   

			.state( "main.settings.lending", {
				url: "/lending",	
				templateUrl : "./public/javascripts/employee/settings/loan/lendingcompany/lendingcompany.html",
				controller : "lendingcompanyCtrl"
			}) 

			.state( "main.settings.loan", {
				url: "/loan",	
				templateUrl : "./public/javascripts/employee/settings/loan/loantype/loantype.html",
				controller : "loantypeCtrl"
			})    

			.state( "main.home", {
				url: "/home",	
				templateUrl : "./public/javascripts/home/home.html"
			})    

			.state( "main.payslip", {
				url: "/payslip",	
				templateUrl : "./public/javascripts/employee/payslip/payslip.html"
			})    

			.state( "main.menuNav", {
				url: "/menu/:empId",
				templateUrl: "./public/javascripts/employee/search/navbar.html",
				controller : "navbarCtrl"
			})

			.state( "main.search", {
				url: "/search",
				templateUrl : "./public/javascripts/employee/search/search.html",
				controller : "searchCtrl"
			})

			.state( "main.menuNav.personal", {
				url: "/personal",
				templateUrl : "./public/javascripts/employee/personal/personal.html",
				controller : "personalCtrl"
			})

			.state( "main.menuNav.children", {
				url: "/children",
				templateUrl : "./public/javascripts/employee/contact/children.html",
				controller: "contactCtrl"
			})

			.state( "main.menuNav.basicContact", {
				url: "/basicContact",
				templateUrl : "./public/javascripts/employee/contact/basic_contact.html",
				controller: "contactCtrl"
			}) 

			.state( "main.menuNav.education", {
				url: "/education",
				templateUrl : "./public/javascripts/employee/education/education.html",
				controller : "educationCtrl"
			})

			.state( "main.menuNav.exam", {
				url: "/exam",
				templateUrl : "./public/javascripts/employee/exam/exam.html",
				controller : "examCtrl" 
			})

			.state( "main.menuNav.awards", {
				url: "/awards",
				templateUrl : "./public/javascripts/employee/awards/awards.html",
				controller : "awardsCtrl" 
			})

			.state( "main.menuNav.work", {
				url: "/work",
				templateUrl : "./public/javascripts/employee/work/work.html",
				controller : "workCtrl" 
			})

			.state( "main.menuNav.skills", {
				url: "/skills",
				templateUrl : "./public/javascripts/employee/skills/skills.html",
				controller : "skillsCtrl" 
			})

			.state( "main.menuNav.organization", {
				url: "/organization",
				templateUrl : "./public/javascripts/employee/organization/organization.html",
				controller : "organizationCtrl" 
			})

			.state( "main.menuNav.training", {
				url: "/training",
				templateUrl : "./public/javascripts/employee/training/training.html",
				controller : "trainingCtrl" 
			})

			.state( "main.menuNav.medical", {
				url: "/medical",
				templateUrl : "./public/javascripts/employee/medical/medical.html",
				controller : "medicalCtrl" 
			})

			.state( "main.menuNav.memo", {
				url: "/memo",
				templateUrl : "./public/javascripts/employee/memo/memo.html",
				controller : "memorandumCtrl" 
			})

			.state( "main.menuNav.service", {
				url: "/service",
				templateUrl : "./public/javascripts/employee/service/service.html",
				controller : "serviceCtrl" 
			})

			.state( "main.menuNav.performance", {
				url: "/performance",
				templateUrl : "./public/javascripts/employee/performance/performance.html",
				controller : "empPerformanceCtrl" 
			})

			.state( "main.menuNav.recognition", {
				url: "/recognition",
				templateUrl : "./public/javascripts/employee/recognition/recognition.html",
				controller : "empRecognitionCtrl"
			})

			.state( "main.menuNav.loans", {
				url: "/loans",
				templateUrl : "./public/javascripts/employee/loans/loans.html",
				controller : "empLoansCtrl"
			})

			.state( "main.menuNav.bank", {
				url: "/bank",
				templateUrl : "./public/javascripts/employee/banking/banking.html",
				controller : "bankCtrl"
			})

			.state( "main.menuNav.appointment", {
				url: "/appointment",
				templateUrl : "./public/javascripts/employee/appointment/appointment.html",
				controller : "appointmentCtrl"
			})

 
			$urlRouterProvider.otherwise("/login");
			
		}
	]).run(function($rootScope, $state) {
	      $rootScope.$state = $state;
	    })	;

	