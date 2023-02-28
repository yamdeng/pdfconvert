// 61.40.65.3 : GW5_OFFICE / tkfkarhk8 : orcl
//	61.40.65.15:1521:orcl : gwdb / tkddn2363

const oracledb = require('oracledb');
const config = require("../../../config");
const oracleClientInstallPath = config.ORACLE_CLIENT_PATH;
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient({ libDir: oracleClientInstallPath });

// connection basic info
const password = 'tkfkarhk8';
const userId = 'GW5_OFFICE';
const serverIp = '61.40.65.3';
const serviceName = 'orcl';
const connectString = serverIp + '/' + serviceName;

// connection basic info 2
const password2 = 'tkddn2363';
const userId2 = 'gwdb';
const serverIp2 = '61.40.65.15';
const serviceName2 = 'orcl';
const connectString2 = serverIp2 + '/' + serviceName2;

async function run() {

  let connection1;

  let connection2;

  try {
    connection1 = await oracledb.getConnection( {
      user          : userId,
      password      : password,
      connectString : connectString
    });

    connection2 = await oracledb.getConnection( {
      user          : userId2,
      password      : password2,
      connectString : connectString2
    });

    const result1 = await connection1.execute(
      `SELECT *
       FROM OFFICE5_MIG_TEST`,
    );

    console.log(result1.rows);

    const result2 = await connection2.execute(
      `SELECT *
       FROM OFFICE5_MIG_TEST`,
    );

    console.log(result2.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection1) {
      try {
        await connection1.close();
      } catch (err) {
        console.error(err);
      }
    }

    if (connection2) {
      try {
        await connection2.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();