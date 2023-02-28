// 61.40.65.3 : GW5_OFFICE / tkfkarhk8 : orcl

const oracledb = require('oracledb');
const config = require("../../config");

// connection basic info
const password = 'tkfkarhk8';
const userId = 'GW5_OFFICE';
const serverIp = '61.40.65.3';
const serviceName = 'orcl';
const connectString = serverIp + '/' + serviceName;

const oracleClientInstallPath = config.ORACLE_CLIENT_PATH;

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: oracleClientInstallPath });

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : userId,
      password      : password,
      connectString : connectString,
    });

    const insertInfo = {
      docuno: 'docnum',
      regdate: new Date(),
      title: 'title',
      content: 'content',
      attfilenum: 3,
      status: 'P'
    };

    const insertArray = [];
    for(let index=0; index<5; index++) {
      const finalInsertInfo = Object.assign({}, insertInfo, {docuno: 'docnum' + (index+1), title: 'title' + (index+1)});
      insertArray.push(finalInsertInfo);
    }

    console.log(insertArray);

    console.log('test');

    const result = await connection.executeMany(
      `INSERT INTO OFFICE5_MIG_TEST (DOCUNO, REGDATE, TITLE, CONTENT, ATTFILENUM, STATUS)
       VALUES (:docuno, :regdate, :title, :content, :attfilenum, :status)`,
       insertArray,
       { autoCommit: true }
    );
    
    console.log("Rows inserted " + result.rowsAffected);


  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();