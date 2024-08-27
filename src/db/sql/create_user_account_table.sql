CREATE TABLE user_account (
    person_id INT PRIMARY KEY, 
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) NOT NULL UNIQUE,
    menuplan_id INT UNIQUE NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE,
    FOREIGN KEY (menuplan_id) REFERENCES menuplan(menuplan_id) ON DELETE CASCADE
)