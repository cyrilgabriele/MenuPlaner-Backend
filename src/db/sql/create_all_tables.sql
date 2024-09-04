CREATE TABLE person (
    person_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_account (
    person_id INT PRIMARY KEY, 
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
);


CREATE TABLE menuplan (
    menuplan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL, 
    custom_prompt TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (auth0_user_id) REFERENCES user_account(auth0_user_id) ON DELETE CASCADE
);

CREATE TABLE meal (
    meal_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    meal_name VARCHAR(255) NOT NULL, 
    meal_title TEXT NOT NULL,
    meal_description TEXT NOT NULL,
    menuplan_id INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (menuplan_id) REFERENCES menuplan(menuplan_id) ON DELETE SET NULL
);