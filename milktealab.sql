
DROP TABLE IF EXISTS `announcement`;
CREATE TABLE `announcement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `publishedTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `attemptedquestion`;
CREATE TABLE `attemptedquestion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uId` int NOT NULL,
  `examId` int NOT NULL,
  `qId` int NOT NULL,
  `userChoice` varchar(255) NOT NULL,
  `isCorrect` tinyint NOT NULL,
  `createdTime` datetime NOT NULL,
  `correctChoice` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mId` int NOT NULL,
  `m2Id` int NOT NULL,
  `createdTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `exam`;
CREATE TABLE `exam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdTime` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `material`;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `createdTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cId` int NOT NULL,
  `sId` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `examId` varchar(45) NOT NULL,
  `question` varchar(255) NOT NULL,
  `op1` varchar(255) NOT NULL,
  `op2` varchar(255) NOT NULL,
  `op3` varchar(255) NOT NULL,
  `op4` varchar(255) NOT NULL,
  `correctOp` varchar(255) NOT NULL,
  `createdTime` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `result`;
CREATE TABLE `result` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uId` int NOT NULL,
  `examId` int NOT NULL,
  `result` int NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `training`;
CREATE TABLE `training` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `createdTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `mailingAddress` varchar(255) NOT NULL,
  `desiredLocation` varchar(255) NOT NULL,
  `budget` int NOT NULL,
  `question` text NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);