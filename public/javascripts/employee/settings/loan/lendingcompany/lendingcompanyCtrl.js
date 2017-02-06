hris
  .controller( "lendingcompanyCtrl", [
    "$state",
    "$scope",
    "$http",
    "$timeout",
    "ngDialog",

    function controller( $state, $scope, $http, $timeout, ngDialog )
    {
      $scope.lending= {}; 
      lendingShow();

      /*==============================================
                    ADD LENDING COMPANY
      ================================================*/
 
        function lendingShow()
        {
          $http.get( '/getLending' )
            .success( function ( response )
            {
                  $scope.lendings= response;
                  
            }); 
        }
        

        $scope.addDialogLending = function (  )
        { 
              ngDialog.open({ 
                templateUrl: "./public/javascripts/employee/settings/loan/lendingcompany/lendingAdd.html",
                showClose: true,
                className: 'ngdialog-theme-plain custom-width',
                closeByDocument: false, 

                controller: [ '$scope', function( $scope ) {  
                    $scope.add= true;  
                    $scope.lending={}; 

                    $scope.addLending = function ( data )
                    { 
                      $http.post( '/addLending', data )
                        .success( function ( response )
                        { 
                          $state.go( $state.current, {}, { reload: true });
                          $scope.lending = {};
                          lendingShow();
                        });
                    }  

                }]
            });
        }

        $scope.edit = function ( data )
        { 
              ngDialog.open({ 
                templateUrl: "./public/javascripts/employee/settings/loan/lendingcompany/lendingAdd.html",
                showClose: true,
                className: 'ngdialog-theme-plain custom-width',
                closeByDocument: false, 

                controller: [ '$scope', function( $scope ) {  
                    $scope.add= false;  
                    $scope.lending={}; 
                    $scope.lending.id= data.id;
                    $scope.lending.name= data.name;

                    $scope.updateLending = function ( data )
                    { 
                      $http.post( '/updateLending', data )
                        .success( function ( response )
                        { 
                          $state.go( $state.current, {}, { reload: true });
                          $scope.lending = {};
                          lendingShow();
                        });
                    }  
                }]
            });
        } 

        $scope.deleteLending = function ( data )
        { 
          $http.delete( '/deleteLending/' + data )
            .success( function ( response )
            { 
              lendingShow();
            });
        }   
    }
  ])