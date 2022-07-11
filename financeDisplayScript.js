const graphDataRaw = getCookie("graphData");
const graphData = eval(graphDataRaw);
console.log(graphData);
const temp = document.getElementById("temp1");
const appendZone = document.getElementById("allGraphs");

for(let i = 0; i < graphData.length; i++){
  var currentGraphData = graphData[i];
  var graphToAppend = temp.content.cloneNode(true);
  graphToAppend.document.getElementById("fineText").textContent = currentGraphData[0];
  
  appendZone.appendChild(graphToAppend);
}






function getCookie(name) {
  const value = document.cookie;
  var cookies = value.split(";");
  
  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split(name+"=") !== cookies[i]){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
  }
}
