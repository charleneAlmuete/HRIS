hris
    .controller( "serviceCtrl", [ 
        "$scope",
        "$http",
        "$state",
        "$timeout",
        "$stateParams",
        "ngDialog",

        function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
        {    
            otherLeave();
            otherBenefit();
            otherAllowance(); 
            $scope.otherServices= true; 
 
            /*==============================================
                            DISPLAY OTHER SERVICES 
            ================================================*/

            /*var id = $stateParams.empId;  
            $http.get( '/getService/' + id )
                .success( function ( response )
                {     
                    if ( response.length > 0 )
                    {
                        $scope.servicings = response;
                        $scope.otherServices= true;   
                    } else {
                        $scope.otherServices= false;   
                    }
                       
                });*/ 
 
            function otherLeave()
            {
                var id = $stateParams.userId;  
                $http.get( '/getOtherLeaveService/' + id )
                    .success( function ( response )
                    {   
                        console.log(response)
                        $scope.leavesShow = response;  
                    });

                var userId = $stateParams.userId; 
                $http.get( '/getOtherLeaveService/' + userId )
                    .success( function ( response )
                    {   
                        $scope.profLeavesShow = response;  
                    }); 
            }
            
           function otherBenefit()
           {
                var id = $stateParams.userId;
                $http.get( '/getOtherBenefitService/' + id )
                    .success( function ( response )
                    {     
                        console.log(response)
                        $scope.benefitsShow = response;   
                    }); 

                var userId = $stateParams.userId;
                $http.get( '/getOtherBenefitService/' + userId )
                    .success( function ( response )
                    {     
                        $scope.profBenefitsShow = response;   
                    }); 
           }
            
            function otherAllowance()
            {
                var id = $stateParams.userId;
                $http.get( '/getOtherAllowanceService/' + id )
                    .success( function ( response )
                    {   
                        console.log(response)
                        $scope.allowancesShow = response;   
                    }); 

                var userId = $stateParams.userId;
                $http.get( '/getOtherAllowanceService/' + userId )
                    .success( function ( response )
                    {   
                        $scope.profAllowancesShow = response;   
                    }); 
            }

            /*==============================================
                        SERVICE REDIRECTION
            ================================================*/

            /*$scope.editService = function ( data )
            {    
                $state.go( 'main.menuNav.servicing', { serviceId: data } )  
            }
              
            $scope.addService = function ( )
            {    
                $state.go( 'main.menuNav.servicing', { serviceId: 0 }  )  
            }*/ 
 
            /*==============================================
                        OPEN LEAVE ADD-EDIT-DIALOG
            ================================================*/

            $scope.openDialogAddLeave = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/leaveAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.addLeaveBtn= true;

                        $http.get( '/getLeave' )
                            .success( function( response ) 
                            { 
                                $scope.leaveTypes= response; 
                                $scope.getLeaveId = function ( data )
                                {  
                                     $http.get( '/getDays/' + data )
                                        .success( function( response )
                                        {    
                                            $scope.leaveDays = response ; 
                                        });
                                } 
                            });   
   
                        $scope.addOtherLeave = function( data )
                        {
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/addOtherLeave', data )
                                .success( function ( response )
                                {  
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.leave = {};
                                    otherLeave();
                                });
                        }  
                    }]
                });
            }
   
            $scope.openDialogEditLeave = function ( data )
            {   
                console.log(data)
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/leaveAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.addLeaveBtn= false;  
                        $scope.leave= {};     
                        $scope.leave.id= data.id;
                        $scope.leave.leave_id= data.leave_id;
                        $scope.leave.leavedays= data.leavedays;
                        $scope.leave.name= data.name;
                        $scope.leave.days= data.days;

                        $http.get( '/getLeave' )
                            .success( function( response ) 
                            { 
                                $scope.leaveTypes= response; 
                            }); 

                        $scope.updateLeaveWithDays = function ( data ) 
                        {   
                            $http.post( '/updateLeaveWithDays', data  )
                                .success( function ( response ) 
                            {   
                                $scope.leave = {};
                                $state.go( $state.current, {}, { reload: true });
                                otherLeave();
                            });
                        } 
                    }]
                });
            }

            /*==============================================
                        OPEN BENEFIT ADD-EDIT-DIALOG
            ================================================*/

            $scope.openDialogAddBenefit = function (  )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/benefitAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.addBenefitBtn= true; 

                        $http.get( '/getBenefit' )
                            .success( function( response ) 
                            {
                                $scope.benefitTypes= response;
                            });

                        $scope.addOtherBenefit = function( data )
                        {  
                            data.employee_id = $stateParams.userId; 
                            $http.post( '/addOtherBenefit', data )
                                .success( function ( response )
                                {   
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.benefit = {};
                                    otherBenefit();
                                });
                        }  
                    }]
                });
            }

            $scope.openDialogEditBenefit = function ( data )
            {     
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/benefitAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.addBenefitBtn= false; 
                        $scope.benefit={};
                        $scope.benefit.id= data.id;
                        $scope.benefit.benefit_id= data.benefit_id;
                        $scope.benefit.amount= data.amount;


                        $http.get( '/getBenefit' )
                            .success( function( response ) 
                            {
                                $scope.benefitTypes= response;
                            });

                        $scope.updateOtherBenefit = function( data )
                        {  
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/updateOtherBenefit', data )
                                .success( function ( response )
                                {   
                                    $scope.benefit = {};
                                    $state.go( $state.current, {}, { reload: true });
                                    otherBenefit();
                                });
                        }  
                    }]
                });
            }

            /*==============================================
                        OPEN ALLOWANCE ADD-EDIT-DIALOG
            ================================================*/

            $scope.openDialogAddAllowance = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/allowanceAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) { 
                        $scope.addAllowanceBtn= true;   

                        $http.get( '/getAllowance' )
                            .success( function( response ) 
                            {
                                $scope.allowanceTypes= response;
                            });
 
                        $scope.addOtherAllowance = function( data )
                        { 
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/addOtherAllowance', data )
                                .success( function ( response )
                                {  
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.allowance = {};
                                    otherAllowance();
                                });
                        } 
 
                    }]
                });
            }

            $scope.openDialogEditAllowance= function( data )
            {
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/service/allowanceAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {   
                        $scope.addAllowanceBtn= false; 
                        $scope.allowance={};
                        $scope.allowance.id= data.id;
                        $scope.allowance.allowance_id= data.allowance_id;
                        $scope.allowance.amount= data.amount;

                        $http.get( '/getAllowance' )
                            .success( function( response ) 
                            {
                                $scope.allowanceTypes= response;
                            });
 
                        $scope.updateOtherAllowance = function( data )
                        { 
                            data.employee_id = $stateParams.empId; 
                            $http.post( '/updateOtherAllowance', data )
                                .success( function ( response )
                                {  
                                    $state.go( $state.current, {}, { reload: true });
                                    $scope.allowance = {};
                                    otherAllowance();
                                });
                        } 
 
                    }]
                }); 
            }

            $scope.deleteLeave = function( data )
            {  
                $http.delete( '/deleteLeave/' + data )
                    .success( function ( response )
                    {   
                        otherLeave();
                    });
            }

            $scope.deleteBenefit = function( data )
            {  
                $http.delete( '/deleteBenefit/' + data )
                    .success( function ( response )
                    {   
                        otherBenefit();
                    });
            }

            $scope.deleteAllowance = function( data )
            {  
                $http.delete( '/deleteAllowance/' + data )
                    .success( function ( response )
                    {   
                        otherAllowance();
                    });
            }

        }
    ])