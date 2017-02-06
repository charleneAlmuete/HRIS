hris 
	.controller( "companyCtrl", [
		"$scope",
		"$state",
		"$http",
		"$timeout",
            "ngDialog",

		function controller ( $scope, $state, $http, $timeout, ngDialog )
		{
			$scope.company= {};
			companyShow();

			/*==============================================
                                    SEARCH COMPANY
                  ================================================*/

                  function companyShow()
                  {
                        $http.get( '/getCompany' )
                              .success( function ( response )
                              {
                                    $scope.companys= response;
                                    
                              }); 
                  } 

      		/*==============================================
                                  ADD COMPANY
                  ================================================*/
 
                  $scope.addDialogCompany= function( )
                  { 
                      ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/company/companyAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.company={}; 
 
                              $scope.addCompany= function ( data )
                              {
                                    $http.post( '/addCompany', data )
                                          .success( function ( response )
                                          { 
                                                $state.go( $state.current, {}, { reload: true });
                                                $scope.company= {};
                                                companyShow();
                                          })
                              } 

                          }]
                      });
                  }
  
                  /*==============================================
                                  EDIT COMPANY
                  ================================================*/
 
                  $scope.edit= function( data )
                  { 
                      ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/company/companyAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.company={}; 
                              $scope.company.id= data.id;
                              $scope.company.name= data.name;
                              $scope.company.code= data.code;
                              $scope.company.contactno= data.contactno;
                              $scope.company.email= data.email;
                              $scope.company.website=data.website;
 
                              $scope.updateCompany= function ( data )
                              {
                                    $http.post( '/updateCompany', data )
                                          .success( function ( response )
                                          {
                                                $state.go( $state.current, {}, { reload: true });
                                                $scope.company= {};
                                                companyShow();
                                          })
                              } 
                          }]
                      });
                  }

                  $scope.deleteCompanyType= function ( data )
                  {
                        $http.delete( '/deleteCompanyType/' + data )
                              .success( function ( response )
                              { 
                                    companyShow();
                              })
                  } 
		}
	])