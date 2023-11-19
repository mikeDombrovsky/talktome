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
