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

    // Create variable to reference firebase database
    var database = firebase.database();

    // Set global variables
    var TrainName = "";
    var Destination = "";
    var Frequency = 0;
    var NextArrival = 0;
    var MinutesAway = 0;

    // On-click function for submit button to create new user-inputs to send to firebase database
    $("#submit-button").on("click", function () {
        event.preventDefault();

        // Grabbed inputs from html
        TrainName = $("#TrainName-input").val().trim();
        Destination = $("#Destination-input").val().trim();
        Frequency = $("#Frequency-input").val().trim();
        NextArrival = $("#NextArrival-input").val().trim();


        console.log("Train name: " + TrainName);
        console.log("Destination: " + Destination);
        console.log("Frequency: " + Frequency);
        console.log("Next Arrival: " + NextArrival);


        // Push inputs to firebase
        database.ref().push({
            TrainName: TrainName,
            Destination: Destination,
            Frequency: Frequency,
            NextArrival: NextArrival,
        });

        $("#TrainName-input").val("");
        $("#Destination-input").val("");
        $("#Frequency-input").val("");
        $("#NextArrival-input").val("");
    })

    database.ref().on("child_added", function(snapshot) {

        console.log(snapshot.val());

        var NewRow = $("<hr>");

        var TrainNameDiv = $("<div>").text(snapshot.val().TrainName); 
        var DestinationDiv = $("<div>").text(snapshot.val().Destination);
        var FrequencyDiv = $("<div>").text(snapshot.val().Frequency);
        var NextArrivalDiv = $("<div>").text(snapshot.val().NextArrival);



        $("#NewTrainRow").append(NewRow);
        $("#TrainName").append(TrainNameDiv);
        $("#Destination").append(DestinationDiv);
        $("#Frequency").append(FrequencyDiv);
        $("#NextArrival").append(NextArrivalDiv);
        
        



    });


});