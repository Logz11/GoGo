/*function get(elementID) {
    return document.getElementById(elementID);
}

let currentWindow = document.URL;

function init(){
    for(let i = 1; i < addresses.length; i++){
        let listItem = document.createElement('li');
        listItem.textContent = 'Bus Stop '+i+': '+addresses[i].name

        listItem.classList.add('not-checked-in');
        listItem.setAttribute('id', addresses[i].id);
        allBusStops.appendChild(listItem);
    }
}

let pinNumberOrder = [
    {
        pinNumber: 1,
        image:'http://maps.google.com/mapfiles/kml/paddle/1.png'
    },
    {
        pinNumber: 2,
        image: 'http://maps.google.com/mapfiles/kml/paddle/2.png'
    },
    {
        pinNumber: 3,
        image: 'http://maps.google.com/mapfiles/kml/paddle/3.png'
    },
    {
        pinNumber: 4,
        image: 'http://maps.google.com/mapfiles/kml/paddle/4.png'
    },
    {
        pinNumber: 5,
        image: 'http://maps.google.com/mapfiles/kml/paddle/5.png'
    },
    {
        pinNumber: 6,
        image: 'http://maps.google.com/mapfiles/kml/paddle/6.png'
    },
    {
        pinNumber: 7,
        image: 'http://maps.google.com/mapfiles/kml/paddle/7.png'
    },
    {
        pinNumber: 8,
        image: 'http://maps.google.com/mapfiles/kml/paddle/8.png'
    },
    {
        pinNumber: 9,
        image: 'http://maps.google.com/mapfiles/kml/paddle/9.png'
    },
    {
        pinNumber: 10,
        image: 'http://maps.google.com/mapfiles/kml/paddle/10.png'
    },
];

let addresses = [
    {
        id: 'start-point',
        name: 'Badger Middle School',
        coords: { lat: 43.414573, lng: -88.181894 },
        iconImage: 'http://maps.google.com/mapfiles/kml/pal3/icon31.png',
        content: '<h3>Badger Middle School</h3>' +
            '<p>727 S 6th Ave, West Bend, WI 53095</p>'
    },
    {
        id: 'stop-1',
        name: 'Evergreen Street',
        coords: { lat: 43.413718, lng: -88.197511 },
        iconImage: '',
        content:'',
        details: '<p>1500-1598 Evergreen St, West Bend, WI 53095</p>'
    },
    {
        id: 'stop-2',
        name: 'Green Tree Road',
        coords: { lat: 43.439962, lng: -88.194707 },
        iconImage: '',
        content: '',
        details: '<p>Green Tree Rd, West Bend, WI 53090</p>'            
    },
    {
        id: 'stop-3',
        name: 'Minz Park Circle',
        coords: { lat: 43.394885, lng: -88.175087 },
        iconImage: '',
        content: '',
        details: '<p>154-144 Minz Park Cir, West Bend, WI 53095</p>'            
    },
    {
        id: 'stop-4',
        name: 'Edgewater Drive',
        coords: { lat: 43.416123, lng: -88.154824 },
        iconImage: '',
        content: '',
        details: '<p>1898-1800 Edgewater Dr, West Bend, WI 53095</p>'            
    },
    {
        id: 'stop-5',
        name: 'Acadia Avenue',
        coords: { lat: 43.413366, lng: -88.158276 },
        iconImage: '',
        content: '',
        details: '<p>763-737 Acadia Ave, West Bend, WI 53095</p>'
    },
    {
        id: 'stop-6',
        name: 'Hemlock Street',
        coords: { lat: 43.432201, lng: -88.152700 },
        iconImage: '',
        content: '',
        details: '<p>1801-2199 Hemlock St, West Bend, WI 53090</p>'            
    },
    {
        id: 'stop-7',
        name: 'Wood Way Drive',
        coords: { lat: 43.430959, lng: -88.196585 },
        iconImage: '',
        content: '',
        details: '<p>1399-1301 Wood Way Dr, West Bend, WI 53090</p>'            
    },
    {
        id: 'stop-8',
        name: 'South Lincoln Drive',
        coords: { lat: 43.405905, lng: -88.176136 },
        iconImage: '',
        content: '',
        details: '<p>297-207 Lincoln Dr S, West Bend, WI 53095</p>'            
    },
    {
        id: 'stop-9',
        name: 'Chapel Hill Place',
        coords: { lat: 43.407417, lng: -88.193611 },
        iconImage: '',
        content: '',
        details: '<p>1069 Chapel Hill Pl, West Bend, WI 53095</p>'            
    },
    {
        id: 'stop-10',
        name: 'South 7th Avenue',
        coords: { lat: 43.422122, lng: -88.184973 },
        iconImage: '',
        content: '',
        details: '<p>138-198 S 7th Ave, West Bend, WI 53095</p>'
    }
];

function initMap() {

    //Map Options
    var options = {
        zoom: 13,
        center: addresses[0].coords
    }
    //Map Constructor
    var map = new google.maps.Map(document.getElementById('map'), options);

    //Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        //Check for Custom Icon
        //Otherwise apply a normal pin with ascending numbers
        if(props.iconImage){
            marker.setIcon(props.iconImage);
        }

        //Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
    addMarker(addresses[0]);
    //Loop Through Markers Array
    for (var i = 1; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        let JSONConvert = JSON.parse(sessionStorage.getItem(key));
        addMarker(JSONConvert);
    }
}

let selectionContainer = get('selectionContainer');
let body = document.querySelector('body');

let allBusStops = get('all-stops');
let destinationList = get('destinations');

let submitBtn = get('submit');

function saveToSessionStorage(){
    let scannedDestinations = document.querySelectorAll('.checked-in');
    let pinNumberAccumulator = 1;
    for(let i = 0; i < scannedDestinations.length; i++){
        let foundAddress = '';
        for(let j = 1; j < addresses.length; j++){
            console.log(addresses[j].details);
            if(scannedDestinations[i].id === addresses[j].id){

                addresses[j].content = '<h4>Bus Stop '+pinNumberAccumulator+' -- '+addresses[j].name+'</h4>';
                addresses[j].content += addresses[j].details;
                addresses[j].iconImage = 'http://maps.google.com/mapfiles/kml/paddle/' +pinNumberAccumulator+'.png';
                
                foundAddress = JSON.stringify(addresses[j]);
                if (foundAddress !== '') {
                    sessionStorage.setItem(scannedDestinations[i].id, foundAddress);
                }
                pinNumberAccumulator++;
            }
        }
    }
    if(sessionStorage.length > 1){
        alert('Bus Stops Saved Successfully! Please Navigate to Map Page.');
    } else{
        alert('Error: Please Select At Least One Stop');
    }
}

let displayBtn = get('display-all');

function displayAllData(){
    for(let i = 0; i < sessionStorage.length; i++){
        const key = sessionStorage.key(i);
        console.log(key + ': ' + sessionStorage.getItem(key));
    }
}

function switchColumns(e){
    let addressNumber = e.target.id;
    let listItems = document.querySelectorAll('ol li');
    
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].id === addressNumber){
            listItems[i].remove();
            listItems[i].setAttribute('class', 'checked-in');
            destinationList.appendChild(listItems[i]);
        }
    }
}

if(currentWindow.includes('map.html')){
    displayBtn.addEventListener('click', displayAllData);
}

if (currentWindow.includes('selector.html')) {
    init();
    allBusStops.addEventListener('click', switchColumns);
    submitBtn.addEventListener('click', saveToSessionStorage);
    sessionStorage.clear();
}*/

