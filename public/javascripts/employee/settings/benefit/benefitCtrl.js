hris
	.controller( "benefitCtrl", [
		"$scope",
		"$state",
		"$http",
		"$timeout",
		"ngDialog",

		function controller( $scope, $state, $http, $timeout, ngDialog )
		{
            $scope.benefit= {};
            benefitShow();

			/*==============================================
								ADD BENEFIT
            ================================================*/

          	$scope.addDialogBenefit = function (  )
         	{ 
                ngDialog.open({ 
                  templateUrl: "./public/javascripts/employee/settings/benefit/benefitAdd.html",
                  showClose: true,
                  className: 'ngdialog-theme-plain custom-width',
                  closeByDocument: false, 

                  controller: [ '$scope', function( $scope ) {  
                      	$scope.add= true;  
                      	$scope.benefit={}; 

	                    $scope.addBenefit = function( data )
			          	{ 
			          		$http.post( '/addBenefit', data )
				          		.success( function ( response ) 
				          		{ 
				          			data.id = response;
				          			$state.go( $state.current, {}, { reload: true });
				          			$scope.benefit = {};
				          			benefitShow();
				          		});
			          	} 
                  	}]
              	});
          	}

          	/*==============================================
							UPDATE BENEFIT
            ================================================*/

          	$scope.edit = function ( data )
         	{ 
                ngDialog.open({ 
                  templateUrl: "./public/javascripts/employee/settings/benefit/benefitAdd.html",
                  showClose: true,
                  className: 'ngdialog-theme-plain custom-width',
                  closeByDocument: false, 

                  controller: [ '$scope', function( $scope ) {  
                      	$scope.add= false;  
                      	$scope.benefit={}; 
                      	$scope.benefit.id= data.id;
                      	$scope.benefit.name= data.name;

	                    $scope.updateBenefit = function( data )
			          	{ 
			          		$http.post( '/updateBenefit', data )
				          		.success( function ( response ) 
				          		{ 
				          			data.id = response;
				          			$state.go( $state.current, {}, { reload: true });
				          			$scope.benefit = {};
				          			benefitShow();
				          		});
			          	} 
                  	}]
              	});
          	}

          	/*==============================================
								SHOW BENEFIT
            ================================================*/

          	function benefitShow()
          	{
                $http.get( '/getBenefit' )
                      .success( function ( response )
                      {
                            $scope.benefits= response;
                            
                      }); 
          	} 

            $scope.deleteBenifitType = function( data )
            { 
              $http.delete( '/deleteBenifitType/' + data )
                .success( function ( response ) 
                {  
                  benefitShow();
                });
            } 
		}
	])