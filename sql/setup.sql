Create Table `RSO` (
	`RSO_id`	INT,
	`Name`	VARCHAR (100),
	`Logo`		VARCHAR(250),
	`Description`	TEXT,
	Primary Key (Rso_id))
	ENGINE=InnoDB;

CREATE TABLE `admin` (
	`aid` int(11) NOT NULL,
    `spid` int(11) DEFAULT NULL,
	`pid` int(11) NOT NULL,
	`status` varchar(20) NOT NULL DEFAULT 'inactive')
 ENGINE=InnoDB;

CREATE TABLE `events` (
  `eid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `time` datetime NOT NULL,
  `location` varchar(190) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `description` text NOT NULL)
 ENGINE=InnoDB;

CREATE TABLE `users` (
  `pid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(190) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB