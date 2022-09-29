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
    apiKey: "AIzaSyAVUwDTbuHC1Jy_TXWYqTSK_CB3HuYzihY",
    authDomain: "test-auth-9db81.firebaseapp.com",
    projectId: "test-auth-9db81",
    storageBucket: "test-auth-9db81.appspot.com",
    messagingSenderId: "1051026752151",
    appId: "1:1051026752151:web:6dd467dd97ae9359269fd2",
    databaseURL: "https://test-auth-9db81-default-rtdb.firebaseio.com"

}

firebase.initializeApp(firebaseConfig)


firebase.auth().onAuthStateChanged(user => {
    if (user) {
      //console.log(user)
      mapInit()
    } else {
        userLogout()
    }
})


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


var marker,circle;
var googleTiles = googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var map = L.map('map', {
    center: [11.1271,78.6569],
    zoom: 10,
});
googleTiles.addTo(map);

function mapInit(){
    if(!navigator.geolocation){
        window.alert("Location service anot found!");
    }else{
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(success,error,{ enableHighAccuracy: true})
        },1000)
    }
}


function success(position){
  console.log(position)
  setup(position)
}


function error(err){
  console.log(err )
  setup([72,19])
}


function setup(position){
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    if(marker){
        map.removeLayer(marker);
        
    }
    if(circle){
        
        map.removeLayer(circle);
    }
    marker = L.marker([lat,long]);
    console.log(marker);
    map.panTo([lat,long]);
    circle = L.circle([lat,long],{radius: accuracy});
    var featureGroup = L.featureGroup([marker,circle]).addTo(map);
    console.log(accuracy)

  pushDummyValue()

 }

 function pushDummyValue(){
   console.log('sending data')
   firebase.database().ref('dummy').on('value',(coords) => {
     console.log(coords.child('lat').val());
     console.log(coords.child('long').val());
   })    
 }


