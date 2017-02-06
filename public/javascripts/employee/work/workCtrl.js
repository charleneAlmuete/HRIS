hris
	.controller( "workCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.work = {};  
            workShow()
    
            /*==============================================
						DISPLAY EXAM INFO IN TABLE
            ================================================*/

            function workShow()
            {
                var id = $stateParams.empId;
                $http.get( '/getWork/' + id )
                    .success( function ( response )
                    {
                        console.log(response)
                        if ( response.length > 0 )
                        {
                            $scope.works = response; 
                            $scope.add= true;  
                        } else {
                            $scope.add= true; 
                        }
                    }); 

                var userId = $stateParams.userId;
                $http.get( '/getWork/' + userId )
                    .success( function ( response )
                    { 
                        if ( response.length > 0 )
                        { 
                            $scope.profWorks = response;   
                        }  
                    });
            } 

             
            /*==============================================
                        OPEN WORK ADD-EDIT-DIALOG
            ================================================*/

            $scope.addWorkDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/work/workAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true; 

                        $scope.addWork =function ( data )
                        {
                            data.employee_id = $stateParams.empId;       
                            $http.post( '/addWork', data )
                                .success( function ( response ) 
                                { 
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.work = {};
                                    workShow();
                                });
                            } 
                    }]
                });
            }

            $scope.editWorkDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/work/workAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false; 

                        $scope.work= {};
                        $scope.work.id= data.id;
                        $scope.work.position= data.position;
                        $scope.work.company= data.company;
                        $scope.work.empStatus= data.empStatus;
                        $scope.work.reason= data.reason;
                        $scope.work.durFrom= data.durFrom;
                        $scope.work.durTo= data.durTo;
                        $scope.work.salary= data.salary;

                        $scope.updateWork = function ( data )
                        { 
                            $http.post( '/updateWork', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.work = {};
                                workShow();
                            });
                        }  
                    }]
                });
            } 

            $scope.deleteWork = function ( data )
            { 
                $http.delete( '/deleteWork/' + data )
                    .success( function ( response )
                { 
                    workShow();
                });
            }
		}
	])