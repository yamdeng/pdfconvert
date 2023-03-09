office5 운영서버 61.40.65.3 : administrator / tkddn2363#
office5 oracle db 61.40.65.3 : GW5_OFFICE / tkfkarhk8 : orcl
office5 web http://gw.drcc.co.kr/ : drpcs / tkddn2363#
office6 운영서버 61.40.65.14 : administrator / Tkddn2363
office6 oracle 설치 서버 61.40.65.15 : administrator / Tkddn2363
office6 oracle db 61.40.65.15:1521:orcl : gwdb / tkddn2363
office6 web http://61.40.65.14/office6 admingw / Speed66^^

// var firstConvertDeptName = deptname.replace('dept.', '');
// var finalDeptName = firstConvertDeptName.replace('/C_DAERYUK', '');

// dept.관리팀/C_DAERYUK
// dept.영업1팀/C_DAERYUK
// dept.영업3팀/C_DAERYUK

http://61.40.65.14/office6/mig/doc-list.do?start=0&limit=10&deptAllSearchYn=Y
http://61.40.65.14/office6/mig/doc-detail.do?DOCUNO=201711241557330082
http://61.40.65.14/office6/mig/file-list.do?DOCUNO=201711241557330082
http://61.40.65.14/office6/mig/pdf-download.do?DOCUNO=201711241557330082
http://61.40.65.14/office6/mig/attach-download.do?DOCUNO=201711241557330082&NEWFILENAME=F1511506796444.xlsx

http://61.40.65.14/office6/mig/doc-list.do?start=0&limit=10&deptAllSearchYn=Y

==========

SELECT \*
FROM OA_EAPP_DOCUMAS oed
WHERE docuno in(
'201411211410420843',
'201408251728170509'
);

-- 201411211410420843
-- 201408251728170509

http://gw.drcc.co.kr/office/app/appPreview.do?docuno=201411191431150996
