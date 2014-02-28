//自定义按钮组控件
//参数列表：
//boxid : 容器dom id
//id	: 控件dom id
//btns	: 数组，按钮
	btns = [{text : '',value : ''}]
//value	: 按钮默认值,value必须是btns中某个按钮的value
//height: 高度
//onchange	: 按钮值改变的事件函数，将传递参数：值,显示文本,按钮对象(td),索引,是否第一个按钮,是否最后一个按钮
function KKButtonGroup(cfg){
	var me = this;
	me.boxid = cfg.boxid || 'kkbuttongroup_box';
	me.id = cfg.id || 'kkbuttongroup';
	me.cls = cfg.cls || 'kkbuttongroup';
	me.btns = cfg.btns || [];
	me.height = cfg.height || 24;
	me.defaultValue = (cfg.value==undefined || cfg.value==null) ? null : cfg.value;
	me.value = me.defaultValue;
	me.defaultCheckedIndex = null;
	
	//用户传递获取事件回调,函数参数
	me.checkedhandler = cfg.onchange || null;
	
	var btn_str = '<table id="'+me.id+'" class="'+me.cls+'" style="height:'+me.height+'px;overflow:hidden;border-collapse:collapse;border:0px;padding:0px;border-spacing:0px;">';
	btn_str += '<td class="left_corner" id="'+me.id+'_leftcorner" style="padding:0px;width:6px;border:0px;"></td>';
	var len = me.btns.length;
	for(var i=0;i<len;i++){
		if(me.defaultValue!=null && me.btns[i].value == me.defaultValue){
			me.defaultCheckedIndex = i;
			me.text = me.btns[i].text;
		}
		btn_str += '<td id="'+me.id+'_btn_'+i+'" title="'+me.btns[i].text+'" style="font-size:12px;height:'+me.height+'px;border:0px;padding:0px 5px;';
		if(i != 0){
			btn_str += 'border-left:1px solid #ccc;';
		}		
		btn_str += '">'+me.btns[i].text+'</td>';
	}
	btn_str += '<td class="right_corner" id="'+me.id+'_rightcorner" style="padding:0px;width:6px;border:0px;"></td>';
	btn_str += '</table>';
	btn_str += '<input type="hidden" id="'+me.id+'_el_value" />';
	document.getElementById(me.boxid).innerHTML = btn_str;
	
	//绑定事件
	var btn = null;
	for(var j=0;j<len;j++){
		btn = document.getElementById(me.id + '_btn_'+j);
		if(btn && me.onchange){
			btn.onclick = (function(me,j,btn){
				return function(){
					//参数:值,显示文本,按钮对象(td),索引,是否第一个按钮,是否最后一个按钮
					me.onchange.call(me,me.btns[j].value,me.btns[j].text,btn,j,(j==0),(j==len-1),false);
				};
			})(me,j,btn);
		}
	}
	
	//默认
	if(me.defaultCheckedIndex != null){
		var i = me.defaultCheckedIndex;
		//若有默认值，调用onchange
		me.onchange.call(me,me.btns[i].value,me.btns[i].text,
			me.isExistDom(me.id + '_btn_' + i),i,(i==0),(i==len-1),true);
	}
	
	return me;
}

//选择by index
KKButtonGroup.prototype.selectByIndex = function(index){
	var me = this;
	me.onchange.call(me,me.btns[index].value,me.btns[index].text,
		me.isExistDom(me.id + '_btn_' + index),index,(index==0),(index==me.btns.length-1));
};

//选择by value
KKButtonGroup.prototype.selectByValue = function(value){
	var me = this;
	for(var i=0;i<me.btns.length;i++){
		if(me.btns[i].value == value){
			me.onchange.call(me,me.btns[i].value,me.btns[i].text,
				me.isExistDom(me.id + '_btn_' + i),i,(i==0),(i==me.btns.length-1));
			break;
		}
	}
};


//状态改变
KKButtonGroup.prototype.onchange = function(val,text,btn,index,isFirst,isLast,isNotTrigerUserEvent){
	var me = this;
	var el = me.isExistDom(me.id+'_el_value');
	if(el) el.value = val;
	me.value = val;
	me.text = text;
	
	for(var i=0;i<me.btns.length;i++){
		me.removeClass(me.isExistDom(me.id + '_btn_' + i),'checked');
	}
	if(isFirst){
		me.setClass(me.isExistDom(me.id + '_leftcorner'),'left_corner_checked');
		me.setClass(me.isExistDom(me.id + '_rightcorner'),'right_corner');
	}
	if(isLast){
		me.setClass(me.isExistDom(me.id + '_leftcorner'),'left_corner');
		me.setClass(me.isExistDom(me.id + '_rightcorner'),'right_corner_checked');
	}
	if(!isFirst && !isLast){
		me.setClass(me.isExistDom(me.id + '_leftcorner'),'left_corner');
		me.setClass(me.isExistDom(me.id + '_rightcorner'),'right_corner');
	}
	me.addClass(btn,'checked');
	
	//调用用户的事件
	if(!isNotTrigerUserEvent && me.checkedhandler){
		me.checkedhandler.apply(this,arguments);
	}
};

//获取值
KKButtonGroup.prototype.getDOMValue = function(){
	var dom = this.isExistDom(this.id+'_el_value');
	if(dom){
		return dom.value;
	}
	return null;
};

//获取值
KKButtonGroup.prototype.getValue = function(){
	return this.value || null;
};

//获取Text
KKButtonGroup.prototype.getText = function(){
	return this.text || '';
};

//删除样式
KKButtonGroup.prototype.removeClass = function(td,clsName){
	var me = this;
	if(td){
		var cls = td.className || '';
		if(cls){
			var clsArr = cls.split(' ');
			var nclsArr = [];
			for(var i = 0;i<clsArr.length;i++){
				var tmp = me.trim(clsArr[i]);
				if(tmp != clsName){
					nclsArr.push(tmp);
				}
			}
			td.className = nclsArr.join(' ');
		}
	}
};



//新增样式
KKButtonGroup.prototype.addClass = function(td,clsName){
	var me = this;
	if(td){
		var cls = td.className || '';
		if(cls){
			var clsArr = cls.split(' ');
			var flag = false;
			for(var i = 0;i<clsArr.length;i++){
				var tmp = me.trim(clsArr[i]);
				if(tmp == clsName){
					flag = true;
				}
			}
			if(!flag){
				td.className += ' ' + clsName;
			}
		}else{
			td.className = clsName;
		}
	}
};

//设置样式
KKButtonGroup.prototype.setClass = function(td,clsName){
	if(td){
		td.className = clsName;
	}
};

//清除所有样式
KKButtonGroup.prototype.clearAllClass = function(td){
	if(td){
		td.className = '';
	}
};

//去掉前后空格
KKButtonGroup.prototype.trim = function(str){
	if(!str) return '';
	return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 *	判断dom是否存在
 *	若存在返回dom对象
 *	不存在返回false
 */
KKButtonGroup.prototype.isExistDom = function(id){
	return document.getElementById(id) || false;
};