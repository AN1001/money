const graphDataRaw = getCookie("graphData");
const graphDataFiltered = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const appendZone = document.getElementById("allGraphs");

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
});

for(let i = 0; i < graphDataFiltered.length; i++){
  var currentGraphData = graphDataFiltered[i];
  var graphDataSum = (currentGraphData.slice(2).map(TakeSecondElement)).reduce(add, 0);
  var graphDataAvg = graphDataSum/(currentGraphData.length - 2);
  var percChange = (currentGraphData[2][1]/graphDataAvg)*100-100;
  var graphToAppend = temp.content.cloneNode(true);
  
  graphToAppend.getElementById("graphDurationDisplay").textContent = "Spending - last "+ (currentGraphData.length - 2) +" sessions";
  graphToAppend.getElementById("fineText").textContent = currentGraphData[0];
  graphToAppend.getElementById("popoutText").textContent = formatter.format(graphDataSum);
  graphToAppend.getElementById("barTotal").textContent = "Total for "+currentGraphData[2][0];
  graphToAppend.getElementById("barTotalValue").textContent = formatter.format(currentGraphData[2][1]);
  graphToAppend.getElementById("percentChange").textContent = Math.round(percChange * 100) / 100+"%";
  
  var MAINGRAPHAREA = graphToAppend.getElementById("MAINGRAPHAREA");
  var barsData = getRawGraphData(currentGraphData);
  var barWidth = barsData.shift();
  var graphName = currentGraphData[0];
  
  barsData.forEach(function(value,i){return createBar(value,MAINGRAPHAREA,barWidth,i,graphName);})
  
  
  appendZone.appendChild(graphToAppend);
}


function createBar(arr,createTo,widthConst,index,name){
  var bar = document.createElement("div");
  var barName =  document.createElement("p");
  barName.textContent = name.slice(0, 3);
  bar.style.width = widthConst+"px";
  bar.style.height = arr[2]+"px";
  bar.classList.add("graphBar");
  bar.id = name+"@"+index;
  
  bar.appendChild(barName);
  createTo.appendChild(bar);
}

function getRawGraphData(arr,pixelsPerPound){
  let arrData = arr.slice(2).map(TakeSecondElement);
  var pixelsPerPound = 195/(0.95*Math.max(...arrData));
  if(arrData.length <= 8){
    const width = Math.floor((345-(arrData.length-1)*10)/arrData.length);
  } else {
    const width = Math.floor((345-(8-1)*10)/8);
  }
  return newArr = [width, ...(arr.slice(2).map(function(x){ return calcHeight(x,pixelsPerPound); }))];
}

function TakeSecondElement(arr) {
  return arr[1];
}
function add(accumulator, a) {
  return accumulator + a;
}

function calcHeight(rawData,pixelsPerPound){
   if(rawData[1]*pixelsPerPound >= 5){
   		(rawData.push(Math.ceil(rawData[1]*pixelsPerPound)));
   } else {
     rawData.push(10);
   }
   return rawData;
 }

function getCookie(name) {
  const value = (document.cookie).replace(/\s+/g, '');
  var cookies = value.split(";");

  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == name){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
   }
  return "NOT_FOUND";
}
