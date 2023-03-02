-- office5 all
UPDATE OFFICE5_MIG_NUMBER
set LAST_DOCUNO = '201308141601440068';
delete from OFFICE5_MIG_JOB_SUCCESS;
delete from OFFICE5_MIG_JOB_FAIL;

-- office5 single rollback
delete
from OFFICE5_MIG_JOB_SUCCESS
WHERE DOCUNO = 'aaa';
delete
from OFFICE5_MIG_JOB_FAIL
WHERE DOCUNO = 'aaa';


-- office6 all rollback
delete from OFFICE5_MIG_APP;
delete from OFFICE5_MIG_ATTACH;
delete from OFFICE5_BOX_PRIVATE;
delete from OFFICE5_BOX_DEPT;

-- office6 single rollback
delete from OFFICE5_MIG_APP WHERE docuno = 'aaa';
delete from OFFICE5_MIG_ATTACH WHERE docuno = 'aaa';
delete from OFFICE5_BOX_PRIVATE WHERE docuno = 'aaa';
delete from OFFICE5_BOX_DEPT WHERE docuno = 'aaa';