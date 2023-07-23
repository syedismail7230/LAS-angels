function doGet(e) {
  return HtmlService
    .createHtmlOutputFromFile('index.html')
    .setTitle("FETCH DETAIL BY ID");
}

function submitDT(obj) {
  var ss = SpreadsheetApp.openById("13Hdk6KP2W_IdQKyAthZvQjXeqW8zNgdEnYgNIrf86Vw");
  var sheet = ss.getSheetByName("Form Responses 1");
  // MAKE SURE YOUR SHEET NAME IS "Sheet1"
  // else change it as your sheet name is.
  var flag = 1;
  var lr = sheet.getLastRow();
  var lc = sheet.getLastColumn();
  var headers = sheet.getRange(1, 1, 1, lc).getValues()[0];

  for (var i = 1; i <= lr; i++) {
    var vid = sheet.getRange(i, 2).getValue();
    if (vid == obj) {
      flag = 0;
      var b1 = sheet.getRange(i, 3).getValue();
      var b2 = sheet.getRange(i, 4).getValue();
      var b3 = sheet.getRange(i, 5).getValue();
      var data = "<table><tr><th colspan=2>Data Fetched.</th></tr><tr><td>ID:</td><td>" + obj + "</td></tr><tr><td>Name:</td><td>" + b1 + "</td></tr><tr><td>Dept.:</td><td>" + b2 + "</td></tr></table>";

      // Count similar columns
      function findAllOccurrences(element, sheetName) {
        var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = spreadsheet.getSheetByName(sheetName);

        var data = sheet.getDataRange().getValues();
        var occurrences = [];

        for (var row = 0; row < data.length; row++) {
          for (var col = 0; col < data[row].length; col++) {
            if (data[row][col] == element) {
              var cell = sheet.getRange(row + 1, col + 1); // Adding 1 to adjust for 0-indexing
              occurrences.push(cell.getA1Notation());
            }
          }
        }

        return occurrences;
      }


      var idColumn = SpreadsheetApp.getActiveSpreadsheet().getSheets()[2];
      Logger.log(idColumn);
      data += "<br>Student Score: " + findAllOccurrences(obj, "Form Responses 1").length;
      return data;
    }
  }

  if (flag == 1) {
    var data = "User not exist.";
    return data;
  }
}
