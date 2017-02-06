hris
	.controller( "navbarCtrl", [
			"$scope",
			"$http",
			"$state",	
			"$timeout",
			"$stateParams",
			"ngDialog",
			"Upload",
			
			function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog, Upload ) 
			{  
				navbarFieldShow();
				printPreviewForm(); 
				$scope.navbarField= {};  
				$scope.user={}; 

				/*==============================================
								DISPLAY NAVBAR FIELD
            	================================================*/

            	$scope.empStatusDialog= function()
            	{
            		ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/search/empStatus.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {   

                        $scope.updateEmploymentStatus = function( data )
                        {   
                            data.id = $stateParams.empId; 
                            $http.post( '/updateEmploymentStatus', data )
                                .success( function ( response )
                                {    
                                    $scope.navbarField = {}; 
                                    ngDialog.closeAll(); 
                                    $state.go( $state.current, {}, { reload: true });
                                });
                        }  
                    }]
                });
            	}

            	function navbarFieldShow()
	        	{
	        		var id = $stateParams.empId;   
		    		$http.get( '/getNavbarEmployee/' + id )
		        		.success( function ( response ) 
		        		{      
		        			if( response.length > 0 )
		        			{  
		        				enabled(); 
		        				$scope.navbarField = response[0];  
		        				$scope.employeeDetails= true;

		        				$scope.saveNavbarBtn= false;
		        				$scope.updateNavbarBtn= false;
		        				$scope.enableNavbarBtn= true;
		        				$scope.emp_status=true;
		        			} else {
		        				disabled();
		        				$scope.saveNavbarBtn= true;
		        				$scope.updateNavbarBtn= false;
		        				$scope.enableNavbarBtn= false;
		        				$scope.emp_status=false;
		        			} 
		        		}); 

		        	var userId = $stateParams.userId;   
		    		$http.get( '/getNavbarEmployee/' + userId )
		        		.success( function ( response ) 
		        		{    
		        			if( response.length > 0 )
		        			{   
		        				$scope.profileNav = response[0]; 
		        				$scope.profDetails= true;
		        			}   
		        		}); 
	        	}

	       		/*==============================================
								ADD NAVBAR FIELD
	        	================================================*/

	        	$scope.addNavbarField = function ( data ) 
	       		{       
	       			$scope.submitForm= function( isValid )
	       			{ 
	       				if( isValid )
	       				{    
	       					$scope.navbarField.emp_status= "Active";  
	       					$scope.navbarField.role_id= "4";
 
			       		 	$http.post( '/addEmployeeNavbar', data )
			       		 		.success( function ( response ) 
			       		 	{          
			       		 		$state.go( $state.current, { empId: response }, { reload: true });  
			       		 		$scope.navbarField = {}; 
			       		 		navbarFieldShow();  

			       		 		data.employee_id = response;    
			       		 		$http.post( '/insertLastEmployeeId', data )
				       		 		.success( function ( response ) 
				       		 	{         

				       			}); 
			       			});  


		       		 	} else {
		       		 		alert('ERROR: Please fill in the required field(s) given. All fields that has *');
		       		 	}
	       			} 
	       		} 

	       		/*==============================================
								UPDATE NAVBAR FIELD
	        	================================================*/

	        	$scope.updateNavbarField = function ( data ) 
	       		{   
	       			$scope.submitForm= function( isValid )
	       			{
	       				if( isValid )
	       				{   
	       					$scope.navbarField.image= data.image.name; 
	       					$http.post( '/updateNavbarField', data )
			       		 		.success( function ( response ) 
			       		 	{      
			       		 		$state.go( $state.current, {}, { reload: true });  
			       		 		$scope.navbarField = {}; 
			       		 		navbarFieldShow(); 
			       		 		enabled(); 
			       			});
			       		} else{
			       			alert('ERROR: Please fill in the required field(s) given.');
			       		}
	       			}
	       		 	
	       		} 

	       		/*==============================================
								ENABLE THE TEXT
	        	================================================*/

	        	$scope.enableNavbarField = function ( data ) 
	       		{ 
	       		 	disabled();
	       		 	$scope.saveNavbarBtn= false;
    				$scope.updateNavbarBtn= true;
    				$scope.enableNavbarBtn= false;
	       		}

	       		/*==============================================
                            DISPLAY IN COMBOBOX
	            ================================================*/

	            $http.get( '/getPosition' )
	                .success( function ( response ) 
	                {
	                    $scope.positions = response;
	                });
	 
	            $http.get( '/getCompany' )
	                .success( function ( response ) 
	                {
	                    $scope.companies = response;
	                }); 

	            $http.get( '/getBranch' )
	                .success( function( response )
	                {
	                    $scope.branches= response;
	                }); 

	            $http.get( '/getShiftGroup')
	        		.success( function ( response ) 
	        		{   
	        			$scope.shifts = response;   
	        		});

	        	/*==============================================
                            		ENABLE
	            ================================================*/

	            function enabled()
	            {
	            	$scope.firstname= true;
	            	$scope.employeeId= true; 
	            	$scope.position= true;
	            	$scope.middleName= true;
	            	$scope.dateHired= true;
	            	$scope.branch= true;
	            	$scope.lastname= true;
	            	$scope.company= true;
	            	$scope.shift= true;
	            }

	            function disabled()
	            {
	            	$scope.firstname= false;
	            	$scope.employeeId= false; 
	            	$scope.position= false;
	            	$scope.middleName= false;
	            	$scope.dateHired= false;
	            	$scope.branch= false;
	            	$scope.lastname= false;
	            	$scope.company= false;
	            	$scope.shift= false;
	            }

	            /*==============================================
                            PRINT RETRIEVE DATAS
	            ================================================*/

	            function printPreviewForm()
	            {
	            	var id = $stateParams.empId;  
	        		$http.get( '/getEmployee/' + id )
		        		.success( function ( response ) 
		        		{ 
		        			if ( response.length > 0 )
		        			{  
		        				$scope.employee = response[0];  
		        			}  
		        		});
	            }  

	            /*==============================================
                            	ACTIVE NAVBAR
	            ================================================*/

	            $scope.menu = 1;
	            $scope.activeLink = function( index ){
			      $scope.menu = index; 
			    }

			    $scope.activeSubLink = function( index ){
			      $scope.menuSub = index; 
			    }
			}
		])

		 

