//************************************************************************************************************************** */
//***********************************************Variables***************************************************************** */
//************************************************************************************************************************ */

var referenceToOldestKey = '';
var items = [];

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

//*************************************************************************************************************************/ */
function getData(){

if(referenceToOldestKey == undefined){

}else if (!referenceToOldestKey) { 
  
      // if initial fetch
      firebase.database().ref("Users/")
     .orderByKey()
     .limitToLast(10)
     .once('value')
     .then((snapshot) => { 

        // changing to reverse chronological order (latest first)
        var arrayOfKeys = Object.keys(snapshot.val())
           .sort()
           .reverse();
           
        // transforming to array

        var results = arrayOfKeys
           .map((key) => snapshot.val()[key]);

        // storing reference
        referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];

        //Append to the view html
        results.forEach(data => {

          var result = table(data.id,data.name,data.lastname,data.age,data.weight,data.stature,data.gender);
          innerHTML("users",result);
        });
        
    }).catch((error) => {  } );

}else{

  firebase.database().ref("Users/")
  .orderByKey()
  .endAt(referenceToOldestKey)
  .limitToLast(10)
  .once('value')
  .then((snapshot) => {

    // changing to reverse chronological order (latest first)
    // & removing duplicate
    var arrayOfKeys = Object.keys(snapshot.val())
        .sort()
        .reverse()
        .slice(1);

     // transforming to array
     var results = arrayOfKeys
        .map((key) => snapshot.val()[key]);

     // updating reference
     referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
     // Do what you want to do with the data, i.e.
     // append to page or dispatch({ … }) if using redux

     //Append to the view html
     results.forEach(data => {
      var result = table(data.id,data.name,data.lastname,data.age,data.weight,data.stature,data.gender);
      innerHTML("users",result);
    });

  
    
  }).catch((error) => {  } );

}
}
//************************************************************************************************************************* */

function getUser(id,name,lastname,gender,age,weight,stature){


  var oxygenMeanArray = [];
  var pulseMeanArray = [];

  cleanDiv("#content");

  ajax("#content","details.html");

  var user = firebase.database().ref("UsersChart/"+id ).limitToLast(10);
  user.once("value",function(snapshot){
  var key;
  snapshot.forEach((childSnapshot) => {

    key = Object.keys(snapshot.val());    

  }); 

  key.forEach((data => {

    firebase.database().ref("UsersChart/"+id +'/'+ data).limitToLast(10).once("value",function(snapshot){

      var dataArray = [];


      var pulseAcum = 0;
      var oxygenAcum = 0;
      var pulseMean = 0;
      var oxygenMean = 0;
      var readings = 0;

      snapshot.forEach((childSnapshot) => {

        dataArray.push(childSnapshot.val());

          dataArray.forEach((dat) => {
            
            pulseAcum = pulseAcum + dat.pulse;
            oxygenAcum = oxygenAcum + dat.oxygen;

        });	

        pulseMean = pulseAcum / dataArray.length;
        oxygenMean = oxygenAcum / dataArray.length;
        
        pulseMean = parseFloat(pulseMean.toFixed(2));
        oxygenMean = parseFloat(oxygenMean.toFixed(2));
        
        pulseAcum = 0;
        oxygenAcum = 0;
        
        readings = dataArray.length;

       


      });	

      oxygenMeanArray.push(oxygenMean);
      pulseMeanArray.push(pulseMean);
      meanChartPulseOxygen(key,oxygenMeanArray,pulseMeanArray);

    })



  }))

  var actualDay =  key[key.length - 1];
  console.log("día actual: ",key[key.length - 1]);
  console.log("oxigeno",oxygenMeanArray);
  console.log("pulso",pulseMeanArray);
  console.log("keys",key);


  var resultData = userCard(name,lastname);
  innerHTML("name",resultData);

  resultData = personalData(gender,age,weight,stature);
  innerHTML("personalData",resultData);

  actualDataPoints(id,actualDay);
});

}

//**************************************************************************************************************************

function actualDataPoints(id,actualDay){

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
//**************************************************************************************************************************

function historic(id,date){

  cleanDiv("#content");
  ajax("#content","data.html");



}
//************************************************************************************************************************** */
//***********************************************Tools Operations///******************************************************* */
//************************************************************************************************************************ */

function getID(id){
return document.getElementById(id).value;
}
//************************************************************************************************************************ */

function innerHTML(id,result){
return document.getElementById(id).innerHTML+=result;
}

//************************************************************************************************************************ */

function ajax(div,page){
/*var ajaxRes = new XMLHttpRequest();
ajaxRes.onreadystatechange = function(){
  if(ajaxRes.readyState == 4 && ajaxRes.status == 200){
    document.getElementById(id).innerHTML = ajaxRes.responseText
  }
}

ajaxRes.open("GET",page,true);
ajaxRes.send();*/
  $(div).load(page);
}

//************************************************************************************************************************ */



$('#info').bind('scroll', function(){
  if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
    console.log("Scroll!!!");
    getData();
  }
});



//************************************************************************************************************************** */
//***********************************************View Operations*********************************************************** */
//************************************************************************************************************************ */

function table(id,name,lastname,age,weight,stature,gender){

return '<tr>'+
  '<td>'+name+'</td>'+
  '<td>'+lastname+'</td>'+
  '<td>'+age+'</td>'+
  '<td>'+stature+'</td>'+
  '<td>'+weight+'</td>'+
  "<td><a href='#'><i class='fas fa-street-view size-fas'   onclick=\"getUser('"+id+"','"+name+"','"+lastname+"','"+gender+"','"+age+"','"+weight+"','"+stature+"');\"></i></a></td>"+
  "<td><a href='#'><i class='fas fa-calendar-alt  size-fas'   onclick=\"historic('"+id+"','"+name+"','"+lastname+"','"+gender+"','"+weight+"','"+stature+"');\"></i></a></td>"+
'</tr>';
}
//************************************************************************************************************************ */

function tableUser(actualHour,oxyge,pulse){
return '<tr>'+
  '<td>'+actualHour+'</td>'+
  '<td>'+oxyge+'</td>'+
  '<td>'+pulse+'</td>'+
'</tr>';
}

//************************************************************************************************************************ */

function dateHTML(id,date){
return '<tr>'+
"<td><a href='#' onclick=\"details('"+id+"','"+date+"');\"> "+date+"</a></td>"+
'</tr>';
}

//************************************************************************************************************************* */
function userCard(name,lastname){
  return name + ' ' + lastname;
}
//*************************************************************************************************************************
function personalData(gender,age,weight,stature){
  return 'Gender: ' + gender + '<br>' + 
         'Age: ' + age + '<br>' +
         'Weight: ' + weight + '<br>' +
         'Stature: ' + stature + '<br>';
}
function cleanDiv(id){
$(id).empty();
}



function meanChartPulseOxygen(xLabel,yOxygen,yPulse){


  Highcharts.chart('barChart', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Oxygen and Pulse Data'
    },
    subtitle: {
        text: 'average of the last 10 days'
    },
    xAxis: {
        categories: xLabel,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Mean (%)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
      name: 'Oxygen',
      color: '#098bf8',
      data: yOxygen

    }, {
      name: 'Pulse',
      color: '#ea171b',
      data: yPulse
    }]
});
}


function chart(x,yOxygen,yPulse,actualDay){

  Highcharts.chart('dataChart', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Latest data'
    },
    subtitle: {
        text: actualDay
    },
    xAxis: {
        categories: x
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Oxygen',
        color: '#098bf8',
        data: yOxygen
    }, {
        name: 'Pulse',
        color: '#ea171b',
        data: yPulse
    }]
  });




}







