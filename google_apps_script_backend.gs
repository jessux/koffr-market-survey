function doPost(e) {
  try {
    var spreadsheetId = '1ruThYmQkUkbOirF3JO5k2ATgXKF_Dlvv3ZVo-lG2uTU';
    var sheetName = 'reponses';

    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var payload = JSON.parse(raw);

    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    var headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    var incomingKeys = Object.keys(payload);

    if (headers.length === 0) {
      headers = incomingKeys;
      sheet.appendRow(headers);
    } else {
      var missingKeys = incomingKeys.filter(function(key) {
        return headers.indexOf(key) === -1;
      });

      if (missingKeys.length > 0) {
        headers = headers.concat(missingKeys);
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      }
    }

    var row = headers.map(function(header) {
      var value = payload.hasOwnProperty(header) ? payload[header] : '';
      return Array.isArray(value) ? value.join(' | ') : value;
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
