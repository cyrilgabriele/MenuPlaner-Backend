CREATE TABLE menuplan (
    menuplan_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    auth0_user_id VARCHAR(255) UNIQUE NOT NULL, 
    custom_prompt TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (auth0_user_id) REFERENCES user_account(auth0_user_id) ON DELETE CASCADE
)