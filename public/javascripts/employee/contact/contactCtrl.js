hris
	.controller( "contactCtrl", [
        "$stateParams",
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "ngDialog",

		function controller( $stateParams, $scope, $http, $state, $timeout, ngDialog )
		{
			$scope.employee = {};  
            $scope.children = {};  
            childrenShow();
            basicShow(); 
 
            /*==============================================
							SAVE BASIC CONTACT
            ================================================*/
            
            $scope.updateBasicContact = function ( data )
            {  
                $scope.submitForm= function( isValid )
                {
                    if( isValid )
                    {
                        data.id = $stateParams.empId;
                        $http.post( '/updateBasicContact', data )
                            .success( function ( response )
                        {  
                            $state.go( $state.current, {}, { reload: true }); 
                            basicShow();  
                        }); 
                    } else {
                        alert('ERROR: Please fill in the required field(s) given.');
                    }
                }     
            }  

            /*==============================================
                    DISPLAY EMPLOYEE INFO IN TEXTBOXES
            ================================================*/

            function basicShow()
            { 
                var id = $stateParams.empId; 
                $http.get( '/getEmployeeBasicContact/' + id )
                    .success( function ( response ) 
                {   
                    if ( response.length > 0 )
                    {
                      $scope.employee = response[0];   
                      $scope.updateBtn= true;
                      $scope.saveBtn= false;
                    } else {
                        $scope.saveBtn= true;
                        $scope.updateBtn= false;
                    } 
                });

                var userId = $stateParams.userId; 
                $http.get( '/getEmployeeBasicContact/' + userId )
                    .success( function ( response ) 
                {   
                    if ( response.length > 0 )
                    {
                      $scope.profContact = response[0];  
                    }  
                });
            } 
 
            /*==============================================
                    DISPLAY CHILDREN INFO IN TEXTBOXES
            ================================================*/

            function childrenShow() 
            { 
                var id = $stateParams.empId;  
                $http.get( '/getChildren/' + id)
                    .success( function ( response ) 
                    {  
                        if ( response.length > 0 )
                        {
                            $scope.childrenHistory = true;
                            $scope.employeeChildrens = response; 
                        } else {
                            $scope.childrenHistory = false;
                        }
                    });

                var userId = $stateParams.userId;  
                $http.get( '/getChildren/' + userId)
                    .success( function ( response ) 
                    {  
                        if ( response.length > 0 )
                        {
                            $scope.childrenInfo = true;
                            $scope.profChildrens = response; 
                        } else {
                            $scope.childrenInfo = false;
                        }
                    });
            }

            $scope.deleteChildren= function( data )
            {
                $http.delete( '/deleteChildren/' + data )
                    .success( function ( response ) 
                    {   
                        childrenShow();
                    });
            }
             
            /*==============================================
                        CHILDREN NG-DIALOG
            ================================================*/

            $scope.openDialogChildren = function (  )
            { 
                $scope.addChildren= true;
                ngDialog.open({
                    templateUrl: "./public/javascripts/employee/contact/children.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false,

                    controller: [ '$scope', function( $scope ) {  

                        $scope.addChildren =function ( data )
                        {    
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/addChildren', data )
                                .success( function ( response )
                            {  
                                childrenShow();
                                $state.go( $state.current, {}, { reload: true });
                                $scope.children = {}; 
                            });
                        } 
                    }]
                });
            }

            /*==============================================
                        EDIT CHILDREN NG-DIALOG
            ================================================*/

            $scope.editDialogChildren = function ( data )
            {    
                $scope.addChildren= false; 
 
                ngDialog.open({
                    templateUrl: "./public/javascripts/employee/contact/children.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false,

                    controller: [ '$scope', function( $scope )  {
                        $scope.children= {}; 
                        $scope.children.id= data.id;
                        $scope.children.name= data.name;
                        $scope.children.gender= data.gender;
                        $scope.children.dateBirth= data.dateBirth;
                        $scope.children.civilStatus= data.civilStatus;
                        $scope.children.occupation= data.occupation;
                        $scope.children.company= data.company; 
  
                        $scope.updateChildren = function ( data )
                        { 
                            $http.post( '/updateChildren', data )
                                .success( function ( response )
                            {
                                childrenShow(); 
                                $state.go( $state.current, {}, { reload: true });
                                $scope.children = {};
                            });
                        } 

                    }]
                });
            }
		}
	])