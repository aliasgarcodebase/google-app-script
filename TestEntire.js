function myFunction1() {
  
  var email = 'test+growth@getparallel.com';
  var password = 'Password123!';
  var row = 'C3';
  var responseMessage = loginWithOrganisation(email,password);
      if(responseMessage.success == true)
      {
        getData(responseMessage.token,responseMessage.organisation,row)
        
      }     
      return responseMessage;
}
