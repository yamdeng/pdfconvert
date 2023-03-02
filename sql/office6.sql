문서 목록 조회 : api/mig/docs : 문서명, 부서명, 기안자명, 승인자명

문서상세 조회 : api/mig/docs/{문서번호}

첨부파일 조회 : api/mig/docs/{문서번호}/attach

PDF 다운로드 : api/mig/download/pdf/{문서번호}

첨부파일 다운로드 : api/mig/download/attach/{첨부파일번호}


-- 1.문서 목록 조회
SELECT *
FROM (
	SELECT m.*
	FROM OFFICE5_MIG_APP M
		INNER JOIN OFFICE5_BOX_DEPT BD
			ON M.docuno = BD.docuno
	WHERE bd.deptname = '부서명'
	ORDER BY M.DOCUNO ASC
) OUTER_TABLE
WHERE ROWNUM <= 1000;

-- 2.문서 상세 조회
SELECT m.*
FROM OFFICE5_MIG_APP M
WHERE m.docuno = '';

-- 3.첨부파일 상세 조회
select *
from OFFICE5_MIG_ATTACH
where docuno = ''

-- 4.첨부파일 상세 조회
select *
from OFFICE5_MIG_ATTACH
where NEWFILENAME = 'aa.pdf'