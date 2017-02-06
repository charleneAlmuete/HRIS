hris
	.controller( "empPerformanceCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "ngDialog",
        "$stateParams",

		function controller( $scope, $http, $state, $timeout, ngDialog, $stateParams )
		{
            $scope.performance= {}; 
            performanceShow();

            /*==============================================
                            ADD PERFORMANCE
            ================================================*/
 
            $scope.addDialogPerformance = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/performance/performanceAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.performance= {}; 

                        $scope.addPerformance = function ( data )
                        { 
                            data.employee_id= $stateParams.empId;
                            $http.post( '/addPerformance', data )
                                .success( function ( response )
                            { 
                                $state.go( $state.current, {}, { reload: true });
                                $scope.performance = {}; 
                                $scope.$broadcast('angucomplete-alt:clearInput');
                                performanceShow();
                            });
                        } 
                    }]
                });
            }

             /*==============================================
                            RETRIEVE PERFORMANCE
            ================================================*/

            function performanceShow()
            {
                var id = $stateParams.empId;  
                $http.get( '/getPerformanceId/' + id )
                   .success( function ( response )
                   {  
                        $scope.performances= response; 
                });

                var userId = $stateParams.userId;  
                $http.get( '/getPerformanceId/' + userId )
                   .success( function ( response )
                   {  
                        $scope.profPerformances= response; 
                });    
            }

             /*==============================================
                            EDIT PERFORMANCE
            ================================================*/ 

            $scope.edit = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/performance/performanceAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.performance= {}; 
                        $scope.performance.id= data.id;
                        $scope.employee_id= data.employee_id;
                        $scope.performance.monthReview= data.monthReview;
                        $scope.performance.rating= data.rating;
                        $scope.performance.remarks= data.remarks;

                        $scope.updatePerformance = function ( data )
                        {  
                            $http.post( '/updatePerformance', data )
                                .success( function ( response )
                            {  
                                $state.go( $state.current, {}, { reload: true });
                                $scope.performance = {}; 
                                $scope.$broadcast('angucomplete-alt:clearInput');
                                performanceShow();
                            });
                        } 
                    }]
                });
            }

            $scope.deletePerformance = function ( data )
            {  
                $http.delete( '/deletePerformance/' + data )
                    .success( function ( response )
                {   
                    performanceShow();
                });
            }
 
		}
	])