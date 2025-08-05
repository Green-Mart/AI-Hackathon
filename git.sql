
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


INSERT INTO BOOKS (id, name, author, subject, price, isbn) VALUES
(1, 'The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 25.50, '978-0618517657'),
(2, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 15.75, '978-0061120084'),
(3, '1984', 'George Orwell', 'Dystopian', 12.00, '978-0451524935'),
(4, 'The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', 'Science Fiction', 18.20, '978-0345391803'),
(5, 'Pride and Prejudice', 'Jane Austen', 'Classic', 10.99, '978-0141439518');


INSERT INTO MEMBERS (id, name, email, phone, passwd, role) VALUES
(101, 'Alice Smith', 'alice.smith@example.com', '123-456-7890', 'pass123', 'student'),
(102, 'Bob Johnson', 'bob.johnson@example.com', '987-654-3210', 'pass456', 'faculty'),
(103, 'Charlie Brown', 'charlie.brown@example.com', '555-123-4567', 'pass789', 'student'),
(104, 'Diana Prince', 'diana.prince@example.com', '555-987-6543', 'passabc', 'student'),
(105, 'Edward Cullen', 'edward.cullen@example.com', '111-222-3333', 'passdef', 'faculty');


INSERT INTO COPIES (id, bookid, rack, status) VALUES
(201, 1, 10, 'available'),
(202, 1, 10, 'borrowed'),
(203, 2, 12, 'available'),
(204, 3, 15, 'available'),
(205, 4, 20, 'available');


INSERT INTO ISSUERECORD (id, copyid, memberid, issued, returndue, returned, fine) VALUES
(301, 202, 101, '2025-07-20 10:00:00', '2025-08-20 10:00:00', NULL, 0.00),
(302, 203, 102, '2025-07-25 14:30:00', '2025-08-25 14:30:00', '2025-08-22 11:00:00', 0.00),
(303, 204, 103, '2025-08-01 09:00:00', '2025-09-01 09:00:00', NULL, 0.00),
(304, 205, 104, '2025-07-15 11:15:00', '2025-08-15 11:15:00', '2025-08-16 10:00:00', 1.50),
(305, 201, 105, '2025-08-04 16:00:00', '2025-09-04 16:00:00', NULL, 0.00);


INSERT INTO PAYMENTS (id, memberid, amount, txtime, duedate) VALUES
(401, 101, 5.00, '2025-07-10 12:00:00', '2025-07-15 12:00:00'),
(402, 102, 1.50, '2025-08-22 11:05:00', '2025-08-16 11:15:00'),
(403, 103, 10.00, '2025-08-01 09:10:00', '2025-08-08 09:10:00'),
(404, 104, 1.50, '2025-08-16 10:05:00', '2025-08-15 11:15:00'),
(405, 105, 7.50, '2025-08-04 16:15:00', '2025-08-11 16:15:00');