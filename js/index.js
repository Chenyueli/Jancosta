;
(function() {
	$(document).ready(function() {
		//		$("#home").removeClass("hidden").fadeOut().fadeIn(500);
		$("header li").click(function(e) {
			//			$("#"+$(this).attr("name")).show(1000);
			$item = $("#" + $(this).attr("name"));
			$("#about,#contact,#home,#products,#vip").removeClass("hidden").fadeOut(100);
			//			$item.removeClass("hidden");
			//			$item.fadeIn(500);
			$item.slideDown(800);

			//			$("#"+$("header li").not(this).attr("name")).addClass("hidden");
			//			$("#"+$(this).attr("name")).show();
			//			$("#"+$(this).attr("name")).show(1000);

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
		console.log('success!');
	})

})();