
CREATE TABLE BOOKS (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    author VARCHAR(255),
    subject VARCHAR(255),
    price DECIMAL(10, 2),
    isbn VARCHAR(255)
);


CREATE TABLE MEMBERS (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    passwd VARCHAR(255),
    role VARCHAR(255)
);


CREATE TABLE COPIES (
    id INT PRIMARY KEY,
    bookid INT,
    rack INT,
    status VARCHAR(255),
    FOREIGN KEY (bookid) REFERENCES BOOKS(id)
);


CREATE TABLE ISSUERECORD (
    id INT PRIMARY KEY,
    copyid INT,
    memberid INT,
    issued DATETIME,
    returndue DATETIME,
    returned DATETIME,
    fine DECIMAL(10, 2),
    FOREIGN KEY (copyid) REFERENCES COPIES(id),
    FOREIGN KEY (memberid) REFERENCES MEMBERS(id)
);


CREATE TABLE PAYMENTS (
    id INT PRIMARY KEY,
    memberid INT,
    amount DECIMAL(10, 2),
    txtime DATETIME,
    duedate DATETIME,
    FOREIGN KEY (memberid) REFERENCES MEMBERS(id)
);