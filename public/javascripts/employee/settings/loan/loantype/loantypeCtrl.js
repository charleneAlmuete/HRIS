hris
  .controller( "loantypeCtrl", [
    "$state",
    "$scope",
    "$http",
    "$timeout",
    "ngDialog",

    function controller( $state, $scope, $http, $timeout, ngDialog )
    {
      $scope.loan= {};
      loanShow(); 

      function loanShow()
      {
        $http.get( '/getLoanType' )
          .success( function ( response )
          {
                $scope.loans= response;
                
          }); 
      } 
      /*==============================================
                      ADD LOAN TYPE
      ================================================*/
 
      $scope.addDialogLoan = function (  )
      { 
            ngDialog.open({ 
              templateUrl: "./public/javascripts/employee/settings/loan/loantype/loanAdd.html",
              showClose: true,
              className: 'ngdialog-theme-plain custom-width',
              closeByDocument: false, 

              controller: [ '$scope', function( $scope ) {  
                  $scope.add= true;  
                  $scope.loan={}; 

                  $scope.addLoanType = function ( data )
                  { 
                    $http.post( '/addLoanType', data )
                      .success( function ( response )
                      { 
                        $state.go( $state.current, {}, { reload: true });
                        $scope.loan = {};
                        loanShow();
                      });
                  }  
              }]
          });
      } 

      /*==============================================
                      UPDATE LOAN TYPE
      ================================================*/
 
      $scope.edit = function ( data )
      { 
            ngDialog.open({ 
              templateUrl: "./public/javascripts/employee/settings/loan/loantype/loanAdd.html",
              showClose: true,
              className: 'ngdialog-theme-plain custom-width',
              closeByDocument: false, 

              controller: [ '$scope', function( $scope ) {  
                  $scope.add= false;  
                  $scope.loan={}; 
                  $scope.loan.id= data.id;
                  $scope.loan.loanType= data.loanType;

                  $scope.updateLoanType = function ( data )
                  { 
                    $http.post( '/updateLoanType', data )
                      .success( function ( response )
                      { 
                        $state.go( $state.current, {}, { reload: true });
                        $scope.loan = {};
                        loanShow();
                      });
                  }  
              }]
          });
      }

      $scope.deleteLoanType = function ( data )
      { 
        $http.delete( '/deleteLoanType/' + data )
          .success( function ( response )
          {  
            loanShow();
          });
      } 

    }
  ])