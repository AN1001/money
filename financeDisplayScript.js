const graphDataRaw = getCookie("graphData");
console.log(graphDataRaw);




function getCookie(name) {
  const value = document.cookie;
  var cookies = value.split(";");
  
  for(let i = 0; i < cookies.length; i++) {
    if (cookies[i].split(name+"=") !== cookies[i]){
      return decodeURIComponent(cookies[i].split(name+"=")[1]);
    }
  }
}
