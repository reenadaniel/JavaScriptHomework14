// Set the dataSet to data intially
var filteredData = dataSet;


// Load List Function=>Splitting the results into appropriate pages
function LoadList(){

  console.log(filteredData);
  renderTable(filteredData);

}


function applyfilters(filteredData){
  var filterDate = $dateInput.value.trim();
    if(filterDate!=""){
      filteredData = filteredData.filter(function(sighting){
        var sightingDate = sighting.datetime;
        return sightingDate===filterDate;
      });
    };

    var filterCity = $cityInput.value.trim().toLowerCase();
    if(filterCity!=""){
      filteredData=filteredData.filter(function(sighting){
        var sightingCity = sighting.city;
        return sightingCity===filterCity;
      });
    };

    var filterState = $stateInput.value.trim().toLowerCase();
    if(filterState!=""){
      filteredData=filteredData.filter(function(sighting){
        var sightingState = sighting.state;
        return sightingState===filterState;
      });
    };

    var filterCountry = $countryInput.value.trim().toLowerCase();
    if(filterCountry!=""){
      filteredData=filteredData.filter(function(sighting){
        var sightingCountry = sighting.country;
        return sightingCountry===filterCountry;
      });
    };

    var filterShape = $shapeInput.value.trim().toLowerCase();
    if(filterShape!=""){
      filteredData=filteredData.filter(function(sighting){
        var sightingShape = sighting.shape;
        return sightingShape===filterShape;
      });
    };

    console.log("Filtered Data: ",filteredData);
    return filteredData;
}

// Get reference for the tbody, input datetime and button element
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetimeInput");
var $cityInput = document.querySelector("#cityInput");
var $stateInput = document.querySelector("#stateInput");
var $countryInput = document.querySelector("#countryInput");
var $shapeInput = document.querySelector("#shapeInput");
var $searchBtn = document.querySelector("#search");
var $clearBtn =  document.querySelector("#clear");
var $pageresults = document.getElementById("pageresult")

function renderTable(dataset){
  console.log("Rendering Table");
	$tbody.innerHTML="";
  if(dataset.length>0){
    for(var i=0;i<dataset.length;i++){
      var fields=Object.keys(dataset[i]);
      var $row = $tbody.insertRow();
      var rowdata = dataset[i];
      for(var j=0;j<fields.length;j++){
        var field= fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = rowdata[field];

      };
    };
  };	
};

function handleSearchButton(event){
  event.preventDefault();
  filteredData=dataSet;
	console.log("Button Clicked Successfully")
  filteredData = applyfilters(filteredData);
  // The new results has to be displayed from Page 1
  LoadList();
};


// Add the event listener for the search button click
$searchBtn.addEventListener("click",handleSearchButton);

// Add the event listener for the clear button click
$clearBtn.addEventListener("click",function(event){
  event.preventDefault();
  filteredData = dataSet;
  $dateInput.value = "";
  $shapeInput.value ="";
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  LoadList();
})
LoadList();