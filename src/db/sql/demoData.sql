INSERT INTO person (person_name) VALUES ('John Doe');

INSERT INTO user_account (person_id, auth0_user_id, nickname) 
VALUES ((SELECT person_id FROM person WHERE person_name = 'John Doe'), 
        'auth0|66bb067bf2840a161c19acb5', 
        'johndoe123');
