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

    const updateInfo = {
      docuno: 'docnum1',
      title: 'title1_1_1',
      regdate: new Date(),
      content: 'content2',
      attfilenum: 2
    };

    const result = await connection.execute(
      `UPDATE OFFICE5_MIG_TEST 
       SET regdate = :regdate, title = :title, content = :content, attfilenum = :attfilenum
       WHERE docuno = :docuno`,
       updateInfo,
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