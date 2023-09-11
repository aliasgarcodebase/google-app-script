function displayEntireData(data,row) {
  //console.log(data);
  /*var data = {
    "salaries": [
      {
        "groupUuid": "6a008152-409d-445a-b714-1d0ae63b67eb",
        "groupName": "Finance",
        "values": [
          0,
          0,
          0,
          2000000,
          2000000,
          1000000,
          1000000,
          1000000,
          1000000,
          966667,
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
          1000000,
          1000000,
          1000000,
          1000000
        ]
      }
    ],
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
  };*/
  data = data;

    var months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  //var dataToFill = 'D2';
  var dataToFill = row;
  var cell = sheet.getRange(dataToFill);
  var row = cell.getRow();
  var column = cell.getColumn();


  // Set headers for salaries
  sheet.getRange(row, column).setBackground('black').setFontSize(14).setFontFamily("Arial").setFontColor("white").setValue("Headcount Report");
  sheet.getRange(row+1, column).setValue("Department");
  for (var i = 0; i < data.salaries[0].values.length; i++) {
    sheet.getRange(row+1, i + column + 1).setValue(months[i]);
  }

  // Fill data for salaries
  for (var i = 0; i < data.salaries.length; i++) {
    var group = data.salaries[i];
    sheet.getRange(i + row + 2, column).setValue(group.groupName);
    for (var j = 0; j < group.values.length; j++) {
      sheet.getRange(i + row + 2, column + j + 1).setValue(formatPrice(group.values[j]));
    }
  }

  // Set headers for burden
  var startingRow = data.salaries.length + 5;
  sheet.getRange(row + startingRow, column).setBackground('black').setFontFamily("Arial").setFontSize(14).setFontColor("white").setValue("Burden (20%)");
  sheet.getRange(row + startingRow + 1, column).setValue("Department");
  for (var i = 0; i < data.burden[0].values.length; i++) {
    sheet.getRange(row + startingRow + 1, column + i + 1).setValue(months[i]);
  }

  // Fill data for burden
  for (var i = 0; i < data.burden.length; i++) {
    var group = data.burden[i];
    sheet.getRange(row + i + startingRow + 2, column).setValue(group.groupName);
    for (var j = 0; j < group.values.length; j++) {
      sheet.getRange(row + i + startingRow + 2, column + j + 1).setValue(formatPrice(group.values[j]));
    }
  }
}
