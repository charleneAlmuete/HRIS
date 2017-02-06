hris 
	.controller( "posCtrl", [
		"$scope",
		"$state",
		"$http",
		"$timeout",
            "ngDialog",

		function controller ( $scope, $state, $http, $timeout, ngDialog )
		{
                  $scope.position= {};
                  $scope.skill= {};
                  positionShow();
                  skillsShow();

			/*==============================================
                                    ADD POSITION
                  ================================================*/

                  $scope.addDialogPosition = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/position/positionAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.position={};
 
                              $scope.addPosition= function ( data )
                              { 
                                    $http.post( '/addPosition', data )
                                          .success( function ( response )
                                          { 
                                                data.id= response;
                                                $state.go( $state.current, {}, { reload: true });
                                                $scope.position= {};
                                                positionShow();
                                          })
                              } 
                          }]
                      });
                  }

                  /*==============================================
                                    UPDATE POSITION
                  ================================================*/

                  $scope.editPosition = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/position/positionAdd.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.position={}; 
                              $scope.position.id= data.id;
                              $scope.position.name= data.name;
 
                              $scope.updatePosition= function( data )
                              {  
                                    $http.post( '/updatePosition', data )
                                      .success( function( response )
                                      { 
                                          $state.go( $state.current, {}, { reload: true }); 
                                          $scope.position= {};
                                          positionShow();
                                      })
                              }  
                          }]
                      });
                  }

                  /*==============================================
                                    ADD SKILL
                  ================================================*/

                  $scope.addDialogSkills = function (  )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/position/posSkills.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= true;  
                              $scope.skill={}; 

                              $http.get( '/getPosition' )
                                    .success( function ( response )
                                    { 
                                          $scope.positions= response; 
                                    }); 
 
                              $scope.addSkill= function ( data )
                              { 
                                    $http.post( '/addPositionSkills', data )
                                          .success( function ( response )
                                          { 
                                                console.log(response)
                                                data.id=response;
                                                $state.go( $state.current, {}, { reload: true }); 
                                                $scope.skill= {}; 
                                                skillsShow();
                                          })    
                              } 
                          }]
                      });
                  }
 
                  /*==============================================
                              UPDATE SKILLS
                  ================================================*/
 
                  $scope.editPositionWithSkill = function ( data )
                  { 
                        ngDialog.open({ 
                          templateUrl: "./public/javascripts/employee/settings/position/posSkills.html",
                          showClose: true,
                          className: 'ngdialog-theme-plain custom-width',
                          closeByDocument: false, 

                          controller: [ '$scope', function( $scope ) {  
                              $scope.add= false;  
                              $scope.skill={};  
                              $scope.skill.id= data.id;
                              $scope.skill.position_id=data.position_id;
                              $scope.skill.skills= data.skills;

                              $http.get( '/getPosition' )
                                    .success( function ( response )
                                    { 
                                          $scope.positions= response; 
                                    }); 
 
                              $scope.updateSkill= function( data )
                              { 
                                    $http.post( '/updatePositionSkills', data )
                                      .success( function( response )
                                      {
                                          $state.go( $state.current, {}, { reload: true }); 
                                          $scope.skill= {};
                                          skillsShow();
                                    })
                              } 
                          }]
                      });
                  }
                       
                  /*==============================================
                              RETRIEVE POSITION & SKILLS
                  ================================================*/

                  function positionShow()
                  {
                        $http.get( '/getPosition' )
                              .success( function( response )
                              {
                                    if ( response.length > 0 )
                                    {
                                          $scope.positions= response;
                                          $scope.positionHistory= true; 
                                    } else {
                                          $scope.positionHistory= true; 
                                    }
                              })
                  }

                  function skillsShow()
                  {
                        $http.get( '/getPositionSkill' )
                              .success( function ( response )
                              {
                                    if ( response.length > 0 )
                                    {
                                          $scope.positionWithSkills= response;
                                          $scope.positionWithSkillsHistory= true;
                                          $scope.addSkills= true;
                                          $scope.add= false;
                                    } else {
                                          $scope.positionWithSkillsHistory= false;
                                          $scope.addSkills= true;
                                          $scope.add= false;
                                    }
                              })
                  } 

                  $scope.deletePositionWithSkill = function( data )
                  {      
                        $http.delete( '/deletePositionWithSkill/' + data )
                              .success( function ( response ) 
                              {     
                                    $scope.leaveDays = {};
                                    $scope.leave= {};
                                    skillsShow();
                              });
                  }

                  $scope.deletePositionType = function( data )
                  {      
                        $http.delete( '/deletePositionType/' + data )
                              .success( function ( response ) 
                              {      
                                    positionShow();
                              });
                  }
		}
	])

 