DROP DATEBASE IF EXISTS noteTexDatabase;
DROP USER IF EXISTS noteTexDatebaseUser@localhost;
CREATE DATABASE noteTexDatabase CHARTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER noteTexDatebaseUser@localhost IDENTIFIED BY 'BE2vkv"k#e?T?w';
GRANT ALL PRIVILAGES ON noteTexDatabase.* TO noteTexDatebaseUser@localhost;
