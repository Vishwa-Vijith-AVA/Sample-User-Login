//GD_PD_06.3
//this import consist of the imports like express, mssql, queries and defines the path.
//Import the Action, store, Css, images, and other Packages
// import dependencies
const mssql = require("mssql");

//Here we used to conect the DB and node api where the DB name, password user so on
// connecting node & mssql
const mssqlconfig = {
  user: "sa",
  password: "admin",
  database: "dynamic",
  server: "localhost",
  options: {
    trustServerCertificate: true,
  },
};

//GD_PD_23.1
//Here we have been connected to the DB as well as table then we have the queries where we fetch all the Data  from the DB as well as search filter query and has the pagenation queries.
// Route setup
async function addData(req, res) {
  let db = await mssql.connect(mssqlconfig);
  let bodyData = req.body;
  var result = await db.request().query(`
    
    INSERT INTO signup
    (
        [userName]
        ,[Email]
        ,[Pin]
        ,[Orders]
        ,[Inc]  
        ,[Attempt]
    )
    VALUES
    ('${bodyData.userName}'
    ,'${bodyData.Email}'
    ,'${bodyData.Pin}'
    ,'${bodyData.Orders}'
    ,'${bodyData.Inc}'
    ,'${bodyData.Attempt}'
  )
    
    `);

  // , (select count(*) from CustomerDetails)
  // console.log(result);
  res.status(200).json("Record Updated Successfully Added To The DB");
}

//FM_PD_12.1
//Here we have been connected to the DB as well as table then we have the queries where we fetch the previous Row ID  from the DB
//To get the last ID of the Record
async function Data(req, res) {
  let db = await mssql.connect(mssqlconfig);
  let result = await db.request().query(`SELECT * FROM signup`);
  res.status(200).json(result.recordsets);
}

//FM_PD_24.1
//updateRecord()  is used to add a exist record to the DB so we have add the data from the input field to the DB.
//update-existence-records
async function updateRecord(req, res) {
  const bodyData = req.body;
  const id = req.params.id;
  let db = await mssql.connect(mssqlconfig);
  let result = await db.request().query(`
    UPDATE signup
    SET 

        [Pin] = '${bodyData.Pin}',
        [Attempt] = '${bodyData.Attempt}',
        [BlockT] = '${bodyData.BlockT}'
    
    WHERE
        [ID] = ${bodyData.userName}

    `); //Avoid single-quotes '' in courseid,if it's '' mssql.int not required.
  res.status(200).json("Record Updated Successfully");
}

async function Attempt(req, res) {
  const bodyData = req.body;
  const id = req.params.id;
  // console.log(bodyData.Attempt);
  let db = await mssql.connect(mssqlconfig);
  let result = await db.request().query(`
    UPDATE signup
    SET 

        [Attempt] = '${bodyData.Attempt}',
        [BlockT] = '${bodyData.BlockT}'
    
    WHERE
        [ID] = ${bodyData.userName}

    `); //Avoid single-quotes '' in courseid,if it's '' mssql.int not required.
  res.status(200).json("Record Updated Successfully");
}

module.exports = {
  addData,
  updateRecord,
  Data,
  Attempt,
};
