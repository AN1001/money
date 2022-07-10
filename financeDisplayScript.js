const graphDataRaw = getCookie("graphData");
const graphData = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const appendZone = document.getElementById("allGraphs");

var clon = temp.content.cloneNode(true);
appendZone.appendChild(clon);
var clon = temp.content.cloneNode(true);
appendZone.appendChild(clon);
var clon = temp.content.cloneNode(true);
appendZone.appendChild(clon);

function getCookie(name) {
  const value = document.cookie;
  var cookies = value.split(";");
  
  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split(name+"=") !== cookies[i]){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
  }
}
