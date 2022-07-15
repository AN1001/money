const graphDataRaw = getCookie("graphData");
const graphDataFiltered = eval(graphDataRaw);
const graphDataReference = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const babyTemp = document.getElementById("temp2");
const inputTemp = document.getElementById("temp3");
const homeBar = document.getElementById("homeBar");
const appendZone = document.getElementById("allGraphs");
const changeGraphArea = document.getElementById("changeGraphData"); 
const filterLeftBtn = document.querySelector(".YDbtnLeft");
const filterRightBtn = document.querySelector(".YDbtnRight");
const yearDisplay = document.getElementById("yearDisplay");
const yearFilter = document.getElementById("yearFilter");
const addDataBtn = document.getElementById("addDataBtn");
const logOutBtn = document.getElementById("logOutBtn");
var dataAddScreen = document.getElementById("dataAddScreen");
var displayed = false;
var currentYearDisplayed = 2022;
var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'GBP',
});
var months = {
  JAN: 'January',
  FEB: 'February',
  MAR: 'March',
  APR: 'April',
  MAY: 'May',
  JUN: 'June',
  JUL: 'July',
  AUG: 'August',
  SEP: 'September',
  OCT: 'October',
  NOV: 'November',
  DEC: 'December',
}

filterLeftBtn.addEventListener("click",function(){
	currentYearDisplayed--;
	filterGraphs(currentYearDisplayed);
});

filterRightBtn.addEventListener("click",function(){
	currentYearDisplayed++;
	filterGraphs(currentYearDisplayed);
});

addDataBtn.addEventListener("click",function(){
		displayed = true;
		yearFilter.style.display = "none";
		appendZone.style.display = "none";
		dataAddScreen.style.display = "";
});

logOutBtn.addEventListener("click",function(){
	if(displayed){
		displayed = false;
		yearFilter.style.display = "";
		appendZone.style.display = "";
		dataAddScreen.style.display = "none";
	}
});

if (window.innerWidth - 60 >= 345) {
	var CONTENTWIDTH = 345;
} else {
	var CONTENTWIDTH = 300;
}

for (let i = 0; i < graphDataFiltered.length; i++) {
	createGraph(graphDataFiltered[i]);
}

for (let i = 0; i < graphDataFiltered.length; i++) {
	createBabyGraph(graphDataFiltered[i]);
}
createBabyGraphAdd();
dataAddScreen.style.display = "none";
filterGraphs(currentYearDisplayed);






/* FUNCTIONS */

function filterGraphs(year){
	var displayedGraphs = appendZone.children;
	for (var i = 0; i < displayedGraphs.length; i++) {
		var graphToEdit = displayedGraphs[i];
		if (graphToEdit.id == year) {
			graphToEdit.style.display = "";
		} else {
			graphToEdit.style.display = "none";
		}
	}
	yearDisplay.textContent = year;
}

