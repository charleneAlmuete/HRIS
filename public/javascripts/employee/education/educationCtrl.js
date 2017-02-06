hris
	.controller( "educationCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.education = {};  
            showEducation();  
  
            /*==============================================
                    DISPLAY EDUCATION INFO IN TABLE
            ================================================*/

            function showEducation()
            {
                var id= $stateParams.empId;
                $http.get( '/getAllEducation/' + id )
                    .success( function ( response )
                    { 
                      $scope.educational = response; 
                    });

                var userId= $stateParams.userId;
                $http.get( '/getAllEducation/' + userId )
                    .success( function ( response )
                    { 
                      $scope.profEducational = response; 
                    });
            }

            /*==============================================
                    OPEN EDUCATION ADD-EDIT-DIALOG
            ================================================*/

            $scope.addEducationDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/education/educationAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addEducation = function ( data )
                        { 
                            data.employee_id = $stateParams.empId;
                            $http.post( '/addEducation', data )
                                .success( function ( response )
                            {  
                                $state.go( $state.current, {}, { reload: true });
                                $scope.education = {};
                                showEducation();
                            });
                        };     
                    }]
                });
            }

            $scope.editEducationDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/education/educationAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.education= {};
                        $scope.education.id = data.id;
                        $scope.education.levelType = data.levelType;
                        $scope.education.course = data.course;
                        $scope.education.school = data.school;
                        $scope.education.yearGrad = data.yearGrad;

                        $scope.updateEducation = function ( data )
                        {
                            $http.post( '/updateEducation', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.education = {};
                                showEducation();
                            });
                        }  

                    }]
                });
            }

            $scope.deleteEducation = function ( data )
            {
                $http.delete( '/deleteEducation/' + data )
                    .success( function ( response )
                {  
                    showEducation();
                });
            }   
		}
	])