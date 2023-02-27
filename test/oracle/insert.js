// 61.40.65.3 : GW5_OFFICE / tkfkarhk8 : orcl

const oracledb = require('oracledb');

// connection basic info
const password = 'tkfkarhk8';
const userId = 'GW5_OFFICE';
const serverIp = '61.40.65.3';
const serviceName = 'orcl';
const connectString = serverIp + '/' + serviceName;

const oracleClientInstallPath = 'C:\\Project\\instantclient_21_9';

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
      docuno: 'docnum1',
      regdate: new Date(),
      title: 'title1',
      content: 'content1',
      attfilenum: 3,
      status: 'P'
    };

    const result = await connection.execute(
      `INSERT INTO OFFICE5_MIG_TEST (DOCUNO, REGDATE, TITLE, CONTENT, ATTFILENUM, STATUS)
       VALUES (:docuno, :regdate, :title, :content, :attfilenum, :status)`,
       insertInfo,
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