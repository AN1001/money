const graphDataRaw = getCookie("graphData");
const graphDataFiltered = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const appendZone = document.getElementById("allGraphs");

for(let i = 0; i < graphData.length; i++){
  var currentGraphData = graphDataFiltered[i];
  console.log(currentGraphData);
  var graphDataSum = (currentGraphData.splice(2).map(TakeSecondElement)).reduce(add, 0);
  var graphDataAvg = graphDataSum/(currentGraphData.length - 2);
  var percChange = (currentGraphData[2][1]/graphDataAvg)*100-100;
  var graphToAppend = temp.content.cloneNode(true);
  
  graphToAppend.getElementById("graphDurationDisplay").textContent = "Spending - last"+ currentGraphData.length - 2 +"sessions";
  graphToAppend.getElementById("fineText").textContent = currentGraphData[0];
  graphToAppend.getElementById("popoutText").textContent = "$"+graphDataSum;
  graphToAppend.getElementById("barTotal").textContent = "Total for "+currentGraphData[2][0];
  graphToAppend.getElementById("barTotalValue").textContent = "$"+currentGraphData[2][1];
  graphToAppend.getElementById("percentChange").textContent = Math.round(percChange * 100) / 100+"%";
  
  appendZone.appendChild(graphToAppend);
}





function TakeSecondElement(arr) {
  return arr[1];
}
function add(accumulator, a) {
  return accumulator + a;
}

function getCookie(name) {
  const value = (document.cookie).replace(/\s+/g, '');
  var cookies = value.split(";");

  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == name){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
   }
  return "NOT FOUND";
}
