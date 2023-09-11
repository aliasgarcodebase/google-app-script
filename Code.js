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
  //const myHttpOutput = HtmlService.createHtmlOutputFromFile('Index').setTitle('Get Your Parallel Data')
  const myHttpOutput =  HtmlService.createHtmlOutputFromFile('Auth').setTitle('Get Your Data');
  SpreadsheetApp.getUi().showSidebar(myHttpOutput);
  
}

function formatData() {
 var data = [];
 for(var i =0; i < 5; i++) {
   data.push([Math.random(), Math.random()]);
 }
 //data.push([email,number]);
 return data;
}

function getHeader()
{
  var data = [];
  data.push(['Email Address','Phone Number']);
  return data;
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


function submitForm1(email,number,row)
{
  
  console.log('Function calling');
  if(email!='' && row!='' && number!='')
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
    var data = formatData(email,number);

    // Filling data
    sheetName.getRange(lastRow+1,column,data.length, data[0].length).setValues(data);
    
    return 'Data inserted';
  }
  else{
    // Return the error message
    return '<h6>Data not added</h6>';
  }
}