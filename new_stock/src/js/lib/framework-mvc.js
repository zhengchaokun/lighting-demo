/**
 * Application Baseed  
 */
;
(function($) {
	window.App = window.App || {
		isDebug : false,
		debug : function(msg) {
			if (this.isDebug && console) {
				console.log("debug", msg);
			}
		},
		error : function(msg) {
			if (console) {
				console.log("error", msg);
			}
		},
		info :function(msg){
 				if (console) {
					console.log("info", msg);
				}
 		},
		wrap : function(wrap) {
			_.extend(this, wrap || {});
		}
	};
})(Zepto);

/**
 * Application MVC
 */

;
(function($) {
	App.wrap({
		router : undefined,
		currentView : "",
		search:{},
		_home : "home",
		_404 : "404",
		_500 : "500",
		viewMapping : {},
		interceptors : [],
		errorHandlers : [],
		startHandlers:[],
		getView : function(view,param,_context) {
			var that = this;
			if (typeof view == 'string') {
				var _tv = this.viewMapping[view];
				return _tv;
			}
			return undefined;
		},
		get404 : function() {
			return this.viewMapping[this._404];
		},
		get500 : function() {
			return this.viewMapping[this._500];
		},
		getCurrentView : function() {
			if (this.currentView != '') {
				return this.getView(this.currentView);
			}
			return undefined;
		},
		registView : function(vid, view, isHome) {
			App[vid + "View"] = view;
			view.setId(vid);
			App.viewMapping[vid] = view;
			if (isHome) {
				this._home=vid;
				// App.viewMapping[this._home] = view;
			}
		},
		registInterceptor : function(handler) {
			var length = this.interceptors.length;
			if (typeof handler.order != 'number') {
				handler.order = length + 1;
			}
			this.interceptors.push(handler);
		},
		_preHandler : function(view, param, context) {

			for ( var i = 0, size = this.interceptors.length; i < size; i++) {
				var handler = this.interceptors[i];
				if (typeof handler == 'object'
						&& typeof handler.pre == 'function') {
					if (!handler.pre(view, param, context)) {
						return false;
					}

				}
			}
			return true;
		},
		_postHandler : function(view, param, context) {
            
			for ( var i = 0, size = this.interceptors.length; i < size; i++) {
				var handler = this.interceptors[i];
				if (typeof handler == 'object'
						&& typeof handler.post == 'function') {
					handler.post(view, param, context);
				}
			}
			return true;
		},
		registErrorHandler : function(handler) {
			var length = this.errorHandlers.length;
			if (typeof handler.order != 'number') {
				handler.order = length + 1;
			}
			this.errorHandlers.push(handler);
		},
		_errorHandler : function(error, view, param, context) {
			// 遍历已注册的错误处理器，如果有一个处理成功了（返回视图），则跳出
			for ( var i = 0, size = this.errorHandlers.length; i < size; i++) {
				var handler = this.errorHandlers[i];
				if (typeof handler == 'object'
						&& typeof handler.process == 'function') {
					var errorView = handler
							.process(error, view, param, context)
					if (errorView) {
						return errorView;
					}

				}
			}
			return undefined;
		},
		registStartHandler:function(handler){
			var length = this.startHandlers.length;
			if (typeof handler.order != 'number') {
				handler.order = length + 1;
			}
			this.startHandlers.push(handler);
		},
		_startPre:function(){
			for ( var i = 0, size = this.startHandlers.length; i < size; i++) {
				var handler = this.startHandlers[i];
				if (typeof handler == 'object'
						&& typeof handler.pre == 'function') {
					var ret=handler.pre();
					if(ret===false){
						return false;
					}
					
				}
			}
			return true;
		},
		_startPost:function(){
			for ( var i = 0, size = this.startHandlers.length; i < size; i++) {
				var handler = this.startHandlers[i];
				if (typeof handler == 'object'
						&& typeof handler.post == 'function') {
					handler.post();
				}
			}
		},
		_dispatcher : function(view, param) {
			// 一次请求处理的上下文
			var _context = {};
			var _view = App._home;
			var targetView = undefined;
			if (view) {
				_view = view;
			}
			// 拦截器的前置处理
			var flag = App._preHandler(_view, param, _context);
			if (flag) {
				targetView = App.getView(_view,param, _context);
			} else {
				// 拦截器前置处理可以返回false来阻断目标的视图的渲染，并允许通过传递给上下文一个视图用于渲染
				if (_context && _context.view) {
					_view = _context.view;
					// window.location.href = "#" + _view;
					App.router.navigate(_view, {
						"trigger" : true
					})
					return;
					// targetView=App.getView(_view);//虽然可以使用该视图渲染，但是视图的url不会改变
				}
			}
			if (targetView) {
				App.debug("目标视图:" + _view);
				var oldView = App.getCurrentView();
				if (oldView) {
					// 如果存在旧视图，则取消旧视图的渲染（隐藏）
					oldView.unRender();
					App.debug("隐藏旧视图:" + App.currentView);
				}
				try {
					//统计log
					// 目标视图的渲染
					targetView.render(param, _context);
					App.debug("成功渲染目标视图:" + _view);
					App.currentView = _view;
					
			       
				} catch (e) {
					App.processErr(e, _view, param, _context)
				}
			} else {
				App.error("视图不存在:" + _view);
				// 404
				var _404 = App.get404();
				if (_404) {
					_context.view = _view;
					_404.render(param, _context);
				}

			}
			// 拦截器的后置处理
			App._postHandler(_view, param, _context);
			_context = null;

		},
		parseSearchParam:function(){//参数应该在？和#之间！
			var searchStr=window.location.search;
			if(searchStr.length>1&&searchStr.indexOf("?")==0){
				var str=searchStr.substr(1);
				var params=str.split("&");
				for(var i=0,size=params.length;i<size;i++){
					if(params[i].length<1){
						continue;
					}
					var num =params[i].indexOf("=");
					var key=params[i],value='';
					if(num>0){
						key=params[i].substring(0,num);
						if(num<params[i].length){
							value=params[i].substr(num+1);
						}
					}
					App.search[key]=value;
				}
			}
		},
		start : function() {
			var AppRouter = Backbone.Router.extend({

				routes : {
					"" : App._dispatcher,
					":view" : App._dispatcher,
					":view/:param" : App._dispatcher
				}
			});
			this.router = new AppRouter();
			var sorter = function(a, b) {
				var order1 = 1000, order2 = 1000;
				if (a && a.order) {
					order1 = a.order;
				}
				if (b && b.order) {
					order2 = b.order;
				}
				return order1 - order2;
			};
			App.interceptors.sort(sorter);
			App.errorHandlers.sort(sorter);
			App.startHandlers.sort(sorter);
			if(App._startPre()){
				Backbone.history.start();
				App._startPost();
			}
		
		},
		navigate:function(_v,isPage){
			if(typeof _v !='string'||_v==''){
				return;
			}
			if(isPage){
				var search=window.location.search;
				window.location.assign(_v+".html"+search);
			}else{
				this.router.navigate(_v,{trigger:true});
			}
			
		},
		processErr : function(e, _view, param, _context) {
			App.errorContext = $.extend({
				error : e,
				view : _view,
				param : param
			}, _context || {});
			if (_context) {
				_context.error = e;
			}

			App.debug(e);
			var error = App._errorHandler(e, _view || App.getCurrentView(),
					param || {}, _context || {});
			if (error) {
				App.debug("错误视图:" + error);
				var errorView = App.getView(error);
				if (errorView) {

					App.router.navigate(error, {
						"trigger" : true
					})
				}
			} else {
				// 不能处理
				App.error(e);
				// 500
				var _500 = App.get500();
				if (_500) {

					App.router.navigate("500", {
						"trigger" : true
					})
				}
			}
		}
	});
	App.parseSearchParam();
})(Zepto);
/**
 * Application View support Model-bind
 */
