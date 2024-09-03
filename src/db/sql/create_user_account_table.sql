CREATE TABLE user_account (
    person_id INT PRIMARY KEY, 
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
)