//Needs to pull up train times using firebase
//Somehow get actual train times and display thier arrival in real time

//setup global varibles for
var trainName = "";
var destination = "";
var nextArrivalTime = "";
var frequency;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBikwyMtLZX00TuqR2ZLsXmwQH6SlpA3ko",
    authDomain: "train-times-kfizzle.firebaseapp.com",
    databaseURL: "https://train-times-kfizzle.firebaseio.com",
    projectId: "train-times-kfizzle",
    storageBucket: "train-times-kfizzle.appspot.com",
    messagingSenderId: "553170398693"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// Setup global varibles
var trainName = "";
var destination = "";
var firstTrain;
var frequency;

  
//When the submit button is pushed
$("#add-Train").on('click', function(event) {
  
  event.preventDefault();

  //this grabs these values and the information is pushed 
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrain = moment($("#firstTrainInput").val().trim(), "MM/DD/YYYY").format("X");
  frequency = $("#frequencyInput").val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);


  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot){


  // Store everything into a variable.
  var trnName = (childSnapshot.val().trainName);
  var dest = (childSnapshot.val().destination);
  var fTrn = (childSnapshot.val().firstTrain);
  var freak = (childSnapshot.val().frequency);

  // train Info
  console.log(trnName);
  console.log(dest);
  console.log(fTrn);
  console.log(freak);

  $("#train-table").append("<tr class='train-info-row'><td class='train-info-name> " +
   trnName + "</td><td class='train-info-destination'>" + dest + "</td><td class='train-info-first'>" +
   fTrn + "</td><td class='train-info-frequency'>" + freak + "</td></tr>");

  
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// //put train info into a  table row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(trnName),
  //   $("<td>").text(dest),
  //   $("<td>").text(fTrn),
  //   $("<td>").text(freak),
    
  // );

  // // Append the new row to the table
  // $("#train-table > tbody").append(newRow);