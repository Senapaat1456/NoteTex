DROP TABLE IF EXISTS noteSheets;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    userId SERIAL PRIMARY KEY,
    userName VARCHAR(30)
);

CREATE TABLE noteSheets(
    noteSheet_id SERIAL PRIMARY KEY,
    noteSheetName TEXT,
    userCreator BIGINT UNSIGNED,
    lineCount INT,
    contents TEXT,
    isDeleted INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userCreator) REFERENCES users(userId)
);
