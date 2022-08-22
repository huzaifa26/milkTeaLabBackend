create table user(
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userName varchar(100) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    pass varchar(255) NOT NULL,
    phone varchar(255) NOT NULL,
    mailingAddress varchar(255) NOT NULL,
    desiredLocation varchar(255) NOT NULL,
    budget int(11),
    question TEXT
)