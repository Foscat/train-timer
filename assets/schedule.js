//Needs to pull up train times using firebase
//Somehow get actual train times and display thier arrival in real time


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
var firstTrain = "";
var frequency = "";
var nextArrival = "next time";
var minAway = "min away";

  
//When the submit button is pushed
$("#add-Train").on('click', function(event) {
  
  event.preventDefault();
  
  //This grabs these values in this format when information is pushed 
  trainName = $("#trainNameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm Military Time").format("LT");
  frequency = $("#frequencyInput").val().trim();

  // Makes sure all inputs have a value beore submitting to table
  if (trainName === ""){
    alert("Enter train name");
    return false;
  }
  if (destination === ""){
    alert("Enter destination");
    return false;
  }
  if (firstTrain === ""){
    alert("Enter first train time");
    return false;
  }
  if (frequency === ""){
    alert("Enter a frequency");
    return false;
  }

  //Create a var to keep track of current time and control its format
  var currentTime = moment().format("LT");

  //Create a var that does the math between 
  //Subtract the first train time back a year to make sure it's before current time.
  //var firstTrianConversion = moment(firstTrain, "HH:mm").subtract("1, years");

  //Differance in time between current time and first train
  //var timeDiff = currentTime - firstTrianConversion;

  // % = Modulus (Remainder)
  //var remainder = timeDiff % frequency;

  //Time math to get minuites until the next train
  //var minUntilTrain = frequency - remainder; 
 // var nextTrain = moment().add(minUntilTrain, "minutes").format("HH:mm Military Time");

  
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);  
  console.log(currentTime);
  // console.log(firstTrianConversion);
  // console.log(timeDiff);
  // console.log(remainder);
  // console.log(minUntilTrain);
  //console.log(nextTrain);



  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    currentTime: currentTime,
    //min: minUntilTrain,
    //next: nextTrain
    });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(snapshot){

  var sv = snapshot.val();
  console.log(sv.trainName);
  console.log(sv.destination);
  console.log(sv.firstTrain);
  console.log(sv.frequency);
 
  $("#train-table").append("<tr class='train-info-row'>" + 
  "<td class='train-info-name'>" + sv.trainName + "</td>" +
  "<td class='train-info-destination'>" + sv.destination + "</td>" + 
  "<td class='train-info-frequency'>" + sv.frequency + "</td>" + 
  "<td class='train-info-next'>" + nextArrival + "</td>" + 
  "<td class='train-info-away'>" + minAway +"</td>" + "</tr>");

  
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

