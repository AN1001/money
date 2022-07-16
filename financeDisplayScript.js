const graphDataRaw = getCookie("graphData");
const graphDataFiltered = eval(graphDataRaw);
const graphDataReference = eval(graphDataRaw);
const temp = document.getElementById("temp1");
const babyTemp = document.getElementById("temp2");
const inputTemp = document.getElementById("temp3");
const homeBar = document.getElementById("homeBar");
const appendZone = document.getElementById("allGraphs");
const changeGraphArea = document.getElementById("changeGraphData"); 
const changeGraphDataParent =  document.getElementById("changeGraphDataParent"); 
const filterLeftBtn = document.querySelector(".YDbtnLeft");
const filterRightBtn = document.querySelector(".YDbtnRight");
const yearDisplay = document.getElementById("yearDisplay");
const yearFilter = document.getElementById("yearFilter");
const addDataBtn = document.getElementById("addDataBtn");
const logOutBtn = document.getElementById("logOutBtn");
const editBtn = document.getElementById("confEditBtn");
const addBarBtn = document.getElementById("addBarDataBtn");
var dataAddScreen = document.getElementById("dataAddScreen");
var currentGraphDisplayed = "";
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

var currentBtnsPressed = 0;
document.querySelectorAll(".monthBtn").forEach(function(btn){
	if(btn.classList.contains("active")){
		currentBtnsPressed++;
	}
	
	btn.addEventListener("click",function(event){
		let self = event.target;
		if(self.classList.contains("active")){
			currentBtnsPressed--;
			self.classList.remove("active");
		} else if(currentBtnsPressed < 2){
			self.classList.add("active");
			currentBtnsPressed++;
		}	
	});
})

var currentYearBtnsPressed = 0;
document.querySelectorAll(".yearBtn").forEach(function(btn){
	if(btn.classList.contains("active")){
		currentYearBtnsPressed++;
	}
	
	btn.addEventListener("click",function(event){
		let self = event.target;
		if(self.classList.contains("active")){
			currentYearBtnsPressed--;
			self.classList.remove("active");
		} else if(currentYearBtnsPressed < 1){
			self.classList.add("active");
			currentYearBtnsPressed++;
		}	
	});
})

document.querySelectorAll(".yearBtn").forEach(function(yearBtn,index){
	yearBtn.textContent = currentYearDisplayed-index;
	yearBtn.id = currentYearDisplayed-index;
})

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
	changeGraphDataParent.style.display = "none";
	
	let graphChildrenArray = [].slice.call(changeGraphArea.children);
	graphChildrenArray.forEach(function(barStats){
		barStats.remove();
	})
	
	document.querySelectorAll(".yearBtn").forEach(function(yearBtn){
		yearBtn.classList.remove("active");
	})
	document.querySelectorAll(".monthBtn").forEach(function(monthBtn){
		monthBtn.classList.remove("active");
	})
});

addBarBtn.addEventListener("click",function(event){
	let formNode = inputTemp.content.cloneNode(true);
	let deleteBtn = formNode.getElementById("barDataDeleteBtn");
	formNode.querySelector(".barEditDetails").textContent = "Details for new bar";
	formNode.querySelector(".inputBarName").value = "New bar name";
	formNode.querySelector(".inputBarValue").value = 0.01;
	changeGraphArea.appendChild(formNode);

	deleteBtn.addEventListener("click",function(event){
		let self = event.target;
		self.parentElement.remove();
	});
});

editBtn.addEventListener("click",function(event){
	let self = event.target;
	updateCookieGraphData(currentGraphDisplayed);
	
	console.log(graphDataReference);
	setCookie("graphData", graphDataReference, 5);
	let data = [getCookie("username"),graphDataReference];
	fetch("updateTables.php", { method: "POST", body: data })
	
	location.reload()
});

