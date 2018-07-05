
//*************************************************************************************************************************/ */
function getData(){

    showLoader("loader-content");

    firebaseInfiniteScroll("Users/",pointer,function(data) {
      pointer = data.pointer;

      data.values.forEach(values => {

        var result = table(values.id,values.name,values.lastname,values.age,values.weight,values.stature,values.gender);
        innerHTML("users",result);

      });
      hiddenLoader("loader-content");
    });

}
//************************************************************************************************************************* */

function getUser(id,name,lastname,gender,age,weight,stature){

  var oxygenMeanArray = [];
  var pulseMeanArray = [];
  var daysMeanArray = [];
  var values;

  cleanDiv("#content");
  ajax("#content","details.html");

    firebaseGetKeys("UsersChart/" +id ,function(data) {

      daysMeanArray = data.keys;

      data.keys.forEach(key => {

      firebaseGetValues("UsersChart/"+id +'/'+ key,function(data){

        values = calculateAverageOxygenPulseDay(data.values);
        oxygenMeanArray.push(values.oxygenMean);
        pulseMeanArray.push(values.pulseMean);
        meanChartPulseOxygen(daysMeanArray,oxygenMeanArray,pulseMeanArray);
      })
    })

    var actualDay =  daysMeanArray[daysMeanArray.length - 1];

    
    firebaseActualDataPoints(id,actualDay);

    var resultData = userCard(name,lastname);
    innerHTML("name",resultData);

    resultData = personalData(gender,age,weight,stature);
    innerHTML("personalData",resultData);

    hiddenLoader("loader-content");

  })
}

//**************************************************************************************************************************
function calculateAverageOxygenPulseDay(data){

  var pulseAcum = 0;
  var oxygenAcum = 0;
  var pulseMean = 0;
  var oxygenMean = 0;
  var readings = 0;

  data.forEach(userData => {
    pulseAcum = pulseAcum + userData.pulse;
    oxygenAcum = oxygenAcum + userData.oxygen;
  })

  pulseMean = pulseAcum / data.length;
  oxygenMean = oxygenAcum / data.length;

  pulseMean = parseFloat(pulseMean.toFixed(2));
  oxygenMean = parseFloat(oxygenMean.toFixed(2));

  readings = data.length;

  return {
    "oxygenMean" : oxygenMean,
    "pulseMean" : pulseMean
  }

}

//**************************************************************************************************************************

function historic(id){

  saveID(id);

  cleanDiv("#content");
  ajax("#content","data.html");

  firebaseInfiniteScroll("UsersChart/"+id,pointerListData,function(data) {

    pointerListData = data.pointer;

    data.keys.forEach(key => {

      var result = listDates(id,key);
      innerHTML("dates",result);

    });
    hiddenLoader("loader-content");
  });
}

//**************************************************************************************************************************
function getAllDateData(id,date){


  if(date != beforeDate){
    pointerListDataValues = '';
    cleanDiv("#allData");
  }
  saveDate(date);
  saveID(id);


  firebaseInfiniteScroll("UsersChart/"+id+'/'+ date,pointerListDataValues,function(data) {


    console.log(data);

    data.values.forEach(value => {

      pointerListDataValues = data.pointer;
      savePointerListDataValues(pointerListDataValues);


      var result = listData(value.actualHour,value.oxygen,value.pulse);
      innerHTML("allData",result);

    });  
    
  });


  beforeDate = date;

}

//**************************************************************************************************************************
$('#info').bind('scroll', function(){
  if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){

    firebaseInfiniteScroll("Users/",pointer,function(data) {
      pointer = data.pointer;
      console.log(data);

      data.values.forEach(values => {

        var result = table(values.id,values.name,values.lastname,values.age,values.weight,values.stature,values.gender);
        innerHTML("users",result);
        
      });
    });
  }
});

//**************************************************************************************************************************


