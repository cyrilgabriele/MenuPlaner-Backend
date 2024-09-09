CREATE TABLE recipe (
    recipe_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    meal_id INT UNIQUE NOT NULL,  -- 1-to-1 relationship with meal
    title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL, -- Full recipe steps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meal_id) REFERENCES meal(meal_id) ON DELETE CASCADE
)
