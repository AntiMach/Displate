CREATE DATABASE databaseName;

CREATE TABLE guilds (
    ID CHAR(18) NOT NULL PRIMARY KEY,
    prefix VARCHAR(100) DEFAULT '!'
);

CREATE TABLE tableName (
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
--Access database on mysql
USE databaseName;

--Add a column to a table
ALTER TABLE tableName ADD COLUMN columnName columnDefinition;

--Remove a column from a table
ALTER TABLE tableName DROP COLUMN columnName;

--Rename a column from a table
ALTER TABLE tableName RENAME COLUMN oldName TO newName_;

--Completely change a column from a table
ALTER TABLE tableName CHANGE COLUMN oldName newName_ columnDefinition;

--Delete a table
DROP TABLE tableName;

--Add element to table
INSERT INTO tableName (columnName, ...) VALUES (val, ...);

--Remove element from table
DELETE FROM tableName WHERE columnName=val;

--Update element(s) of a table given a certain condition
UPDATE tableName SET columnName=val WHERE columnName=val;