#.init setting
 1.npm lib install
  -npm install oracledb
 2.oracle client install
  : https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
  : zip file download ===> zip file extract 


#.node test command
 1.connection
  -node test/oracle/connection.js

 2.select, page
  -node test/oracle/select-page.js

 3.insert
  -node test/oracle/insert.js

 4.update
  -node test/oracle/update.js

 5.delete
  -node test/oracle/delete.js

 6.insert many execute
  -node test/oracle/insert-many.js

 7.multie connection
  -node test/oracle/multiple/connection-m.js

 8.multie select ---> insert
  -node test/oracle/multiple/select-to-insert-single.js

 9.multie select ---> insert many
  -node test/oracle/multiple/select-to-insert-many.js