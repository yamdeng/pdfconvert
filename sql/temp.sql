SELECT deptcode, docuno, boxcode, sdeptcode, RECDOCUNO, SUSERID, recdate, status, draftno
FROM OA_EAPP_DEPTDOCU;


SELECT deptcode, docuno, boxcode, sdeptcode, SUSERID, status, draftno
FROM OA_EAPP_DEPTDOCU
WHERE docuno LIKE '2022%' AND sdeptcode IS NOT NULL;

SELECT *
FROM OA_EAPP_DEPTDOCU
WHERE docuno = '202205201533370949' OR DRAFTNO  = '202205201533370949';
-- 202201041359270013, 202201171155200978

-- 202201041359270013, casj530, 202201171155200978

-- 202202101020590414, 202203070836120049, 0220


-- 201409011613320380, 201409020942100453



SELECT formcode, formname
FROM OA_EAPP_FORM;

SELECT docuno, userid, APPSPEC, APPSTATUS 
FROM OA_EAPP_APP
WHERE DOCUNO = '202302241454380957';

select *
from OA_EAPP_DOCUMAS
WHERE DOCUNO LIKE '2022%' AND docuno < '202201211448410067'
ORDER BY REGDATE DESC;

select *
from OA_EAPP_DOCUMAS
WHERE DOCUNO LIKE '2023%'
ORDER BY REGDATE ASC;


SELECT *
FROM (
	SELECT *
	FROM OA_EAPP_DOCUMAS
	ORDER BY docuno ASC
) A
WHERE ROWNUM <= 100;

SELECT *
FROM OA_EAPP_ABSENCE
WHERE rownum< 10;


201408241555560861	null-00023
201408241555560861	null-00012
201408241555560861	null-00009;

-- orisedocuno, seqdocuno

SELECT docuno, orisedocuno, seqdocuno
FROM OA_EAPP_DOCUMAS
WHERE orisedocuno in(
'202302211118320730',
'202302211126060509',
'202302200933550427',
'202302171108050339',
'202302171540370950',
'202302170932130390',
'202302231246590358'
);


-- 202302241125360292, 202302251608570133


202302241702330147	202302211118320730
202302241045010970	202302211126060509
202302241812550522	202302231246590358;

SELECT *
FROM OA_EAPP_DOCUMAS
WHERE docuno in(
'202302241702330147', '202302211118320730','202302241045010970','202302211126060509','202302241812550522','202302231246590358'
);


--------------

-- AC, AD

-- status : P(progress), C(complete), A(cancel), B(banryeo), T(temp)
SELECT count(*)
FROM OA_EAPP_PRIDOCU p, OA_EAPP_DOCUMAS m
WHERE 1=1 AND 	(m.docuno = p.docuno) AND p.boxcode in('BA', 'BB', 'BC', 'BD', 'BE');
AND m.STATUS = 'C';


SELECT count(*)
FROM OA_EAPP_DEPTDOCU d, OA_EAPP_DOCUMAS m
WHERE 1=1 AND 	(m.docuno = d.docuno) AND d.boxcode in('BA', 'BB', 'BC', 'BD', 'BE')
AND m.STATUS = 'B';

SELECT DISTINCT status
FROM OA_EAPP_DEPTDOCU;
-- P, I, C, B

SELECT p.docuno docuno,
														m.title title,
														m.attfilenum attfilenum,
														m.regdate regdate,
														m.status status,
														u.name username,
														m.nextapp nextapp,
														m.seqdocuno seqdocuno,
														f.formname formname,
														important important,
														term term,
														secret secret
												FROM 	OA_EAPP_PRIDOCU p,
														OA_EAPP_DOCUMAS m,
														O0_USER_MAST u,
														OA_EAPP_FORM f
												WHERE   p.boxcode = 'AC'
												AND 	(m.docuno = p.docuno)
												AND 	m.userid = u.userid
												AND 	(f.corcode = m.formcorcode AND f.formcode = m.formcode);
												
											
SELECT *
FROM OA_EAPP_DEPTDOCU
WHERE DEPTCODE  != SDEPTCODE;

SELECT *
FROM OA_EAPP_DEPTDOCU oed 
WHERE docuno = '202301301359430037';

SELECT *
FROM OA_EAPP_DOCUMAS oed 
WHERE docuno = '202301160928580744';

SELECT *
FROM OA_EAPP_DOCUMAS oed 
WHERE docuno in ('202301160928580744', '202301161427470074');

SELECT *
FROM OA_EAPP_DEPTDOCU oed
WHERE DRAFTNO  = '202301161427470074';

SELECT *
FROM OA_EAPP_DEPTDOCU oed
WHERE docuno  = '202301160928580744';

SELECT *
FROM O0_USER_DEPT
WHERE DEPTCODE =  '37';

SELECT *
FROM O0_USER_MAST
WHERE userid = 'ijeong22';
-- itAssMger : 
-- 


-- 202301160928580744, 202301161427470074
					 