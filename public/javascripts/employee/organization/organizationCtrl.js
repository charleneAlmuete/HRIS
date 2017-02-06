hris
	.controller( "organizationCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.organization = {}; 
            showOrganization();
  
            /*==============================================
                    DISPLAY OGRANIZATION INFO IN TABLE
            ================================================*/

            function showOrganization()
            {
               var id= $stateParams.empId;
                $http.get( '/getAllOrganization/' + id )
                    .success( function ( response )
                    {  
                        if ( response.length > 0 )
                        {
                            $scope.organizations = response;  
                            $scope.add=true;
                        } else { 
                            $scope.add= true;
                        } 
                    }); 

                var userId= $stateParams.userId;
                $http.get( '/getAllOrganization/' + userId )
                    .success( function ( response )
                    {  
                        if ( response.length > 0 )
                        {
                            $scope.profOrganizations = response;   
                        }  
                    }); 
            } 
              
            /*==============================================
                    OPEN OGRANIZATION ADD-EDIT-DIALOG
            ================================================*/

            $scope.addOrganizationDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/organization/organizationAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addOrganization =function ( data )
                        { 
                            data.employee_id = $stateParams.empId;
                            $http.post( '/addOrganization', data )
                                .success( function ( response )
                            { 
                                $scope.organization = {};
                                $state.go( $state.current, {}, { reload: true });
                                showOrganization();
                            });
                        } 
                    }]
                });
            }

            $scope.editOrganizationDialog = function ( data )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/organization/organizationAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.organization= {};
                        $scope.organization.id= data.id;
                        $scope.organization.institution= data.institution;
                        $scope.organization.title= data.title;
                        $scope.organization.started= data.started;
                        $scope.organization.ended= data.ended;

                        $scope.updateOrganization = function ( data )
                        {   
                            $http.post( '/updateOrganization', data )
                                .success( function ( response )
                            {  
                                $state.go( $state.current, {}, { reload: true });
                                $scope.organization = {};
                                showOrganization();
                            });
                        } 
                    }]
                });
            }

            $scope.deleteOrganization = function ( data )
            {   
                $http.delete( '/deleteOrganization/' + data )
                    .success( function ( response )
                {   
                    showOrganization();
                });
            } 
		}
	])