hris
	.controller( "searchCtrl", [
		"$scope",
		"$state",
		"$http",
		"$timeout",
		"ngDialog",
		"$stateParams",

		function controller( $scope, $state, $http, $timeout, ngDialog, $stateParams )
		{    
 
			/*==============================================
						DISPLAY LIST OF EMPLOYEES
        	================================================*/

        	$http.get( '/getAllEmployee')
        		.success( function ( response ) 
        		{
        			$scope.employee = response; 
        		});

        	$http.get( '/getCompany')
        		.success( function ( response ) 
        		{
        			$scope.companys = response; 
        		});

        	/*==============================================
							EDIT NG-DIALOG()
        	================================================*/

        	$scope.openDialogEdit = function( id )
 			{
				ngDialog.open({ 
					templateUrl: "./public/javascripts/employee/search/modal.html",
					showClose: false,
					className: 'ngdialog-theme-plain custom-width',
					closeByDocument: true,

					controller: [ '$scope', function( $scope ) {
						$scope.id = id;
						$scope.add= false;
						$scope.closeAll= function()
						{   
							ngDialog.closeAll(); 
						}  
					}]
				});
			};  
 		}
	])