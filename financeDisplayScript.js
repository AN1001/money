const graphDataRaw = getCookie("graphData");
const graphDataFiltered = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const appendZone = document.getElementById("allGraphs");
const filterLeftBtn = document.getElementById("YDbtnLeft");
const filterRightBtn = document.getElementById("YDbtnRight");
const yearDisplay = document.getElementById("yearDisplay");
const addDataBtn = document.getElementById("addDataBtn");
var currentYearDisplayed = 2022;
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
	alert("I have been pressed!");
});

if (window.innerWidth - 60 >= 345) {
	var CONTENTWIDTH = 345;
} else {
	var CONTENTWIDTH = 300;
}

var formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'GBP',
});

for (let i = 0; i < graphDataFiltered.length; i++) {
	createGraph(graphDataFiltered[i])
}

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
		var month = months[currentGraphData[1].slice(0,3)]+" - "+months[currentGraphData[1].slice(8,11)]+" "+currentGraphData[1].slice(11)
		var year = currentGraphData[1].slice(11);
	}
	
	graphToAppend.id = year;
	
	graphToAppend.getElementById("graphDurationDisplay").textContent = "Spending - during "+month;
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
  if(confirm("Are you sure you want to log out?")){
  	window.location.replace("https://moneymoney.herokuapp.com/");
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
