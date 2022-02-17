-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2020 at 02:54 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `courier`
--

-- --------------------------------------------------------

--
-- Table structure for table `storage`
--

CREATE TABLE `storage` (
  `id` int(11) UNSIGNED ZEROFILL NOT NULL,
  `destination` varchar(256) NOT NULL,
  `location` varchar(256) NOT NULL,
  `address` varchar(256) NOT NULL,
  `status` enum('received','unreceived') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `storage`
--

INSERT INTO `storage` (`id`, `destination`, `location`, `address`, `status`, `created_at`, `updated_at`) VALUES
(00000000001, 'Kota Tanjung Pinang', 'Kota Tanjung Pinang', 'asdasd', 'received', '2020-06-19 10:44:42', '2020-06-19 18:54:43'),
(00000000002, 'Kabupaten Indragiri Hilir', 'Kota Tanjung Pinang', 'dsadsa', 'unreceived', '2020-06-19 17:50:56', '2020-06-19 18:01:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` enum('admin','postman') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `location` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `updated_at`, `location`) VALUES
(16, 'asd', '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', 'admin', '2020-06-19 15:03:07', '2020-06-19 15:03:07', 'Kota Tanjung Pinang'),
(17, 'ads', '788eb2efc52660fe41472319f0d2c623be6540c956921b3632fcc934bf1be10d', 'postman', '2020-06-19 15:04:10', '2020-06-19 18:53:59', 'Kota Tanjung Pinang'),
(18, 'sad', '45c9a6614fccd4f9592d8283a4f25bff84076fd43ee9f90eaa07746ebbed02ca', 'admin', '2020-06-19 19:14:19', '2020-06-19 19:14:19', 'Kota B A T A M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `storage`
--
ALTER TABLE `storage`
  MODIFY `id` int(11) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
