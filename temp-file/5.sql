-- select column 대문자 추출 : ,BASE_DATE_STR AS BASE_DATE_STR
select concat(',', upper(column_name), ' AS ', upper(column_name))
from information_schema.columns
where table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position;

-- select column 소문자 추출 : ,base_date_str AS base_date_str
select concat(',', lower(column_name), ' AS ', lower(column_name))
from information_schema.columns
where table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position;

-- select column 낙타표기법 추출 : ,base_date_str AS baseDateStr
SELECT concat(',', column_name, ' AS ', (lower(substring(pascal_case,1,1)) || substring(pascal_case,2))) AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo;

-- mybatis select 절 추출 : 대문자에서 소문자 변경시 : upper ---> lower : ,base_date_str AS base_date_str /* 근태기준일 */
select concat(',', lower(a.column_name), ' AS ', lower(a.column_name), ' /* ', b.COLUMN_COMMENT, ' */')
from information_schema.columns a
	inner join (
		SELECT
			PS.RELNAME AS TABLE_NAME,
			PA.ATTNAME AS COLUMN_NAME,
			PD.DESCRIPTION AS COLUMN_COMMENT
		FROM PG_STAT_ALL_TABLES PS, PG_DESCRIPTION PD, PG_ATTRIBUTE PA
		WHERE PD.OBJSUBID<>0
			AND PS.RELID=PD.OBJOID
			AND PD.OBJOID=PA.ATTRELID
			AND PD.OBJSUBID=PA.ATTNUM
			AND PS.RELNAME= lower('OFFICE_COMMUTE_DAY') ) b
			on a.column_name = b.column_name
where a.table_name = lower('OFFICE_COMMUTE_DAY')
order by a.ordinal_position;

-- java vo 멤버변수 추출 : private String baseDateStr; /* 근태기준일 */
SELECT concat(
	'private ', java_type, ' ', (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)), ';',
	' /* ', COLUMN_COMMENT, ' */'
	) as java_vo_string
FROM (
SELECT a.column_name
	,replace(initcap(replace(a.column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN a.data_type in('character', 'character varying') THEN 'String'
			WHEN a.data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN a.data_type in('numeric') THEN 'Double'
			WHEN a.data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
	,b.COLUMN_COMMENT
FROM information_schema.columns a
	inner join (
		SELECT
			PS.RELNAME AS TABLE_NAME,
			PA.ATTNAME AS COLUMN_NAME,
			PD.DESCRIPTION AS COLUMN_COMMENT
		FROM PG_STAT_ALL_TABLES PS, PG_DESCRIPTION PD, PG_ATTRIBUTE PA
		WHERE PD.OBJSUBID<>0
			AND PS.RELID=PD.OBJOID
			AND PD.OBJOID=PA.ATTRELID
			AND PD.OBJSUBID=PA.ATTNUM
			AND PS.RELNAME= lower('OFFICE_COMMUTE_DAY') ) b
			on a.column_name = b.column_name
WHERE a.table_name = lower('OFFICE_COMMUTE_DAY')
order by a.ordinal_position) As data_type_comment;

-- java_type, column_name, camel_case 별도 추출 : String | base_date_str | baseDateStr
SELECT java_type, column_name, lower(substring(pascal_case,1,1)) || substring(pascal_case,2) As camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo;

-- java type 별도 추출 : LocalDateTime
select CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS worker_name
FROM information_schema.columns
WHERE table_name = lower('OFFICE_CODE_MASTER');

-- java 멤버 변수 추출(커멘트 제거) : private String baseDateStr;
SELECT concat('private ', java_type, ' ', (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)), ';') as java_vo_string
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo;

-- insert / update column 추출 : ,BASE_DATE_STR
select concat(',', upper(column_name))
from information_schema.columns
where table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position;

-- insert 파라미터 매핑 : ,#{baseDateStr}
SELECT concat(',', '#{', (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)), '}') AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo;

-- update 파라미터 매핑 : ,#{baseDateStr}
SELECT concat(',', column_name, ' = ${', (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)), '}') AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo;

-- insert if null check : 하단 부분 : "를 치환 후에 다시 .equals()를 .equals("")로 치환
select concat('<if test=', '''', camel_case, ' != null and !', camel_case, '.equals("")', '''', '>',
			  chr(10),
			  ',', '#{', camel_case, '}',
			  chr(10),
			 '</if>') as mybatis_text
from (
SELECT (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)) AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo ) as camel_foo;

-- insert if null check : 상단 부분 : "를 치환 후에 다시 .equals()를 .equals("")로 치환
select concat('<if test=', '''', camel_case, ' != null and !', camel_case, '.equals("")', '''', '>',
			  chr(10),
			  ',', column_name,
			  chr(10),
			 '</if>') as mybatis_text
from (
SELECT column_name, (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)) AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo ) as camel_foo;

-- update if null check : 상단 부분 : "를 치환 후에 다시 .equals()를 .equals("")로 치환
select concat('<if test=', '''', camel_case, ' != null and !', camel_case, '.equals("")', '''', '>',
			  chr(10),
			  ',', column_name, ' = ', '#{', camel_case, '}',
			  chr(10),
			 '</if>') as mybatis_text
from (
SELECT column_name, (lower(substring(pascal_case,1,1)) || substring(pascal_case,2)) AS camel_case
FROM (
SELECT column_name
	,replace(initcap(replace(column_name, '_', ' ')), ' ', '') As pascal_case
	,CASE WHEN data_type in('character', 'character varying') THEN 'String'
			WHEN data_type in('timestamp without time zone', 'timestamp') THEN 'LocalDateTime'
			WHEN data_type in('numeric') THEN 'Double'
			WHEN data_type in('integer') THEN 'Integer'
            ELSE
             	''
            END AS java_type
FROM information_schema.columns
WHERE table_name = lower('OFFICE_COMMUTE_DAY')
order by ordinal_position) As foo ) as camel_foo;
