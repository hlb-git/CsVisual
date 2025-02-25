const csv = require('csv-parser');
const fs = require('fs');


const csvParser = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        row.Customer_Count = row['Customer Count'];
        delete row['Customer Count'];
        rows.push({
          date: row.Date,
          revenue: Number(row.Revenue),
          expenses: Number(row.Expenses),
          profit: Number(row.Profit),
          customer_count: Number(row.Customer_Count)
        })
      })
      .on('end', () => resolve(rows))
      .on('error', (err) => reject(err));
  });
};


module.exports = csvParser; 