function get(elementID) {
    return document.getElementById(elementID);
}

let currentWindow = document.URL;

function init() {
    //sort students alphabetically
    Students.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    for (let i = 0; i < Students.length; i++) {

        //add students to stops
        addresses[Students[i].stop].expectedStudents.push(Students[i].name);


        //create initial left student list
        let listItem = document.createElement('li');
        let listToggleBtn = document.createElement('button');
        listToggleBtn.setAttribute('class', 'radio-btn-full');
        listItem.textContent = Students[i].name + ': Stop ' + Students[i].stop;
        listItem.setAttribute('id', "student_" + i);
        listItem.setAttribute('stop', Students[i].stop);
        listItem.setAttribute('name', Students[i].name);
        listItem.classList.add("visible");
        listItem.appendChild(listToggleBtn);
        allBusStops.appendChild(listItem);
    }

    for (let i = 1; i < addresses.length; i++) {
        //create initial invisible right stop list
        let toAdd = document.createElement('li');
        toAdd.textContent = i + '. ' + addresses[i].name;
        toAdd.setAttribute('id', addresses[i].id);
        toAdd.classList.add('visible');
        destinationList.appendChild(toAdd);

        //add an invisible list for students to each stop list element
        let childList = document.createElement('ol');
        childList.setAttribute('id', addresses[i].id + "expectedStudents");
        childList.classList.add('invisible');
        toAdd.appendChild(childList);

        //add students to the invisible list
        addresses[i].expectedStudents.forEach((student) => {
            let newChild = document.createElement('li');
            newChild.textContent = student;
            newChild.setAttribute("id", addresses[i].id + "expectedStudents" + student);
            newChild.classList.add('invisible');
            childList.appendChild(newChild);
        });

    }
}

