var mysql = require('mysql');

var con = mysql.createConnection({
  host: "nopyserver.database.windows.net",
  user: "rockon23146",
  password: "Tran7aado83f_"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// var Connection = require('tedious').Connection;
// var Request = require('tedious').Request;

// // Create connection to database
// var config = 
//    {
//      userName: 'rockon23146',                 // update me
//      password: 'Tran7aado83f_',                    // update me
//      server: 'nopyserver.database.windows.net',  // update me
//      options: 
//         {
//            database: 'nopydb'                  //update me
//            , encrypt: true
//         }
//    }
// var connection = new Connection(config);

// // Attempt to connect and execute queries if connection goes through
// connection.on('conenct', function(err) 
//   {
//     if (err) 
//     {
//         console.log(err)
//     }
//     else
//     {
//       queryDatabase()
//     }
//   }
// );

// function queryDatabase()
// { 
//   console.log('Reading rows from the Table...');

//    // Read all rows from table
//  request = new Request(
//       "SELECT * FROM Persons",
//          function(err, rowCount, rows) 
//             {
//                 console.log(rowCount + ' row(s) returned');
//                 process.exit();
//             }
//         );

//  request.on('row', function(columns) {
//     columns.forEach(function(column) {
//         console.log("%s\t%s", column.metadata.colName, column.value);
//      });
//          });
//  connection.execSql(request);
// }