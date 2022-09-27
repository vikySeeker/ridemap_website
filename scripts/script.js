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
