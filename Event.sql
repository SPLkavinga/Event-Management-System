-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 10:13 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bunty`
--
CREATE DATABASE IF NOT EXISTS `bunty` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bunty`;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departName` varchar(50) DEFAULT NULL,
  `departNo` int(11) NOT NULL,
  `departLoc` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departName`, `departNo`, `departLoc`) VALUES
('IT', 1, '1st floor'),
('Accounts', 2, '2nd Floor'),
('Marketing', 3, '3rd Flooor'),
('HR', 4, '4th Floor');

-- --------------------------------------------------------

--
-- Stand-in structure for view `task`
-- (See below for the actual view)
--
CREATE TABLE `task` (
`departName` varchar(50)
,`departNo` int(11)
,`departLoc` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `task1`
-- (See below for the actual view)
--
CREATE TABLE `task1` (
`departName` varchar(50)
,`departNo` int(11)
,`departLoc` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `task2`
-- (See below for the actual view)
--
CREATE TABLE `task2` (
`departName` varchar(50)
);

-- --------------------------------------------------------

--
-- Structure for view `task`
--
DROP TABLE IF EXISTS `task`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `task`  AS SELECT `department`.`departName` AS `departName`, `department`.`departNo` AS `departNo`, `department`.`departLoc` AS `departLoc` FROM `department``department`  ;

-- --------------------------------------------------------

--
-- Structure for view `task1`
--
DROP TABLE IF EXISTS `task1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `task1`  AS SELECT `department`.`departName` AS `departName`, `department`.`departNo` AS `departNo`, `department`.`departLoc` AS `departLoc` FROM `department``department`  ;

-- --------------------------------------------------------

--
-- Structure for view `task2`
--
DROP TABLE IF EXISTS `task2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `task2`  AS SELECT `department`.`departName` AS `departName` FROM `department``department`  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departNo`);
--
-- Database: `eventplanning`
--
CREATE DATABASE IF NOT EXISTS `eventplanning` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `eventplanning`;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `nic` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact_number` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`nic`, `name`, `contact_number`, `email`, `password`) VALUES
('20032545', 'tharuka', '0764594222', 'tharuka@gmail.com', '$2a$10$SWqqD4RXpiQwdeocPU4vquQVUTUxjviF8bUmdHv84HN8haFY9KQwG'),
('200433033300', 'chamindu nevandith', '0703671190', 'chamindu@iit.ac.lk', '$2a$10$KiuXRKhuKX9WzMYKMhG5BOA/s6M5RISrvH3d0Am2iukVXgw3eyxSC'),
('980080610v', 'Lahiru Kavinga', '0767324845', 'lahiru.20211349@iit.ac.lk', '$2a$10$LYbcwOWUGyg2iz2nCa6Yz.00XtJJRtfLuTSzLgcAqOVJed4Y/5Hne');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL,
  `venue` varchar(100) NOT NULL,
  `ticketprice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_name`, `description`, `event_date`, `event_time`, `venue`, `ticketprice`) VALUES
(1, 'music', 'dwdww', '2024-10-18', '17:49:00', 'matar', '4565645.00'),
(2, 'megablast', 'ddvv', '2024-10-30', '15:58:00', 'colombo', '1500.00'),
(3, 'megablast', 'ded', '2024-10-28', '12:25:00', 'colombo', '4551.00'),
(4, 'art show', 'fully route', '2024-10-25', '17:43:00', 'nelum pokuna', '1200.00'),
(5, 'clutural show', 'kandy dance event', '2024-10-30', '18:00:00', 'BMICH', '1500.00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(100) NOT NULL,
  `nic` varchar(20) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `nic`, `contact_number`, `email`) VALUES
