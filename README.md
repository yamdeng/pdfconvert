### PDF convert 실행 시나리오

0.office6에 db 설계
-office5_mig_work : 성공여부, 파일첨부 갯수, 에러메시지, 실제 존재하는 파일첨부 갯수
-office5_mig_app
-office5_mig_app_file

1.docuno 기준으로 2014 ~ 2022까지 차례대로 조회한다. -년도 단위로 db 조회 : 약 4만건씩 조회됨 -조회기준을 나눌수 있음 나눈다
ㄱ.페이징쿼리로 실행
ㄴ.docuno 자체가 비교대상이 가능한 값인지 체크해서 마지막 값을 반영

2.docuno
