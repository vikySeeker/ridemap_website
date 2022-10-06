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
      console.log(user)
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



function mapInit(){
  mapboxgl.accessToken = 'pk.eyJ1IjoidmlnbmVzaG1hZ2FsaW5nYW0iLCJhIjoiY2w4YmFjenI1MGEwZDN4cGM3ZXBoYmsxcCJ9.gL9szMP3DGcuTfvg9ld52g';
navigator.geolocation.getCurrentPosition(success,error,{ enableHighAccuracy: true})
}


function success(position){
  console.log(position)
  setup([position.coords.longitude,position.coords.latitude])
}


function error(err){
  console.log(err )
  setup([72,19])
}


function setup(center){
    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 18
  });
  console.log(center)

// Create a new marker.
 const marker = new mapboxgl.Marker()
 .setLngLat([center[0], center[1]])
 .addTo(map);
   const nav = new mapboxgl.NavigationControl()
   map.addControl(nav,'top-right')
   map.addControl(new mapboxgl.FullscreenControl(),'top-left');

   pushDummyValue()
 }

 function pushDummyValue(){
   console.log('sending data')
   firebase.database().ref('dummy').set({
     name:"test",
     id : "test id",
   })    
 }
