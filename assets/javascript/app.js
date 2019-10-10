// Ready the document
// $(document).ready(funtion(){

    // Your web app's Firebase configuration
    var config = {
        apiKey: "AIzaSyCynWVZa4c50o3U0LXoKlAGnh2bHcfQMUo",
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

    



// });