var scraper = require('table-scraper')
var brothers = []
scraper
  .get('https://docs.google.com/spreadsheets/d/'+spreadsheetID+'/htmlview')
  .then(function(tableData) {
    tableData = tableData[0]
    var keys = Object.values(tableData[0]) // column headers
    tableData.splice(0,2) // remove top two rows

    // transform JSON labels
    tableData.forEach((brother) => {
      var i = 0;
      var newBrother = {};
      for (var value in brother) {
        newBrother[keys[i]] = brother[value] == "TRUE" ? true : brother[value];
        i++;
      }
      brothers.push(newBrother)
    });

    var str = 'var brothers = ' + JSON.stringify(brothers, undefined, 2) + ';\n';
  });