('kasun', '20032545', '0764594222', 'pasidu08002@gmail.com'),
('lahiru', '200433033300', '0767324845', 'lkspathirana@gmail.com'),
('chamindu', '452112', '12151545', 'tharuka@gmail.com'),
('adeel', '55515', '55125', 'adeel@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`nic`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`nic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Database: `food-asipiya`
--
CREATE DATABASE IF NOT EXISTS `food-asipiya` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `food-asipiya`;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `idOrder` int(11) NOT NULL,
  `Order_Code` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Start_Time` varchar(200) DEFAULT NULL,
  `End_Time` varchar(200) DEFAULT NULL,
  `Expected_Duration` varchar(200) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_has_products`
--

CREATE TABLE `order_has_products` (
  `idOrder_Has_Items` int(11) NOT NULL,
  `idOrder` int(11) NOT NULL,
  `Product_Id` int(11) NOT NULL,
  `Instructions` text DEFAULT NULL,
  `Duration` varchar(200) DEFAULT NULL,
  `Quantity` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `File_Path` varchar(1000) NOT NULL,
  `Duration` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOrder`);

--
-- Indexes for table `order_has_products`
--
ALTER TABLE `order_has_products`
  ADD PRIMARY KEY (`idOrder_Has_Items`),
  ADD KEY `fk_order` (`idOrder`),
  ADD KEY `fk_product` (`Product_Id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `idOrder` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `order_has_products`
--
ALTER TABLE `order_has_products`
  MODIFY `idOrder_Has_Items` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_has_products`
--
ALTER TABLE `order_has_products`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`idOrder`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`Product_Id`) REFERENCES `products` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `invoice`
--
CREATE DATABASE IF NOT EXISTS `invoice` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `invoice`;

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(100) NOT NULL,
  `branch_contact_number` varchar(15) DEFAULT NULL,
  `branch_address` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 't-shirt');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `nic_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gst_no` varchar(20) DEFAULT NULL,
  `vat_no` varchar(20) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_contact_number` varchar(15) DEFAULT NULL,
  `customer_address_1` varchar(255) DEFAULT NULL,
  `customer_address_2` varchar(255) DEFAULT NULL,
  `customer_address_3` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `customer_name`, `contact_number`, `nic_number`, `email`, `gst_no`, `vat_no`, `company_name`, `company_contact_number`, `customer_address_1`, `customer_address_2`, `customer_address_3`, `city`, `state`) VALUES
(1, 'Lahiru Kavinga', '0713324845', '', 'lkspathirana@gmail.com', '44', '555', 'asipiya', '0713324845', 'Kotawila,', 'kamburugamuwa', 'matara', 'Matara', '81000');

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `customer_details` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`customer_details`, `category`, `start_time`, `description`) VALUES
('Lahiru Kavinga / / 0713324845', 't-shirt', '2024-10-18 08:45:00', 'dcec');

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` int(11) NOT NULL,
  `material_description` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `customer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `output`
--

