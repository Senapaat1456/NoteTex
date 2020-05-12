DROP DATABASE IF EXISTS noteTexDatabase;
DROP USER IF EXISTS noteTexDatabaseUser@localhost;
CREATE DATABASE noteTexDatabase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER noteTexDatabaseUser@localhost IDENTIFIED BY 'BE2vkvk#e?T?w';
GRANT ALL PRIVILEGES ON noteTexDatabase.* TO noteTexDatabaseUser@localhost;
