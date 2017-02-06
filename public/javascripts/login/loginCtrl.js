hris
	.controller( "loginCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
		"ngDialog", 
		"$rootScope",
		"md5",

		function controller( $scope, $http, $state, $timeout, ngDialog, $rootScope, md5 )
		{  
			$scope.employee= {};
			$scope.ret= {}; 
			$scope.account= {};  
 
			 
			$scope.verifyUser= function( data )
			{    
				$http.get( '/verifyUser/' + data )
                    .success( function( response )
                    {    
                    	if( response.length > 0 )
                    	{    
                    		$scope.employee= response[0];   
                    	} 
                    });  

                $http.get( '/differentPass/' + data )
	                .success( function ( response )
	                {     
	                	if ( response.length > 0 )
	                	{
	                		$scope.ret= response[0]; 
	                	}  else {
	                		$scope.ret="";  
	                	} 
	                }); 
			}
 
			$scope.loginBtn= function( data )
			{  
				var pass= md5.createHash(data.password);   
				if( data.userStatus == 'New' && data.username == $scope.ret.username && pass == $scope.ret.password )
				{ 
					ngDialog.open({ 
	                    templateUrl: "./public/javascripts/login/loginChange.html",
	                    showClose: false,
	                    className: 'ngdialog-theme-plain custom-width',
	                    closeByDocument: false, 

	                    controller: [ '$scope', function( $scope ) {  

	  						$scope.changePass={};  
	  						$scope.changePass.id= data.id; 
 
	                		$scope.addUser= function( data )
	                		{        
	                			if( data.password === $scope.confirm  )
	                			{   
	                				$http.post( '/addUser', data )
		                                .success( function ( response )
		                            {  
		                            	$state.go( $state.current, {}, { reload: true });
		                            	$scope.notifSuccess= true; 
		                            	$scope.notifFailed= false; 
		                                $scope.changePass = {};
		                                $scope.confirm= "";  
		                            }); 

	                			} else {
	                				$scope.notifSuccess= false; 
		                            $scope.notifFailed= true;  
	                			}
	                		} 

	                		$scope.closeAll= function(  )
		                    {  
		                    	ngDialog.closeAll();   
		                    }   
	                    }]  
	                }); 
				} 
				else if ( data.userStatus == 'Active' && data.username == $scope.ret.username && pass == $scope.ret.password )
				{
					ngDialog.open({ 
	                    templateUrl: "./public/javascripts/login/message.html",
	                    showClose: false,
	                    className: 'ngdialog-theme-plain custom-width',
	                    closeByDocument: false,

	                    controller: [ '$scope', function( $scope ) {

	                    	$scope.disable=false;
	                    	$scope.invalid=false;
	                    	$scope.successful=true;
	                    	$scope.account={}; 

	                    	$scope.account.employee_id= data.employee_id;
	                    	$scope.account.role_id= data.role_id;  
	                    	$scope.closeAll= function( data )
		                    {  
		                        ngDialog.closeAll(); 

		                        if( data.role_id == '6' )
		                        { 
		                        	$state.go( 'user', { userId: data.employee_id }  );
		                        } 
		                        if( data.role_id == '5' )
		                        { 
		                        	$state.go( 'user', { userId: data.employee_id }  );
		                        } 
		                        else if( data.role_id == '4' )  
		                        {
		                        	$state.go( 'user', { userId: data.employee_id })
		                        } 
		                        else if( data.role_id == '2' )  
		                        {
		                        	$state.go( 'main', { userId: data.employee_id })
		                        }  
		                    } 
	                    }]
                	});
				}
				else if ( data.userStatus == 'Disabled' && data.username == $scope.ret.username && pass == $scope.ret.password )
				{
					ngDialog.open({ 
	                    templateUrl: "./public/javascripts/login/message.html",
	                    showClose: false,
	                    className: 'ngdialog-theme-plain custom-width',
	                    closeByDocument: false,

	                    controller: [ '$scope', function( $scope ) {

	                    	$scope.disable=true;
	                    	$scope.invalid=false;
	                    	$scope.successful=false;
	                    	$scope.account={};   

	                    	$scope.closeAll= function()
		                    { 
		                        ngDialog.closeAll();   
		                    } 
	                    }]
                	});
				}
				else if ( data.username != $scope.ret.username || pass != $scope.ret.password )
				{
					ngDialog.open({ 
	                    templateUrl: "./public/javascripts/login/message.html",
	                    showClose: false,
	                    className: 'ngdialog-theme-plain custom-width',
	                    closeByDocument: false,

	                    controller: [ '$scope', function( $scope ) {

	                    	$scope.disable=false;
	                    	$scope.invalid=true;
	                    	$scope.successful=false;
	                    	$scope.account={};   

	                    	$scope.closeAll= function()
		                    { 
		                        ngDialog.closeAll();   
		                    } 
	                    }]
                	});
				}
			}
		}
	])