;
(function($) {
	App.View = Backbone.View
			.extend({
				id:"",
				modelScope : undefined,
				effect : {
					show : function(el) {
						$(el).fadeIn();
					},
					hide : function(el) {
						$(el).hide();
					}
				},
				setId:function(id){
					this.id=id;
				},
				init : function() {
				},
				wrap : function(wrap) {
					_.extend(this, wrap || {});
					this.delegateEvents();
					this.ready();
					App.debug("View init:"+this.id);
					return this;
				},
				ready : function() {
					// 准备事件，在wrap方法执行后触发
				},
				_bindMapping : function(el) {
					var _view = this;
					var bindMapping = {};
					_view.$el
							.find("[model-bind]")
							.each(
									function(i, o) {
										var _el = $(o);
										var _bindModel = undefined, _fullKey = "", _bindKey = "", _bindSubKey = "", _bindType = "html", isObj = false;
										function setObjValue() {
											var ind = _bindKey.indexOf(".");
											if (ind > 0) {
												_bindSubKey = _bindKey
														.substr(ind + 1);
												_bindKey = _bindKey.substring(
														0, ind);
												isObj = true;
											}
										}
										var _exps = _el.attr('model-bind')
												.split(",");
										var _key = _exps[0];
										var _inpTags = 'input,select,INPUT,SELECT'
												.split(",");
										if (_exps.length > 1) {
											_bindType = _exps[1];
										} else {
											var _tag = _el.get(0).tagName;
											if (_inpTags.indexOf(_tag) > -1) {
												_bindType = 'value';
											}
										}
										if (_key.indexOf(".") < 0) {
											_bindModel = _view.model;
											_bindKey = _key;
											_fullKey = _key;
										} else {
											var _ind = _key.indexOf(".");
											if (_ind < _key.length - 1) {
												var _$key = _key.substring(0,
														_ind);

												if (_view.modelScope) {
													_bindModel = _view.modelScope[_$key];
												}
												if (!_bindModel
														&& window[_$key]) {
													_bindModel = window[_$key];
												}
												if (!_bindModel && (window.app)) {
													_bindModel = app[_$key];
												}
												if (!_bindModel && (window.App)) {
													_bindModel = App[_$key];
												}
												if (_bindModel) {
													_bindKey = _key
															.substr(_ind + 1);
													_fullKey = _bindKey;
													setObjValue();
												} else {
													_bindModel = _view.model;
													_bindKey = _key;
													_fullKey = _bindKey;
													setObjValue();
												}

											}
										}
										if (_bindModel && (_bindKey != "")
												&& _bindType) {
											var _mappingKey = _bindModel.cid
													+ "." + _fullKey;

											if (!bindMapping[_mappingKey]) {
												bindMapping[_mappingKey] = {
													model : _bindModel,
													fullKey : _fullKey,
													key : _bindKey,
													subKey : _bindSubKey,
													isObj : isObj,
													bindData : []
												};
											}

											bindMapping[_mappingKey].bindData
													.push({
														el : _el,
														type : _bindType
													});
										}
									});
					return bindMapping;
				},
				_bindEventWithMapping : function(mapping) {
					for (_cid in mapping) {
						var _cur = mapping[_cid];
						this._bindEvent(_cur);

					}
				},
				_getObjectValue : function(_scope, _key) {
					var _vs = _key.split(".");
					var _v = _scope;
					var _tmpScope = _scope;
					if (_key.indexOf(".") > 0) {
						for ( var i = 0, size = _vs.length; i < size; i++) {
							if (typeof _tmpScope == 'object') {
								_v = _tmpScope[_vs[i]];
								_tmpScope = _v;
							} else {
								break;
							}
						}
					} else {
						_v = _scope[_key];
					}

					return _v;
				},
				_setDomValue : function(_binds, _v) {
					if (typeof _v == 'undefined' || _v == null) {
						_v = "";
					}
					for ( var i = 0, size = _binds.length; i < size; i++) {
						if (_binds[i].type == 'html') {
							_binds[i].el.html(_v);
						} else {
							_binds[i].el.attr(_binds[i].type, _v);
						}
					}
				},
				_bindEvent : function(_cur) {
					_cur.view = this;
					var _curEvent = _.extend(_cur, Backbone.Events);
					var _model = _cur.model, _key = _cur.key, _subKey = _cur.subKey, _binds = _cur.bindData, isObj = _cur.isObj;
					function _doChange(model, value) {

						var _v = value;
						if (this.isObj) {
							_v = this.view._getObjectValue(value, this.subKey);

						}
						this.view._setDomValue(this.bindData, _v);

					}
					_curEvent.listenTo(_model, "change:" + _key, _doChange);

				},
				_initBindedData : function(mapping) {
					var _this = this;
					for (_cid in mapping) {
						var _cur = mapping[_cid];
						var _model = _cur.model, _key = _cur.fullKey, _binds = _cur.bindData;
						if (_model) {
							var _bindValue = '';
							_bindValue = _this._getObjectValue(
									_model.attributes, _key);

							_this._setDomValue(_binds, _bindValue);
						}
					}
				},
				dataBind : function(el) {
					if (!el) {
						return false;
					}
					var _mapping = this._bindMapping(el);
					this._initBindedData(_mapping);
					this._bindEventWithMapping(_mapping);
				},
				initialize : function(arguments) {
					if (this.$el) {
						this.dataBind(this.$el);
					}
					this.init(arguments);
				},
				beforeRender : function(param, context) {
					// 视图渲染之前的处理
				},
				render : function(param, context) {
					this.beforeRender(param, context);
					this.show();
					this.afterRender(param, context);
				},
				afterRender : function(param, context) {
					// 视图渲染之后的处理
				},
				beforeUnRender : function(param, context) {

				},
				unRender : function() {
					this.hide();
					this.afterUnRender();
				},
				afterUnRender : function() {
					// 取消渲染之后的处理
				},
				hide : function() {
					this.effect.hide(this.el);
				},
				show : function() {
					this.effect.show(this.el);
				}
			});
})(Zepto);
;(function($){
	function Resource(name){
	    this.initialize("/js/view/"+name+".js");
	}
	Resource.prototype = {
		name: null,
		file: null,
		phase: 0, 
		belongs: null,
		belongArgs:null,
		belongObjs:null,
		initialize: function(file) {
			this.file = file;
			this.belongs = new Array();
			this.belongArgs=new Array();
			this.belongObjs=new Array();
			App.debug("Resource " + file + " is lazy load ");
		},
	
	    getHeadElement : function(){
	        var tagArr = document.getElementsByTagName("head");
	        if(tagArr && tagArr.length >0){
	            return tagArr[0];
	        }
	    },
	
		attachTo: function(callback,args,obj) {
			this.belongs.push(callback);
			this.belongArgs.push(args);
			this.belongObjs.push(obj);
		},

		startLoading: function() {
	        var _scope = this;
			if (this.phase != 0) {
				return;
			}
			App.debug("Started loading resource:"+this.file);

			var js = document.createElement('script');
			js.setAttribute('type', 'text/javascript');
			js.setAttribute('src', this.file);
            js.onload = js.onreadystatechange = function(){
                if(! this.readyState || this.readyState=='loaded' || this.readyState=='complete' ){
                    _scope.phase = 1;
                    _scope.onComplete();
                }
            };

            var headEl = this.getHeadElement();
            if(headEl){
                headEl.appendChild(js);
            }
		},
		onComplete: function() {
			if (this.phase == 2) {
				return;
			}
			this.phase = 2;
	        for(var i=0;i<this.belongs.length;i++){
	            this.belongs[i].call(this.belongObjs[i],this.belongArgs[i]);
	        }
		},
		isCompleted:function(){
			return this.phase==2;
		}
	};
	App.AsyncView=App.View.extend({
		resource:null,
		wrap : function(wrap) {
					_.extend(this, wrap || {});
					this.delegateEvents();
					this.ready();
					this.resource=new Resource(this.id);
					App.debug("View init:"+this.id);
					return this;
				},
		render : function(param, context) {
			if(this.resource.isCompleted()){
				_render(param,context);
			}else{
				this.resource.attachTo(this._render,[param,context],this)
				this.resource.startLoading();
			}
			
		},
		_render:function(param,context){
			this.beforeRender(param, context);
			this.show();
			this.afterRender(param, context);
		}

	});
})(Zepto);
/**
 * Application Component
 */
