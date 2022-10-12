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
        setInterval(()=>{
          navigator.geolocation.getCurrentPosition(userLoc,error);
        },1000)
      }else{
        error();
      }
    } else {
        userLogout()
    }
})

function userLogout(){
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
       window.open("/","_self")
  }).catch((error) => {
       console.log(error)
       // An error happened.
    });
}

var userMarker,vehicleMarker,circle,vehiclePos,userPos;
var googleTiles = L.tileLayer('https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var map = L.map('map', {
    center: [11.922666,79.626771],
    zoom: 20,
    zoomControl : false
});
googleTiles.addTo(map);

var myIcon = L.icon({
  iconUrl: '/img/marker_icon.png',
  iconSize: [60,58],
  popupAnchor: [0, -55],
});

//function to handle location serive succes


// function success(position){
//   console.log(position)
//   setup(position)
// }

//function to handle location serive failure...

function error(err){
  window.alert("location service not available!" )
  setup([12.222623,79.6500342])
}

//function to get vehicle coordinates

function vehicleLoc(position,speed){
    var lat = position[0];
    var long = position[1];
    vehiclePos=[lat,long];
    if(vehicleMarker){
        map.removeLayer(vehicleMarker);
    }
    var eta=(distance(vehiclePos[0],userPos[0],vehiclePos[1],userPos[1])/speed)*60;
    console.log(eta)
    var popupmessage="<b>ETA: </b>"+parseInt(eta)+" mins approx<br><b>Speed:</b>"+speed;
    // if(typeof(eta)===typeof(NaN)){
    //   eta=0;
    //   popupmessage="<b>ETA: </b>"+parseInt(eta)+" mins approx<br><b>Speed:</b>"+speed
    // }
    console.log("Estimated time of arrival:"+eta);
    vehicleMarker = L.marker([lat,long],{icon: myIcon}).addTo(map).bindPopup(popupmessage).openPopup();
    console.log(vehicleMarker);
    map.panTo([lat,long]);
 }


//function to get user coordinates


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
}


//returns distance between two coordinates

function distance(lat1, lat2, lon1, lon2){

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

//funtion to invoke firebase database to get vehicle coordinates

function spotBus(){
  firebase.database().ref('/driver_available/ubBSfDgW5bND2e8Oaeo79MnJRRm2/l').on('value',(coords) => {
   console.log('getting data')
   var position = [coords.child('0').val(),coords.child('1').val()];
   //var long = coords.child('long').val();
    vehicleLoc(position,coords.child('2').val());
    console.log(position);
  })   
}


/*

route function utilize leaflet-routing machine to find ways between two points...
 */


// function route(vehiclePosLat,userPosLat,vehiclePosLong,userPosLong){
//   var res=L.Routing.control({
//     waypoints: [
//       L.latLng(vehiclePosLat, vehiclePosLong),
//       L.latLng(userPosLat, userPosLong)
//     ]
//   }).addTo(map);
//   console.log("Routing data...:"+L.Routing.control({
//     waypoints: [
//       L.latLng(vehiclePosLat, vehiclePosLong),
//       L.latLng(userPosLat, userPosLong)
//     ]
//   }));
// }