-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table wida.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceNo` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `customerName` varchar(255) NOT NULL,
  `salespersonName` varchar(255) NOT NULL,
  `paymentType` enum('CASH','CREDIT') NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table wida.invoices: ~14 rows (approximately)
INSERT INTO `invoices` (`id`, `invoiceNo`, `date`, `customerName`, `salespersonName`, `paymentType`, `notes`, `createdAt`, `updatedAt`) VALUES
	(1, 1, '2024-11-29 15:36:51', 'budi', 'mawar', 'CASH', 'good', '2024-11-29 15:37:02', '2024-11-29 15:37:03'),
	(4, 2, '0000-00-00 00:00:00', 'bambang', 'mawar', 'CASH', NULL, '2024-11-29 11:47:24', '2024-11-29 11:47:24'),
	(5, 1, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(6, 2, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(7, 3, '1970-01-01 00:00:44', 'Jane', 'Doe', 'CREDIT', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(8, 4, '1970-01-01 00:00:44', 'Rock', 'Pete', '', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(9, 2, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(10, 6, '1970-01-01 00:00:44', 'Jeff', 'Pete', 'CREDIT', 'Lorem ipsum', '2024-11-29 12:27:48', '2024-11-29 12:27:48'),
	(11, 1, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22'),
	(12, 2, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22'),
	(13, 3, '1970-01-01 00:00:44', 'Jane', 'Doe', 'CREDIT', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22'),
	(14, 4, '1970-01-01 00:00:44', 'Rock', 'Pete', '', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22'),
	(15, 2, '1970-01-01 00:00:44', 'John', 'Doe', 'CASH', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22'),
	(16, 6, '1970-01-01 00:00:44', 'Jeff', 'Pete', 'CREDIT', 'Lorem ipsum', '2024-11-29 12:29:22', '2024-11-29 12:29:22');

-- Dumping structure for table wida.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalCost` float NOT NULL,
  `totalPrice` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invoiceNo` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table wida.products: ~22 rows (approximately)
INSERT INTO `products` (`id`, `itemName`, `quantity`, `totalCost`, `totalPrice`, `createdAt`, `updatedAt`, `invoiceNo`) VALUES
	(1, 'penciils', 10, 100, 1000, '2024-11-29 15:37:26', '2024-11-29 15:37:26', 1),
	(2, 'books', 5, 50, 250, '2024-11-29 15:37:26', '2024-11-29 15:37:26', 1),
	(5, 'penciils', 2, 2000, 1000, '2024-11-29 11:47:24', '2024-11-29 11:47:24', 2),
	(6, 'books', 2, 500, 250, '2024-11-29 11:47:24', '2024-11-29 11:47:24', 2),
	(7, 'Bluetooth speaker', 3, 630000, 756000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 1),
	(8, 'Headphone', 8, 400000, 480000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 1),
	(9, 'Laptop charger', 4, 800000, 960000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 2),
	(10, 'LCD Monitor', 1, 500000, 600000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 3),
	(11, 'Bluetooth speaker', 2, 420000, 504000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 7),
	(12, 'Headphone', 1, 50000, 60000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 4),
	(13, 'Laptop charger', 3, 600000, 720000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 5),
	(14, 'Bluetooth speaker', 1, 210000, 252000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 3),
	(15, 'Bluetooth speaker', 1, 210000, 252000, '2024-11-29 12:27:48', '2024-11-29 12:27:48', 6),
	(16, 'Bluetooth speaker', 3, 630000, 756000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 1),
	(17, 'Headphone', 8, 400000, 480000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 1),
	(18, 'Laptop charger', 4, 800000, 960000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 2),
	(19, 'LCD Monitor', 1, 500000, 600000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 3),
	(20, 'Bluetooth speaker', 2, 420000, 504000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 7),
	(21, 'Headphone', 1, 50000, 60000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 4),
	(22, 'Laptop charger', 3, 600000, 720000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 5),
	(23, 'Bluetooth speaker', 1, 210000, 252000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 3),
	(24, 'Bluetooth speaker', 1, 210000, 252000, '2024-11-29 12:29:22', '2024-11-29 12:29:22', 6);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
