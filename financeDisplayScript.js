const graphDataRaw = getCookie("graphData");
const graphData = eval(graphDataRaw);
const temp = document.getElementsByTagName("template")[0];

var clon = temp.content.cloneNode(true);
document.body.appendChild(clon);
document.body.appendChild(clon);
document.body.appendChild(clon);

function getCookie(name) {
  const value = document.cookie;
  var cookies = value.split(";");
  
  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split(name+"=") !== cookies[i]){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
  }
}
