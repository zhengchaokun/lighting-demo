/**
 * Application open api
 * regist,call */
 ;(function(){
 	if(typeof App == 'object'){
 		App.OpenAPI={};
 	}else{
 		window.App={
 			isDebug : false,
 			info :function(msg){
 				if (console) {
 					console.log("info", msg);
 				}
 			},
 			debug : function(msg) {
 				if (this.debug && console) {
 					console.log("debug", msg);
 				}
 			},
 			error : function(msg) {
 				if (console) {
 					console.log("error", msg);
 				}
 			},
 			OpenAPI:{}
 		};
 	}
 	if(typeof $ != 'function'|| typeof $.ajax!='function'){
 		throw 'Use OpenAPI must dependency (zepto or jquery) ajax !';
 	}
 	App.OpenAPI={
 		leaseId:"",
 		accessToken:null,
 		loginToken:null,
 		crossPage:false,
 		onReady:null,
 		isAllready:false,
 		errorHandlers : []
 	};
 	
 	App.OpenAPI.setToken=function(token){
 		App.OpenAPI.accessToken=token;
 	};
 	App.OpenAPI.callback=function(ret){
 		if(typeof ret =='object'&&ret.access_token){
 			App.OpenAPI.setToken(ret.access_token);
 		}else{
 			throw {"msg":"OpenAPI regist error","couse":ret};
 		}

 		App.info("OpenAPI regist success:"+App.OpenAPI.accessToken);
 	};
 	
	App.OpenAPI.errorCallback=function(ret,error){
		var result={};

		if(error=='timeout'||error=='abort'){
			result={"error_no":1,"error_info":error};
		}else{
			var resp=ret.responseText.replace(/\r*\n*/g, "");
			App.debug(resp);
			if(resp==''){
				return;
			}
			var resp=JSON.parse(resp);
			if(resp.error_no&&resp.error_info){
				var error_info=resp.error_info;
				var error_no=resp.error_no;
				var error_prop={};
				if(resp.error_no=="-61"||resp.error_no=="-54"){
						//老系统
					var ind=error_info.indexOf("][");
					error_no=error_info.substring(1,ind);
					error_prop=error_info.substr(error_info.lastIndexOf("["));
					error_info=error_info.substring(ind+1,error_info.indexOf(error_prop));
				}
				result={"error_no":error_no,"error_info":error_info};

			}
			if("invalid_user_token"==resp.error){
				if(App.OpenAPI.tokenInvalid()){
					return;
				}

			}
		}
		
			
		
			App.OpenAPI.errorProcess(result);
		
	};

		App.OpenAPI.registErrorHandler=function(handler){
			var length = App.OpenAPI.errorHandlers.length;
			if (typeof handler.order != 'number') {
				handler.order = length + 1;
			}
			App.OpenAPI.errorHandlers.push(handler);
		};
		App.OpenAPI.errorProcess=function(error){
			for ( var i = 0, size = App.OpenAPI.errorHandlers.length; i < size; i++) {
				var handler = App.OpenAPI.errorHandlers[i];
				if (typeof handler == 'object'
					&& typeof handler.process == 'function') {
					var flag = handler
				.process(error);
				if (flag) {
					return ;
				}

			}
		}
		App.error(error);
	};
	App.OpenAPI.post=function(url,param,callback){
		function _success(ret){
			if(typeof ret=='object'&&ret.error_no){
				App.OpenAPI.errorProcess({
					error_no:ret.error_no,
					error_info:ret.error_info.replace(/\r*\n*/g, "")
				});
			}else{
				callback(ret);
			}
		}
		var that=App.OpenAPI
		var token=that.accessToken;
		if(typeof that.loginToken =='string'){
			token=that.loginToken;
		}
		$.ajax({
			type:'POST',
			url:url,
			timeout:8000,
			dataType:"json",
			cache:false,
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", "Bearer "+token);
			},
			error:App.OpenAPI.errorCallback,
			success:_success
		});
	};
	App.OpenAPI.get=function(url,param,callback){
		function _success(ret){
			if(typeof ret=='object'&&ret.error_no){
				App.OpenAPI.errorProcess({
					error_no:ret.error_no,
					error_info:ret.error_info.replace(/\r*\n*/g, "")
				});
			}else{
				callback(ret);
			}
		}
		var that=App.OpenAPI
		var token=that.accessToken;
		if(typeof that.loginToken =='string'){
			token=that.loginToken;
		};
		var data={};
		if(typeof param =='object'){
			$.extend(data,param);
		}
		$.ajax({
			type:'GET',
			url:url,
			timeout:8000,
		    data:data,
			dataType:"json",
			cache:false,
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", "Bearer "+token);
			},
			error:App.OpenAPI.errorCallback,
			success:_success
		});
	}
})();