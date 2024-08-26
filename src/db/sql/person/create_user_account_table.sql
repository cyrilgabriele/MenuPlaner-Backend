CREATE TABLE user_account (
    person_id INT PRIMARY KEY REFERENCES person(person_id) ON DELETE CASCADE,
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) NOT NULL UNIQUE
);