function loginWithOrganisation(email,password) {
  var url = "https://dev.api.getparallel.com/v1/auth/tokens";
  //var email = 'test+growth@getparallel.com';
  //var password = 'Password123!';
  var email = email;
  var password = password;
  var payload = {
    method: "standard",
    payload: {
      email: email,
      password: password
    }
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload)
  };

try{
  var response = UrlFetchApp.fetch(url, options);
  //console.log(response.getResponseCode());
  var responseData = JSON.parse(response.getContentText());
  //console.log(responseData);
  var accessToken = responseData.data.accessToken;

  organisationId = getOrganisationId(accessToken);

  //organisationId = 4;
  //console.log(accessToken);
  var response = {
    success: true,
    token : accessToken,
    organisation : organisationId,
    message : '<div class="alert alert-success alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Success!</strong> your API key is : '+accessToken+ ' and your organisation id is : ' + organisationId+'</div>',
    //message : 'Login successful and your api key is : '+accessToken+ ' and your organisation id is : ' + organisationId 
  };

  return response;
  //return ['token':accessToken];
}catch(error){
  var response = {
    success: false,
    token : '',
    message : '<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Failed!</strong> Unable to Authenticate</div>',
    //message : 'Unable to Authenticate'
  };
  //console.log('Unable to authenticate');
  //return 'Unable to authenticate';
  return response;
}  
  
}
