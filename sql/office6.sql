문서 목록 조회: api / mig / docs: 문서명,
부서명,
기안자명,
승인자명 문서상세 조회: api / mig / docs / { 문서번호 } 첨부파일 조회: api / mig / docs / { 문서번호 } / attach PDF 다운로드: api / mig / download / pdf / { 문서번호 } 첨부파일 다운로드: api / mig / download / attach / { 첨부파일번호 } -- 1.문서 목록 조회
SELECT
	*
FROM
	(
		SELECT
			m.*
		FROM
			OFFICE5_MIG_APP M
			INNER JOIN OFFICE5_BOX_DEPT BD ON M.docuno = BD.docuno
		WHERE
			bd.deptname = '부서명'
		ORDER BY
			M.DOCUNO ASC
	) OUTER_TABLE
WHERE
	ROWNUM <= 1000;

-- 2.문서 상세 조회
SELECT
	m.*
FROM
	OFFICE5_MIG_APP M
WHERE
	m.docuno = '';

-- 3.첨부파일 상세 조회
select
	*
from
	OFFICE5_MIG_ATTACH
where
	docuno = '' -- 4.첨부파일 상세 조회
select
	*
from
	OFFICE5_MIG_ATTACH
where
	NEWFILENAME = 'aa.pdf' ----- final query
	-- 1.list query
SELECT
	*
FROM
	(
		SELECT
			row_number() over (
				ORDER BY
					m.regdate DESC
			) docorder_number,
			M.DOCUNO,
			M.USERID,
			M.USERNAME,
			M.FORMNAME,
			M.REGDATE,
			M.TITLE,
			M.STATUS,
			DEPT_BOX.BOXCODE,
			DEPT_BOX.DEPTNAME,
			(
				SELECT
					COUNT(*)
				FROM
					OFFICE5_MIG_ATTACH ATTACH
				WHERE
					DOCUNO = M.DOCUNO
			) AS ATTACHNUM
		FROM
			OFFICE5_MIG_APP M
			INNER JOIN (
				SELECT
					docuno,
					BOXCODE,
					DEPTNAME
				FROM
					OFFICE5_BOX_DEPT
				UNION
				SELECT
					draftno,
					BOXCODE,
					DEPTNAME
				FROM
					OFFICE5_BOX_DEPT
			) DEPT_BOX ON M.docuno = DEPT_BOX.docuno
		WHERE
			1 = 1
			AND DEPT_BOX.deptname = '부서명'
			AND DEPT_BOX.deptname LIKE '%경영%'
			AND M.username LIKE '%윤종찬%'
			AND M.title LIKE '%휴가%'
	)
WHERE
	docorder_number BETWEEN 0
	AND 5
ORDER BY
	docorder_number;

-- 1-2.count query
SELECT
	count(*)
FROM
	OFFICE5_MIG_APP M
	INNER JOIN (
		SELECT
			docuno,
			BOXCODE,
			DEPTNAME
		FROM
			OFFICE5_BOX_DEPT
		UNION
		SELECT
			draftno,
			BOXCODE,
			DEPTNAME
		FROM
			OFFICE5_BOX_DEPT
	) DEPT_BOX ON M.docuno = DEPT_BOX.docuno
WHERE
	1 = 1
	AND DEPT_BOX.deptname = '부서명'
	AND DEPT_BOX.deptname LIKE '%경영%'
	AND M.username LIKE '%윤종찬%'
	AND M.title LIKE '%휴가%';

-- 2.doc master single info
SELECT
	row_number() over (
		ORDER BY
			m.regdate desc
	) docorder_number,
	M.DOCUNO,
	M.USERID,
	M.USERNAME,
	M.FORMNAME,
	M.REGDATE,
	M.TITLE,
	M.STATUS,
	(
		SELECT
			COUNT(*)
		FROM
			OFFICE5_MIG_ATTACH ATTACH
		WHERE
			DOCUNO = M.DOCUNO
	) AS ATTACHNUM
FROM
	OFFICE5_MIG_APP M
WHERE
	M.DOCUNO = '';

-- 3.doc attach list
SELECT
	DOCUNO,
	FILECODE,
	FILESIZE,
	ORIFILENAME,
	NEWFILENAME
FROM
	OFFICE5_MIG_ATTACH
WHERE
	DOCUNO = '';

-- 4.file only detail info
SELECT
	DOCUNO,
	FILECODE,
	FILESIZE,
	ORIFILENAME,
	NEWFILENAME
FROM
	OFFICE5_MIG_ATTACH
WHERE
	DOCUNO = ''
	AND NEWFILENAME = 'F1641261852751.pdf';