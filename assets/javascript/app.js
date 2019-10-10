// Ready the document
// $(document).ready(function () {

var secure = keyConfig.secureKey;

// Your web app's Firebase configuration
var config = {
    apiKey: secure,
    authDomain: "train-scheduler-81a1c.firebaseapp.com",
    databaseURL: "https://train-scheduler-81a1c.firebaseio.com",
    projectId: "train-scheduler-81a1c",
    storageBucket: ""
};

// Initialize firebase
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// Set initial values
var trainName = "";
var destination = "";
var firstTrainTime = 0;
var frequency = "";

// Create button click
$("#add-train").on("click", function (event) {
    event.preventDefault();

    // Get values entered into input boxes
    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequencyInput").val().trim();

    // Create a local varible to hold new train information
    var addTrain = {
        name: trainName,
        destination: destination,
        firsttraintime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    // Add train data to the database
    database.ref().push(addTrain);

    // Reset form values
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTime").val("");
    $("#frequencyInput").val("");

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (childSnapshot) {

    // Create variables to hold database values
    var snapName = childSnapshot.val().name;
    var snapDest = childSnapshot.val().destination;
    var snapFirstTime = childSnapshot.val().firsttraintime;
    var snapFreq = childSnapshot.val().frequency;

    // Console.loging last train added
    console.log(snapName);
    console.log(snapDest);
    console.log(snapFirstTime);
    console.log(snapFreq);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(snapFirstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % snapFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = snapFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#table-info").append("<tr><td class='glyphicon glyphicon-pencil'>" + "" + "</td><td>" + snapName + "</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// });

