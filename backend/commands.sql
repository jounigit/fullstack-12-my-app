CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Jukka A', 'http://example.com/blog1', 'Eka blogi', 10);
insert into blogs (author, url, title, likes) values ('Jaana M', 'http://example.com/blog2', 'Toka blogi', 20);
insert into blogs (author, url, title, likes) values ('Liisa J', 'http://example.com/blog3', 'Kolmas blogi', 15);

