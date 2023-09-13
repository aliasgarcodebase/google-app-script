//function doGet() {
  //return HtmlService.createHtmlOutputFromFile('Index');
//}

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Get Parallel')
    .addItem('Fetch Data', 'showSidebar')
    .addToUi()
}


/**
 * Shows the sidebar
 */
function showSidebar() {

  //clearAuthToken('token');
  //clearAuthToken('organisation');

  // Checking if token and organisation is set or not for this user
  var token = getAuthToken('token');
  var organisation = getAuthToken('organisation');

  if (token && organisation) {
    // Use authToken for authentication
    //SpreadsheetApp.getUi().alert('If condition');
    var myHttpOutput =  HtmlService.createHtmlOutputFromFile('DataImport').setTitle('Parallel for Google Spread Sheet');
  } else {
    // No authToken found, handle accordingly
    //SpreadsheetApp.getUi().alert('Else condition');
    var myHttpOutput =  HtmlService.createHtmlOutputFromFile('Auth').setTitle('Parallel for Google Spread Sheet'); 
  }


  SpreadsheetApp.getUi().showSidebar(myHttpOutput);
  
}

function logout()
{
  clearAuthToken('token');
  clearAuthToken('organisation');
  clearAuthToken('message');
  showSidebar();
}

function connectAuthentication()
{
  var email = 'test+growth@getparallel.com';
  var password = 'Password123!';
  var responseMessage = loginWithOrganisation(email,password);
  if(responseMessage.success == true)
      {

        //getData(responseMessage.token,responseMessage.organisation,row)
        setAuthToken('token',responseMessage.token); // Setting token in cookies
        setAuthToken('organisation',responseMessage.organisation); // Setting organisation id in cookies
        //setAuthToken('message',responseMessage.message); // Setting message in cookies
      }
      setAuthToken('message',responseMessage.message); // Setting message in cookies
      // Calling sidebar for getting updated HTML
      showSidebar();
      
      //return responseMessage;
}

/*function setAuthentication()
{
  var randomToken = generateRandomToken(32);
  setAuthToken(randomToken);
  showSidebar();
}*/

// Fetch data
function fetchData(row)
{
    var token = getValueFromProperties('token');
    var organisation = getValueFromProperties('organisation');
    var row = row;
    getData(token,organisation,row)
}

// Google authentication
function getAuth(){
  //SpreadsheetApp.getUi().alert("get auth function called");
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.authMode);
  //SpreadsheetApp.getUi().alert(authInfo.getAuthorizationStatus());
  if (authInfo.getAuthorizationStatus() == 'REQUIRED') {
    SpreadsheetApp.getUi().alert(`Please authenticate this script to run here: ${authInfo.getAuthorizationUrl()}`);
  } else {
    SpreadsheetApp.getUi().alert(ScriptApp.getOAuthToken());
  }
}

function loginSubmit(row)
{
  if(row!='')
  {
    var outhFirst = outhFirst();
    if(outhFirst.success == true)
      {
        getData(responseMessage.token,responseMessage.organisation,row)
        
      }
      
      return outhFirst;
  }
  else{
    var response = {
    success: false,
    token : '',
    message : 'All fields are required'
  };
  return response;
  }
}


function submitForm(email,password,row)
{
  if(email!='' && password!='' && row!='')
  {
      //var responseMessage = loginApi(email,password);
      var responseMessage = loginWithOrganisation(email,password);
      if(responseMessage.success == true)
      {
        getData(responseMessage.token,responseMessage.organisation,row)
        
      }
      
      return responseMessage;
  }
  else{
    var response = {
    success: false,
    token : '',
    message : 'All fields are required'
  };
  return response;
  }
  
}


function insertData(row)
{
    var activeSS = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = activeSS.getSheetByName('DataSheet');
    
    var cell = sheetName.getRange(row);
    
    var row = cell.getRow();
    var column = cell.getColumn();

    // Setting header for the data
    var headerData = getHeader();

    //Filling Header data
    sheetName.getRange(row,column,headerData.length, headerData[0].length).setValues(headerData);
    
    var lastRow = sheetName.getLastRow();

    // Table data - API data
    var data = formatData();

    // Filling data
    sheetName.getRange(lastRow+1,column,data.length, data[0].length).setValues(data);
}