function createBabyGraph(currentGraph){
	var newBabyGraph = babyTemp.content.cloneNode(true);
	var applyZone = document.getElementById("dataAddScreen");
	var deleteBtn = newBabyGraph.querySelector(".deleteBtn");
	var mainGraphArea = newBabyGraph.querySelector(".babyGraph");
	var mainGraphAreaText = newBabyGraph.querySelector(".babyGraphText");
	
	deleteBtn.addEventListener("click",function(event){
		let self = event.target;
		let graphName = self.id.split("-")[1];
		let mainGraph = document.querySelector("."+graphName+"-graphHolder");
		let babyGraph = self.parentElement;

		if(confirm("Are you sure you want to delete the graph "+graphName+"?")){
			babyGraph.remove();
			mainGraph.remove();
			graphDataReference.forEach(function(graph,i){
				if(graph[0] == graphName){
					graphDataReference.splice(i,1);
					graphDataFiltered.splice(i,1);
				}
			})
			setCookie("graphData", graphDataReference, 5);
			let data = [getCookie("username"),graphDataReference];
			fetch("updateTables.php", { method: "POST", body: data })
			
		}
	});
	
	mainGraphArea.addEventListener("click",function(event){
		let self = event.target;
		let graphName = self.id.split("-")[1];
		let mainGraph = document.querySelector("."+graphName+"-graphHolder");
		let babyGraph = self.parentElement;
		
		graphDataReference.forEach(function(graph,i){
			if(graph[0] == graphName){
				var graphReference = graph.slice(2);
				var indexOfGraph = i;
			}
		})
		
		graphReference.forEach(function(bar){
			let formNode = inputTemp.content.cloneNode(true);
			formNode.querySelector("barEditDetails").textContent = bar[0]+"=>";
			
			changeGraphArea.appendChild("formNode")
		})
		
		
		//setCookie("graphData", graphDataReference, 5);
		//let data = [getCookie("username"),graphDataReference];
		//fetch("updateTables.php", { method: "POST", body: data })
		
	});
	
	deleteBtn.id = "deleteBtn-"+currentGraph[0];
	mainGraphArea.id = "mainGraph-"+currentGraph[0];
	mainGraphAreaText.textContent = currentGraph[0];
	
	applyZone.appendChild(newBabyGraph);
}

function createBabyGraphAdd(){
	var newBabyGraph = babyTemp.content.cloneNode(true);
	var applyZone = document.getElementById("dataAddScreen");
	var deleteBtn = newBabyGraph.querySelector(".deleteBtn");
	var mainGraphArea = newBabyGraph.querySelector(".babyGraph");
	var mainGraphAreaText = newBabyGraph.querySelector(".babyGraphText");
	
	mainGraphArea.id = "addMainGraphArea";
	deleteBtn.style.display = "none";
	mainGraphAreaText.textContent = "Add Graph";
	
	applyZone.appendChild(newBabyGraph);
}

