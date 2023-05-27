CREATE TABLE IF NOT EXISTS "produtos" (
	"id"	INTEGER,
	"produto"	TEXT,
	"quantidade"	INTEGER,
	"quantidade_minima"	INTEGER,
	"quantidade_maxima"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);