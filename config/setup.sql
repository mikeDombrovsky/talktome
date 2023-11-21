CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4 (),
    role VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    phone VARCHAR UNIQUE,
    PRIMARY KEY (user_id)
);

INSERT INTO users (
    role,
    first_name,
    last_name,
    email,
    password,
    phone
)
VALUES
    (
        'talktome',
        'John',
        'Smith',
        'john.smith@example.com',
        '12345',
        '408-237-2345'
    ),
    (
        'ihearyou',
        'Jane',
        'Smith',
        'jane.smith@example.com',
        '12345',
        '408-237-2344'
    ),
    (
        'talktome',
        'Alex',
        'Smith',
        'alex.smith@example.com',
        '12345',
        '408-237-2343'
    );

CREATE TABLE profiles (
    user_id uuid NOT NULL PRIMARY KEY,
    cards VARCHAR [] NOT NULL,
    favorites VARCHAR [] NOT NULL,
    FOREIGN KEY (user_id)
    REFERENCES users (user_id)
);

INSERT INTO profiles (
  user_id, 
  cards, 
  favorites
)
VALUES
(
  'd6a62fd7-95cb-4df2-929d-2f86ee31c0ba', ARRAY ['card1','card2'], ARRAY ['card1','card2']
)

INSERT INTO profiles (
  user_id, 
  cards, 
  favorites
)
VALUES
(
  '30244416-d954-4f6a-9ecb-0d79b5d5d44d',
  '{"card1","card2"}',
  '{"card1","card2"}'
);