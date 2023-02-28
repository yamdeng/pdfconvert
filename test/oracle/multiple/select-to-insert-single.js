// 61.40.65.3 : GW5_OFFICE / tkfkarhk8 : orcl
//	61.40.65.15:1521:orcl : gwdb / tkddn2363

const oracledb = require('oracledb');
const oracleClientInstallPath = 'C:\\Project\\instantclient_21_9';
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
       [],
       {fetchInfo: {"CONTENT": {type: oracledb.STRING}}}
    );

    console.log(result1.rows);
    if(result1.rows && result1.rows.length) {
      for(let rowIndex=0; rowIndex<result1.rows.length; rowIndex++) {
        const rowInfo = result1.rows[rowIndex]
        await connection2.execute(
          `INSERT INTO OFFICE5_MIG_TEST (DOCUNO, REGDATE, TITLE, CONTENT, ATTFILENUM, STATUS)
           VALUES (:docuno, :regdate, :title, :content, :attfilenum, :status)`,
           rowInfo,
           { autoCommit: true }
        );
      }
    }

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