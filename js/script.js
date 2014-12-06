(function() {


  	
	var app = angular.module('lepageCaller', []);

	app.controller('CheckCall', function($scope, $http) {
		$scope.calls;


		$scope.add = function(id) {
			swal({
					title: "Ajouter ce client ?",
					text: "Ce client recevera un appel pour la prise d'un rendez-vous.",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Oui !",
					closeOnConfirm: false,
				},
			    function(){
			    	// Send Ajax request if confirm
					$http.post('add', id).success(function() {
						swal("Ajouter!", "Le client a ete ajouter avec succes.", "success");
						console.log("ID : " + id + " send to add handler.")
						$('#'+id).addClass('animated bounceOutLeft');
						$('#'+id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
							$('#'+id).remove();
						});
					});
			    }
			);
		};

		$scope.del = function(id) {
			swal({
					title: "Etes-vous sur ?",
					text: "Vous ne pourrez plus consulter cette fiche client!",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Oui, le supprimer !",
					closeOnConfirm: false,
					inputField: true 
				},
			    function(){
			    	// Send Ajax request if confirm
					$http.post('delete', id).success(function() {
						swal("Supprimer!", "La fiche client a bien ete supprimer!", "success");
						console.log("ID : " + id + " send to delete handler.");
						$('#'+id).addClass('animated bounceOutLeft');
						$('#'+id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
							$('#'+id).remove();
						});
					});   
			 
			    }
			);
		};

		$scope.noresp = function(id) {
			var elemId = '#'+id;
			
			$http.post('noresponse', id).success(function() {
				console.log("ID : " + id + " send to noresponse handler.")
				$('#'+id).addClass('animated bounceOutLeft');
				$('#'+id).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
					$('#'+id).remove();
				});
			});
		};
	});

})();

