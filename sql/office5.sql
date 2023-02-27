-- 연관 테이블
-- OA_EAPP_DEPTDOCU : 부서벼별 매핑 정보
-- O0_USER_MAST : 사용자 테이블
-- O0_USER_DEPT : 부서 테이블
-- OA_EAPP_DOCUMAS : 결재문서 마스터
-- userid, docuno, deptcode, formcode, regdate, title, status
-- status : P(progress), C(complete), A(cancel), B(banryeo), T(temp)
-- OA_EAPP_FORM : 기안템플릿 정보
-- formcode, formname
-- OA_EAPP_APP : 결재정보
-- docuno, userid, APPSPEC, APPSTATUS
SELECT
    docuno,
    userid,
    APPSPEC,
    APPSTATUS
FROM
    OA_EAPP_APP
WHERE
    DOCUNO = '202302241454380957';

SELECT
    formcode,
    formname
FROM
    OA_EAPP_FORM;