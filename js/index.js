;

function validateImg(fileElement) {
	var filextension = fileElement.value.substring(fileElement.value.lastIndexOf("."), fileElement.value.length);
	filextension = filextension.toLowerCase();
	if((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
		alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
		fileElement.focus();
	} else {
		var path;
		if(document.all) //IE
		{
			fileElement.select();
			path = document.selection.createRange().text;

			document.getElementById("imgPreview").innerHTML = "";
			document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; //使用滤镜效果  
		} else //FF
		{
			//						path = .getAsDataURL();
			path = window.URL.createObjectURL(fileElement.files[0]);

			fileElement.parentElement.style.opacity = 0;
			console.log(path);
		}
	}
};
(function() {
	$(document).ready(function() {

						$(".container").children().not("#home").removeClass("hidden").fadeOut(100);
						$("#login").removeClass("hidden").fadeOut(100);
						$("#home").removeClass("hidden");
//		$("#manager").show();

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

		$("#in-manager").children().hide();
		$("#customer-list").show();
		$("#manager .side-nav li").click(function() {
			$(".in-manager").children().hide();
			$("#" + $(this).attr("name")).show(500);

			$(".side-nav li").removeClass("active");
			$(this).addClass("active");
		});

		$("#customer-list").click(function(e) {
			var $target = $(e.target);
			if($target.is(".delete")) {
				if(confirm("Delete this customer information?")) {
					$target.parent().remove();

				}
			} else if($target.is("button")) {
				e.preventDefault();
				console.log($("#customer-list option:selected").text());
				var data = {
						"operation": "delCsmInfos",
						"period": $("#customer-list option:selected").text(),
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

		$("#comment-list").click(function(e) {
			var $target = $(e.target);
			e.preventDefault();
			if($target.is(".delete")) {
				if(confirm("Delete this comment information?")) {
					$target.parent().remove();
					$target.parent().remove();
					var commentId = $target.siblings().filter(".comment-id").text();
					var data = {
						"command": "deleteCommand",
						"commentId": commentId
					};
					console.log(data.commentId);
					//					$.post("index.php",data,function(rData){
					//	
					//					});
				}
			} else if($target.is(".delete-all")) {
				if(confirm("Delete all comments information?")) {
					$(".comment").remove();
					var date = $("#comment-list option:selected").val();
					var data = {
						"command": "deleteAllCommand",
						"date": date
					};
					console.log(data.date);
					//					$.post("index.php",data,function(rData){
					//
					//					});
				}
			}
		});
		//检查图片，格式正确返回 图像URL 否则返回false
		function getImgURL(fileElement) {
			var filextension = fileElement.value.substring(fileElement.value.lastIndexOf("."), fileElement.value.length);
			filextension = filextension.toLowerCase();
			if(filextension != '.jpg') {
				alert("对不起，系统仅支持.jpg格式图片!");
				return false;
			} else {
				var path;
				path = window.URL.createObjectURL(fileElement.files[0]);
				console.log(path);
				return path;
			}
		};
		$("#add-product #add-img").change(function(e) {
			//			alert(this.id);
			var ID = this.id;
			var fileElement = this;
			var path = getImgURL(fileElement);

			if(path != false) {
				fileElement.parentElement.previousElementSibling.innerHTML = "<img width='300px' height='300px' src='" + path + "'/>";
				fileElement.parentElement.style.opacity = 0;

				var image = "";
				var reader = new FileReader();
				reader.onload = function(e) {
					image = e.target.result;
					alert(image);
					var data = {
						"data": image
					};
					//				data[this.id] = this.id;

					//				alert(data);
					//						var data = {
					//							"idCard": path,
					//							"stuCard": path,
					//							"description": "this is img"
					//						};
					$.post("../user/picture", data, function(data) {
						if(data.errno != 0) {
							alert(data.errmsg);
						} else {
							//							alert(ID);
							returnName[ID] = data.url;
							//							returnName[this.id] = data.url;
							//							returnName[this.id] = data.url;
							//							alert(returnName[this.id]);

							//							alert(returnName.idCard);
							//							alert(data.errmsg);
						}
					}, "json");
				}
				reader.readAsDataURL(fileElement.files[0]);
			}
		});

		$("#add-product button").click(function(e) {
			e.preventDefault();

			function readProperties(index) {
				var _properties = {};
				var _proper = $("#add-product .properties p").eq(index).children().eq(0).val().trim(),
					_description = $("#add-product .properties p").eq(index).children().eq(1).val().trim();
				if(_proper != "" || _description != "") {
					_properties[_proper] = _description;
				}
				return _properties;
			};

			var _flag = true;
			$("#add-product .required").each(function() {
				if($(this).val().trim() == "") {
					alert("Fill the form");
					_flag = false;
					return false;
				}
			});
			if(_flag) {
				var _name = $("#add-product input[name='name']").val().trim(),
					_amazonUrl = $("#add-product input[name='amazon-url']").val().trim(),
					_category = $("#add-product .type option:selected").text().trim();
				var _properties = [];
				for(var i = 0; i < $("#add-product .properties p").length; i++) {
					console.log(readProperties(i));
					_properties.push(readProperties(i))
				}
				var _data = {
					"name": _name,
					"picture": "a",
					"amazonUrl": _amazonUrl,
					"category": _category,
					"properties": _properties,
					"data": getDate()

				}
			}
		});

		function getDate(strSeparator) {
			if(!strSeparator) {
				var strSeparator = "-";
			};
			var mydate = new Date();
			var str = "" + mydate.getFullYear() + strSeparator;
			str += (mydate.getMonth() + 1) + strSeparator;
			str += mydate.getDate();
			return str;
		};

		$("#user").click(function(e) {
			var $this = $(e.target);
			if($this.is(".delete")) {
				$this.parent().parent().remove();
			} else if($this.is(".update")) {
				var _userId = $this.parent().siblings().filter(".userId").text();
				var _role = $this.parent().parent().find("option:selected").text();
				alert(_userId + _role);
				var data = {
					"userId": _userId,
					"role": _role
				};
				//				$.post("index.php",data,function(rData){
				//					if(rData.errno!=0){
				//						alert(rData.errmsg);
				//					}else{
				//						
				//					}
				//				});
			} else if($this.is(".add")) {
				var newHtml = '<tr>' +
					'<td><input type="checkbox" /></td><td class="userId">none</td><td><input type = "text" value = "Chenyueli" size="8"/></td>' +
					'<td><input type = "text" value = "9208" size = "8"/></td>' +
					'<td><select><option selected="true">Commen Manager</option><option>Supper Manager</option></select></td>' +
					'<td><button class="update">Update</button><button class="delete">Delete</button></td>' +
					'</tr>';
				$("#user tbody").append(newHtml);
			} else if($this.is(".deletes")) {
				var delIdList = [];
				var delDomList = [];
				$("#user tbody :checkbox").each(function(index, domELe) {
					if(this.checked) {
						//delete DOM element;
						$(this).parent().parent().remove();
						//delete user from database
						delIdList.push($(this).parent().siblings().filter(".userId").text().trim());
					}
				});
				if(delIdList != "") {
					var data = {
							"delIdList": delIdList
						}
						//					$.post("index.php",data,function(rData){
						//						if(rData.errno !=  0){
						//							alert(rData.errmsg);
						//						}else{
						//							console.log("操作成功")
						//						}
						//					})
				}

			}
		});

		$("#user .select-all").change(function(e) {
			if(this.checked) {
				$("#user tbody :checkbox").attr("checked", true);
			} else {
				$("#user :checkbox").attr("checked", false);
			}
		});

		//		alert(getDate("."));
		console.log('success!');
	});

})();