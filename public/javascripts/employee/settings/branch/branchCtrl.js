hris 
      .controller( "branchCtrl", [
            "$scope",
            "$state",
            "$http",
            "$timeout",
            "ngDialog",

            function controller ( $scope, $state, $http, $timeout, ngDialog )
            {
                  $scope.branch= {};
                  branchShow();
                  
                  /*==============================================
                                    ADD BRANCH
                  ================================================*/

                  $scope.addDialogBranch = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/branch/branchAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.branch={}; 
 
                              
                              $scope.addBranch = function( data )
                              {
                                    $http.post( '/addBranch', data )
                                          .success( function ( response )
                                          {
                                                $state.go( $state.current, {}, { reload: true });
                                                data.id= response;
                                                $scope.branch= {};
                                                branchShow();
                                          });
                              }  
                          }]
                      });
                  } 

                  /*==============================================
                                    ADD BRANCH
                  ================================================*/
 
                  $scope.edit = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/branch/branchAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.branch={}; 
                              $scope.branch.id= data.id;
                              $scope.branch.name= data.name;
  
                              $scope.updateBranch = function( data )
                              {
                                    $http.post( '/updateBranch', data )
                                          .success( function ( response )
                                          {
                                                $state.go( $state.current, {}, { reload: true });
                                                data.id= response;
                                                $scope.branch= {};
                                                branchShow();
                                          });
                              }  
                          }]
                      });
                  }

                  function branchShow()
                  {
                        $http.get( '/getBranch' )
                              .success( function ( response )
                              {
                                    $scope.branches= response;
                                    
                              }); 
                  } 

                  $scope.deleteBranchType = function( data )
                  {
                        $http.delete( '/deleteBranchType/' + data )
                              .success( function ( response )
                              { 
                                    branchShow();
                              });
                  } 

            }
      ])