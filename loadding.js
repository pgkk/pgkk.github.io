/**
 *Loadding对象，用于显示等待提示
 *author: kang.zhang
 **/
var Loadding = {
	obj:null,	//loadding对象，未创建之前为null
	msgObj:null, //消息对象
	isShow:false,//对象是否已显示
	isHide:true,	//对象是否已隐藏
	isCreate:false,	//对象是否已经被创建
	isModal:true,
	defaultMsg:"请稍候...", //默认消息
	msg:"请稍候...", //当前消息,初始值为默认消息
	tag:null,	//一个内部状态标识
	defaultImgURL:window.location.href.substring(0,window.location.href.indexOf("payonline"))+ "images/loading3.gif", //默认图标
	imgURL:null, //图标URL
	defaultOpcity:0.5, //默认透明度
	opacity:0.5, //透明度
	defaultBgColor:"#eee", //默认背景色
	bgColor:"#eee", //背景色
	defaultColor:"#444", //默认字体颜色
	color:"#444", //字体颜色
	//创建
	create:function(){
		var divBodyLoadding = document.createElement("DIV");
		divBodyLoadding.setAttribute("id","divBodyLoadding");
		var _w = "100%";
		var _h = "100%";
		if(navigator.appVersion.search(/MSIE 6/i) != -1){
			_w = document.documentElement.offsetWidth + "px";
			_h = document.documentElement.offsetHeight + "px";
		}
		divBodyLoadding.style.cssText = "position:absolute;left:0px;top:0px;width:"+_w+";height:"+_h+";z-index:2000;"
			+"background-color:"+this.bgColor+";display:none;filter:alpha(opacity="
			+(this.opacity*100)+");opacity:"+this.opacity+";-moz-opacity:"+this.opacity+";";
		
		var divBodyLoadding_text = document.createElement("DIV");
		if(this.imgURL == null){
			this.imgURL = this.defaultImgURL;
		}
		divBodyLoadding_text.setAttribute("id","divBodyLoadding_text");
		divBodyLoadding_text.style.cssText = "position:absolute;left:50%;width:200px;height:50px;z-index:2001;"
			+"line-height:50px;margin-left:-100px;background:transparent url("
			+this.imgURL+") no-repeat left center;text-indent:37px;font-size:14px;font-weight:bold;color:"
			+this.color+";text-align:left;display:none;";
		divBodyLoadding_text.style.top = (parseInt(document.documentElement.clientHeight)/2 - 25) + "px";
		divBodyLoadding_text.innerHTML = this.defaultMsg;
		document.body.appendChild(divBodyLoadding);
		document.body.appendChild(divBodyLoadding_text);
		
		this.isCreate = true;
		this.obj = divBodyLoadding;
		this.msgObj = divBodyLoadding_text;
		
		return this;
	},
	//显示
	show:function(msg,isModal){
		var _loadding = this;
		this.tag = 1; //设置状态为1
		window.setTimeout(function(){
			if(_loadding.tag == 1){
				_loadding.showNotDlay(msg,isModal);
			}
		},100);
		return this;
	},
	//显示，但是非模态
	showNotModal:function(msg){
		return this.show(msg,false);
	},
	//显示且没有延迟
	showNotDlay:function(msg,isModal){
		if(!this.isCreate){
			this.create();
		}
		
		this.msgObj.style.display = "block";
		this.setMsg(msg);
		if(this.isModal == false || isModal == false){
			this.obj.style.display = "none";
			this.isModal = false;
		}else{
			this.obj.style.display = "block";
			this.isModal = true;
		}
		this.isShow = true;
		this.isHide = false;
		this.msgObj.focus();
		
		return this;
	},
	//设置图片
	setImgURL:function(img_url){
		if(this.isCreate){
			this.msgObj.style.backgroundImage = "url("+img_url+")";
		}
		this.imgURL = img_url;

		return this;
	},
	//设置消息文本
	setMsg:function(text){
		if(this.isCreate && text != null){
			this.msgObj.innerHTML = text;
		}
		this.msg = text;
		return this;
	},
	//设置透明度
	setOpacity:function(val){
		if(val < 0){
			val = 0;
		}else if(val > 1){
			val = 1;
		}
		this.opacity = val;
		if(this.isCreate){
			var _w = "100%";
			var _h = "100%";
			if(navigator.appVersion.search(/MSIE 6/i) != -1){
				_w = document.documentElement.offsetWidth + "px";
				_h = document.documentElement.clientHeight + "px";
			}
			this.obj.style.cssText = "position:absolute;left:0px;top:0px;width:"+_w+";height:"+_h+";z-index:2000;"
				+"background-color:"+this.bgColor+";display:none;filter:alpha(opacity="
				+(this.opacity*100)+");opacity:"+this.opacity+";-moz-opacity:"+this.opacity+";";
		}
		return this;
	},
	//设置背景颜色
	setBgColor:function(color){
		this.bgColor = color;
		if(this.isCreate){
			this.obj.style.backgroundColor = color;
		}
		return this;
	},
	//设置是否模态
	setModal:function(isModal){
		this.isModal = isModal;
		if(this.isCreate){
			if(this.isModal){
				this.obj.style.display = "block";
			}else{
				this.obj.style.display = "none";
			}
		}
		return this;
	},
	//设置字体颜色
	setColor:function(color){
		this.color = color;
		if(this.isCreate){
			this.msgObj.style.color = color;
		}
		return this;
	},
	//隐藏
	hide:function(){
		this.tag = 0;
		this.isShow = false;
		this.isHide = true;
		this.imgURL = this.defaultImgURL;
		this.opacity = this.defaultOpcity;
		this.bgColor = this.defaultBgColor;
		this.color = this.defaultColor;
		this.isModal = true;
		if(this.isCreate){
			this.msgObj.innerHTML = this.defaultMsg;
			this.msgObj.style.display = "none";
			this.obj.style.display = "none";
		}
		return this;
	},
	//销毁
	destroy:function(){
		this.obj.removeChild(this.msgObj);
		document.body.removeChild(this.obj);
		this.isCreate = false;
		return null;
	}
}
