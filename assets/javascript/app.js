// Ready the document
// $(document).ready(funtion(){

    // Your web app's Firebase configuration
    var config = {
        apiKey: "",
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
    var firstTrainTime = "";
    var frequency = "";

    // Create button click
    $("#add-train").on("click", function(event){
        event.preventDefault();

        // Get values entered into input boxes
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTime").val().trim();
        frequency = $("#frequencyInput").val().trim();

    })
    



// });