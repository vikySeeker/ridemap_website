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
      // User just signed in, we should not display dialog next time because of firebase auto-login
      window.open("/Track","_self")
    } else {
    }
})

//login

function userLogin(){
    document.getElementById("loader").style.visibility="visible"
    var email = document.getElementById("mail").value
    var password = document.getElementById("password").value
    firebase.auth().signInWithEmailAndPassword(email,password).then((userCredentials) => {
        const user=userCredentials.user

    })
    .catch((error) => {
        document.getElementById("loader").style.visibility="hidden"
        alert("error")
        console.log(error)
    })
}