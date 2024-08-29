-- Insert demo data into the person table
INSERT INTO person (person_name) 
VALUES ('John Doe'), 
       ('Jane Smith'), 
       ('Alice Johnson');

-- Insert demo data into the menuplan table
INSERT INTO menuplan (person_id, custom_prompt) 
VALUES (1, 'Weekly healthy meals'), 
       (2, 'Vegetarian meal plan'), 
       (3, 'High-protein diet plan');

-- Insert demo data into the meal table
INSERT INTO meal (meal_name, meal_description, person_id, menuplan_id)
VALUES ('Grilled Chicken Salad', 'A healthy salad with grilled chicken, lettuce, and vinaigrette.', 1, 1), 
       ('Vegetarian Lasagna', 'Lasagna with layers of vegetables and cheese.', 2, 2), 
       ('Protein Smoothie', 'A smoothie with whey protein, banana, and almond milk.', 3, 3),
       ('Quinoa Salad', 'A salad with quinoa, mixed vegetables, and lemon dressing.', 1, 1),
       ('Tofu Stir Fry', 'Stir-fried tofu with broccoli and bell peppers.', 2, 2),
       ('Chicken Breast', 'Grilled chicken breast with steamed vegetables.', 3, 3);

-- Insert demo data into the user_account table
INSERT INTO user_account (person_id, auth0_user_id, nickname, menuplan_id)
VALUES (1, 'auth0|12345', 'johndoe', 1), 
       (2, 'auth0|67890', 'janesmith', 2), 
       (3, 'auth0|abcde', 'alicej', 3);
