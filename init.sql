DROP DATABASE IF EXISTS  BalanceMate;
CREATE DATABASE BalanceMate CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE BalanceMate;

-- 使用者
CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    picture VARCHAR(255)
);

-- 會計科目
CREATE TABLE subjects(
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    is_debit BOOLEAN NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 分錄
CREATE TABLE entries(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 資產(負債)名冊
CREATE TABLE registers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_id INT NOT NULL,
    subject_id INT NOT NULL,
    initial_value INT NOT NULL,
    book_value INT NOT NULL,
    expired_in INT,
    is_expired BOOLEAN DEFAULT false,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 分錄細項
CREATE TABLE entryDetails(
    id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT NOT NULL,
    subject_id INT NOT NULL,
    register_id INT,
    amount INT NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (entry_id) REFERENCES entries(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (register_id) REFERENCES registers(id) ON DELETE CASCADE
);

-- 科目餘額
CREATE TABLE balances(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject_id INT NOT NULL,
    amount INT NOT NULL,
    month VARCHAR(10) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 經常性支出
CREATE TABLE overheads(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject_id INT NOT NULL,
    amount INT NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- 目標
CREATE TABLE goals(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject_id INT NOT NULL,
    amount INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- data
INSERT INTO subjects (id, name, is_debit, parent_id) VALUES
(1000, "資產", 1, null),

(1100, "流動資產", 1, 1000),
(1101, "現金", 1, 1100),
(1102, "股票", 1, 1100),
(1103, "應收帳款", 1, 1100),
(1104, "其他", 1, 1100),

(1200, "非流動資產", 1, 1000),
(1201, "車子", 1, 1200),
(1202, "房子", 1, 1200),
(1203, "3C", 1, 1200),
(1204, "家電", 1, 1200),
(1205, "預付款", 1, 1200),
(1206, "其他", 1, 1200),

(2000, "負債", 0, null),

(2100, "流動負債", 0, 2000),
(2101, "信用卡費", 0, 2100),
(2102, "應付帳款", 0, 2100),
(2103, "其他", 0, 2100),

(2200, "非流動負債", 0, 2000),
(2201, "分期付款", 0, 2200),
(2202, "車貸", 0, 2200),
(2203, "房貸", 0, 2200),
(2204, "其他", 0, 2200),

(3000, "權益", 0, null),

(3100, "保留盈餘", 0, 3000),
(3200, "當期損益", 0, 3000),

(4000, "收入", 0, null),

(4100, "經常性收入", 0, 4000),
(4101, "薪資收入", 0, 4100),
(4102, "利息收入", 0, 4100),
(4103, "其他", 0, 4100),

(4200, "非經常性收入", 0, 4000),
(4201, "兼職收入", 0, 4200),
(4202, "中獎收入", 0, 4200),
(4203, "其他", 0, 4200),

(5000, "支出", 1, null),

(5100, "經常性支出", 1, 5000),
(5101, "伙食支出", 1, 5100),
(5102, "治裝支出", 1, 5100),
(5103, "住房支出", 1, 5100),
(5104, "交通支出", 1, 5100),
(5105, "教育支出", 1, 5100),
(5106, "娛樂支出", 1, 5100),
(5107, "孝親費", 1, 5100),
(5108, "折舊費用", 1, 5100),
(5109, "其他", 1, 5100),

(5200, "非經常性支出", 1, 5000),
(5201, "伙食支出", 1, 5200),
(5202, "治裝支出", 1, 5200),
(5203, "住房支出", 1, 5200),
(5204, "交通支出", 1, 5200),
(5205, "教育支出", 1, 5200),
(5206, "娛樂支出", 1, 5200),
(5207, "孝親費", 1, 5200),
(5208, "其他", 1, 5200);


-- mock data
INSERT INTO users (name, email, password) VALUES ('Jack', 'test@gmail.com', 'test');
INSERT INTO entries (user_id, timestamp) VALUES
    (1, '2023/07/01 23:00:00'),
    (1, '2023/07/02 23:00:00'),
    (1, '2023/07/03 23:00:00'),
    (1, '2023/07/04 23:00:00'),
    (1, '2023/07/05 23:00:00'),
    (1, '2023/08/06 23:00:00'),
    (1, '2023/08/07 23:00:00');

INSERT INTO registers (user_id, entry_id, subject_id, initial_value, book_value, expired_in, timestamp) VALUES
    (1, 4, 1103, 50, 50, null, '2023/07/04 23:00:00'),
    (1, 5, 2102, -110, -110, null, '2023/07/05 23:00:00'),
    (1, 6, 1201, 10000, 10000, 10, '2023/07/06 23:00:00'),
    (1, 7, 2201, -6000, -6000, 5, '2023/07/07 23:00:00');
    

INSERT INTO entryDetails (entry_id, subject_id, amount, register_id) VALUES
    (1, 5101, 100, null),
    (1, 1101, -100, null),
    (2, 5102, 200, null),
    (2, 1101, -200, null),
    (3, 1101, 1000, null),
    (3, 4101, -1000, null),
    (4, 1103, 50, 1),
    (4, 1101, -50, null),
    (5, 1101, 110, null),
    (5, 2102, -110, 2),
    (6, 1201, 10000, 3),
    (6, 1101, -10000, null),
    (7, 1101, 6000, null),
    (7, 2201, -6000, 4);

INSERT INTO balances (user_id, subject_id, amount, month) VALUES
    (1, 1101, 1000, '2023-03'),
    (1, 1101, 1200, '2023-04'),
    (1, 1101, 1500, '2023-05'),
    (1, 1101, 2000, '2023-06'),
    (1, 1101, 1800, '2023-07'),
    (1, 1101, 2500, '2023-08');

    



