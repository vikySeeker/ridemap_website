const firebaseConfig = {
    apiKey: "AIzaSyAVUwDTbuHC1Jy_TXWYqTSK_CB3HuYzihY",
    authDomain: "test-auth-9db81.firebaseapp.com",
    projectId: "test-auth-9db81",
    storageBucket: "test-auth-9db81.appspot.com",
    messagingSenderId: "1051026752151",
    appId: "1:1051026752151:web:6dd467dd97ae9359269fd2"
}

firebase.initializeApp(firebaseConfig)

//irebase.auth.Auth.Persistence.LOCAL
//signup
console.log('click1')
function userRegister(){
    document.getElementById("loader").style.visibility="visible"
    var email = document.getElementById("mail").value
    var password = document.getElementById("password").value
    firebase.auth().createUserWithEmailAndPassword(email,password).then((userCredentials) => {
        const user=userCredentials.user
        console.log(user)
        alert("user created successfully\nPLease login to continue!")
        signOut()

    })
    .catch((error) => {
        document.getElementById("loader").style.visibility="hidden"
        console.log(error)
        alert("error")
    })
}

function signOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.open("/","_self")
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });
}