;
(function($) {
	App.Component = Backbone.View.extend({
		effectFrom : {
			"display" : "none"
		},
		effectTo : {
			"display" : "block"
		},
		initialize : function(option) {
			if (option) {
				$.extend(this.effectFrom, option.effectFrom || {});
				$.extend(this.effectTo, option.effectTo || {});
			}
		},
		wrap : function(wrap) {
			_.extend(this, wrap || {});
			this.delegateEvents();
			this.ready();
			return this;
		},
		ready : function(option) {

		},
		show : function(option) {
			$(this.el).css(this.effectFrom).show().animate(this.effectTo, 200);
		},
		hide : function(option) {
			$(this.el).hide();
		},
		beforeRender : function(option) {
			return true;
		},
		render : function(option) {
			if (this.beforeRender(option)) {
				this.show(option);
				this.afterRender(option);
			}
		},
		afterRender : function(option) {

		},
		unRender : function(option) {
			this.hide(option);
			this.afterUnRender(option);
		},
		afterUnRender : function(option) {

		}

	});
})(Zepto);
/**
 * Application Model based
 */
;(function($) {

	App.Model = Backbone.Model.extend({
		wrap : function(_wrap) {
			_.extend(this, _wrap || {});
			this.ready();
			return this;
		},
		ready : function(option) {

		}

	});
})(Zepto);
/**
 * Application Model support cookied
 */
