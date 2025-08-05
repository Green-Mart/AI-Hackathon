-- Create database and switch to it
CREATE DATABASE IF NOT EXISTS Library_Application;
USE Library_Application;

-- USER table: Owner, Librarian, Member
CREATE TABLE USER (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    passwd VARCHAR(255) NOT NULL,
    role ENUM('Owner','Librarian','Member') NOT NULL
);

-- BOOKS table
CREATE TABLE BOOKS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    price DECIMAL(10,2),
    isbn VARCHAR(20) UNIQUE
);

-- COPIES table
CREATE TABLE COPIES (
    id INT PRIMARY KEY AUTO_INCREMENT,
    bookid INT NOT NULL,
    rack INT,
    status ENUM('available','issued','lost','damaged') DEFAULT 'available',
    FOREIGN KEY (bookid) REFERENCES BOOKS(id) ON DELETE CASCADE
);

-- ISSUERECORDS table
CREATE TABLE ISSUERECORDS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    copyid INT NOT NULL,
    memberid INT NOT NULL,
    issued DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    returndue DATETIME NOT NULL,
    returned DATETIME NULL,
    fine DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (copyid) REFERENCES COPIES(id) ON DELETE CASCADE,
    FOREIGN KEY (memberid) REFERENCES USER(id) ON DELETE CASCADE
);

-- PAYMENTS table
CREATE TABLE PAYMENTS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    memberid INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    type ENUM('monthly','fine','other') NOT NULL,
    txtime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duedate DATETIME,
    status ENUM('pending','paid','overdue') DEFAULT 'pending',
    FOREIGN KEY (memberid) REFERENCES USER(id) ON DELETE CASCADE
);

-- Indexes for performance after table creation
CREATE INDEX idx_user_role       ON USER(role);
CREATE INDEX idx_copies_status   ON COPIES(status);
CREATE INDEX idx_issuerecords_due ON ISSUERECORDS(returndue);
CREATE INDEX idx_payments_status ON PAYMENTS(status);

- Step 8: Insert USERS (first to satisfy foreign key in PAYMENTS)
INSERT INTO USER (name, email, phone, passwd, role) VALUES
('Admin Owner', 'owner@library.com', '9876543210', 'ownerpass', 'Owner'),        -- id = 1
('Ravi Librarian', 'ravi@library.com', '9999911111', 'librarian123', 'Librarian'), -- id = 2
('Sneha Member', 'sneha@example.com', '8888800000', 'sneha@123', 'Member'),       -- id = 3
('Arjun Member', 'arjun@example.com', '7777700000', 'arjun@123', 'Member');       -- id = 4

-- Step 9: Insert BOOKS
INSERT INTO BOOKS (name, author, subject, price, isbn) VALUES
('C Programming Language', 'Dennis Ritchie', 'Programming', 450.00, '9780131103627'), -- id = 1
('Clean Code', 'Robert C. Martin', 'Software Engineering', 700.00, '9780132350884'), -- id = 2
('Introduction to Algorithms', 'Cormen', 'Algorithms', 1200.00, '9780262033848'),    -- id = 3
('Database Systems', 'Raghu Ramakrishnan', 'Databases', 900.00, '9780072465631');    -- id = 4

-- Step 10: Insert COPIES
INSERT INTO COPIES (bookid, rack, status) VALUES
(1, 101, 'available'),  -- id = 1
(1, 101, 'issued'),     -- id = 2
(1, 101, 'available'),  -- id = 3
(2, 102, 'available'),  -- id = 4
(2, 102, 'damaged'),    -- id = 5
(3, 103, 'available'),  -- id = 6
(3, 103, 'lost'),       -- id = 7
(4, 104, 'available');  -- id = 8

-- Step 11: Insert ISSUERECORDS
INSERT INTO ISSUERECORDS (copyid, memberid, issued, returndue, returned, fine) VALUES
(2, 3, '2025-08-01 10:00:00', '2025-08-10 23:59:59', NULL, 0.00),  -- Sneha
(7, 4, '2025-07-20 11:00:00', '2025-07-30 23:59:59', '2025-08-01 10:00:00', 50.00); -- Arjun

-- Step 12: Insert PAYMENTS
INSERT INTO PAYMENTS (memberid, amount, type, txtime, duedate, status) VALUES
(3, 100.00, 'monthly', '2025-08-01 12:00:00', '2025-08-05 23:59:59', 'paid'),    -- Sneha
(3, 50.00, 'fine', '2025-08-02 09:00:00', NULL, 'pending'),
(4, 100.00, 'monthly', '2025-08-03 10:00:00', '2025-08-07 23:59:59', 'overdue'); -- Arjun


--this is some issue so change this in issueSusceess table
ALTER TABLE ISSUERECORDS DROP INDEX idx_issuerecords_due;