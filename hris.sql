-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.1.41 - Source distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for hris
DROP DATABASE IF EXISTS `hris`;
CREATE DATABASE IF NOT EXISTS `hris` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `hris`;


-- Dumping structure for table hris.allowances
DROP TABLE IF EXISTS `allowances`;
CREATE TABLE IF NOT EXISTS `allowances` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.allowances: 3 rows
/*!40000 ALTER TABLE `allowances` DISABLE KEYS */;
INSERT INTO `allowances` (`id`, `name`) VALUES
	(1, 'Housing'),
	(2, 'Rice'),
	(3, 'Transportation');
/*!40000 ALTER TABLE `allowances` ENABLE KEYS */;


-- Dumping structure for table hris.attendedtrainees
DROP TABLE IF EXISTS `attendedtrainees`;
CREATE TABLE IF NOT EXISTS `attendedtrainees` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `traindev_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.attendedtrainees: 4 rows
/*!40000 ALTER TABLE `attendedtrainees` DISABLE KEYS */;
INSERT INTO `attendedtrainees` (`id`, `employee_id`, `traindev_id`) VALUES
	(8, 198, 1),
	(9, 199, 2),
	(10, 199, 3),
	(11, 207, 3),
	(13, NULL, 3),
	(14, 209, 3);
/*!40000 ALTER TABLE `attendedtrainees` ENABLE KEYS */;


-- Dumping structure for table hris.awards
DROP TABLE IF EXISTS `awards`;
CREATE TABLE IF NOT EXISTS `awards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `institution` text COLLATE utf8_unicode_ci,
  `dateGiven` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_awards_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.awards: ~6 rows (approximately)
/*!40000 ALTER TABLE `awards` DISABLE KEYS */;
INSERT INTO `awards` (`id`, `employee_id`, `name`, `institution`, `dateGiven`) VALUES
	(1, 1, 'rehga', 'sa', '2016-06-14'),
	(2, 68, 'dss', NULL, NULL),
	(3, 198, 'hfd1', 'asdfsadf', '2016-02-04'),
	(4, 199, 'Best in Science', 'MSU', '2017-01-01'),
	(5, 1, 'adfc', 'cwe', '2017-08-17'),
	(6, 209, 'Best Employee', 'SMSI', '2016-12-24');
/*!40000 ALTER TABLE `awards` ENABLE KEYS */;


-- Dumping structure for table hris.bank
DROP TABLE IF EXISTS `bank`;
CREATE TABLE IF NOT EXISTS `bank` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bank` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `accountNo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.bank: 2 rows
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` (`id`, `employee_id`, `bank`, `accountNo`) VALUES
	(1, '199', 'MEMBA', '0914-0052-0057'),
	(2, '1', 'ad', '234');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;


-- Dumping structure for table hris.benefits
DROP TABLE IF EXISTS `benefits`;
CREATE TABLE IF NOT EXISTS `benefits` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.benefits: 4 rows
/*!40000 ALTER TABLE `benefits` DISABLE KEYS */;
INSERT INTO `benefits` (`id`, `name`) VALUES
	(1, 'Bonus'),
	(2, '13th Month Pay'),
	(3, 'sample'),
	(4, 'Hi');
/*!40000 ALTER TABLE `benefits` ENABLE KEYS */;


-- Dumping structure for table hris.branches
DROP TABLE IF EXISTS `branches`;
CREATE TABLE IF NOT EXISTS `branches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.branches: ~8 rows (approximately)
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` (`id`, `name`) VALUES
	(1, 'Cagayan de Oro'),
	(2, 'Dipolog'),
	(3, 'Manila'),
	(4, 'Davao'),
	(5, 'Cebu'),
	(6, 'as'),
	(7, 'sample'),
	(8, 'yooos');
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;


-- Dumping structure for table hris.companies
DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  `code` text COLLATE utf8_unicode_ci,
  `contactno` int(11) DEFAULT NULL,
  `email` text COLLATE utf8_unicode_ci,
  `website` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.companies: ~5 rows (approximately)
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` (`id`, `name`, `code`, `contactno`, `email`, `website`) VALUES
	(1, 'Solutions Management Systems Inc.', 'SMSi', 0, 'smsi@gmail.com', 'www.smsi.com.ph'),
	(2, 'Amaara Financial Corporation', 'AFC', 0, '', 'www.afc.com.ph'),
	(3, 'Norminring Development Corporation', 'NDC', 0, '', 'www.norminring.com'),
	(4, 'Mindanao Educators Mututal Benefit Association , Inc.', 'MEMBAI', 0, '', 'www.memba.com.ph'),
	(5, 'Comic Alley', 'CA', NULL, NULL, NULL);
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;


-- Dumping structure for table hris.educations
DROP TABLE IF EXISTS `educations`;
CREATE TABLE IF NOT EXISTS `educations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `levelType` text COLLATE utf8_unicode_ci,
  `course` text COLLATE utf8_unicode_ci,
  `school` text COLLATE utf8_unicode_ci,
  `yearGrad` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_educations_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.educations: ~14 rows (approximately)
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
INSERT INTO `educations` (`id`, `employee_id`, `levelType`, `course`, `school`, `yearGrad`) VALUES
	(2, 2, 'High School', NULL, NULL, NULL),
	(3, 3, 'Vocational', NULL, NULL, NULL),
	(4, 4, 'Vocational', 'Caregiver', 'Kaiost', 2013),
	(5, 5, 'College', NULL, NULL, NULL),
	(9, 7, 'Post Graduate', NULL, NULL, NULL),
	(10, 7, 'High School', NULL, NULL, NULL),
	(11, 7, 'Vocational', NULL, NULL, NULL),
	(12, 7, 'College', NULL, NULL, NULL),
	(13, 7, 'Post Graduate', NULL, NULL, NULL),
	(16, 68, 'College', 'fd', 'c', 38),
	(17, 199, 'College', 'BSIT', 'asdf', 2010),
	(19, 1, 'High School', 'sa', 'sa', 2014),
	(21, 1, 'High School', 'as', 'sa', 2010),
	(22, 209, 'College', 'Bacherlor of Arts in Nursing', 'Xavier  University', 1995);
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;


-- Dumping structure for table hris.empchildren
DROP TABLE IF EXISTS `empchildren`;
CREATE TABLE IF NOT EXISTS `empchildren` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `gender` text COLLATE utf8_unicode_ci,
  `dateBirth` date DEFAULT NULL,
  `civilStatus` text COLLATE utf8_unicode_ci,
  `occupation` text COLLATE utf8_unicode_ci,
  `company` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `index_children_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.empchildren: ~6 rows (approximately)
