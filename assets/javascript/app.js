// Ready the document
$(document).ready(function () {


    // Your web app's Firebase configuration
    var config = {
        apiKey: "AIzaSyDL_AVEMS2FfdGnPh-mofE7FtpIxOOpTRI",
        authDomain: "train-scheduler-32209.firebaseapp.com",
        databaseURL: "https://train-scheduler-32209.firebaseio.com",
        projectId: "train-scheduler-32209",
        storageBucket: "train-scheduler-32209.appspot.com",
        messagingSenderId: "577788468856",
        appId: "1:577788468856:web:3f683400fa96dedd8d978d",
        measurementId: "G-ZJY09LZZW4"
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
            firstTrainTime: firstTrainTime,
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
        var snapFreq = (childSnapshot.val().frequency);
        var dataKey = childSnapshot.key;

        // Console.loging last train added
        console.log(dataKey);
        console.log(snapName);
        console.log(snapDest);
        console.log(snapFirstTime);
        console.log(snapFreq);

        // Create edit and delete button for each row in table
        var btnEdit = $("<button>").html("<span class='glyphicon glyphicon-pencil'></span>").addClass("editButton").attr("data-key", dataKey);
        var btnDelete = $("<button>").html("<span class='glyphicon glyphicon-trash'></span>").addClass("deleteButton").attr("data-key", dataKey);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime%snapFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = snapFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var nextTrainCalc = moment(nextTrain).format("hh:mm A");

      function addRow() {
        var trainInfo = `
            <tr class="row-${dataKey}">
                <td>${btnEdit}</td>
                <td>${snapName}</td>
                <td>${snapDest}</td>
                <td>${snapFreq}</td>
                <td>${nextTrainCalc}</td>
                <td>${tMinutesTillTrain}</td>
                <td>${btnDelete}</td>
            </tr>
            `;

        $("#table-info").append(trainInfo);

        function deleteRow (){
            d
        }
      };

      $(document).on("click", "#add-train", addRow) 

    });

     

});

