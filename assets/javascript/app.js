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

    console.log(snapshot);
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.first);
    console.log(sv.frequency);

    var firstTrain = moment(sv.first, "")
    var convertedDate = moment(sv.date, randomFormat);
    var months = moment().diff(moment(convertedDate), 'months');
    var billed = (months * sv.frequency)

    $('#data').append('<tr><td>' + sv.name + '</td><td>' + sv.destination  + '</td><td>' + sv.frequency  + ' min' + '</td><td>' + sv.frequency + '</td></tr>');

  })



  database.ref('/trains').orderByChild("dateAdded").on("child_added",function(snapshot) {
    var newsv = snapshot.val();
    console.log(newsv);


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
    database.ref('/trains').push({
        name : name,
        destination : destination,
        first : first,
        frequency : frequency,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
    })
  })