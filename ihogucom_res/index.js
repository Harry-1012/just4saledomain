initRunner("#testrunnergame");

var userLanguage = navigator.language || navigator.userLanguage;

let oldLangSet = localStorage.getItem("oldlang2024");

let shiciListHere = shiciListAll20240402;
let configPageHere = configDataPage20240405CN;

if (oldLangSet) {
  changeLang(oldLangSet);
} else {
  if (userLanguage.indexOf("zh") > -1) {
    changeLang("zh");
  } else {
    changeLang("en");
  }
}

function changeLang(lang) {
  if (lang == "zh") {
    shiciListHere = shiciListAll20240402;
    configPageHere = configDataPage20240405CN;
    document.querySelector("#translate_en").style.display = "inherit";
    document.querySelector("#translate_cn").style.display = "none";
  } else {
    document.querySelector("#translate_cn").style.display = "inherit";
    document.querySelector("#translate_en").style.display = "none";
    shiciListHere = shiciListAll20240402_en;
    configPageHere = configDataPage20240405EN;
  }
  setPage();
}
function changeLangUser(lang){
  localStorage.setItem('oldlang2024',lang)
  changeLang(lang);
}
function setPage() {
  document.title = configPageHere.title;
  document.querySelector("#welcome").innerHTML = configPageHere.welcome;
  document.querySelector("#gametips").innerHTML = configPageHere.gametips;
  document.querySelector("#go2blogwork").innerHTML = configPageHere.go2blogwork;
  document.querySelector("#meirishici").innerHTML = configPageHere.meirishici;
  let articleListDiv = document.querySelectorAll("section.article");
  let randomIndex = Math.floor(Math.random() * articleListDiv.length);
  articleListDiv[randomIndex].style.display = "inherit";
  articleListDiv[randomIndex].innerHTML=""
  let newShiCilist = shiciListHere.sort(() => Math.random() - 0.5)[0];
  for (let i = 0; i < newShiCilist.item.length; i++) {
    let newP = document.createElement("p");
    if (i == 0) {
      newP.innerText = newShiCilist.title;
    } else {
      newP.innerText = newShiCilist.item[i];
    }
    articleListDiv[randomIndex].append(newP);
  }
}

//获取当前日期函数
function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate(); // 获取当前日(1-31)
  if (month < 10) month = `0${month}`; // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}`; // 如果日是个位数，在前面补0

  return `${year}-${month}-${strDate}`;
}
document.querySelector("#currentDate").innerText = "📅" + getNowFormatDate();

document.querySelector("#currentDate2").innerText =
  document.querySelector("#currentDate").innerText;

let domain = window.location.host;

let icpdom = document.querySelector("#icpdom");
if (domain.indexOf("harrywork.com") > -1) {
  icpdom.innerHTML = "鲁ICP备20005268号";
} else if (domain.indexOf("harrywork.com") > -1) {
  icpdom.innerHTML = "鲁ICP备20005268号";
} else {
  icpdom.innerHTML = "鲁ICP备20005268号";
}

icpdom.innerHTML = "";
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b7d193664d6ce227c5f1dc3b90832cd7";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