function createGraph(currentGraphData){
	var graphDataSum = (currentGraphData.slice(2).map(TakeSecondElement)).reduce(add, 0);
	var graphDataAvg = graphDataSum / (currentGraphData.length - 2);
	var percChange = Math.round((currentGraphData[2][1] / graphDataAvg) * 10000 - 10000) / 100;
	var percChangeFormatted = (percChange < 0 ? "" : "+") + percChange + "%";
	var graphToAppend = temp.content.cloneNode(true);
	
	if(currentGraphData[1].length < 8){
		var month = months[currentGraphData[1].slice(0,3)]+" "+currentGraphData[1].slice(3);
		var year = currentGraphData[1].slice(3);
	} else {
		var month = months[currentGraphData[1].slice(0,3)]+" - "+months[currentGraphData[1].slice(8,11)]+" "+currentGraphData[1].slice(11);
		var year = currentGraphData[1].slice(11);
	}
	
	graphToAppend.querySelector(".graphHolder").id = year;
	
	graphToAppend.getElementById("graphDurationDisplay").textContent = "Spending during "+month;
	graphToAppend.getElementById("fineText").textContent = currentGraphData[0];
	graphToAppend.getElementById("popoutText").textContent = formatter.format(graphDataSum);
	graphToAppend.getElementById("barTotal").textContent = "Total for " + currentGraphData[2][0];
	graphToAppend.getElementById("barTotalValue").textContent = formatter.format(currentGraphData[2][1]);
	graphToAppend.getElementById("percentChange").textContent = percChangeFormatted;

	var MAINGRAPHAREA = graphToAppend.getElementById("MAINGRAPHAREA");
	var mainGraphElement = graphToAppend.getElementById("mainGraphElement");
	var barsData = getRawGraphData(currentGraphData);
	var numBars = barsData.length - 1;
	var barWidth = barsData.shift();
	var graphName = currentGraphData[0];
	
	graphToAppend.querySelector(".graphHolder").classList.add(graphName+"-graphHolder");

	if (numBars > 8) {
		let btnL = graphToAppend.querySelector(".btnLeft");
		let btnR = graphToAppend.querySelector(".btnRight");

		btnL.style.display = "block";
		btnR.style.display = "block";
		btnL.id = "btn-" + graphName;
		btnR.id = "btn-" + graphName;
		currentGraphData.push(btnL);
		currentGraphData.push(btnR);

		btnL.addEventListener('click', function onClick(event) {
			var self = event.target;
			var parentGraph = document.getElementById(self.id.split("-")[1]);
			var Graph = parentGraph.querySelector("#MAINGRAPHAREA");
			var barStates = [];
			var currentIndex = 0;
			var children = Graph.children;
			for (var i = 0; i < children.length; i++) {
				var barToEdit = children[i];
				if (barToEdit.style.display == '' || barToEdit.style.display == 'block') {
					barStates.push("Displayed");
				} else {
					barStates.push("NotDisplayed");
				}
			}

			var notTaken = true;
			barStates.forEach(function(state, index) {
				if (state == "Displayed" && notTaken) {
					notTaken = false;
					currentIndex = index;
				}
			});


			if (currentIndex <= 8) {
				barStates.forEach(function(state, index) {
					if (index < 8) {
						barStates[index] = "Displayed";
					} else {
						barStates[index] = "NotDisplayed";
					}
				});
			} else {
				barStates.forEach(function(state, index) {
					var startIndex = currentIndex - 8;
					if (index >= startIndex && index < currentIndex) {
						barStates[index] = "Displayed";
					} else {
						barStates[index] = "NotDisplayed";
					}
				});
			}

			for (var i = 0; i < children.length; i++) {
				var barToEdit = children[i];
				if (barStates[i] == "Displayed") {
					barToEdit.style.display = 'block';
				} else {
					barToEdit.style.display = 'none';
				}
			}

        	});
        
        

		btnR.addEventListener('click', function onClick(event) {
			var self = event.target;
			var parentGraph = document.getElementById(self.id.split("-")[1]);
			var Graph = parentGraph.querySelector("#MAINGRAPHAREA");
			var barStates = [];
			var maxIndex = Infinity;
			var children = Graph.children;
			for (var i = 0; i < children.length; i++) {
				var barToEdit = children[i];
				if (barToEdit.style.display == '' || barToEdit.style.display == 'block') {
					barStates.push("Displayed");
				} else {
					barStates.push("NotDisplayed");
				}
			}

			var lastDisplayedIndex = 0;
			barStates.forEach(function(state, index) {
				if (state == "Displayed") {
					lastDisplayedIndex = index
					maxIndex = lastDisplayedIndex+8;
				} 
			});

			if(barStates.length > lastDisplayedIndex+1){
				barStates.forEach(function(state, index) {
					if (index > lastDisplayedIndex && index <= maxIndex) {
						barStates[index] = "Displayed";
					} else {
						barStates[index] = "NotDisplayed";
					}
				});
			}
				
			for (var i = 0; i < children.length; i++) {
				var barToEdit = children[i];
				if (barStates[i] == "Displayed") {
					barToEdit.style.display = 'block';
				} else {
					barToEdit.style.display = 'none';
				}
			}

		});
		
		graphToAppend.getElementById("graphDurationDisplay").style.paddingRight = '0';

	}
	
	mainGraphElement.id = graphName;
	appendZone.appendChild(graphToAppend);
	barsData.forEach(function(value, i) {
		return createBar(value, MAINGRAPHAREA, barWidth, i, numBars, graphToAppend, graphDataAvg);
	});
}	
	
