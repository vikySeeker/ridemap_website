// var map = L.map('map', {
//     center: [35.689487,139.691706],
//     zoom: 16,
// });
// L.marker([35.689487,139.691706]).addTo(map);
// var mapboxTile = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmlnbmVzaG1hZ2FsaW5nYW0iLCJhIjoiY2w4YmFjenI1MGEwZDN4cGM3ZXBoYmsxcCJ9.gL9szMP3DGcuTfvg9ld52g', {
//     attribution : 'Ridemap'
//     //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });



const firebaseConfig = {
  apiKey: "AIzaSyBc0IwjyR4tpUVZCUFHvTT0sG2PkIok-uE",
  authDomain: "bustrack-master-4809b.firebaseapp.com",
  databaseURL: "https://bustrack-master-4809b-default-rtdb.firebaseio.com",
  projectId: "bustrack-master-4809b",
  storageBucket: "bustrack-master-4809b.appspot.com",
  messagingSenderId: "82104326324",
  appId: "1:82104326324:web:787704d8722450ce04dfe1",
  measurementId: "G-CXS44NEY51"

}

firebase.initializeApp(firebaseConfig)


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //console.log(user)
      //spotBus();
      if(navigator.geolocation){
        navigator.geolocation.watchPosition(userLoc,error1)
      }else{
        error();
      }
    } else {
        userLogout()
    }
})

function error1(){
  window.alert("testing...")
}
const database = firebase.database()

function userLogout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
         window.open("/","_self")
    }).catch((error) => {
         console.log(error)
         // An error happened.
      });
}

// setInterval(() => {
//     navigator.geolocation.getCurrentPosition(setup,error)
// },1000)

var userMarker,vehicleMarker,circle,vehiclePos,userPos;
var googleTiles = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var map = L.map('map', {
    center: [11.1271,78.6569],
    zoom: 20,
    zoomControl : false
});
googleTiles.addTo(map);

var myIcon = L.icon({
  iconUrl: '/img/marker_icon.png',
  iconSize: [60, 58],
  iconAnchor: [22, 94],
  //popupAnchor: [-3, -76],
});
// function mapInit(){
//     if(!navigator.geolocation){
//         window.alert("Location service not found!");
//     }else{
//         setInterval(() => {
//             navigator.geolocation.getCurrentPosition(success,error,{ enableHighAccuracy: true})
//         },1000)
//     }
// }


function success(position){
  console.log(position)
  setup(position)
}



function error(err){
  window.alert("location service not available!" )
  setup([72,19])
}


function vehicleLoc(position,speed){
    var lat = position[0];
    var long = position[1];
    vehiclePos=[lat,long];
    //var accuracy = position.coords.accuracy;
    if(vehicleMarker){
        map.removeLayer(vehicleMarker);
    }
    // if(circle){
    //     map.removeLayer(circle);
    // }
    vehicleMarker = L.marker([lat,long]).addTo(map);
    console.log(vehicleMarker);
    map.panTo([lat,long]);
    //circle = L.circle([lat,long],{radius: accuracy});
    //var featureGroup = L.featureGroup([marker,circle]).addTo(map);
    //console.log(accuracy)
    route(vehiclePos[0],userPos[0],vehiclePos[1],userPos[1])
    var eta=(distance(vehiclePos[0],userPos[0],vehiclePos[1],userPos[1])/speed)*60;
    console.log("Estimated time of arrival:"+eta);

  //pushDummyValue()

 }


 function userLoc(position){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var accuracy = position.coords.accuracy;
  userPos=[lat,long]
  console.log("user latlong:"+userPos)
  if(userMarker){
      map.removeLayer(userMarker);
  }
  if(circle){
      map.removeLayer(circle);
  }
  userMarker = L.marker([lat,long]).addTo(map);
  console.log(userMarker);
  //map.panTo([lat,long]);
  circle = L.circle([lat,long],{radius: accuracy});
  var featureGroup = L.featureGroup([userMarker,circle]).addTo(map);
  //console.log(accuracy)
//pushDummyValue()

}

function route(vehiclePosLat,userPosLat,vehiclePosLong,userPosLong){
  var res=L.Routing.control({
    waypoints: [
      L.latLng(vehiclePosLat, vehiclePosLong),
      L.latLng(userPosLat, userPosLong)
    ]
  }).addTo(map);
  console.log("Routing data...:"+L.Routing.control({
    waypoints: [
      L.latLng(vehiclePosLat, vehiclePosLong),
      L.latLng(userPosLat, userPosLong)
    ]
  }));
}

function distance(lat1,
  lat2, lon1, lon2)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
return(c * r);
}
 function spotBus(){
   firebase.database().ref('/driver_available/ubBSfDgW5bND2e8Oaeo79MnJRRm2/l').on('value',(coords) => {
    console.log('getting data')
    var position = [coords.child('0').val(),coords.child('1').val()];
    //var long = coords.child('long').val();
     vehicleLoc(position,coords.child('2').val());
     console.log(position);
   })   
 }


