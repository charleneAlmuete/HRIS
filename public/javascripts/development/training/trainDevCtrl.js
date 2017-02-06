hris
	.controller( "trainDevCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, ngDialog )
		{
            $scope.trainDev= {};
            trainDevShow();

            /*==============================================
                            ADD TRAIN DEV
            ================================================*/
 
            $scope.addDialogTraining = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/development/training/trainAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.trainDev= {}; 

                        $scope.addTrainDev= function( data )
                        {
                            $http.post( '/addTrainDev', data )
                                .success( function ( response )
                                {
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.trainDev={};
                                    trainDevShow();
                                })
                        } 
                    }]
                });
            }

            function trainees()
            {
                $http.get( '/getTrainees') 
                    .success( function ( response ) 
                    {    
                        $scope.trainees= response;   
                    }) 
            }

            /*==============================================
                                 TRAINEES
            ================================================*/
 
            $scope.addTrainees = function ( data )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/development/training/traineeAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width customized',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) { 
                        $scope.addTrainees= true;
                        $scope.addTraineesLabel= true;
                        $scope.trainee={}; 
                        $scope.training= data.training;  
                        $scope.trainee.traindev_id= data.id;   

                        $http.get( '/getAllEmployee') 
                            .success( function ( response ) 
                            {   
                                $scope.employeeNames= response;   
                            }) 

                        $scope.empId= function( selected )
                        {      
                            $scope.trainee.employee_id= selected.description.id;   
                        }

                        $scope.addTrainee= function( data )
                        {  
                            $http.post( '/addTrainee', data )
                                .success( function ( response )
                                {  
                                    $state.go( $state.current, {}, { reload: true });  
                                    $scope.$broadcast('angucomplete-alt:clearInput'); 
                                    $scope.viewTrainees= true;

                                    $http.get( '/getTrainees') 
                                        .success( function ( response ) 
                                        {    
                                            $scope.trainees= response;   
                                        }) 
                                })
                        } 
                    }]
                });
            }

            $scope.viewTrainees = function ( data )
            {      
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/development/training/traineeAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width customized',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) { 
                        var id= data.id; 
                        $scope.viewTrainees= true; 
                        $scope.viewTraineesLabel= true;

                        $http.get( '/getTrainees/' + id ) 
                            .success( function ( response ) 
                            {    
                                console.log(response)
                                $scope.trainees= response;   
                            }) 

                        $scope.deleteTrainee= function( data )
                        {    
                            $http.delete( '/deleteTrainee/' + data )
                                .success( function ( response )
                                {  
                                    $http.get( '/getTrainees/' + id  ) 
                                        .success( function ( response ) 
                                        {    
                                            $scope.trainees= response;   
                                        }) 
                                })
                        } 
                    }]
                });
            }

            /*==============================================
                            UPDATE TRAIN DEV
            ================================================*/

            $scope.edit = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/development/training/trainAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.trainDev= {}; 
                        $scope.trainDev.id= data.id;
                        $scope.trainDev.training= data.training;
                        $scope.trainDev.topic= data.topic;
                        $scope.trainDev.dateConduct= data.dateConduct;
                        $scope.trainDev.duration= data.duration;
                        $scope.trainDev.cost= data.cost;
                        $scope.trainDev.venue= data.venue;
                        $scope.trainDev.speaker= data.speaker;
                        $scope.trainDev.benefit= data.benefit;

                        $scope.updateTrainDev= function( data )
                        {
                            $http.post( '/updateTrainDev', data )
                                .success( function( response )
                                {
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.trainDev = {};
                                    trainDevShow();
                                })
                        } 
                    }]
                });
            }

            /*==============================================
                            RETRIEVE TRAIN DEV
            ================================================*/

            function trainDevShow()
            {
            	$http.get( '/getTrainDev' )
            		.success( function ( response )
            		{ 
        				$scope.trains= response; 
            		})
            } 

            $scope.deleteTrainingDev= function( data )
            { 
                $http.delete( '/deleteTrainingDev/' + data )
                    .success( function( response )
                    {  
                        trainDevShow();
                    })
            }  
		}
	])