logOutBtn.addEventListener("click",function(){
	if(displayed){
		displayed = false;
		yearFilter.style.display = "";
		appendZone.style.display = "";
		dataAddScreen.style.display = "none";
		changeGraphDataParent.style.display = "none";
		
		let graphChildrenArray = [].slice.call(changeGraphArea.children);
		graphChildrenArray.forEach(function(barStats){
  			barStats.remove();
		})
		
		document.querySelectorAll(".monthBtn").forEach(function(monthBtn){
			monthBtn.classList.remove("active");
		})
		document.querySelectorAll(".yearBtn").forEach(function(yearBtn){
			yearBtn.classList.remove("active");
		})
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

changeGraphDataParent.style.display = "none";
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
		changeGraphDataParent.style.display = "";
		dataAddScreen.style.display = "none";
		editBtn.textContent = "Confirm Edit";
		let self = event.target;
		let graphName = self.id.split("-")[1];
		let mainGraph = document.querySelector("."+graphName+"-graphHolder");
		let babyGraph = self.parentElement;
		let graphReference;
		let graphReferenceRaw;
		let indexOfGraph;
		var months;
		var year;
		
		graphDataReference.forEach(function(graph,i){
			if(graph[0] == graphName){
				graphReferenceRaw = graph;
				graphReference = graph.slice(2);
				indexOfGraph = i;
			}
		})
		
		document.getElementById("inputGraphName").value = graphName;
		if(graphReferenceRaw[1].length < 8){
			months = [graphReferenceRaw[1].slice(0,3)];
			year = graphReferenceRaw[1].slice(3);
		} else {
			months = [graphReferenceRaw[1].slice(0,3),graphReferenceRaw[1].slice(8,11)];
			year = graphReferenceRaw[1].slice(11);
		}
		
		document.querySelectorAll(".yearBtn").forEach(function(yearBtn){
			if(yearBtn.id == year){
				yearBtn.classList.add("active");
			} else {
				yearBtn.classList.remove("active");
			}
		})
		
		var alreadyPassed = false;
		months.forEach(function(month){
  			document.querySelectorAll(".monthBtn").forEach(function(monthBtn){
				if(monthBtn.id == month){
					monthBtn.classList.add("active");
					alreadyPassed = true;
				} else if(!alreadyPassed){
					monthBtn.classList.remove("active");
				}
			})
		})
		
		currentBtnsPressed = 0;
		document.querySelectorAll(".monthBtn").forEach(function(btn){
			if(btn.classList.contains("active")){
				currentBtnsPressed++;
			}
		})
		currentYearBtnsPressed = 0;
		document.querySelectorAll(".yearBtn").forEach(function(btn){
			if(btn.classList.contains("active")){
				currentYearBtnsPressed++;
			}
		})
		
		currentGraphDisplayed = graphName;
		
		graphReference.forEach(function(bar){
			let formNode = inputTemp.content.cloneNode(true);
			let deleteBtn = formNode.getElementById("barDataDeleteBtn");
			formNode.querySelector(".barEditDetails").textContent = "Details for bar "+bar[0];
			formNode.querySelector(".inputBarName").value = bar[0];
			formNode.querySelector(".inputBarValue").value = formatter.format(bar[1]);
			changeGraphArea.appendChild(formNode);
			
			deleteBtn.addEventListener("click",function(event){
				let self = event.target;
				self.parentElement.remove();
			})
		})
		
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
	
	mainGraphArea.addEventListener("click",function(event){
		let self = event.target;
		let graphMeta = document.getElementById("graphMetaData");
		editBtn.textContent = "Create Graph";
		changeGraphDataParent.style.display = "";
		dataAddScreen.style.display = "none";
		document.getElementById("inputGraphName").value = "New graph name";
		
		document.querySelectorAll(".yearBtn").forEach(function(yearBtn){
			yearBtn.classList.remove("active");
		})

		document.querySelectorAll(".monthBtn").forEach(function(monthBtn){
			monthBtn.classList.remove("active");
		})
		currentBtnsPressed = 0;
		currentYearBtnsPressed = 0;
		
		
	})
	
	
	applyZone.appendChild(newBabyGraph);
}

function updateCookieGraphData(name){
	var done = false;
	graphDataReference.forEach(function(graph,index){
		if(graph[0] == name){
			graphDataReference[index] = convertFormToList();
			done = true;
		}
	})
	if(!done){
		graphDataReference.push(convertFormToList());
	}
}

function convertFormToList(){
	let graphName = document.getElementById("inputGraphName").value;
	let totalGraphData = [];
	let graphDurationMonth = [];
	let year = currentYearDisplayed;
	let totalDuration = "";
	let errorFound = false; 

	document.querySelectorAll(".monthBtn").forEach(function(monthBtn){
		if (monthBtn.classList.contains("active")){
			graphDurationMonth.push(monthBtn.id);
		}
	})

	document.querySelectorAll(".yearBtn").forEach(function(yearBtn){
		if (yearBtn.classList.contains("active")){
			year = yearBtn.id; 
		}
	})

	if(graphDurationMonth.length > 1){
	  totalDuration = graphDurationMonth[0]+year+"-"+graphDurationMonth[1]+year;
	} else{
	  totalDuration = graphDurationMonth[0]+year;
	}

	totalGraphData.push(graphName);
	totalGraphData.push(totalDuration);

	let graphChildrenArray = [].slice.call(changeGraphArea.children);
	graphChildrenArray.forEach(function(barStats){
		let tempData = [];
		tempData.push(barStats.querySelector(".inputBarName").value);
		tempData.push(parseFloat(barStats.querySelector(".inputBarValue").value.replace(/[^a-z0-9]/gi,'')));
		totalGraphData.push(tempData);
	})
	return totalGraphData;
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
	
	console.log(currentGraphData, graphName);
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
