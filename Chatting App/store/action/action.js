import * as firebase from "firebase";
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAW7eyeqVOcTDRnJztPj3L4MQRmsU9Nln4",
  authDomain: "chatapp-withreact.firebaseapp.com",
  databaseURL: "https://chatapp-withreact.firebaseio.com",
  projectId: "chatapp-withreact",
  storageBucket: "chatapp-withreact.appspot.com",
  messagingSenderId: "602022655722",
  appId: "1:602022655722:web:616746b0255456cf"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export function signup(name, email, psw, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    firebase.auth().createUserWithEmailAndPassword(email, psw).then(function (user) {
      dispatch({ type: 'SAVE_USER', payload: { name, email: user.user.email, uid: user.user.uid } })
      db.collection("users").add({
        name,
        email: user.user.email,
        uid: user.user.uid,
      }).then(() => {
        dispatch({ type: 'STOP_LOADER' })
        navigation.navigate('App')
      })
    })
  }
}



export function signin(email, psw, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    firebase.auth().signInWithEmailAndPassword(email, psw).then(function (user) {
      db.collection("users").where("uid", "==", user.user.uid).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            dispatch({ type: 'SAVE_USER', payload: { name: doc.data().name, email: user.user.email, uid: user.user.uid } })
          })
        })
    }).then(() => {
      dispatch({ type: 'STOP_LOADER' })
      navigation.navigate('App')
    })
  }
}


export function savedonor(name, number, blood, Location, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    db.collection("donors").add({
      name,
      number,
      blood,
      Location,
    }).then(() => {
      dispatch({ type: 'STOP_LOADER' })
      navigation.navigate('Home')
    })
  }
}




export function getdonor() {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    db.collection("donors").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let drDetail = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_DONORS", payload: drDetail })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });

  }
}



export function searchblood(search) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    if (search == 'A') {
      db.collection("donors").where("blood", "==", 'A')
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              let searched = {
                name: change.doc.data().name,
                number: change.doc.data().number,
                blood: change.doc.data().blood,
                Location: change.doc.data().Location,
              }
              dispatch({ type: "GET_SEARCHED", payload: searched })
              dispatch({ type: 'STOP_LOADER' })
            }
          });
        });
        db.collection("donors").where("blood", "==", 'O')
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              let searched = {
                name: change.doc.data().name,
                number: change.doc.data().number,
                blood: change.doc.data().blood,
                Location: change.doc.data().Location,
              }
              dispatch({ type: "GET_SEARCHED", payload: searched })
              dispatch({ type: 'STOP_LOADER' })
            }
          });
        });
    }
    else if (search == 'O') {
        db.collection("donors").where("blood", "==", 'O')
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            if (change.type === "added") {
              let searched = {
                name: change.doc.data().name,
                number: change.doc.data().number,
                blood: change.doc.data().blood,
                Location: change.doc.data().Location,
              }
              dispatch({ type: "GET_SEARCHED", payload: searched })
              dispatch({ type: 'STOP_LOADER' })
            }
          });
        });
    }
    else if (search == 'B') {
      db.collection("donors").where("blood", "==", 'B')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            let searched = {
              name: change.doc.data().name,
              number: change.doc.data().number,
              blood: change.doc.data().blood,
              Location: change.doc.data().Location,
            }
            dispatch({ type: "GET_SEARCHED", payload: searched })
            dispatch({ type: 'STOP_LOADER' })
          }
        });
      });
      db.collection("donors").where("blood", "==", 'O')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            let searched = {
              name: change.doc.data().name,
              number: change.doc.data().number,
              blood: change.doc.data().blood,
              Location: change.doc.data().Location,
            }
            dispatch({ type: "GET_SEARCHED", payload: searched })
            dispatch({ type: 'STOP_LOADER' })
          }
        });
      });
  }
  else if (search == 'AB') {
    db.collection("donors").where("blood", "==", 'AB')
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let searched = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_SEARCHED", payload: searched })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });
    db.collection("donors").where("blood", "==", 'O')
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let searched = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_SEARCHED", payload: searched })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });
    db.collection("donors").where("blood", "==", 'B')
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let searched = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_SEARCHED", payload: searched })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });
    db.collection("donors").where("blood", "==", 'A')
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let searched = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_SEARCHED", payload: searched })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });
}
  }
}








export function posting(name, number, blood, Location, navigation) {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    db.collection("reqs").add({
      name,
      number,
      blood,
      Location,
    }).then(() => {
      dispatch({ type: 'STOP_LOADER' })
      navigation.navigate('requests')
    })
  }
}




export function geting() {
  return (dispatch) => {
    dispatch({ type: 'START_LOADER' })
    db.collection("reqs").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "added") {
          let reqDetail = {
            name: change.doc.data().name,
            number: change.doc.data().number,
            blood: change.doc.data().blood,
            Location: change.doc.data().Location,
          }
          dispatch({ type: "GET_REQS", payload: reqDetail })
          dispatch({ type: 'STOP_LOADER' })
        }
      });
    });

  }
}