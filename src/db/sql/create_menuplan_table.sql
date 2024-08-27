CREATE TABLE menuplan (
    menuplan_id GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    person_id INT NOT NULL, 
    custom_prompt TEXT, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (person_id) REFERENCES person(person_id) ON DELETE CASCADE
)