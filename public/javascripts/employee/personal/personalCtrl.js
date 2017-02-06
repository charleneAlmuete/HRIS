hris
	.controller( "personalCtrl", [
			"$scope",
			"$http",
			"$state",	
			"$timeout",
			"$stateParams",
			
			function controller( $scope, $http, $state, $timeout, $stateParams ) 
			{
				$scope.employee = {};
				employeeShow();  
	       		/*==============================================
						DISPLAY EMPLOYEE INFO IN TEXTBOXES
	        	================================================*/
 
 				function employeeShow()
 				{
 					var id = $stateParams.empId;  
	        		$http.get( '/getEmployee/' + id )
		        		.success( function ( response ) 
		        		{ 
		        			if ( response.length > 0 )
		        			{  
		        				$scope.employee = response[0]; 
		        				$scope.add= false;
		        				$scope.cancel=true;
		        			} else {  
		        				$scope.add= true;
		        				$scope.cancel=false;
		        			} 
		        		}); 

		        	var userId = $stateParams.userId;  
	        		$http.get( '/getEmployee/' + userId )
		        		.success( function ( response ) 
		        		{ 
		        			if ( response.length > 0 )
		        			{   
		        				$scope.profPersonal = response[0];  
		        			}  
		        		});

		        	$http.get( '/getTaxStatus' )
		        		.success( function ( response ) 
		        		{ 
		        			if ( response.length > 0 )
		        			{   
		        				$scope.taxes = response;  
		        			}  
		        		});
 				}
	        	 
	       		/*==============================================
								UPDATE EMPLOYEE
            	================================================*/

	       		$scope.updateEmployee = function ( data ) 
	       		{    
	       			console.log(data)
	       			$scope.submitForm= function( isValid )
	       			{
	       				if( isValid )
	       				{
	       					data.id = $stateParams.empId; 
			       		 	$http.post( '/updateEmployee', data ) 
			       		 		.success( function ( response ) 
			       		 	{  
			       		 		console.log(response)
		                        $state.go( $state.current, {}, { reload: true }); 
		                        $scope.employee = {};
		                        employeeShow();
			       			});
			       		} else {
	                        alert('ERROR: Please fill in the required field(s) given.');
	                    }
	       			}
	       			
	       		} 
 
			}
		])