CREATE TABLE `output` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `special_note` text DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `days` int(11) DEFAULT NULL,
  `hours` decimal(4,2) DEFAULT NULL,
  `employee_name` varchar(255) NOT NULL,
  `starting_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `output`
--
ALTER TABLE `output`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `output`
--
ALTER TABLE `output`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `material_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE;
--
-- Database: `invoice1`
--
CREATE DATABASE IF NOT EXISTS `invoice1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `invoice1`;
--
-- Database: `serverside`
--
CREATE DATABASE IF NOT EXISTS `serverside` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `serverside`;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Table structure for table `form_data`
--

CREATE TABLE `form_data` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `form_data`
--

INSERT INTO `form_data` (`id`, `name`, `email`, `message`) VALUES
(3, 'kasun', 'kasu@gmail.com', 'bro');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_data`
--
ALTER TABLE `form_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_data`
--
ALTER TABLE `form_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Database: `tutorial`
--
CREATE DATABASE IF NOT EXISTS `tutorial` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tutorial`;

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(20) NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`, `location_id`) VALUES
(10, 'IT', 100),
(20, 'Operations', 200),
(30, 'Sales', 300),
(40, 'Marketing', 400),
(50, 'Management', 100),
(60, 'Security', 200);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `hire_date` date NOT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  `commission_pct` decimal(2,2) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `first_name`, `last_name`, `email`, `phone_number`, `hire_date`, `salary`, `commission_pct`, `manager_id`, `department_id`, `job_id`) VALUES
(1001, 'Jim', 'King', 'jk@firm.com', '02079111001', '2011-01-21', '98000.00', NULL, NULL, 50, 901),
(1002, 'Jane', 'Queen', 'jq@firm.com', '02079111002', '2012-02-05', '99000.00', NULL, NULL, 50, 901),
(1003, 'Jen', 'Probert', 'jp@firm.com', '02079111003', '2014-11-23', '79000.00', NULL, 1001, 10, 904),
(1004, 'Mike', 'Brent', 'mb@firm.com', '02079111004', '2013-10-06', '51000.00', NULL, 1003, 10, 902),
(1005, 'Nadia', 'Tamsa', 'nt@firm.com', '02079111005', '2013-10-08', '62000.00', NULL, 1003, 10, 902),
(1006, 'Mo', 'Ali', 'ma@firm.com', '02079111006', '2015-11-24', '41000.00', '0.15', 1002, 30, 903),
(1007, 'Dania', 'Kolova', 'dk@firm.com', '02079111007', '2016-05-15', '38000.00', '0.25', 1006, 30, 903),
(1008, 'Manu', 'Ogoda', 'mo@firm.com', '02079111008', '2017-08-12', '33000.00', '0.35', 1007, 30, 903),
(1009, 'Marc', 'Daniel', 'md@firm.com', '02079111009', '2014-01-02', '35000.00', '0.35', 1007, 30, NULL),
(1010, 'Louise', 'Matos', 'lm@firm.com', '0207911110', '2017-11-05', '53000.00', NULL, 1002, 40, 905),
(1011, 'Ram', 'Binghi', 'rb@firm.com', '0207911111', '2012-03-30', '35000.00', NULL, 1010, 40, 906),
(1012, 'Tim', 'Norm', 'tn@firm.com', '0207911112', '2018-03-31', '48000.00', NULL, 1010, 40, 906),
(1013, 'Alex', 'Smart', 'as@firm.com', '0207911113', '2012-03-30', '39000.00', NULL, 1001, NULL, 907),
(1014, 'Bruno', 'Silba', 'bs@firm.com', '0207911114', '2014-05-08', '37000.00', NULL, 1013, 20, 910),
(1015, 'Laurie', 'Kaldav', 'lk@firm.com', '0207911115', '2017-08-11', '34000.00', NULL, 1013, 20, 910),
(1016, 'Sophie', 'Lanou', 'sl@firm.com', '0207911116', '2017-08-19', '34000.00', '0.10', 1007, 30, 908),
(1017, 'Yann', 'Taylor', 'yt@firm.com', '0207911117', '2018-09-03', '44000.00', NULL, 1002, 10, 909),
(1018, 'Sam', 'Tring', 'st@firm.com', '0207911118', '2018-09-05', '47000.00', NULL, 1003, 10, 909),
(1019, 'Don', 'Matos', 'dm@firm.com', '0207911119', '2017-10-04', '49000.00', NULL, 1003, NULL, 909),
(1020, 'Dan', 'Ritch', 'dr@firm.com', '0207911120', '2019-01-14', '35000.00', NULL, 1013, 20, 910),
(1021, 'Jenna', 'Novski', 'jn@firm.com', '0207911121', '2019-02-13', '38000.00', NULL, 1005, 10, 911),
(1022, 'Malia', 'Mundi', 'mm@firm.com', '0207911122', '2019-07-15', '43000.00', NULL, 1005, 10, 911),
(1023, 'Kurt', 'Thorpe', 'kt@firm.com', '0207911123', '2020-04-21', '44000.00', NULL, 1018, 10, 911),
(1024, 'Nikolai', 'Mikonov', 'nm@firm.com', '0207911124', '2020-11-02', NULL, NULL, NULL, NULL, NULL),
(1025, 'Gino', 'Gondolini', 'gg@firm.com', '0207911125', '2020-11-02', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(50) NOT NULL,
  `min_salary` decimal(8,2) NOT NULL,
  `max_salary` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`job_id`, `job_title`, `min_salary`, `max_salary`) VALUES
(901, 'Managing Director', '75000.00', '125000.00'),
(902, 'Programmer', '35000.00', '80000.00'),
(903, 'Sales Rep', '25000.00', '45000.00'),
(904, 'Project Manager', '45000.00', '95000.00'),
(905, 'Marketing Manager', '37000.00', '68000.00'),
(906, 'Marketing Producer', '34000.00', '70000.00'),
(907, 'Operations Manager', '28000.00', '41000.00'),
(908, 'Sales Administrator', '38000.00', '65000.00'),
(909, 'Database Architect', '44000.00', '73000.00'),
(910, 'Operations Officer', '32000.00', '61000.00'),
(911, 'IT Tester', '38000.00', '55000.00'),
(912, 'Finance Director', '72000.00', '115000.00');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `street_address` varchar(50) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state_province` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`location_id`, `street_address`, `postal_code`, `city`, `state_province`, `country`) VALUES
(100, '2 Nice Road', 'N2 7TH', 'London', 'Greater London', 'UK'),
(200, '23 Pretty Road', 'BS1 8FD', 'Bristol', 'Bristol County', 'UK'),
(300, '26 Great Street', 'BN1 4BF', 'Brigthon', 'Sussex', 'UK'),
(400, '143 Lovely Road', 'CB1 2NV', 'Cambridge', 'Cambridgeshire', 'UK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_name` (`department_name`),
  ADD KEY `d_lid_fk` (`location_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `e_mid_fk` (`manager_id`),
  ADD KEY `e_did_fk` (`department_id`),
  ADD KEY `e_jid_fk` (`job_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`job_id`),
  ADD UNIQUE KEY `job_title` (`job_title`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`),
  ADD UNIQUE KEY `street_address` (`street_address`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `d_lid_fk` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`);

--
-- Constraints for table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `e_did_fk` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `e_jid_fk` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  ADD CONSTRAINT `e_mid_fk` FOREIGN KEY (`manager_id`) REFERENCES `employees` (`employee_id`);
--
-- Database: `your_database_name`
--
CREATE DATABASE IF NOT EXISTS `your_database_name` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `your_database_name`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
