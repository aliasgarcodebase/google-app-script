function getData(accessToken,organisation,row) {
  //var accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6ImE3YzI3Mjg5LWU2ZGUtNDk2Ni1iZmU3LTMwN2Q0NDJkYzg2ZSIsIm9yZ2FuaXphdGlvbnMiOlsiMjkzNzI5NmMtMTUzMi00NzI1LTkxMjAtZDg0ZmYyOWQ2ZDVlIl0sInNjb3BlcyI6WyIqIl0sImlhdCI6MTY5NDE2MzUxMSwiZXhwIjoxNjk0MTcwNzExfQ.gM7tmA_bKsYqTqmHlw1NY5ISOzwh7lExqpYiMPRSL7E';
   //var organisation = '2937296c-1532-4725-9120-d84ff29d6d5e';
  var accessToken = accessToken;
  var organisation = organisation;
  try{
  var filesResponse = UrlFetchApp.fetch('https://dev.api.getparallel.com/v1/organizations/'+organisation+'/projections?format=salaries&startDate=2023-02-01&endDate=2024-01-31&departments[]=6a008152-409d-445a-b714-1d0ae63b67eb&departments[]=9225c2ee-62e9-40c3-b4ec-199ccb6206f2', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  var apiResponse = filesResponse.getContentText();
  var data = JSON.parse(apiResponse).data;
  var response = {
    success: true,
    data : data 
  };
  Logger.log(response);

  setAuthToken('message','<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> Data Inserted successfully</div>'); // Setting message in cookies
  
  displayEntireData(JSON.parse(apiResponse).data,row);
  }
  catch(error)
  {
    //Logger.log('Invalid request');
    var response = {
    success: false,
    data : ''
  };
  Logger.log(response);
  setAuthToken('message','<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failed!</strong> Invalid request</div>'); // Setting message in cookies
  }

  //return response;
}

function beautifyJSON(jsonData) {
  var parsedData = JSON.parse(jsonData);
  var beautifiedData = JSON.stringify(parsedData, null, 2);
  return beautifiedData;
}
