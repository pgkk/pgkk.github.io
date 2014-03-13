
function compare(beforeTime,endTime){
	//beforeTime/endTime的格式2014-03-11 12:00
	if(todate(beforeTime) <= todate(endTime)){
	//处理
	}

}

function todate(str_time){
//格式2014-03-11 12:00
var dateArr = str_time.substring(0,10).split('-');
var timeArr = str_time.substring(11,16).split(':');
return new Date(parseInt(dateArr[0]),parseInt(dateArr[1]) - 1,parseInt(dateArr[2]),parseInt(timeArr[0]),parseInt(timeArr[1]));
}

