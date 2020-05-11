DROP TABLE IF EXISTS noteSheets;
DROP TABLE IF EXISTS users;

CREATE TABLE noteSheets(
    noteSheet_id SERIAL PRIMARY KEY,
    lineCount INT,
    contents TEXT,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name TEXTS
);
