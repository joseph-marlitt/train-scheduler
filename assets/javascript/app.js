var config = {
    apiKey: "AIzaSyAAV98q-NDFbTMThEGX6FLB0ybcSk1YK4s",
    authDomain: "employee-f2a35.firebaseapp.com",
    databaseURL: "https://employee-f2a35.firebaseio.com",
    projectId: "employee-f2a35",
    storageBucket: "employee-f2a35.appspot.com",
    messagingSenderId: "367131918224"
  };
  firebase.initializeApp(config);
 
  var database = firebase.database();
  database.ref('/employees').orderByChild("dateAdded").on("child_added", function() {

  })

  database.ref('/employees').orderByChild("dateAdded").on("child_added",function(snapshot) {
    var sv = snapshot.val();

    console.log(snapshot);
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.date);
    console.log(sv.rate);

    var randomFormat = 'MM/DD/YYYY';
    var convertedDate = moment(sv.date, randomFormat);
    var months = moment().diff(moment(convertedDate), 'months');
    var billed = (months * sv.rate)

    $('#data').append('<tr><td>' + sv.name + '</td><td>' + sv.role  + '</td><td>' + sv.date  + '</td><td>' + months  + '</td><td>' + sv.rate  + '</td><td>' + billed + '</td></tr>');

  })



  database.ref('/employees').orderByChild("dateAdded").on("child_added",function(snapshot) {
    var newsv = snapshot.val();
    console.log(newsv);


    // $.each(database.ref('/employees', function() {
    //     console.log(sv.name);
    // }))

  })

  $("#submit").on('click', function() {
    event.preventDefault();
    var name = $('#name-input').val().trim();
    var role = $('#role-input').val().trim();
    var date = $('#date-input').val().trim();
    // var months = $('#months-input').val().trim();
    var rate = $('#rate-input').val().trim();
    database.ref('/employees').push({
        name : name,
        role : role,
        date : date,
        rate : rate,
        dateAdded : firebase.database.ServerValue.TIMESTAMP
    })
  })