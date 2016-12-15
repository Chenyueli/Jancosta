;
(function() {
	$(document).ready(function() {

//				$(".container").children().not("#home").removeClass("hidden").fadeOut(100);
//				$("#login").removeClass("hidden").fadeOut(100);
//				$("#home").removeClass("hidden");
				$("#manager").show();

		$("header li").click(function(e) {

			$("header li").removeClass("active");
			$(this).addClass("active");

			$item = $("#" + $(this).attr("name"));
			if($(this).attr("name") !== "login") {
				$(".container").children().fadeOut(100);
			}
			$item.slideDown(800);
		})

		//   About
		$(".contact").click(function() {
			$("#about,#contact,#home,#products,#vip").removeClass("hidden").fadeOut(100);
			$("#contact").slideDown(800);
		});

		//VIP
		$("#vip button").click(function(e) {
			e.preventDefault();
			var $name = $("#vip input[name='name']"),
				$email = $("#vip input[name='email']"),
				_inName = $name.val().trim(),
				_inEmail = $email.val().trim();
			var _regEmail = /\w+[@]{1}\w+[.]\w+/;
			if(_inName == "") {
				$name.after("<p class = 'warning'>* Enter your name</p>");
			} else if(!(_regEmail.test(_inEmail))) {
				$email.after("<p class = 'warning'>* Enter your right Emial address</p>");
			} else {
				data = {
					"name": _inName,
					"email": _inEmail
				};
				alert(data.name + data.email);
				//				$.post("index.php", data, function(rData) {
				//					if(rData.errno != 0) {
				//						alert(rData.errMsg);
				//					} else {
				//						alert("Congratulation,you have successfully signed for VIP of Jancosta!!");
				//					}
				//				});
			}
		});
		$("#vip input").focus(function() {
			$(this).select();
			$("#vip .warning").fadeOut(500, function() {
				$(this).remove();
			});
		});

		//contact
		$("#contact button").click(function(e) {
			e.preventDefault();
			var $name = $("#contact input[name='name']"),
				$email = $("#contact input[name='email']"),
				_inName = $name.val().trim(),
				_inEmail = $email.val().trim(),
				_inSubject = $("#contact input[name='subject']").val().trim(),
				_inMessage = $("#contact textarea").val().trim();
			var _regEmail = /\w+[@]{1}\w+[.]\w+/;
			if(_inName == "") {
				$name.after("<p class = 'warning'>* Enter your name</p>");
			} else if(!(_regEmail.test(_inEmail))) {
				$email.after("<p class = 'warning'>* Enter your right Emial address</p>");
			} else {
				var data = {
					"name": _inName,
					"email": _inEmail,
					"subject": _inSubject,
					"message": _inMessage
				};
				alert(data.name + data.email + data.subject + data.message);
				//				$.post("index.php", data, function(rData) {
				//					if(rData.errno != 0) {
				//						alert(rData.errMsg);
				//					} else {
				//						alert("Submit sucessfully, We will contact you in 3-5 days,please wait patiently!");
				//					}
				//				});
			}
		});

		$("#contact input").focus(function() {
			$(this).select();
			$("#contact .warning").fadeOut(500, function() {
				$(this).remove();
			});
		});

		//login
		$("#login form").click(function(e) {
			e.stopPropagation();
		});
		$("#login").click(function() {
			$(this).slideUp(300);
		});
		$("#login button").click(function(e) {
			e.preventDefault();
			$("#login .warning").remove();
			var _username = $("#login input[name='username']").val().trim(),
				_pwd = $("#login input[name='pwd']").val().trim();
			if(_username == "" || _pwd == "") {
				$(this).before("<p class = 'warning'>* Enter username and password</p>");
			} else {
				var data = {
					"username": _username,
					"password": _pwd
				};
				//				alert(data.username + data.password);
				// go to manager pages
				$("#login").hide();
				$(".container").children().fadeOut(100);
				$("#manager").slideDown(800);
				//				$.post("index.php", data, function(rData) {
				//					if(rData.errno != 0) {
				//						alert(rData.errMsg);
				//					} else {
				//						$("#login").slideUp(300);
				//					}
				//				});
			}

		});
		$("#login input").focus(function() {
			$(this).select();
			$("#login .warning").fadeOut(500, function() {
				$(this).remove();
			});
		});

		//manager

		$("#add-product,#comment-list").hide();
		$("#manager .side-nav li").click(function() {
			$(".in-manager").children().hide();
			$("#" + $(this).attr("name")).show(500);
			
			$(".side-nav li").removeClass("active");
			$(this).addClass("active");
		});
		
		$("#customer-list").click(function(e){
			var $target = $(e.target);
			if($target.is(".delete")){
				if(confirm("Delete this customer information?")){
					$target.parent().remove();
				}
			}else if ($target.is("button")){
				e.preventDefault();
				console.log($("#customer-list option:selected").text());
				var data = {
					"require":"costomerList",
					"data": $("#customer-list option:selected").text(),
				}
//				$.post("index.php",data,function(rData){
//					if(rData.errno !=0){
//						alert(rData.errMsg);
//					}else{
//						//Download excel Successfully;
//					}
//					
//				});
			}
		});
		console.log('success!');
	});

})();