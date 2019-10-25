CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name TEXT,
password TEXT
);

CREATE TABLE IF NOT EXISTS exercises (
id SERIAL PRIMARY KEY,
name TEXT,
workout_types_id INTEGER,
user_id INTEGER,
url  TEXT,
reps INTEGER,
sets INTEGER
);

CREATE TABLE IF NOT EXISTS standard (
id SERIAL PRIMARY KEY,
name TEXT,
workout_types_id INTEGER,
url  TEXT,
reps INTEGER,
sets INTEGER
);

CREATE TABLE IF NOT EXISTS workout_types (
id SERIAL PRIMARY KEY,
bodypart TEXT
);
