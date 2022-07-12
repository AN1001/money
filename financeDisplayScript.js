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
  var percChange = Math.round((currentGraphData[2][1]/graphDataAvg)*10000-10000)/100;
  var percChangeFormatted = (percChange<0?"":"+") + percChange +"%";
  var graphToAppend = temp.content.cloneNode(true);
  
  graphToAppend.getElementById("graphDurationDisplay").textContent = "Spending - last "+ (currentGraphData.length - 2) +" sessions";
  graphToAppend.getElementById("fineText").textContent = currentGraphData[0];
  graphToAppend.getElementById("popoutText").textContent = formatter.format(graphDataSum);
  graphToAppend.getElementById("barTotal").textContent = "Total for "+currentGraphData[2][0];
  graphToAppend.getElementById("barTotalValue").textContent = formatter.format(currentGraphData[2][1]);
  graphToAppend.getElementById("percentChange").textContent = percChangeFormatted;
  
  var MAINGRAPHAREA = graphToAppend.getElementById("MAINGRAPHAREA");
  var mainGraphElement = graphToAppend.getElementById("mainGraphElement");
  var barsData = getRawGraphData(currentGraphData);
  var numBars = barsData.length-1;
  var barWidth = barsData.shift();
  var graphName = currentGraphData[0];
  
  mainGraphElement.id = graphName;
  
  barsData.forEach(function(value,i){return createBar(value,MAINGRAPHAREA,barWidth,i,numBars,graphToAppend,graphDataAvg,percChangeFormatted);})
  console.log(barsData)
  
  appendZone.appendChild(graphToAppend);
}

function createBar(arr,createTo,widthConst,index,numberBars,parentEl,graphAvg,percChangeFormatted){
  var barHolder = document.createElement("div");
  var bar = document.createElement("div");
  var barName =  document.createElement("p");
  
  barHolder.classList.add("barHolder");
  bar.id = arr[0]+"@"+index;
  bar.style.width = widthConst+"px";
  bar.style.height = arr[2]+"px";
  bar.classList.add("graphBar");
  
  if(index==0){
    barHolder.style.marginLeft = '0';
  }
  
  if(numberBars <= 3){
    barName.textContent = arr[0].slice(0, 8);
  } else if(numberBars <= 6){
    barName.textContent = arr[0].slice(0, 5);
  } else if(numberBars >= 8 && index>=8){
    barHolder.style.display = "none";
    barName.textContent = arr[0].slice(0, 3);
  }else {
    barName.textContent = arr[0].slice(0, 3);
  }
  
  bar.addEventListener('click', function onClick(event) {
    let self = event.target;
    let selfName = self.id.split("@")[0]
    var parentEl = '';
    var selfData = '';
    
    graphDataFiltered.forEach(function(internalList){
    internalList.slice(2).forEach(function(internalList2){
      internalList2[3].style.background = "#eb765d";
      if(internalList2[0] === selfName){
        parentEl = document.getElementById(internalList[0]);
      	selfData = internalList2;
        }
      })
    })
    
    self.style.backgroundColor = "#76b5bc";
    let percentChange = selfData[4];
    let barTotal = parentEl.querySelector("#barTotal");
    let barTotalValue = parentEl.querySelector("#barTotalValue");
    let percChangeDisplay = parentEl.querySelector("#percentChange");
  
    percentChange.textContent = percChangeFormatted;
    barTotal.textContent = "Total for "+selfData[0];
    barTotalValue.textContent = formatter.format(selfData[1]);
    
    
  });
  
  arr.push(bar)
  arr.push(percChangeFormatted)
  barHolder.appendChild(bar);
  barHolder.appendChild(barName);
  createTo.appendChild(barHolder);
}

function getRawGraphData(arr,pixelsPerPound){
  let arrData = arr.slice(2).map(TakeSecondElement);
  var pixelsPerPound = 195/(0.95*Math.max(...arrData));
  if(arrData.length <= 8){
    var width = Math.floor((345-(arrData.length-1)*10)/arrData.length);
  } else {
    var width = Math.floor((345-(8-1)*10)/8);
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