/*!40000 ALTER TABLE `empchildren` DISABLE KEYS */;
INSERT INTO `empchildren` (`id`, `employee_id`, `name`, `gender`, `dateBirth`, `civilStatus`, `occupation`, `company`) VALUES
	(1, 1, 'Cheska', 'Male', '2016-09-05', 'Single', 'Accountant', 'BPI'),
	(3, 68, 'ew', 'Female', NULL, NULL, NULL, NULL),
	(4, 70, 'tr', 'Male', NULL, NULL, NULL, NULL),
	(5, 199, 'Janine Jasmin', 'Female', '2000-01-01', 'Single', 'asdf', 'asd'),
	(6, 207, 'Charlene Almuete', 'Male', '2017-01-01', 'Single', 'asdf', 'asdf'),
	(7, 209, 'Charlene Valleser', 'Female', '2014-01-08', 'Single', 'Student', NULL);
/*!40000 ALTER TABLE `empchildren` ENABLE KEYS */;


-- Dumping structure for table hris.employees
DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `biometric_id` varchar(13) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shiftgroup_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `image` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mi` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `placeBirth` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateBirth` date DEFAULT NULL,
  `civilStatus` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taxstatus_id` int(11) DEFAULT NULL,
  `gender` varchar(6) COLLATE utf8_unicode_ci DEFAULT NULL,
  `citizenship` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `religion` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `height` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `weight` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bloodType` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hair` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `complexion` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resTel1` int(11) DEFAULT NULL,
  `resTel2` int(11) DEFAULT NULL,
  `resMobile1` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resMobile2` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `resEmail` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `perAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `proAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fatherName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faOccupation` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faCompany` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `faNo` int(11) DEFAULT NULL,
  `motherName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moOccupation` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moCompany` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `moNo` int(11) DEFAULT NULL,
  `spouseName` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spAdd` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spOccupation` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spCompany` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `spNo` int(11) DEFAULT NULL,
  `dateHired` date DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `sssNo` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phicNo` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `hdmfNo` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `taxNo` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emp_status` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.employees: ~10 rows (approximately)
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` (`id`, `employee_id`, `biometric_id`, `shiftgroup_id`, `role_id`, `image`, `fName`, `mi`, `lName`, `placeBirth`, `dateBirth`, `civilStatus`, `taxstatus_id`, `gender`, `citizenship`, `religion`, `language`, `height`, `weight`, `bloodType`, `hair`, `complexion`, `resAdd`, `resTel1`, `resTel2`, `resMobile1`, `resMobile2`, `resEmail`, `perAdd`, `proAdd`, `fatherName`, `faAdd`, `faOccupation`, `faCompany`, `faNo`, `motherName`, `moAdd`, `moOccupation`, `moCompany`, `moNo`, `spouseName`, `spAdd`, `spOccupation`, `spCompany`, `spNo`, `dateHired`, `position_id`, `company_id`, `branch_id`, `sssNo`, `phicNo`, `hdmfNo`, `taxNo`, `emp_status`) VALUES
	(1, 'SMSI-0016', '1102', 1, 5, NULL, 'Charlie', 'J', 'Almuete', 'Cagayan de Oro', '1995-01-10', 'Married', NULL, 'Male', 'Filipino', 'SDA', 'Bisaya', '4\'9"', '46', 'O +', 'Brown', 'Fair', 'css', 8584352, 21, '09054050785', '0444', 'cs8@gmail.com', 'a', 'a', 'Humber Almuete', 'NHA Kauswagan', 'Seaman', 'Neogect', NULL, 'Rosario Almuete', 'NHA Kauswagan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-10-19', 3, 1, 1, '154201', '1200', '100', '1250', 'Active'),
	(68, '0017', NULL, 1, 1, '', 'ew', 'g', 's', 'CDO', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'fd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'swe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Inactive'),
	(81, '0018', NULL, 1, 4, NULL, 'Rolan', 'M', 'Narandan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-01-01', 2, 1, 1, NULL, NULL, NULL, NULL, 'Inactive'),
	(197, 'SMSI-0015', NULL, 1, 2, NULL, 'Melanie', 'A', 'Taneo', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, 'Resigned'),
	(198, 'SMSI-0013', '10003', 1, 5, NULL, 'Adrian', 'A', 'Altavano', 'Legazpi City', '1995-12-21', 'Single', NULL, 'Male', 'Filipino', 'Catholic', 'Tagalog', NULL, NULL, '', 'Black', 'Fair', 'asdf', 0, NULL, '02147483647', '02147483647', NULL, 'zxcv', 'xzcv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 2, 1, 1, NULL, NULL, NULL, NULL, NULL),
	(199, 'SMSI-0014', '10004', 1, 4, NULL, 'Charlene', 'H', 'Abera', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-07-20', 2, 1, 2, NULL, NULL, NULL, NULL, NULL),
	(203, 'smsi-32', NULL, 3, 4, NULL, 'dadi', 'd', 'dadi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-02-08', 2, 5, 3, NULL, NULL, NULL, NULL, 'New'),
	(207, 'asd432', NULL, 1, 4, NULL, 'a', 'q', 'a', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-05-30', 2, 2, 4, NULL, NULL, NULL, NULL, 'Resigned'),
	(208, 'dsw4', NULL, 3, 4, '', 'cz', 'c', 'cz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-06-27', 5, 1, 7, NULL, NULL, NULL, NULL, 'Active'),
	(209, '123456', '147852', 1, 4, NULL, 'Ramon Alejandro', 'Magtajas', 'Valleser', 'Cagayan de Oro City', NULL, 'Married', NULL, 'Male', 'Filipino', 'Roman Catholic', 'Visayan', '5\'8', '65', 'O +', 'Black', 'Fair', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2016-09-01', 1, 1, 1, '1001', '10000', '10000', '10000', 'Active'),
	(210, '147852369', NULL, 1, 4, NULL, 'Jean', 'Salvan', 'Godornes', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2010-02-02', 4, 1, 1, NULL, NULL, NULL, NULL, 'Active');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;


-- Dumping structure for table hris.incident
DROP TABLE IF EXISTS `incident`;
CREATE TABLE IF NOT EXISTS `incident` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `occurence` text COLLATE utf8_unicode_ci NOT NULL,
  `natureOfAccident` text COLLATE utf8_unicode_ci NOT NULL,
  `injuryType` text COLLATE utf8_unicode_ci NOT NULL,
  `coreActivity` text COLLATE utf8_unicode_ci NOT NULL,
  `location` text COLLATE utf8_unicode_ci NOT NULL,
  `details` text COLLATE utf8_unicode_ci NOT NULL,
  `dateOfOccurence` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `damagedProperty` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.incident: 1 rows
/*!40000 ALTER TABLE `incident` DISABLE KEYS */;
INSERT INTO `incident` (`id`, `occurence`, `natureOfAccident`, `injuryType`, `coreActivity`, `location`, `details`, `dateOfOccurence`, `employee_id`, `damagedProperty`) VALUES
	(1, 'Incident', 'road', 'dsc', '', '', '', '0000-00-00', 0, '');
/*!40000 ALTER TABLE `incident` ENABLE KEYS */;


-- Dumping structure for procedure hris.insertUserFieldTable
DROP PROCEDURE IF EXISTS `insertUserFieldTable`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertUserFieldTable`(IN `empId` VARCHAR(10))
BEGIN
	INSERT INTO users( employee_id, username, password ) 
	SELECT id, CONCAT(fName, lName) AS username, CONCAT(fName, lName) AS password FROM employees WHERE id= empId;
END//
DELIMITER ;


-- Dumping structure for table hris.jobs
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `position_id` int(11) NOT NULL DEFAULT '0',
  `company_id` int(10) NOT NULL DEFAULT '0',
  `branch_id` int(10) DEFAULT '0',
  `empStatus` text COLLATE utf8_unicode_ci,
  `dutiesResponsibility` text COLLATE utf8_unicode_ci,
  `qualification` text COLLATE utf8_unicode_ci,
  `dateFiled` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.jobs: 6 rows
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` (`id`, `position_id`, `company_id`, `branch_id`, `empStatus`, `dutiesResponsibility`, `qualification`, `dateFiled`, `status`) VALUES
	(1, 2, 4, 2, 'Full Time', 'wawa', '4-year course', '2017-02-07', 'Available'),
	(2, 1, 4, 4, 'Full Time', 'asq', '2-year course', '2017-06-20', 'Not Available'),
	(3, 6, 2, 7, 'Full Time', 'kui', '4-year course', '2017-03-16', 'Available'),
	(13, 4, 1, 1, 'Full Time', NULL, '4-year course', '2016-02-02', 'Available'),
	(14, 1, 1, 1, 'Part Time', NULL, '4-year course', '2017-02-02', 'Available'),
	(15, 2, 1, 1, 'Full Time', 'sample only', '4-year course', '2017-02-06', 'Available'),
	(16, 2, 1, 1, 'Full Time', 'sample', '4-year course', '2017-02-01', 'Available');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;


-- Dumping structure for table hris.jobskill
DROP TABLE IF EXISTS `jobskill`;
CREATE TABLE IF NOT EXISTS `jobskill` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `job_id` int(10) DEFAULT NULL,
  `positionskill_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.jobskill: 0 rows
/*!40000 ALTER TABLE `jobskill` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobskill` ENABLE KEYS */;


-- Dumping structure for table hris.leaveapp
DROP TABLE IF EXISTS `leaveapp`;
CREATE TABLE IF NOT EXISTS `leaveapp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `durFrom` date NOT NULL,
  `durTo` date NOT NULL,
  `dateFiled` date NOT NULL,
  `leave_id` int(11) NOT NULL,
  `days_applied` int(5) DEFAULT NULL,
  `mode` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reason` text COLLATE utf8_unicode_ci NOT NULL,
  `status` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.leaveapp: 5 rows
/*!40000 ALTER TABLE `leaveapp` DISABLE KEYS */;
INSERT INTO `leaveapp` (`id`, `employee_id`, `durFrom`, `durTo`, `dateFiled`, `leave_id`, `days_applied`, `mode`, `reason`, `status`) VALUES
	(38, '209', '2017-02-04', '2017-02-01', '2017-01-30', 2, 10, 'with pay', 'Sick', 'For Manager Approval'),
	(37, '209', '2017-02-04', '2017-01-30', '2017-01-09', 4, 6, 'with pay', 'Vacation to Paris', 'For Manager Approval'),
	(36, '207', '2017-01-21', '2017-01-21', '2017-03-01', 2, 1, 'with pay', 'cfgsdfgsdfg', 'Dissaproved by HR'),
	(35, '81', '2017-01-23', '2017-01-23', '2017-02-02', 4, 1, 'with pay', 'asdfasdf', 'For Manager Approval'),
	(31, '198', '2017-01-17', '2017-01-16', '2017-01-11', 6, 1, 'with pay', 'Flu', 'Dissaproved by Manager'),
	(39, '209', '2017-02-11', '2017-02-06', '2017-02-01', 4, 20, 'with pay', 'Vacation', 'For Manager Approval');
/*!40000 ALTER TABLE `leaveapp` ENABLE KEYS */;


-- Dumping structure for table hris.leaves
DROP TABLE IF EXISTS `leaves`;
CREATE TABLE IF NOT EXISTS `leaves` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.leaves: 7 rows
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` (`id`, `name`) VALUES
	(6, 'Parental Leave'),
	(1, 'Emergency Leave'),
	(3, 'Paternal Leave'),
	(4, 'Vacation Leave'),
	(2, 'Sick Leave'),
	(5, 'Maternity Leave'),
	(16, 'aww');
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;


-- Dumping structure for table hris.lendingcompany
DROP TABLE IF EXISTS `lendingcompany`;
CREATE TABLE IF NOT EXISTS `lendingcompany` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.lendingcompany: 4 rows
/*!40000 ALTER TABLE `lendingcompany` DISABLE KEYS */;
INSERT INTO `lendingcompany` (`id`, `name`) VALUES
	(1, 'SSS'),
	(2, 'AFC'),
	(3, 'HDMF'),
	(4, 'asq');
/*!40000 ALTER TABLE `lendingcompany` ENABLE KEYS */;


-- Dumping structure for table hris.licensures
DROP TABLE IF EXISTS `licensures`;
CREATE TABLE IF NOT EXISTS `licensures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `rating` double(3,2) DEFAULT NULL,
  `licenseNo` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` blob,
  PRIMARY KEY (`id`),
  KEY `index_licensures_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.licensures: ~14 rows (approximately)
/*!40000 ALTER TABLE `licensures` DISABLE KEYS */;
INSERT INTO `licensures` (`id`, `employee_id`, `name`, `rating`, `licenseNo`, `image`) VALUES
	(1, 1, 'Nursing Board Exam', 0.17, '0000001514', NULL),
	(2, 2, 's', NULL, NULL, NULL),
	(3, 3, 'q', NULL, NULL, NULL),
	(4, 5, 'q', NULL, NULL, NULL),
	(5, 7, 'a', NULL, NULL, NULL),
	(6, 7, 'a', NULL, NULL, NULL),
	(7, 7, 'a', NULL, NULL, NULL),
	(8, 7, 's', NULL, NULL, NULL),
	(9, 0, 'Civil Service', 0.00, NULL, NULL),
	(10, 0, 'Civil Service', NULL, NULL, NULL),
	(11, 68, 'ges', 5.10, 'fd42', NULL),
	(12, 198, 'asdf', 1.50, '123-456-78', NULL),
	(13, 199, 'LET', 9.99, '12345678', NULL),
	(14, 209, 'Civil Service Examination', 9.99, '1236987', NULL);
/*!40000 ALTER TABLE `licensures` ENABLE KEYS */;


-- Dumping structure for table hris.loans
DROP TABLE IF EXISTS `loans`;
CREATE TABLE IF NOT EXISTS `loans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `loanType_id` int(10) DEFAULT NULL,
  `lendingCompany_id` int(10) DEFAULT NULL,
  `amount` double(10,0) DEFAULT NULL,
  `term` text COLLATE utf8_unicode_ci,
  `monthlyAmortization` double(10,0) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `remarks` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.loans: 2 rows
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` (`id`, `employee_id`, `loanType_id`, `lendingCompany_id`, `amount`, `term`, `monthlyAmortization`, `startDate`, `endDate`, `remarks`) VALUES
	(1, 1, 1, 1, 1520, '1 month', 50, '2017-02-21', '2017-03-21', 'zsasdf'),
	(2, 199, 1, 1, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;


-- Dumping structure for table hris.loantype
DROP TABLE IF EXISTS `loantype`;
CREATE TABLE IF NOT EXISTS `loantype` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `loanType` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.loantype: 3 rows
/*!40000 ALTER TABLE `loantype` DISABLE KEYS */;
INSERT INTO `loantype` (`id`, `loanType`) VALUES
	(1, 'SSS Loan'),
	(2, 'Housing Loan'),
	(3, 'fdwe');
/*!40000 ALTER TABLE `loantype` ENABLE KEYS */;


-- Dumping structure for table hris.medicals
DROP TABLE IF EXISTS `medicals`;
CREATE TABLE IF NOT EXISTS `medicals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `conditions` text COLLATE utf8_unicode_ci,
  `started` text COLLATE utf8_unicode_ci,
  `physician` text COLLATE utf8_unicode_ci,
  `disability` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `index_medicals_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.medicals: ~7 rows (approximately)
/*!40000 ALTER TABLE `medicals` DISABLE KEYS */;
INSERT INTO `medicals` (`id`, `employee_id`, `conditions`, `started`, `physician`, `disability`) VALUES
	(2, 3, 'sa', NULL, NULL, NULL),
	(3, 5, 'q', NULL, NULL, NULL),
	(4, 0, 'Flu', NULL, NULL, NULL),
	(5, 7, 'zika', NULL, NULL, NULL),
	(7, 68, 'fcaz', '2016', 'cs', 'trc'),
	(8, 198, 'asdf', '123', 'wer', 'wqer'),
	(9, 198, 'asdf', '2016', 'as', 'as');
/*!40000 ALTER TABLE `medicals` ENABLE KEYS */;


-- Dumping structure for table hris.organizations
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `institution` text COLLATE utf8_unicode_ci,
  `title` text COLLATE utf8_unicode_ci,
  `started` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ended` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_organizations_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.organizations: ~8 rows (approximately)
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` (`id`, `employee_id`, `institution`, `title`, `started`, `ended`) VALUES
	(1, 3, 'aq', 'aaa', '2016-04', '2016-09'),
	(2, 5, 'q', NULL, '0', '0'),
	(3, 7, 'as', NULL, '0', '0'),
	(4, 1, 'aq', 'aaa', '2014', '2015'),
	(5, 68, 'ds', 'xiu', '0', NULL),
	(6, 198, 'dfg', 'dfgs', '2014', NULL),
	(7, 1, 'yes', 'no', '2016-01', '2016-12'),
	(8, 209, 'Eagle', 'Member', '2011-02', '2017-10');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;


-- Dumping structure for table hris.overtime
DROP TABLE IF EXISTS `overtime`;
CREATE TABLE IF NOT EXISTS `overtime` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateFiled` date DEFAULT NULL,
  `dateRequested` date DEFAULT NULL,
  `totalHours` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reason` varchar(80) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.overtime: 0 rows
/*!40000 ALTER TABLE `overtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `overtime` ENABLE KEYS */;


-- Dumping structure for table hris.performance
DROP TABLE IF EXISTS `performance`;
CREATE TABLE IF NOT EXISTS `performance` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) NOT NULL DEFAULT '0',
  `rating` text COLLATE utf8_unicode_ci NOT NULL,
  `monthReview` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remarks` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.performance: 3 rows
/*!40000 ALTER TABLE `performance` DISABLE KEYS */;
INSERT INTO `performance` (`id`, `employee_id`, `rating`, `monthReview`, `remarks`) VALUES
	(2, 1, '7.5', NULL, 'dssas'),
	(3, 1, '31', '2017-01-31', 'ad'),
	(4, 1, '1', '2017-07-04', 'weqw');
/*!40000 ALTER TABLE `performance` ENABLE KEYS */;


-- Dumping structure for table hris.positions
DROP TABLE IF EXISTS `positions`;
CREATE TABLE IF NOT EXISTS `positions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.positions: 7 rows
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
INSERT INTO `positions` (`id`, `name`) VALUES
	(1, 'Manager'),
	(2, 'Developer'),
	(3, 'Jr. Accountant'),
	(4, 'Quality Analyst'),
	(5, 'Social Media Associate'),
	(6, 'Software Lead'),
	(7, 'Manager');
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;


-- Dumping structure for table hris.positionskill
DROP TABLE IF EXISTS `positionskill`;
CREATE TABLE IF NOT EXISTS `positionskill` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `position_id` int(10) NOT NULL DEFAULT '0',
  `skills` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.positionskill: 4 rows
/*!40000 ALTER TABLE `positionskill` DISABLE KEYS */;
INSERT INTO `positionskill` (`id`, `position_id`, `skills`) VALUES
	(4, 2, 'PHP'),
	(2, 2, 'Networking'),
	(1, 2, 'AngularJS'),
	(5, 5, 'Computer Literate');
/*!40000 ALTER TABLE `positionskill` ENABLE KEYS */;


-- Dumping structure for table hris.promotions
DROP TABLE IF EXISTS `promotions`;
CREATE TABLE IF NOT EXISTS `promotions` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) NOT NULL,
  `datePromote` text COLLATE utf8_unicode_ci,
  `position_id` text COLLATE utf8_unicode_ci NOT NULL,
  `salary` text COLLATE utf8_unicode_ci,
  `company_id` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.promotions: 0 rows
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;


-- Dumping structure for table hris.recognition
DROP TABLE IF EXISTS `recognition`;
CREATE TABLE IF NOT EXISTS `recognition` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `awardGiven` text COLLATE utf8_unicode_ci NOT NULL,
  `citation` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.recognition: 4 rows
/*!40000 ALTER TABLE `recognition` DISABLE KEYS */;
INSERT INTO `recognition` (`id`, `employee_id`, `awardGiven`, `citation`) VALUES
	(1, '68', 'd', 'hf'),
	(2, '', 'a', ''),
	(3, '1', 'a', 'asqw'),
	(4, '199', '', '');
/*!40000 ALTER TABLE `recognition` ENABLE KEYS */;


-- Dumping structure for table hris.role
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `role` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.role: 6 rows
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`id`, `role`) VALUES
	(1, 'HR Manager'),
	(2, 'HR Associate'),
	(3, 'Payroll Officer'),
	(4, 'User'),
	(5, 'Admin'),
	(6, 'Manager');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;


-- Dumping structure for table hris.schema_migrations
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.schema_migrations: ~15 rows (approximately)
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` (`version`) VALUES
	('20160603062339'),
	('20160609084247'),
	('20160610062816'),
	('20160613033012'),
	('20160613035057'),
	('20160613053722'),
	('20160613055543'),
	('20160613061412'),
	('20160613062030'),
	('20160613062448'),
	('20160613063114'),
	('20160613063455'),
	('20160613064219'),
	('20160621061608'),
	('20160621062312');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;


-- Dumping structure for table hris.serviceallowance
DROP TABLE IF EXISTS `serviceallowance`;
CREATE TABLE IF NOT EXISTS `serviceallowance` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `allowance_id` int(10) DEFAULT NULL,
  `amount` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.serviceallowance: 3 rows
/*!40000 ALTER TABLE `serviceallowance` DISABLE KEYS */;
INSERT INTO `serviceallowance` (`id`, `employee_id`, `allowance_id`, `amount`) VALUES
	(1, 1, 2, NULL),
	(4, 198, 1, NULL),
	(5, 198, 4, NULL);
/*!40000 ALTER TABLE `serviceallowance` ENABLE KEYS */;


-- Dumping structure for table hris.serviceallowance_temp
DROP TABLE IF EXISTS `serviceallowance_temp`;
CREATE TABLE IF NOT EXISTS `serviceallowance_temp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) NOT NULL,
  `allowance_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.serviceallowance_temp: 2 rows
/*!40000 ALTER TABLE `serviceallowance_temp` DISABLE KEYS */;
INSERT INTO `serviceallowance_temp` (`id`, `employee_id`, `allowance_id`) VALUES
	(1, 1, 2),
	(3, 1, 1);
/*!40000 ALTER TABLE `serviceallowance_temp` ENABLE KEYS */;


-- Dumping structure for table hris.servicebenefit
DROP TABLE IF EXISTS `servicebenefit`;
CREATE TABLE IF NOT EXISTS `servicebenefit` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `benefit_id` int(10) DEFAULT NULL,
  `amount` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.servicebenefit: 2 rows
/*!40000 ALTER TABLE `servicebenefit` DISABLE KEYS */;
INSERT INTO `servicebenefit` (`id`, `employee_id`, `benefit_id`, `amount`) VALUES
	(1, 1, 3, '1250'),
	(4, 1, 1, '10000'),
	(3, 198, 3, '200');
/*!40000 ALTER TABLE `servicebenefit` ENABLE KEYS */;


-- Dumping structure for table hris.servicebenefit_temp
DROP TABLE IF EXISTS `servicebenefit_temp`;
CREATE TABLE IF NOT EXISTS `servicebenefit_temp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `benefit_id` int(11) DEFAULT NULL,
  `amount` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.servicebenefit_temp: 1 rows
/*!40000 ALTER TABLE `servicebenefit_temp` DISABLE KEYS */;
INSERT INTO `servicebenefit_temp` (`id`, `employee_id`, `benefit_id`, `amount`) VALUES
	(1, 1, 1, '500');
/*!40000 ALTER TABLE `servicebenefit_temp` ENABLE KEYS */;


-- Dumping structure for table hris.serviceleave
DROP TABLE IF EXISTS `serviceleave`;
CREATE TABLE IF NOT EXISTS `serviceleave` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `leave_id` int(10) DEFAULT NULL,
  `leavedays` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.serviceleave: 4 rows
/*!40000 ALTER TABLE `serviceleave` DISABLE KEYS */;
INSERT INTO `serviceleave` (`id`, `employee_id`, `leave_id`, `leavedays`) VALUES
	(1, 1, 1, 2),
	(3, 197, 5, 5),
	(4, 198, 5, 1),
	(2, 68, 6, NULL),
	(6, 207, 4, 5),
	(7, 207, 2, 15);
/*!40000 ALTER TABLE `serviceleave` ENABLE KEYS */;


-- Dumping structure for table hris.serviceleave_temp
DROP TABLE IF EXISTS `serviceleave_temp`;
CREATE TABLE IF NOT EXISTS `serviceleave_temp` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(10) DEFAULT NULL,
  `leave_id` text COLLATE utf8_unicode_ci,
  `leavedays` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.serviceleave_temp: 0 rows
/*!40000 ALTER TABLE `serviceleave_temp` DISABLE KEYS */;
/*!40000 ALTER TABLE `serviceleave_temp` ENABLE KEYS */;


-- Dumping structure for table hris.services
DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL DEFAULT '0',
  `dateAssigned` date DEFAULT NULL,
  `datePrompt` date DEFAULT NULL,
  `position_id` int(11) DEFAULT '0',
  `employmentStatus` text COLLATE utf8_unicode_ci,
  `company_id` int(11) NOT NULL DEFAULT '0',
  `branch_id` int(11) NOT NULL DEFAULT '0',
  `basicSalary` double(10,0) DEFAULT NULL,
  `sss` double(10,0) DEFAULT NULL,
  `phic` double(10,0) DEFAULT NULL,
  `hdmf` double(10,0) DEFAULT NULL,
  `tax` double(10,0) DEFAULT NULL,
  `remarks` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.services: 7 rows
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` (`id`, `employee_id`, `dateAssigned`, `datePrompt`, `position_id`, `employmentStatus`, `company_id`, `branch_id`, `basicSalary`, `sss`, `phic`, `hdmf`, `tax`, `remarks`) VALUES
	(1, 1, '2016-07-10', NULL, 1, 'Probitionary', 1, 1, 1580, 250, 101, 0, 0, NULL),
	(2, 1, '2017-03-10', '2017-01-10', 2, 'Regular', 2, 2, 125, 3120, 1000, 5400, 3560, NULL),
	(11, 199, '2016-07-10', '2017-05-02', 3, 'Trainee', 4, 2, 150, 1200, 100, 100, 100, NULL),
	(24, 68, NULL, NULL, 2, 'Trainee', 1, 4, 471, NULL, NULL, NULL, NULL, NULL),
	(23, 68, NULL, NULL, 3, 'Probitionary', 1, 2, NULL, NULL, NULL, NULL, NULL, NULL),
	(22, 68, NULL, NULL, 3, 'Probitionary', 2, 2, NULL, NULL, NULL, NULL, NULL, NULL),
	(25, 198, '2015-02-01', NULL, 2, 'Probitionary', 1, 1, 200, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;


-- Dumping structure for table hris.shifts
DROP TABLE IF EXISTS `shifts`;
CREATE TABLE IF NOT EXISTS `shifts` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `dayShift` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timein` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timeout` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shiftgroup_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.shifts: 7 rows
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` (`id`, `dayShift`, `timein`, `timeout`, `shiftgroup_id`) VALUES
	(1, 'Monday', '02:10', '10:30', 1),
	(2, 'Tuesday', '9:00', '12:00', 1),
	(3, 'Wednesday', '9:00', '12:00', 1),
	(4, 'Thursday', '9:00', '12:00', 1),
	(5, 'Friday', '9:00', '12:00', 1),
	(6, 'Saturday', '9:00', '3:00', 1),
	(7, 'Thursday', '07:30', '05:00', 2);
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;


-- Dumping structure for table hris.shiftsgroup
DROP TABLE IF EXISTS `shiftsgroup`;
CREATE TABLE IF NOT EXISTS `shiftsgroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `shiftName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.shiftsgroup: 3 rows
/*!40000 ALTER TABLE `shiftsgroup` DISABLE KEYS */;
INSERT INTO `shiftsgroup` (`id`, `shiftName`) VALUES
	(1, 'Regular'),
	(2, 'Irregular'),
	(3, 'Flexible');
/*!40000 ALTER TABLE `shiftsgroup` ENABLE KEYS */;


-- Dumping structure for table hris.skills
DROP TABLE IF EXISTS `skills`;
CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `type` text COLLATE utf8_unicode_ci,
  `name` text COLLATE utf8_unicode_ci,
  `level` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `index_skills_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.skills: ~12 rows (approximately)
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` (`id`, `employee_id`, `type`, `name`, `level`) VALUES
	(1, 1, 'Technical', 'Networking', 'Intermediate'),
	(2, 2, 'Management', NULL, NULL),
	(3, 3, 'Business', NULL, NULL),
	(4, 3, 'Business', NULL, NULL),
	(5, 3, 'Management', NULL, NULL),
	(6, 5, 'Management', NULL, NULL),
	(7, 7, 'Technical', NULL, NULL),
	(8, 7, 'Management', NULL, NULL),
	(9, 7, 'Business', NULL, NULL),
	(11, 68, 'Technical', 'gerf', 'Functional'),
	(12, 198, 'Technical', 'hgbcvb', 'Intermediate'),
	(13, 209, 'Management', 'Managing People', 'Advance');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;


-- Dumping structure for procedure hris.sp_serviceInsert
DROP PROCEDURE IF EXISTS `sp_serviceInsert`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_serviceInsert`(IN `emp_id` INT)
BEGIN  
	INSERT INTO serviceallowance(employee_id, allowance_id) 
	SELECT employee_id, allowance_id FROM serviceallowance_temp WHERE employee_id = emp_id;
	
	INSERT INTO servicebenefit(employee_id, benefit_id, amount) 
	SELECT employee_id, benefit_id, amount FROM servicebenefit_temp WHERE employee_id = emp_id;
	
	INSERT INTO serviceleave(employee_id, leave_id, leavedays_id)
	SELECT employee_id, leave_id, leavedays_id FROM serviceleave_temp WHERE employee_id = emp_id;
	
	DELETE FROM serviceallowance_temp WHERE employee_id = emp_id;
	DELETE FROM servicebenefit_temp WHERE employee_id = emp_id;
	DELETE FROM serviceleave_temp WHERE employee_id = emp_id;
END//
DELIMITER ;


-- Dumping structure for procedure hris.sp_serviceShow
DROP PROCEDURE IF EXISTS `sp_serviceShow`;
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_serviceShow`(IN `emp_id` INT)
BEGIN
	SELECT a.name FROM serviceallowance sa, allowances a WHERE a.id= sa.allowance_id AND sa.employee_id= emp_id;
	SELECT (b.name) AS benefit, sb.amount FROM servicebenefit sb, benefits b WHERE b.id= sb.benefit_id AND sb.employee_id= emp_id;
	SELECT (l.name) AS leaven, (ld.days) AS leaveday  FROM serviceleave sl, leaves l, leavedays ld WHERE l.id= sl.leave_id AND ld.id= sl.leavedays_id AND sl.employee_id= emp_id;
END//
DELIMITER ;


-- Dumping structure for table hris.taxstatus
DROP TABLE IF EXISTS `taxstatus`;
CREATE TABLE IF NOT EXISTS `taxstatus` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `taxstatus` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `taxcode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.taxstatus: 0 rows
/*!40000 ALTER TABLE `taxstatus` DISABLE KEYS */;
INSERT INTO `taxstatus` (`id`, `taxstatus`, `taxcode`) VALUES
	(1, 'Single', 'S'),
	(2, 'Married', 'M'),
	(3, 'Single w/ 1 Dependent', 'S1'),
	(4, 'Single w/ 2 Dependent', 'S2'),
	(5, 'Single w/ 3 Dependent', 'S3'),
	(6, 'Single w/ 4 Dependent', 'S4'),
	(7, 'Married w/ 1 Dependent', 'M1'),
	(8, 'Married w/ 2 Dependent', 'M2'),
	(9, 'Married w/ 3 Dependent', 'M3'),
	(10, 'Married w/ 4 Dependent', 'M4');
/*!40000 ALTER TABLE `taxstatus` ENABLE KEYS */;


-- Dumping structure for table hris.trainingdev
DROP TABLE IF EXISTS `trainingdev`;
CREATE TABLE IF NOT EXISTS `trainingdev` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `training` text COLLATE utf8_unicode_ci NOT NULL,
  `topic` text COLLATE utf8_unicode_ci NOT NULL,
  `duration` text COLLATE utf8_unicode_ci NOT NULL,
  `cost` double(6,0) NOT NULL,
  `venue` text COLLATE utf8_unicode_ci NOT NULL,
  `speaker` text COLLATE utf8_unicode_ci NOT NULL,
  `benefit` text COLLATE utf8_unicode_ci NOT NULL,
  `dateConduct` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.trainingdev: 2 rows
/*!40000 ALTER TABLE `trainingdev` DISABLE KEYS */;
INSERT INTO `trainingdev` (`id`, `training`, `topic`, `duration`, `cost`, `venue`, `speaker`, `benefit`, `dateConduct`) VALUES
	(3, 'SEO', 'Website', '1', 10000, 'CDO', 'Pantaleon Alvarez', 'addtional skills', '2017-02-28'),
	(4, 'Leadership Training Seminar', 'LTS', '1 day', 25000, 'Office', 'Jose Rizal', 'Enhance leadership skills', '2017-02-13');
/*!40000 ALTER TABLE `trainingdev` ENABLE KEYS */;


-- Dumping structure for table hris.trainings
DROP TABLE IF EXISTS `trainings`;
CREATE TABLE IF NOT EXISTS `trainings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `started` date DEFAULT NULL,
  `ended` date DEFAULT NULL,
  `institution` text COLLATE utf8_unicode_ci,
  `venue` text COLLATE utf8_unicode_ci,
  `speaker` text COLLATE utf8_unicode_ci,
  `remarks` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `index_trainings_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.trainings: ~10 rows (approximately)
/*!40000 ALTER TABLE `trainings` DISABLE KEYS */;
INSERT INTO `trainings` (`id`, `employee_id`, `name`, `started`, `ended`, `institution`, `venue`, `speaker`, `remarks`) VALUES
	(1, 2, 'photoshop', '0000-00-00', '0000-00-00', 'ga', 'h', 'h', 'h'),
	(2, 3, '', '0000-00-00', '0000-00-00', 'gas', '', '', ''),
	(3, 5, 'q', '0000-00-00', '0000-00-00', NULL, NULL, NULL, NULL),
	(4, 7, 'asq', '0000-00-00', '0000-00-00', NULL, NULL, NULL, NULL),
	(5, 2, 'sa', '0000-00-00', '0000-00-00', NULL, NULL, NULL, NULL),
	(6, 2, 'a', '0000-00-00', '0000-00-00', NULL, NULL, NULL, NULL),
	(7, 2, 'ea', '0000-00-00', '0000-00-00', NULL, NULL, NULL, NULL),
	(8, 1, 'qww', '2016-02-10', '2016-12-15', 'gf', 'AW', 'aa', 'goood'),
	(9, 68, 'ewfss', NULL, NULL, 's', 'ec', 'vz', 'xz'),
	(10, 209, 'Leadership Seminar', '2015-03-03', '2015-12-03', 'AFC', 'Cebu', NULL, 'Completed');
/*!40000 ALTER TABLE `trainings` ENABLE KEYS */;


-- Dumping structure for table hris.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(25) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_id` int(10) DEFAULT NULL,
  `userStatus` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=154 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.users: 9 rows
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `employee_id`, `username`, `password`, `role_id`, `userStatus`) VALUES
	(136, '199', 'CharleneHAbera', 'cha', 6, NULL),
	(135, '198', 'AdrianAAltavano', 'adrian', 5, NULL),
	(134, '197', 'MelanieATaneo', 'melanie', 2, 'Active'),
	(139, '81', 'RolanMNarandan', 'b787d22d9cb06342658bf546039117bc', 4, 'Active'),
	(145, '203', 'dadiddadi', 'dadiddadi', 2, 'New'),
	(149, '1', 'a.a', 'b787d22d9cb06342658bf546039117bc', 2, 'Active'),
	(150, '[object Object]', 'vc.vc', 'dda69850114256ba4af95c25d6c27b70', 4, 'New'),
	(151, '208', 'cz.cz', '8a5cdfec60c9bfd948141f4a0d47566d', 4, 'New'),
	(152, '209', 'ramon alejandro.valleser', 'b60150185f6cd6ac71a6c804e34ac762', 4, 'New'),
	(153, '210', 'jean.godornes', '22995c1ce94e59bef2744a20b47103c3', 4, 'New');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


-- Dumping structure for table hris.violation
DROP TABLE IF EXISTS `violation`;
CREATE TABLE IF NOT EXISTS `violation` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `memoNo` int(5) DEFAULT NULL,
  `memo` text COLLATE utf8_unicode_ci,
  `dateOfMemo` date DEFAULT NULL,
  `signedBy` text COLLATE utf8_unicode_ci,
  `noOfOffense` text COLLATE utf8_unicode_ci,
  `categoryOfOffense` text COLLATE utf8_unicode_ci,
  `penalties` text COLLATE utf8_unicode_ci,
  `effectOnPenalties` text COLLATE utf8_unicode_ci,
  `effectivePeriod` text COLLATE utf8_unicode_ci,
  `subject` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.violation: 1 rows
/*!40000 ALTER TABLE `violation` DISABLE KEYS */;
INSERT INTO `violation` (`id`, `employee_id`, `memoNo`, `memo`, `dateOfMemo`, `signedBy`, `noOfOffense`, `categoryOfOffense`, `penalties`, `effectOnPenalties`, `effectivePeriod`, `subject`) VALUES
	(8, 1, 43, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(10, 207, 1, 'samplesample', '2017-01-31', NULL, '1st Offense', '2nd Degree', 'Reprimand', 'No Promotion', '6 months', 'sample');
/*!40000 ALTER TABLE `violation` ENABLE KEYS */;


-- Dumping structure for table hris.works
DROP TABLE IF EXISTS `works`;
CREATE TABLE IF NOT EXISTS `works` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `position` text COLLATE utf8_unicode_ci,
  `company` text COLLATE utf8_unicode_ci,
  `durFrom` date DEFAULT NULL,
  `durTo` date DEFAULT NULL,
  `empStatus` text COLLATE utf8_unicode_ci,
  `salary` text COLLATE utf8_unicode_ci,
  `reason` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `index_works_on_employee_id` (`employee_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table hris.works: ~11 rows (approximately)
/*!40000 ALTER TABLE `works` DISABLE KEYS */;
INSERT INTO `works` (`id`, `employee_id`, `position`, `company`, `durFrom`, `durTo`, `empStatus`, `salary`, `reason`) VALUES
	(1, 3, 'Developers', NULL, NULL, NULL, NULL, NULL, NULL),
	(2, 2, 's', NULL, NULL, NULL, NULL, NULL, NULL),
	(3, 3, 'q', NULL, NULL, NULL, NULL, NULL, NULL),
	(4, 3, 'd', NULL, NULL, NULL, NULL, NULL, NULL),
	(11, 5, 'q', NULL, NULL, NULL, NULL, NULL, NULL),
	(12, 7, 'A', NULL, NULL, NULL, NULL, NULL, NULL),
	(13, 1, 'Social Media Associate', 'Teleperformance', '2016-02-10', '2016-10-19', 'Job Order', '10,000.00', NULL),
	(14, 68, 'sas', NULL, NULL, NULL, NULL, '400.00', NULL),
	(15, 198, 'asdf', 'asdf', '2015-01-31', '2016-02-14', 'Job Order', '300.00', 'asdf'),
	(16, 199, 'Developer', 'SMSI', '2017-02-21', '2016-10-25', 'Permanent', '12000', NULL),
	(17, 209, 'Manager', 'AFC', '2008-01-01', '2014-12-31', 'Permanent', '10500', 'Low Salary');
/*!40000 ALTER TABLE `works` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
