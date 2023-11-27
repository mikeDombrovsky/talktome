CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY ,
    first_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    phone VARCHAR UNIQUE
);

INSERT INTO users (
    first_name,
    email,
    password,
    phone
)
VALUES
    (
        'John',
        'john.smith@example.com',
        '12345',
        '408-237-2345'
    ),
    (
        'Jane',
        'jane.smith@example.com',
        '12345',
        '408-237-2344'
    ),
    (
        'Alex',
        'alex.smith@example.com',
        '12345',
        '408-237-2343'
    );

CREATE TABLE cards (
    card_id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    message VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL REFERENCES users(phone) ON DELETE CASCADE,
    is_public BOOLEAN NOT NULL,
    role VARCHAR NOT NULL
);

