hris
	.controller( "skillsCtrl", [ 
		"$scope",
		"$http",
		"$state",
		"$timeout",
        "$stateParams",
        "ngDialog",

		function controller( $scope, $http, $state, $timeout, $stateParams, ngDialog )
		{
			$scope.skill = {};
			skillShow(); 
              
            /*==============================================
						DISPLAY SKILL INFO IN TABLE
            ================================================*/

            function skillShow()
            {
                var id = $stateParams.empId;
                $http.get( '/getSkill/' + id )
                    .success( function ( response )
                    {
                        if ( response.length > 0 )
                        {
                            $scope.skills = response;  
                            $scope.add= true;   
                        } else { 
                            $scope.add= true;
                        } 
                    }); 

                var userId = $stateParams.userId;
                $http.get( '/getSkill/' + userId )
                    .success( function ( response )
                    {
                        if ( response.length > 0 )
                        {
                            $scope.profSkills = response;   
                        } 
                    }); 
            }
               
            /*==============================================
                    OPEN SKILLS ADD-EDIT-DIALOG
            ================================================*/

            $scope.addSkillDialog = function (  )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/skills/skillsAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= true;

                        $scope.addSkill =function ( data )
                        { 
                            data.employee_id = $stateParams.empId;
                            $http.post( '/addSkill', data )
                                .success( function ( response )
                            { 
                                $scope.skill = {};
                                skillShow();
                            });
                        } 

                    }]
                });
            }

            $scope.editSkillDialog = function ( data )
            {    
                ngDialog.open({ 
                    templateUrl: "./public/javascripts/employee/skills/skillsAdd.html",
                    showClose: true,
                    className: 'ngdialog-theme-plain custom-width',
                    closeByDocument: false, 

                    controller: [ '$scope', function( $scope ) {  
                        $scope.add= false;

                        $scope.skill= {};
                        $scope.skill.id= data.id;
                        $scope.skill.type= data.type;
                        $scope.skill.name= data.name;
                        $scope.skill.level= data.level;

                        $scope.updateSkill = function ( data )
                        {
                            $http.post( '/updateSkill', data )
                                .success( function ( response )
                            {
                                $state.go( $state.current, {}, { reload: true });
                                $scope.skill = {};
                                skillShow();
                            });
                        }  
                    }]
                });
            }

            $scope.deleteSkill = function ( data )
            {
                $http.delete( '/deleteSkill/' + data )
                    .success( function ( response )
                { 
                    skillShow();
                });
            } 

		}
	])