 var config = {
    apiKey: "AIzaSyAwOljbMh2lY29DxPbS5yVEAf6uyY2EkM4",
    authDomain: "train-scheduler-3ef5b.firebaseapp.com",
    databaseURL: "https://train-scheduler-3ef5b.firebaseio.com",
    projectId: "train-scheduler-3ef5b",
    storageBucket: "train-scheduler-3ef5b.appspot.com",
    messagingSenderId: "288749849253"
  };
  firebase.initializeApp(config);
 
  var database = firebase.database();
  database.ref('/trains').orderByChild("dateAdded").on("child_added", function() {

  })

  database.ref('/trains').orderByChild("dateAdded").on("child_added",function(snapshot) {
    var sv = snapshot.val();

    // console.log(sv.dateAdded)
    // console.log(snapshot);
    // console.log(sv.name);
    // console.log(sv.destination);
    console.log(sv.first);
    console.log(sv.frequency);

    //First Train
    var firstTrain = moment(sv.first, "hh:mm").subtract(1, "years");
    console.log(firstTrain);

    //Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    //Difference between Current time and first train
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    console.log("Difference in Time " + diffTime);

    //Calculate remainder
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    //Next arrival variable for Table
    var minutesAway = sv.frequency - tRemainder;
   
    //Calculate next time of arrival
    var minutesAwayFormatted = moment(minutesAway).format("hh:mm");

    var nextArrival = moment().add(minutesAway, "minutes");
    var nextArrivalFormatted = moment(nextArrival).format("hh:mm");
    
    
    
    ;

    // console.log("First Train is: " + firstTrain);
    // console.log("the frequency is " + frequency);
    // console.log(currentTime);
    // var now = moment();
    // var test = (moment(sv.dateAdded).diff(moment(sv.currentTime).add(moment(sv.frequency), 'minutes')));

    // console.log(test)

    $('#data').append('<tr><td>' + sv.name + '</td><td>' + sv.destination  + '</td><td>' + sv.frequency  + ' min' + '</td><td>' + nextArrivalFormatted + '</td><td>' + minutesAway + " minutes" + '</td></tr>');

  })



  database.ref('/trains').orderByChild("dateAdded").on("child_added",function(snapshot) {
    var newsv = snapshot.val();
    // console.log(newsv);


    // $.each(database.ref('/trains', function() {
    //     console.log(sv.name);
    // }))

  })

  $("#submit").on('click', function() {
    event.preventDefault();
    var name = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var first = $('#first-input').val().trim();
    var frequency = $('#frequency-input').val().trim();
    // var dateAdded = 
    database.ref('/trains').push({
        name : name,
        destination : destination,
        first : first,
        frequency : frequency,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
    })
  })