function createBar(arr, createTo, widthConst, index, numberBars, parentEl, graphAvg) {
	var percChangeLocal = Math.round((arr[1] / graphAvg) * 10000 - 10000) / 100;
	var percChangeFormattedLocal = (percChangeLocal < 0 ? "" : "+") + percChangeLocal + "%";
	var barHolder = document.createElement("div");
	var bar = document.createElement("div");
	var barName = document.createElement("p");

	barHolder.classList.add("barHolder");
	barHolder.id = "BAR" + index;
	bar.id = arr[0] + "@" + index;
	bar.style.width = widthConst + "px";
	bar.style.height = arr[2] + "px";
	bar.classList.add("graphBar");

	if (index == 0) {
		bar.style.backgroundColor = "#76b5bc";
		barHolder.style.marginLeft = '0';
	}

	if (numberBars <= 3) {
		barName.textContent = arr[0].slice(0, 9);
	} else if (numberBars <= 6) {
		barName.textContent = arr[0].slice(0, 5);
	} else if (numberBars >= 8 && index >= 8) {
		barHolder.style.display = "none";
		barName.textContent = arr[0].slice(0, 3);
	} else {
		barName.textContent = arr[0].slice(0, 3);
	}

	bar.addEventListener('click', function onClick(event) {
		let self = event.target;
		let selfName = self.id.split("@")[0];
		var graphTypeData = '';
		var parentEl = '';
		var selfData = '';

		graphDataFiltered.forEach(function(internalList) {
			internalList.slice(2).forEach(function(internalList2) {
				if (internalList2[0] === selfName) {
					parentEl = document.getElementById(internalList[0]);
					selfData = internalList2;
					graphTypeData = internalList.slice(2);
				}
			});
		});

		graphTypeData.forEach(function(elem) {
			if(elem[3] != undefined){
				elem[3].style.background = "#eb765d";
			}
		});

		self.style.backgroundColor = "#76b5bc";
		let percentChangeFormattedLocal = selfData[4];
		let barTotal = parentEl.querySelector("#barTotal");
		let barTotalValue = parentEl.querySelector("#barTotalValue");
		let percChangeDisplay = parentEl.querySelector("#percentChange");

		percChangeDisplay.textContent = percChangeFormattedLocal;
		barTotal.textContent = "Total for " + selfData[0];
		barTotalValue.textContent = formatter.format(selfData[1]);


	});

	arr.push(bar);
	arr.push(percChangeFormattedLocal);
	barHolder.appendChild(bar);
	barHolder.appendChild(barName);
	createTo.appendChild(barHolder);
}


function getRawGraphData(arr, pixelsPerPound) {
	let arrData = arr.slice(2).map(TakeSecondElement);
	var pixelsPerPound = 195 / (0.95 * Math.max(...arrData));
	if (arrData.length <= 8) {
		var width = Math.floor((CONTENTWIDTH - (arrData.length - 1) * 10) / arrData.length);
	} else {
		var width = Math.floor((CONTENTWIDTH - (8 - 1) * 10) / 8);
	}
	return newArr = [width, ...(arr.slice(2).map(function(x) {
		return calcHeight(x, pixelsPerPound);
	}))];
}

function logOut() {
	if(!displayed){
		if(confirm("Are you sure you want to log out?")){
			setCookie("graphData", "", -5);
			window.location.replace("https://moneymoney.herokuapp.com/");
		}
	}
}

function TakeSecondElement(arr) {
	return arr[1];
}

function add(accumulator, a) {
	return accumulator + a;
}

function calcHeight(rawData, pixelsPerPound) {
	if (rawData[1] * pixelsPerPound >= 5) {
		(rawData.push(Math.ceil(rawData[1] * pixelsPerPound)));
	} else {
		rawData.push(10);
	}
	return rawData;
}

function getCookie(name) {
	const value = (document.cookie).replace(/\s+/g, '');
	var cookies = value.split(";");

	for (let i = 0; i < cookies.length; i++) {
		if (cookies[i].split("=")[0] == name) {
			return decodeURIComponent(cookies[i].split(name + "=")[1]);
		}
	}
	return "NOT_FOUND";
}

function setCookie(name,value,mins) {
    var cleanValue = JSON.stringify(value)
    var expires = "";
    if (mins) {
        var date = new Date();
        date.setTime(date.getTime() + (mins*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (cleanValue || "")  + expires + "; path=/";
}
