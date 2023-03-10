-- (office5) 0.OFFICE5_MIG_TEST : temp table 
CREATE TABLE OFFICE5_MIG_TEST (
    DOCUNO VARCHAR2(20) NOT NULL,
    REGDATE DATE DEFAULT SYSDATE NULL,
    TITLE VARCHAR2(200) NULL,
    CONTENT CLOB NULL,
    ATTFILENUM NUMBER(4, 0) DEFAULT 0 NULL,
    STATUS CHAR(1) NULL
);

CREATE UNIQUE INDEX OFFICE5_MIG_TEST_PK ON OFFICE5_MIG_TEST (DOCUNO, TITLE);

-- (office5) 1.OFFICE5_MIG_NUMBER : 이관 완료 문서 정보(번호만) : SAVE_TYPE : M, P, D
CREATE TABLE OFFICE5_MIG_NUMBER (
    LAST_DOCUNO VARCHAR2(20) NOT NULL,
    YEAR VARCHAR2(4) NULL,
    SAVE_TYPE CHAR(1) NOT NULL
);

-- (office6) 2.OFFICE5_MIG_APP : 이관 완료 문서 정보
CREATE TABLE OFFICE5_MIG_APP (
    DOCUNO VARCHAR2(20) NOT NULL,
    USERID VARCHAR2(255) NULL,
    USERNAME VARCHAR2(255) NULL,
    DEPTCODE VARCHAR2(255) NULL,
    DEPTNAME VARCHAR2(255) NULL,
    FORMCODE VARCHAR2(255) NULL,
    FORMNAME VARCHAR2(500) NULL,
    REGDATE DATE NULL,
    TITLE VARCHAR2(200) NULL,
    CONTENT CLOB NULL,
    ATTFILENUM NUMBER(4, 0) DEFAULT 0 NULL,
    STATUS CHAR(1) NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

CREATE UNIQUE INDEX OFFICE5_MIG_APP_PK ON OFFICE5_MIG_APP (DOCUNO);

-- (office6) 4.OFFICE5_MIG_ATTACH : 이관 완료 첨부파일 정보
CREATE TABLE OFFICE5_MIG_ATTACH (
    DOCUNO VARCHAR2(20) NOT NULL,
    FILECODE VARCHAR2(40) NULL,
    FILESIZE NUMBER NOT NULL ENABLE,
    ORIFILENAME VARCHAR2(255) NULL,
    NEWFILENAME VARCHAR2(255) NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

CREATE UNIQUE INDEX OFFICE5_MIG_ATTACH_PK ON OFFICE5_MIG_ATTACH (DOCUNO, FILECODE);

-- (office5) 5.OFFICE5_MIG_JOB_FAIL : 실패한 문서 정보
CREATE TABLE OFFICE5_MIG_JOB_FAIL (
    DOCUNO VARCHAR2(20) NOT NULL,
    JOBSTEP NUMBER(4, 0) DEFAULT 0 NULL,
    ERRORMESSAGE CLOB NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

-- (office5) 6.OFFICE5_MIG_JOB_SUCCESS : 성공한 문서 정보
CREATE TABLE OFFICE5_MIG_JOB_SUCCESS (
    DOCUNO VARCHAR2(20) NOT NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

-- (office6) 7.OFFICE5_BOX_PRIVATE : 개인함 매핑 정보
CREATE TABLE OFFICE5_BOX_PRIVATE (
    DOCUNO VARCHAR2(20) NOT NULL,
    USERID VARCHAR2(255) NOT NULL,
    USERNAME VARCHAR2(255) NULL,
    BOXCODE VARCHAR2(20) NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

CREATE UNIQUE INDEX OFFICE5_BOX_PRIVATE_PK ON OFFICE5_BOX_PRIVATE (DOCUNO, USERID);

-- (office6) 8.OFFICE5_BOX_DEPT : 부서함 매핑 정보
CREATE TABLE OFFICE5_BOX_DEPT (
    DOCUNO VARCHAR2(20) NOT NULL,
    BOXCODE VARCHAR2(10) NULL,
    DEPTCODE VARCHAR2(255) NULL,
    DEPTNAME VARCHAR2(255) NULL,
    SDEPTCODE VARCHAR2(255) NULL,
    SDEPTNAME VARCHAR2(255) NULL,
    SUSERID VARCHAR2(255) NULL,
    SUSERNAME VARCHAR2(255) NULL,
    STATUS VARCHAR2(10) NULL,
    DRAFTNO VARCHAR2(20) NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

CREATE UNIQUE INDEX OFFICE5_BOX_DEPT_PK ON OFFICE5_BOX_DEPT (DOCUNO, DEPTCODE);

-- (office6) 9.OFFICE5_MIG_JOB_FAIL : 실패한 문서 정보(office5에서 office6로 이관하기 위한 테이블)
CREATE TABLE OFFICE5_MIG_JOB_FAIL (
    DOCUNO VARCHAR2(20) NOT NULL,
    JOBSTEP NUMBER(4, 0) DEFAULT 0 NULL,
    ERRORMESSAGE CLOB NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);

-- (office5) 10.OFFICE5_PDF_ERROR : pdf error docuno number 목록
CREATE TABLE OFFICE5_PDF_ERROR (
    DOCUNO VARCHAR2(20) NOT NULL,
    ACTIONDATE DATE DEFAULT SYSDATE NULL
);