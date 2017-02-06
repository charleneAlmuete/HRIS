hris
	.controller( "examCtrl", [
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.exam = {}; 
            showExam();
  
            /*==============================================
					DISPLAY EXAM INFO IN TABLE
            ================================================*/

            function showExam()
            {
                var id = $stateParams.empId;
                $http.get( '/getExam/' + id )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {
                            $scope.exams = response;
                            $scope.add=true;  
                        } else {
                            $scope.add=true;  
                        } 
                    });

                var userId = $stateParams.userId;
                $http.get( '/getExam/' + userId )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        {
                            $scope.profExams = response; 
                        } 
                    });
            } 
  
            /*==============================================
                    OPEN EDUCATION ADD-EDIT-DIALOG
            ================================================*/

            $scope.addExamDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/exam/examAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addExam =function ( data )
                        {
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/addExam', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.exam = {};
                                showExam();
                            });
                        }   
                    }]
                });
            }

            $scope.editExamDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/exam/examAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.exam= {};
                        $scope.exam.id= data.id;
                        $scope.exam.name= data.name;
                        $scope.exam.rating= data.rating;
                        $scope.exam.image= data.image;
                        $scope.exam.licenseNo= data.licenseNo;

                        $scope.updateExam = function ( data )
                        {
                            $http.post( '/updateExam', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.exam = {};
                                showExam();
                            });
                        } 
                    }]
                });
            } 

            $scope.deleteExam = function ( data )
            {
                $http.delete( '/deleteExam/' + data )
                    .success( function ( response )
                { 
                    showExam();
                });
            } 
		}
	])