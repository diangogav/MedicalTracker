//************************************************************************************************************************** */
//***********************************************Firebase Operations******************************************************* */
//************************************************************************************************************************ */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC3OSEMlsGgp0Y7kVDNNO1cpgTshj95m2c",
    authDomain: "hospital-645ee.firebaseapp.com",
    databaseURL: "https://hospital-645ee.firebaseio.com",
    projectId: "hospital-645ee",
    storageBucket: "hospital-645ee.appspot.com",
    messagingSenderId: "761286977231"
  };
  firebase.initializeApp(config);

  //*******************************************************/

  function firebaseInfiniteScroll(route,pointer,callback){

    var arrayOfKeys;

    if(pointer == undefined){


    }else if(!pointer){

        firebase.database().ref(route)
        .orderByKey()
        .limitToLast(20)
        .once('value', function (dataSnapshot) {
    
            arrayOfKeys = Object.keys(dataSnapshot.val())
            .sort()
            .reverse();
    
            var results = arrayOfKeys
            .map((key) => dataSnapshot.val()[key]);

            pointer = arrayOfKeys[arrayOfKeys.length-1];
            
            callback({
                "pointer":arrayOfKeys[arrayOfKeys.length-1], 
                "keys": arrayOfKeys,
                "values":results
            });
    
        }, function (errorObject) {
    
            console.log("The read failed: " + errorObject.code);
    
        });

    }else{


        firebase.database().ref(route)
        .orderByKey()
        .endAt(pointer)
        .limitToLast(20)
        .once('value', function (dataSnapshot) {
    
            arrayOfKeys = Object.keys(dataSnapshot.val())
            .sort()
            .reverse()
            .slice(1);

            var results = arrayOfKeys
            .map((key) => dataSnapshot.val()[key]);

            pointer = arrayOfKeys[arrayOfKeys.length-1];
    
            callback({
                "pointer":arrayOfKeys[arrayOfKeys.length-1], 
                "keys": arrayOfKeys,
                "values":results
            });
    
        }, function (errorObject) {
    
            console.log("The read failed: " + errorObject.code);
    
        });
    }
  }
  //*******************************************************/

  function firebaseGetKeys(route,callback){

    firebase.database().ref(route)
    .limitToLast(10)
    .once("value",function(snapshot){

    var keys;

    snapshot.forEach((childSnapshot) => {
  
      keys = Object.keys(snapshot.val());    
  
    });   

    callback({
        "keys":keys,
    });

  });
}
 //*******************************************************/

 function firebaseGetValues(route,callback){

    firebase.database().ref(route)
    .once("value",function(snapshot){

    var values = [];
  

    snapshot.forEach((childSnapshot) => {
  
        values.push(childSnapshot.val());   
  
    });   

    callback({
        "values":values,
    });

  });
}  
//*******************************************************/

function firebaseActualDataPoints(id,actualDay){

    firebase.database().ref("UsersChart/"+id +'/'+ actualDay).limitToLast(10)
    .on("value",function(snapshot){ 
  
      var actualData = [];
      var actualOxygen = [];
      var actualPulse = [];
      var actualHour = [];
  
      snapshot.forEach((childSnapshot) => {
  
        actualData.push(childSnapshot.val());
  
      })
  
      actualData.forEach((data => {
  
          actualOxygen.push(data.oxygen);
          actualPulse.push(data.pulse);
          actualHour.push(data.actualHour);
      }))
      chart(actualHour,actualOxygen,actualPulse,actualDay);
    })
  }