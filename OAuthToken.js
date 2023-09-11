function oAuthTokenSecond(oauthCode) {
  var url = "https://dev.api.getparallel.com/v1/auth/tokens";

  var oauthCode = oauthCode;

  var payload = {
    "method": "oauthCode",
    "payload": {
      "code": oauthCode
    }
  };

  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

try{
  var response = UrlFetchApp.fetch(url, options);
  var responseData = JSON.parse(response.getContentText());
  //Logger.log(response.getContentText());

  var accessToken = responseData.data.accessToken;

  // Get Organisation ID
  organisationId = getOrganisationId(accessToken);
  var response = {
    success: true,
    token : accessToken,
    organisation : organisationId,
    message : 'Login successful and your api key is : '+accessToken+ ' and your organisation id is : ' + organisationId 
  };

  return response;

}
catch(error){
  var response = {
    success: false,
    token : '',
    message : 'Unable to authenticate'
  };

  return response;
} 
}
