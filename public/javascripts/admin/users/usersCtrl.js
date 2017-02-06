hris 
      .controller( "usersCtrl", [
            "$scope",
            "$state",
            "$http",
            "$timeout",
            "$stateParams",

            function controller ( $scope, $state, $http, $timeout, $stateParams )
            {   
                  employee();

                  $scope.dateValue= new Date(); 

                  /*==============================================
                                          COUNT
                  ================================================*/
 
                  var id= $stateParams.userId;
                  $http.get( '/getRoleCompany/' + id)
                    .success( function ( response ) 
                    {    
                        if( response.length > 0 )
                        { 
                            $scope.com = response[0]; 
                            $http.get( '/getOvertimeCountManager/' + $scope.com.company_id )
                               .success( function ( response )
                                     {     
                                          $scope.overtime= response[0];
                                  });    
                        } 
                    });  

                  $http.get( '/getRoleCompany/' + id)
                    .success( function ( response ) 
                    {    
                        if( response.length > 0 )
                        { 
                            $scope.com = response[0]; 
                            $http.get( '/getLeaveCountManager/' + $scope.com.company_id )
                               .success( function ( response )
                                     {     
                                          $scope.leaves= response[0];
                                  });    
                        } 
                    });  
                    
                  /*==============================================
                              DISPLAY LIST OF EMPLOYEES
                  ================================================*/

                  function employee()
                  {
                     $http.get( '/getUserTable')
                        .success( function ( response ) 
                        {  
                              $scope.employee = response;  
                              $scope.roleView= true; 
                              $scope.statusView= true;
                        }); 
                  } 

                  /*==============================================
                        DISPLAY EMPLOYEE INFO IN RIGHT NAVBAR
                  ================================================*/

                  var id= $stateParams.userId;
                        $http.get( '/getNavbarEmployee/' + id)
                        .success( function ( response ) 
                        {    
                              $scope.employees = response;   
                              $http.get( '/getRoleId/' + id)
                                    .success( function ( response ) 
                                    {    
                                          $scope.rolesId = response;   
                                    }); 
                        });  
                  
                  /*==============================================
                                    EDIT USER ROLE
                  ================================================*/

                  $http.get( '/getRole')
                        .success( function ( response ) 
                        {
                              $scope.roles = response; 
                        }); 
 
                  $scope.statuses= [ 'New', 'Active', 'Disable' ];   
                  

                  $scope.updateRole= function( data )
                  { 
                        $http.post( '/updateRole', data )
                              .success( function ( response ) 
                              {  
                                    $state.go( $state.current, {}, { reload: true });
                                    employee();
                              });
                  }

                  $scope.updateStatus= function( data )
                  { 
                        $http.post( '/updateStatus', data )
                              .success( function ( response ) 
                              {  
                                    $state.go( $state.current, {}, { reload: true });
                                    employee();
                              });
                  }

                  $scope.resetPass= function( data )
                  {     
                        function stringGen(len)
                        {
                            var text = " "; 
                            var charset = "abcdefghijklmnopqrstuvwxyz0123456789"; 
                            for( var i=0; i < len; i++ )
                                text += charset.charAt(Math.floor(Math.random() * charset.length));

                            return text;
                        }

                        data.password=(stringGen(6)); 
                        $http.post( '/resetPass', data )
                              .success( function ( response ) 
                              {   
                                    console.log(response)
                                    $state.go( $state.current, {}, { reload: true });  
                              });
                  }
 
            }
      ])