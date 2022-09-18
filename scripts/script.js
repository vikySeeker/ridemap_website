const firebaseConfig = {
    apiKey: "AIzaSyAVUwDTbuHC1Jy_TXWYqTSK_CB3HuYzihY",
    authDomain: "test-auth-9db81.firebaseapp.com",
    projectId: "test-auth-9db81",
    storageBucket: "test-auth-9db81.appspot.com",
    messagingSenderId: "1051026752151",
    appId: "1:1051026752151:web:6dd467dd97ae9359269fd2"
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user)
      // User just signed in, we should not display dialog next time because of firebase auto-login
      //window.open("/Track","_self")
    } else {
        window.open("/","_self")
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