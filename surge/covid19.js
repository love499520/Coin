const read = $persistentStore.read("covid19area") ;
var list = read.split(",");
const url = "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5";
var ala="";
if (!read){
  $done({
   title: "新冠疫情查询",
   style: "error",
   content: "请在boxjs中完善信息"
  })
};
function nowtime(){
 let now = new Date();
 let time = now.getHours()+":"+now.getMinutes();
 // +":"+now.getSeconds();
 return time
}
function num(location, result) {
  var loc = location;
  var resu = result;
  var loc_new = new RegExp(loc + "[\\s\\S]*?confirm[\\s\\S]{3}(\\d+)");
  var loc_now = new RegExp(loc + "[\\s\\S]*?nowConfirm[\\s\\S]{3}(\\d+)");
  var loc_wzz = new RegExp(loc + "[\\s\\S]*?wzz[\\s\\S]{3}(\\d+)");
  let loc_new_res = loc_new.exec(resu);
  let loc_now_res = loc_now.exec(resu);
  let loc_wzz_res = loc_wzz.exec(resu);
  if (loc_new_res) {
    //console.log("已获取" + loc + "的信息");
    ala = ala +loc +"   :   " +loc_new_res[1].padStart(6,"\u0020")+"|" +loc_now_res[1].padStart(6,"\u0020")+ loc_wzz_res[1].padStart(6,"\u0020")+"\n";
  } else {
    //console.log("获取" + loc + "的信息失败");
    ala = ala + loc + "   :   查无数据\n";
  }
};
$httpClient.get(url, function(error, response, data){
  let res = data;
  for (var i = 0; i < list.length; i++) {
    num(list[i], res);
    if (i == list.length - 1) {
     $done({
       title: "疫情:新增 | 现存 | 无症状"+ "   "+nowtime(),
       icon : "heart.circle",
       content: ala.replace(/\n$/, "")
     });
    }
  }
});