let Students = [
    {
        name: 'Benson, Timmy',
        stop: 1
    },
    {
        name: 'Robertson, Anna',
        stop: 2
    },
    {
        name: 'Johnson, Christopher',
        stop: 3
    },
    {
        name: 'Miller, Sarah',
        stop: 4
    },
    {
        name: 'Turner, Janet',
        stop: 5
    },
    {
        name: 'Smith, Joseph',
        stop: 6
    },
    {
        name: 'Davis, Beatrice',
        stop: 3
    },
    {
        name: 'Jones, Katherine',
        stop: 5
    },
    {
        name: 'Garcia, Carter',
        stop: 6
    },
    {
        name: 'Holt, Janet',
        stop: 7
    },
    {
        name: 'Watts, Joseph',
        stop: 9
    },
        {
        name: 'Davies, Sarah',
        stop: 10
    },
        {
        name: 'Smith, Gabby',
        stop: 7
    },
        {
        name: 'Watts, Caroline',
        stop: 9
    },
        {
        name: 'Caudile, Michael',
        stop: 8
    },
    {
        name: 'Mueller, Trevor',
        stop: 10
    }, 
];


var selectedStops = new Set();

let addresses = [
    {
        id: 'start-point',
        name: 'Badger Middle School',
        coords: { lat: 43.414573, lng: -88.181894 },
        iconImage: 'Resources/images/bus-overhead@3x.png',
        content: '<h3>Badger Middle School</h3>' +
            '<p>727 S 6th Ave, West Bend, WI 53095</p>'
    },
    {
        id: 'stop-1',
        name: 'Chapel Hill Place',
        coords: { lat: 43.407417, lng: -88.193611 },
        iconImage: '',
        content: '',
        details: '<p>1069 Chapel Hill Pl, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-2',
        name: 'Evergreen Street',
        coords: { lat: 43.413718, lng: -88.197511 },
        iconImage: '',
        content: '',
        details: '<p>1500-1598 Evergreen St, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-3',
        name: 'South 7th Avenue',
        coords: { lat: 43.422122, lng: -88.184973 },
        iconImage: '',
        content: '',
        details: '<p>138-198 S 7th Ave, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-4',
        name: 'Wood Way Drive',
        coords: { lat: 43.430959, lng: -88.196585 },
        iconImage: '',
        content: '',
        details: '<p>1399-1301 Wood Way Dr, West Bend, WI 53090</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-5',
        name: 'Green Tree Road',
        coords: { lat: 43.439962, lng: -88.194707 },
        iconImage: '',
        content: '',
        details: '<p>Green Tree Rd, West Bend, WI 53090</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-6',
        name: 'Hemlock Street',
        coords: { lat: 43.432201, lng: -88.152700 },
        iconImage: '',
        content: '',
        details: '<p>1801-2199 Hemlock St, West Bend, WI 53090</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-7',
        name: 'Acadia Avenue',
        coords: { lat: 43.413366, lng: -88.158276 },
        iconImage: '',
        content: '',
        details: '<p>763-737 Acadia Ave, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-8',
        name: 'Edgewater Drive',
        coords: { lat: 43.416123, lng: -88.154824 },
        iconImage: '',
        content: '',
        details: '<p>1898-1800 Edgewater Dr, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-9',
        name: 'Minz Park Circle',
        coords: { lat: 43.394885, lng: -88.175087 },
        iconImage: '',
        content: '',
        details: '<p>154-144 Minz Park Cir, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    },
    {
        id: 'stop-10',
        name: 'South Lincoln Drive',
        coords: { lat: 43.405905, lng: -88.176136 },
        iconImage: '',
        content: '',
        details: '<p>297-207 Lincoln Dr S, West Bend, WI 53095</p>',
        expectedStudents: [],
        boardedStudents: []
    }
];

function initMap() {
    //Map Options
    var options = {
        zoom: 13,
        center: addresses[0].coords
    }
    //Map Constructor
    var map = new google.maps.Map(document.getElementById('map'), options);

    //Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
        });

        //Check for Custom Icon
        //Otherwise apply a normal pin with ascending numbers
        if (props.iconImage) {
            marker.setIcon(props.iconImage);
        }

        //Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
    addMarker(addresses[0]);
    addMarker({
        iconImage: 'http://maps.google.com/mapfiles/kml/pal3/icon31.png',
        content: "<h4>West High School</h4>1305 E Decorah Rd, West Bend, WI 53095",
        coords: { lat: 43.412121, lng: -88.164382 }
    });
    //Loop Through Markers Array
    for (var i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        let JSONConvert = JSON.parse(sessionStorage.getItem(key));
        addMarker(JSONConvert);
    }

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.setMap(map);
    initDirections(directionsService, directionsRenderer);
}
function initDirections(directionsService, directionsRenderer) {
    var waypts = [];
    for (var i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        let JSONConvert = JSON.parse(sessionStorage.getItem(key));
        waypts.push({
            location: JSONConvert.coords,
            stopover: false,
            id: JSONConvert.id
        });
    }
    waypts.sort((a, b) => {
        a = parseInt(a.id.substring(5));
        b = parseInt(b.id.substring(5));
        return a - b;
    });
    waypts.forEach((element) => { delete element.id });
    directionsService.route({
        origin: addresses[0].coords,
        destination: { lat: 43.412121, lng: -88.164382 },
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

}
let selectionContainer = get('selectionContainer');
let body = document.querySelector('body');

let allBusStops = get('all-stops');
let destinationList = get('destinations');

let submitBtn = get('submit');

function saveToSessionStorage(e) {
    let scannedDestinations = document.querySelectorAll('.checked-in');
    for (let i = 0; i < scannedDestinations.length; i++) {
        let foundAddress = '';
        for (let j = 1; j < addresses.length; j++) {
            if (scannedDestinations[i].id === addresses[j].id) {
                addresses[j].content = '<h4>Bus Stop ' + j + ' -- ' + addresses[j].name + '</h4>';
                addresses[j].content += addresses[j].details;
                var studentInfo = "Students at stop: " + addresses[j].boardedStudents.length + "<br>";
                addresses[j].boardedStudents.forEach((student) => { studentInfo += " -" + student + "<br>"; });
                addresses[j].content += studentInfo;

                //UN-COMMENT THIS CODE FOR DYNAMIC NUMBERED PINS
                //addresses[j].iconImage = 'http://maps.google.com/mapfiles/kml/paddle/' + addresses[j].id.substring(5, 6) + '.png';

                //THIS CODE SIMPLY UPDATES THE ICON IF THEY GET SELECTED. LEAVING THE ICONIMAGE PROPERTY BLANK IN CASE WE SWITCH AGAIN
                addresses[j].iconImage = 'Resources/images/tiny_map_marker.png';
                foundAddress = JSON.stringify(addresses[j]);
                if (foundAddress !== '') {
                    sessionStorage.setItem(scannedDestinations[i].id, foundAddress);
                }
            }
        }
    }
    //     if(sessionStorage.length > 0){
    //         alert('Bus Stops Saved Successfully! Please Navigate to Map Page.');
    //     } else{
    //     	alert('Error: Please Select At Least One Stop');
    //     }
}


// let displayBtn = get('display-all');

// function displayAllData() {
//     for (let i = 0; i < sessionStorage.length; i++) {
//         const key = sessionStorage.key(i);
//         console.log(key + ': ' + sessionStorage.getItem(key));
//     }
// }

function switchColumns(e) {
    let id = e.target.id;
    let listItems = document.querySelectorAll('ol li');
    let currentStopsRemaining = get('current-stops-remaining');

    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].id === id) {
            var student = listItems[i].getAttribute("name");
            var stopno = listItems[i].getAttribute("stop");
            var stopid = "stop-" + stopno;
            var listid = stopid + "expectedStudents";
            var studentElementid = listid + student;
            listItems[i].firstElementChild.classList.add('toggled');
            if (!selectedStops.has(addresses[stopno])) {
                var selectedStop = document.getElementById(stopid);
                var selectedList = document.getElementById(listid);
                selectedStops.add(addresses[stopno]);
                selectedStop.classList.remove("invisible");
                selectedStop.classList.add("visible");
                selectedStop.classList.add("checked-in");
                selectedList.classList.remove("invisible");
                selectedList.classList.add("visible");
            }
            var selectedChild = document.getElementById(studentElementid);
            selectedChild.classList.remove("invisible");
            selectedChild.classList.add("visible");
            addresses[stopno].boardedStudents.push(student);

        }
    }

    let numberOfStudentsScanned = document.querySelectorAll('ul li ol li.visible');
    console.log(numberOfStudentsScanned);
    currentStopsRemaining.textContent = numberOfStudentsScanned.length;
}


// if(currentWindow.includes('map.html')){
//     displayBtn.addEventListener('click', displayAllData);
// }

if (currentWindow.includes('selector.html')) {
    init();
    allBusStops.addEventListener('click', switchColumns);
    submitBtn.addEventListener('click', saveToSessionStorage);
    sessionStorage.clear();
}