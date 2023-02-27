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
const pageSize = 1000;

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : userId,
      password      : password,
      connectString : connectString
    });

    const result = await connection.execute(
      `SELECT * 
      FROM ( SELECT * FROM OA_EAPP_DOCUMAS ORDER BY docuno ASC ) A
        WHERE ROWNUM <= ${pageSize}`,
      [],
    );
    console.log(result.rows);

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