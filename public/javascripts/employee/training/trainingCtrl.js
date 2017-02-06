hris
	.controller( "trainingCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
    "$stateParams",
    "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.training = {};
      showTraining();  

      /*==============================================
		          DISPLAY TRAINING INFO IN TABLE
      ================================================*/

      function showTraining()
      {
          var id= $stateParams.empId;
          $http.get( '/getTraining/' + id )
              .success( function ( response )
              { 
                  if ( response.length > 0 )
                  {
                     $scope.trainings = response;  
                     $scope.add= true;
                  } else { 
                      $scope.add=true;
                  } 
              });

          var userId= $stateParams.userId;
          $http.get( '/getTraining/' + userId )
              .success( function ( response )
              { 
                  if ( response.length > 0 )
                  {
                     $scope.profTrainings = response;   
                  }  
              });   
      }
        
      /*==============================================
              OPEN EDUCATION ADD-EDIT-DIALOG
      ================================================*/

      $scope.addTrainingDialog = function (  )
      {    
          ngDialog.open({ 
              templateUrl: "./public/javascripts/employee/training/trainingAdd.html",
              showClose: true,
              className: 'ngdialog-theme-plain custom-width',
              closeByDocument: false, 

              controller: [ '$scope', function( $scope ) {  
                  $scope.add= true;

                  $scope.addTraining =function ( data )
                  { 
                      data.employee_id = $stateParams.empId;
                      $http.post( '/addTraining', data )
                          .success( function ( response )
                      { 
                          $scope.training = {};
                          showTraining();
                      });
                  }  
              }]
          });
      }

      $scope.editTrainingDialog = function ( data )
      {    
          ngDialog.open({ 
              templateUrl: "./public/javascripts/employee/training/trainingAdd.html",
              showClose: true,
              className: 'ngdialog-theme-plain custom-width',
              closeByDocument: false, 

              controller: [ '$scope', function( $scope ) {  
                  $scope.add= false;

                    $scope.training={};
                    $scope.training.id= data.id;
                   $scope.training.name= data.name;
                   $scope.training.started= data.started;
                   $scope.training.ended= data.ended;
                   $scope.training.remarks= data.remarks;
                   $scope.training.institution= data.institution;
                   $scope.training.venue= data.venue;
                   $scope.training.speaker= data.speaker;

                  $scope.updateTraining = function ( data )
                  {
                    $http.post( '/updateTraining', data )
                      .success( function ( response )
                      {
                              $state.go( $state.current, {}, { reload: true });
                              $scope.training = {};
                              showTraining();
                      });
                  } 
              }]
          });
      }

      $scope.deleteTraining = function ( data )
      {
        $http.delete( '/deleteTraining/' + data )
          .success( function ( response )
          { 
                  showTraining();
          });
      } 
		}
	])