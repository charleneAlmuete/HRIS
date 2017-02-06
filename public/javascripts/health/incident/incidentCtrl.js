hris
	.controller( "incidentCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, ngDialog )
		{
            $scope.incident= {}; 
            incidentShow();

            /*==============================================
                            ADD INCIDENT
            ================================================*/
 
            $scope.addDialogIncident = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/health/incident/incidentAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;
                        $scope.incident= {};
   
                        $scope.addIncident = function ( data )
                        { 
                            $http.post( '/addIncident', data )
                                .success( function ( response )
                            { 
                                $state.go( $state.current, {}, { reload: true });
                                $scope.incident = {}; 
                                incidentShow();
                            });
                        } 
                    }]
                });
            }
  
            /*==============================================
                            RETRIEVE INCIDENT
            ================================================*/

            function incidentShow()
            {
                $http.get( '/getIncident' )
                   .success( function ( response )
                   {  
                        if ( response.length > 0 )
                        {
                            $scope.incidents= response;
                            $scope.incidentHistory= true;
                            $scope.add=true;
                        } else {
                            $scope.incidentHistory= false;
                            $scope.add=true;
                        }
                });   
            } 

            /*==============================================
                            EDIT INCIDENT
            ================================================*/
  
            $scope.edit = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/health/incident/incidentAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;
                        $scope.incident= {};
                        $scope.incident.id= data.id;
                        $scope.incident.occurence= data.occurence;
                        $scope.incident.natureOfAccident= data.natureOfAccident;
                        $scope.incident.injuryType= data.injuryType;
                        $scope.incident.coreActivity= data.coreActivity;
                        $scope.incident.location= data.location;
                        $scope.incident.dateOfOccurence= data.dateOfOccurence;
                        $scope.incident.employee_id= data.employee;
                        $scope.incident.damagedProperty= data.damagedProperty;
                        $scope.incident.details= data.details;
   
                         $scope.updateIncident = function ( data )
                        {   
                            $http.post( '/updateIncident', data )
                                .success( function ( response )
                            {  
                                $state.go( $state.current, {}, { reload: true });
                                $scope.incident = {}; 
                                incidentShow();
                            });
                        }  
                    }]
                });
            }
             
		}
	])