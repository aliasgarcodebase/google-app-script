function loginApi(email,password) {
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
  //console.log(accessToken);
  var response = {
    success: true,
    token : accessToken,
    message : 'Login successful and your api key is : '+accessToken
  };

  return response;
  //return ['token':accessToken];
}catch(error){
  var response = {
    success: false,
    token : '',
    message : 'Unable to authenticate'
  };
  //console.log('Unable to authenticate');
  //return 'Unable to authenticate';
  return response;
}  
}
