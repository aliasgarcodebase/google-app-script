function getOrganisationId(token) {
  //var accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVXVpZCI6ImE3YzI3Mjg5LWU2ZGUtNDk2Ni1iZmU3LTMwN2Q0NDJkYzg2ZSIsIm9yZ2FuaXphdGlvbnMiOlsiMjkzNzI5NmMtMTUzMi00NzI1LTkxMjAtZDg0ZmYyOWQ2ZDVlIl0sInNjb3BlcyI6WyIqIl0sImlhdCI6MTY5NDE1NjMzNiwiZXhwIjoxNjk0MTYzNTM2fQ.5CdrBL1JJ6aTy4aDioiNxYr2chDmPJjl39nTZh-jHgk';
  var accessToken = token;
  try{
  var response = UrlFetchApp.fetch('https://dev.api.getparallel.com/v1/users/me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });

  var responseData = JSON.parse(response.getContentText());
  console.log(responseData.data.organizations[0].uuid);
  var organisationId = responseData.data.organizations[0].uuid;
  return organisationId;
  
  //Logger.log(organisationId);
  }
  catch(error)
  {
    return 0;
  }
}

function beautifyJSON(jsonData) {
  var parsedData = JSON.parse(jsonData);
  var beautifiedData = JSON.stringify(parsedData, null, 2);
  return beautifiedData;
}
