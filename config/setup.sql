CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY ,
    role VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    phone VARCHAR UNIQUE
);

INSERT INTO users (
    role,
    first_name,
    email,
    password,
    phone
)
VALUES
    (
        'talktome',
        'John',
        'john.smith@example.com',
        '12345',
        '408-237-2345'
    ),
    (
        'ihearyou',
        'Jane',
        'jane.smith@example.com',
        '12345',
        '408-237-2344'
    ),
    (
        'talktome',
        'Alex',
        'alex.smith@example.com',
        '12345',
        '408-237-2343'
    );

CREATE TABLE cards (
    card_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(user_id),
    message VARCHAR NOT NULL
);