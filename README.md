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

0.특정 테이블에서 DOCUNO 목록을 가져옴
1.file 경로에 파일이 존재하는지 확인 -존재하지 않으면 로그 기록하고 다음으로 넘어감 : DOCUNO
2.file을 오픈해서 특정 SDOCUF 문자가 존재하는지 확인해서 존재할 경우 로그 기록하고 다음으로 넘어감 : DOCUNO
3.file이 존재하고 SDOCUF 문자가 존재하지 않는 경우만 특정 폴더로 백업함
4..백업한 이후에 SDOCUF=C라고 마지막에 write 함
