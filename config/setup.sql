CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY ,
    first_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    phone VARCHAR UNIQUE
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

CREATE TABLE favorites (
    card_id uuid NOT NULL REFERENCES cards(card_id) ON DELETE CASCADE,
    user_id uuid  NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- INSERT INTO favorites (user_id, card_id) 
-- VALUES ('fa262752-6bcd-4621-b42e-02ca8399d6e4', '82f2ac4d-2645-4df6-b509-dd227504e5f3')
-- WHERE
-- (SELECT COUNT(1) from favorites WHERE user_id = 'fa262752-6bcd-4621-b42e-02ca8399d6e4') < 13

-- doesn't work