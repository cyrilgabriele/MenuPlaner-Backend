CREATE TABLE meal (
    meal_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    meal_name VARCHAR(255) NOT NULL, 
    meal_title TEXT NOT NULL,
    meal_description TEXT NOT NULL,
    menuplan_id INT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (menuplan_id) REFERENCES menuplan(menuplan_id) ON DELETE SET NULL
)