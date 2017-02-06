hris
	.controller( "empRecognitionCtrl", [ 
		"$scope",
		"$http", 
		"$state",
		"$timeout",
        "ngDialog",
        "$stateParams",

		function controller( $scope, $http, $state, $timeout, ngDialog, $stateParams )
		{
            $scope.recognition= {}; 
            recognitionShow();  
 
            /*==============================================
                            ADD RECOGNITION
            ================================================*/
 
            $scope.addDialogRecognition = function ( )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/recognition/recognitionAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.recognition= {}; 

                        $scope.addRecognition = function ( data )
                        {    
                            data.employee_id= $stateParams.empId;
                            $http.post( '/addRecognition', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, {}, { reload: true });  
                                    $scope.recognition = {};  
                                    $scope.$broadcast('angucomplete-alt:clearInput');
                                    recognitionShow();
                                });
                        } 
                    }]
                });
            }
            
             /*==============================================
                            RETRIEVE RECOGNITION
            ================================================*/

            function recognitionShow()
            {
                var id= $stateParams.empId;
                $http.get( '/getRecognitionId/' + id )
                   .success( function ( response )
                    {    
                        $scope.recognitions= response; 
                    });  

                var userId= $stateParams.userId;
                $http.get( '/getRecognitionId/' + userId )
                   .success( function ( response )
                    {    
                        $scope.profRecognitions= response; 
                    });   
            }

             /*==============================================
                            VIEW RECOGNITION
            ================================================*/
  
            $scope.edit = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/recognition/recognitionAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.recognition= {};  
                        $scope.recognition.id= data.id;
                        $scope.employee_id= data.employee_id;
                        $scope.recognition.awardGiven= data.awardGiven;
                        $scope.recognition.citation= data.citation;   

                        $scope.updateRecognition = function ( data )
                        {   
                            $http.post( '/updateRecognition', data )
                                .success( function ( response )
                                {   
                                    $scope.recognition = {};   
                                    $scope.$broadcast('angucomplete-alt:clearInput');
                                    $state.go( $state.current, {}, { reload: true }); 
                                    recognitionShow();
                                });
                        } 

                    }]
                });
            }

            $scope.deleteRecognition = function ( data )
            {   
                $http.delete( '/deleteRecognition/' + data )
                    .success( function ( response )
                    {    
                        recognitionShow();
                    });
            } 
 
		}
	])
 