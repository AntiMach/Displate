CREATE DATABASE db_name;
--USE database_name;

CREATE TABLE guilds (
    ID CHAR(18) NOT NULL PRIMARY KEY,
    prefix VARCHAR(100) DEFAULT '!'
);

CREATE TABLE table_name (
    ID CHAR(18) NOT NULL PRIMARY KEY,
    ...
);


----Cheat sheet

----Column definition
--data_type [NOT NULL] [DEFAULT value] [UNIQUE [KEY]] [[PRIMARY] KEY]

----Data types
--INT, SMALLINT, BIGINT   --Integers
--FLOAT, DOUBLE           --Floating point numbers
--CHAR(), VARCHAR()       --Strings of fixed or variable length
--JSON                    --For arrays, objects or some combinations with strings, numbers and others
--TIMESTAMP               --For keeping track of time, use NOW as DEFAULT and ON UPDATE

----Miscellaneous database editing
--Add a column to a table
ALTER TABLE table_name ADD COLUMN column_name column_definition;

--Remove a column from a table
ALTER TABLE table_name DROP COLUMN column_name;

--Rename a column from a table
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;

--Completely change a column from a table
ALTER TABLE table_name CHANGE COLUMN old_name new_name column_definition;

--Delete a table
DROP TABLE table_name;

--Add element to table
INSERT INTO table_name (column_name, ...) VALUES (value, ...);

--Remove element from table
DELETE FROM table_name WHERE column_name=value;

--Update element(s) of a table given a certain condition
UPDATE table_name SET column_name=value WHERE column_name=value;