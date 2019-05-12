$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAPRYII1NVPYBdO7cakP517vepITfAkNKQ",
        authDomain: "trains-homework-7.firebaseapp.com",
        databaseURL: "https://trains-homework-7.firebaseio.com",
        projectId: "trains-homework-7",
        storageBucket: "trains-homework-7.appspot.com",
        messagingSenderId: "389515714446",
    };

    firebase.initializeApp(config);

    setInterval(function (startTime) {

        $("#current-time").html("Current time: " + moment().format('hh:mm a'))

    }, 1000);

    // Create variable to reference firebase database
    var database = firebase.database();

    // Set global variables
    var TrainName = "";
    var Destination = "";
    var Frequency = 0;
    var FirstTrain = "";
   

    // On-click function for submit button to create new user-inputs to send to firebase database
    $("#submit-button").on("click", function () {
        event.preventDefault();

        // Grabbed inputs from html
        TrainName = $("#TrainName-input").val().trim();
        Destination = $("#Destination-input").val().trim();
        Frequency = $("#Frequency-input").val().trim();
        FirstTrain = $("#FirstTrain-input").val().trim();


        console.log("Train name: " + TrainName);
        console.log("Destination: " + Destination);
        console.log("Frequency: " + Frequency);
        console.log("First Train: " + FirstTrain);


        // Push inputs to firebase
        database.ref().push({
            TrainName: TrainName,
            Destination: Destination,
            Frequency: Frequency,
            FirstTrain: FirstTrain,
        });

        $("#TrainName-input").val("");
        $("#Destination-input").val("");
        $("#Frequency-input").val("");
        $("#FirstTrain-input").val("");
    })

    database.ref().on("child_added", function (snapshot) {

        console.log(snapshot.val());

        // Calculating current time to be used later for comparison
        var currentTime = moment().format('hh:mm a');
        console.log("Current Time: " + currentTime);

        // Grabbing variable of first train start time
        var FirstTrain = snapshot.val().FirstTrain;
        console.log("First Train: " + FirstTrain);

        // Converting the first train time into varibale
        var FirstTimeConverted = moment(FirstTrain, "hh:mm");
        console.log("FirstTimeConverted: " + FirstTimeConverted);

        // Calculating the difference in time between train and current time
        var differenceTime = moment().diff(moment(FirstTimeConverted), "minutes");
        console.log("Time Difference(in minutes): " + differenceTime);

        var Frequency = snapshot.val().Frequency;
        console.log("Frequency: " + Frequency);

        var timeRemainder = differenceTime % Frequency;

        var minutesAway = Frequency - timeRemainder;
        console.log("Minutes Away: " + minutesAway);

        var NextArrival = moment().add(minutesAway, "m").format("hh:mm A");

        var TrainNameDiv = $("<div>").text(snapshot.val().TrainName);
        var DestinationDiv = $("<div>").text(snapshot.val().Destination);
        var FrequencyDiv = $("<div>").text(snapshot.val().Frequency);
        var minutesAwayDiv = $("<div>").text(minutesAway);
        var NextArrivalDiv = $("<div>").text(NextArrival);

        $("#TrainName").append(TrainNameDiv);
        $("#Destination").append(DestinationDiv);
        $("#Frequency").append(FrequencyDiv);
        $("#NextArrival").append(NextArrivalDiv);
        $("#MinutesAway").append(minutesAwayDiv);
      
    });


});