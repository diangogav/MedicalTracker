//************************************************************************************************************************** */
//***********************************************Variables***************************************************************** */
//************************************************************************************************************************ */
var userID;
var userDate;
var beforeDate;
var pointer = '';
var pointerListData= '';
var pointerListDataValues = '';


function saveReferenceToOldestData(saveReferenceToOldestData){
    referenceToOldestData = saveReferenceToOldestData;
}
  
  function saveID(id){
    userID = id;  
  }
  
  function saveDate(date){
    userDate = date;
  }
  
  function savePointerListDataValues(pointer){
    pointerListDataValues = pointer;  
  }
  
  
  function getReferenceToOldestData(){
    return referenceToOldestData;
  }
  
  function getUserID(){
    return userID;
  }

  function getDate(){
    return userDate;
  }
  
  function getPointerListDataValues(){
    return pointerListDataValues;
  }
  