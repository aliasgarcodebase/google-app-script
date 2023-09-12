function generateRandomToken(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var token = '';
  for (var i = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

function setAuthToken(key='AuthToken',token) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(key, token);
  
}

function getAuthToken(key='AuthToken') {
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(key);
}

function clearAuthToken(key='AuthToken') {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteProperty(key);
}

function getValueFromProperties(key='message') {
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(key);
}