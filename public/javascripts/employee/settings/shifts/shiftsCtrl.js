hris 
      .controller( "shiftsCtrl", [
            "$scope",
            "$state",
            "$http",
            "$timeout",
            "ngDialog",

            function controller ( $scope, $state, $http, $timeout, ngDialog )
            {
                  $scope.shift= {};
                  shiftShow(); 

                  function shiftShow()
                  {
                       $http.get( '/getShift' )
                        .success( function( response )
                        {   
                          $scope.shiftList= response;   
                        })  

                        $http.get( '/getShiftGroup' )
                          .success( function( response )
                          {  
                                $scope.shifts= response;  
                          })
                  } 

                  
                  
                  /*==============================================
                                    ADD SCHEDULE
                  ================================================*/
 
                  $scope.addDialogSchedule = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/shifts/shiftAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.shift={}; 

                              $http.get( '/getShiftGroup' )
                                .success( function( response )
                                {  
                                      $scope.shifts= response;  
                                })
 
                              $scope.addShift = function( data )
                              {
                                $http.post( '/addShift', data )
                                      .success( function ( response )
                                      { 
                                            $state.go( $state.current, {}, { reload: true });
                                            $scope.shift= {};
                                            shiftShow();
                                      });
                              }  
                          }]
                      });
                  } 

                  /*==============================================
                                    UPDATE SCHEDULE
                  ================================================*/
 
                  $scope.editSchedule = function ( data )
                  {  
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/shifts/shiftAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.shift={}; 
                              $scope.shift.id= data.id;
                              $scope.shift.shiftgroup_id= data.shiftgroup_id;
                              $scope.shift.dayShift= data.dayShift;
                              $scope.shift.timein= data.timein;
                              $scope.shift.timeout= data.timeout; 

                              $http.get( '/getShiftGroup' )
                                .success( function( response )
                                {  
                                      $scope.shifts= response;  
                                })
 
                              $scope.updateShift = function ( data )
                              {
                                  $http.post( '/updateShift', data )
                                      .success( function ( response )
                                  {
                                      $state.go( $state.current, {}, { reload: true });
                                      $scope.shift = {};
                                      shiftShow(); 
                                  });
                              }  
                          }]
                      });
                  } 

                  /*==============================================
                                    ADD SHIFT
                  ================================================*/
 
                  $scope.addDialogShift = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/shifts/shiftgroup.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.group={}; 
  
                              $scope.addShiftGroup = function( data )
                              {
                                $http.post( '/addShiftGroup', data )
                                      .success( function ( response )
                                      { 
                                            $state.go( $state.current, {}, { reload: true });
                                            $scope.group= {};
                                            shiftShow();
                                      });
                              }  
                          }]
                      });
                  } 

                  /*==============================================
                                    UPDATE SHIFT
                  ================================================*/
 
                  $scope.editShiftType = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/shifts/shiftgroup.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.group={}; 
                              $scope.group.id= data.id;
                              $scope.group.shiftName= data.shiftName;
  
                              $scope.updateShiftGroup = function( data )
                              {
                                $http.post( '/updateShiftGroup', data )
                                      .success( function ( response )
                                      { 
                                            $state.go( $state.current, {}, { reload: true });
                                            $scope.group= {};
                                            shiftShow();
                                      });
                              }  
                          }]
                      });
                  }

                  $scope.deleteShiftType = function( data )
                  {
                    $http.delete( '/deleteShiftType/' + data )
                          .success( function ( response )
                          {  
                                shiftShow();
                          });
                  }  

                  $scope.deleteSchedule = function( data )
                  {
                    $http.delete( '/deleteSchedule/' + data )
                          .success( function ( response )
                          {  
                                shiftShow();
                          });
                  }     

            }
      ])