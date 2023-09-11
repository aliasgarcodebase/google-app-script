function displayBurdenData() {
  var data = {
    "burden": [
      {
        "groupUuid": "6a008152-409d-445a-b714-1d0ae63b67eb",
        "groupName": "Finance",
        "values": [
          0,
          0,
          0,
          400000,
          400000,
          200000,
          200000,
          200000,
          200000,
          193333.40000000002,
          0,
          0
        ]
      },
      {
        "groupUuid": "9225c2ee-62e9-40c3-b4ec-199ccb6206f2",
        "groupName": "Engineering",
        "values": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          200000,
          200000,
          200000,
          200000
        ]
      }
    ]
  };

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var dataToFill = 'D2';
  var cell = sheet.getRange(dataToFill);
  var row = cell.getRow();
  var column = cell.getColumn();

  // Set headers
  sheet.getRange(row, column).setValue("Department");
  for (var i = 0; i < data.burden[0].values.length; i++) {
    sheet.getRange(row, i +column + 1).setValue("Value " + (i + 1));
  }

  // Fill data
  for (var i = 0; i < data.burden.length; i++) {
    var group = data.burden[i];
    sheet.getRange(i + row + 1, column).setValue(group.groupName);
    for (var j = 0; j < group.values.length; j++) {
      sheet.getRange(i + row + 1, j + column + 2).setValue(formatPrice(group.values[j]));
    }
  }
}

