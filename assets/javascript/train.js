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
    $("input").val("")


    trainNameInput = $("#train-name").val()
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

// Firebase watcher + initial loader 
database.ref().on("child_added", function(childSnapshot) {

    //Create local variables
    var currentTime = moment().format("HH:mm")
    var timeAdded = childSnapshot.val().timeAdded //from Firebase   
    var frequency = childSnapshot.val().frequency //from Firebase     
    var firstTrain = moment(childSnapshot.val().firstTrain, "hh:mm A").format("HH:mm") 
    var difference = 0 //difference = currentTime - firstTrain       
    var remainder = 0 // remainder = difference % frequency       
    var untilNext = 0 //frequency - remainder                         
    var nextTrain = "" //timeAdded +                                 
                                                                   
    console.log("current time: " + currentTime)
    console.log("first train: " + firstTrain)

    //find the difference in minutes 
    difference = moment(currentTime, "HH:mm").minutes() - moment(firstTrain, "HH:mm").minutes()
    console.log("difference: " + difference)

    //find the remainder           
    remainder = difference % frequency
    console.log("remainder: " + remainder)

    //find nextTrain time and time until the nextTrain 
    ftHour = moment(firstTrain, "HH:mm").hours()
    ftMinutes = moment(firstTrain,"HH:mm").minutes()
    console.log("ft hour " + ftHour)
    console.log("ft minutes " + ftMinutes)

    ctHour = moment().hours()
    ctMinutes = moment().minutes()
    console.log("ct hour " + ctHour)
    console.log("ct minutes " + ctMinutes)

    untilNextMinutes = frequency - remainder
    untilNextHours = ftHour - ctHour
    console.log(untilNextMinutes)

    if (ftHour > ctHour){ //if the first train is after the current time
        nextTrain = moment(firstTrain,"HH:mm").format("hh:mm A")

        if (ftMinutes < ctMinutes && ftMinutes === 0){
        untilNext = ((untilNextHours - 1) + " hours(s) " + (60 - ctMinutes) + " min(s) ")
        } else if (ftMinutes < ctMinutes && ftMinutes > 0){
        untilNext = ((untilNextHours - 1) + " hour(s) " + (60 - ctMinutes + ftMinutes) + " min(s) ")
        } else if (ftMinutes === ctMinutes){
        untilNext = (untilNextHours + "hour(s)")
        };

        
    } else if (ftHour < ctHour){ //if the first train is before the current time
        nextTrain = moment().add(untilNextMinutes,"minutes").format("hh:mm A")
        untilNext = (frequency - remainder) + " min(s)"
    }


    //Append values to html DOM
    $("#current-schedule-table").append("<tr><td id = 'new-train'>" + childSnapshot.val().trainName +
    "</td><td id = 'new-train'>" + childSnapshot.val().destination +
    "</td><td id = 'new-train'>" + childSnapshot.val().frequency +
    "</td><td id = 'new-train'>" + nextTrain +
    "</td><td id = 'new-train'>" + untilNext +
    "</td></tr>")

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

}); //END document ready