;
(function($) {
	App.CookieModel = App.Model.extend({
		read : function(key) {
			var cookies = document.cookie.split(";")
			for ( var i = 0; i < cookies.length; i++) {
				var _t = cookies[i].indexOf("=")
				var _key = cookies[i].substring(0, _t)
				var _value = cookies[i].substring(_t + 1, cookies[i].length)

				if (_key.trim() == key) {
					return decodeURI(_value);
				}
			}
			;
			return null;
		},
		write : function(key, value,exp) {
			exp = exp ? ";"+exp+";":"";
			document.cookie = key + "=" + encodeURI(value)+exp;
		}
	});
})(Zepto);
/*asyn load script*/
;
(function(_win,_doc){       
     App.Req = function(){
     	  var head,baseElement,currentlyAddingScript;
     	  head = _doc.getElementsByTagName('head')[0]; 
          baseElement = _doc.getElementsByTagName('base')[0];
          if (baseElement) {
            head = baseElement.parentNode;
          };
     	  var onScriptLoad = function(e){
     	  	  
     	  };
     	  var onScriptError = function(e){};
     	  var createNode = function (config, url) {
		        var node = _doc.createElement('script')
		                 ;
		        node.type = config.scriptType || 'text/javascript';
		        node.charset = 'utf-8';
		        node.async = true; 
		        return node;
          };
          function scripts() {
               return _doc.getElementsByTagName('script');
          }
     	  return {
              load : function(config,url){
                  var node = createNode(config,url);
	              if (node.attachEvent &&!(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
	                    !isOpera){
			        	useInteractive = true;
			            node.attachEvent('onreadystatechange', onScriptLoad);
			      }else {
	                node.addEventListener('load', config.onScriptLoad?config.onScriptLoad:onScriptLoad, false);
	                node.addEventListener('error', config.onScriptError?config.onScriptError:onScriptError, false);
	              };
	              node.src = this.viewnameToUrl(url);
	              currentlyAddingScript = node;
	              if (baseElement) {
		                head.insertBefore(node, baseElement);
		          } else {
		                head.appendChild(node);
		          }
		          currentlyAddingScript = null;

		            return node;
              },
              viewnameToUrl : function(viewname){
              	    var domain = _doc.URL.substring(0,_doc.URL.lastIndexOf("\/"));
              	    var url = domain + "/js/view/"+viewname+".js"
                    return url;
              }
     	}
     }();
})(window,document);