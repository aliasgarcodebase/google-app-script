function myFunction() {
  var url = "https://dev.api.getparallel.com/v1/oauth2/authorize";

  var payload = {
    "clientId": "b6b2c792-d791-4954-ba2c-e718094420fc",
    "scopes": ["reports"],
    "callbackUrl": "http://google.com"
  };

  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

try{
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
  var responseData = JSON.parse(response.getContentText());
  console.log(responseData);
  
  var code = responseData.data.code;

  var authDetail = oAuthTokenSecond(code);

  //return authDetail;
  console.log(authDetail)

}
catch(error){
  Logger.log(error);

  var response = {
    success: false,
    token : '',
    message : 'Unable to authenticate'
  };
  //return response;
  console.log(response)
} 
}