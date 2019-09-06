CREATE TABLE ${schema~}.transfer (
     id serial PRIMARY KEY,
     txid text,
     act smallint,
     "from" text,
     "to" text,
     amount double precision,
     symbol text,
     memo text
);
