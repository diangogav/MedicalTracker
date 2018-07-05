function ajax(div,page){
  $(div).load(page);
}


function cleanDiv(id){
  $(id).empty();
}

function getID(id){
  return document.getElementById(id).value;
}

function innerHTML(id,result){
  return document.getElementById(id).innerHTML+=result;
}

function usersList(){
  cleanDiv("#info");
  getData();
}

function table(id,name,lastname,age,weight,stature,gender){

    return '<tr>'+
      '<td>'+name+'</td>'+
      '<td>'+lastname+'</td>'+
      '<td>'+age+'</td>'+
      '<td>'+stature+'</td>'+
      '<td>'+weight+'</td>'+
      "<td><a href='#'><i class='fas fa-street-view size-fas'   onclick=\"getUser('"+id+"','"+name+"','"+lastname+"','"+gender+"','"+age+"','"+weight+"','"+stature+"');\"></i></a></td>"+
      "<td><a href='#'><i class='fas fa-calendar-alt  size-fas'   onclick=\"historic('"+id+"');\"></i></a></td>"+
    '</tr>';

}

function tableUser(actualHour,oxyge,pulse){
  return '<tr>'+
    '<td>'+actualHour+'</td>'+
    '<td>'+oxyge+'</td>'+
    '<td>'+pulse+'</td>'+
  '</tr>';
  }
  
  
  function dateHTML(id,date){
  return '<tr>'+
  "<td><a href='#' onclick=\"details('"+id+"','"+date+"');\"> "+date+"</a></td>"+
  '</tr>';
  }

  
  function userCard(name,lastname){
    return name + ' ' + lastname;
  }
  
  function personalData(gender,age,weight,stature){
    return 'Gender: ' + gender + '<br>' + 
           'Age: ' + age + '<br>' +
           'Weight: ' + weight + '<br>' +
           'Stature: ' + stature + '<br>';
  }
  
  function listDates(id,date){
  
    return "<li><a href='#'onclick=\"getAllDateData('"+id+"','"+date+"');\">"+date+"</a></li>";
  
  }
  
  function listData(actualHour,oxygen,pulse){
    return '<tr>'+
    '<td>'+actualHour+'</td>'+
    '<td>'+oxygen+'</td>'+
    '<td>'+pulse+'</td>';
  }
  
