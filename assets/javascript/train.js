//Document ready
$(document).ready(function() {

moment().format();

//Initial variables
var trainNameInput = ""
var destinationInput = ""
var firstTrainInput = ""
var frequencyInput = ""

//Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDfwio_jbIHf0XqCO8fwbDR4PIFRt7huf8",
    authDomain: "class-demo-873e8.firebaseapp.com",
    databaseURL: "https://class-demo-873e8.firebaseio.com",
    projectId: "class-demo-873e8",
    storageBucket: "class-demo-873e8.appspot.com",
    messagingSenderId: "2643894460",
    appId: "1:2643894460:web:a8285eeec610a36a"
  };

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//Event handler: on click of submit button
$("#submit").on("click",function(){
    event.preventDefault();

    trainNameInput = $("#train-name").val().trim()
    destinationInput = $("#destination").val().trim()
    firstTrainInput = $("#first-train").val().trim()
    frequencyInput = $("#frequency").val().trim()

    // Code for the push
    database.ref().push({
        trainName : trainNameInput,
        destination : destinationInput,
        firstTrain : firstTrainInput,
        frequency : frequencyInput,
        timeAdded : firebase.database.ServerValue.TIMESTAMP
    });
});

}); //END document ready