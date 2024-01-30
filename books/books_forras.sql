-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 10, 2022 at 03:19 PM
-- Server version: 10.5.4-MariaDB
-- PHP Version: 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vizsga-2022-14s-wip-db`
--
CREATE Database vizsga;
USE vizsga;
-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publish_year` int(11) NOT NULL,
  `page_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `publish_year`, `page_count`) VALUES
(1, 'Quo Animi Quia Eveniet Aut', 'Jaida Nitzsche', 1965, 120),
(2, 'Eum Magni Fugit', 'Ardella Bauch', 2000, 774),
(3, 'Id Voluptas Omnis', 'Kyla Kertzmann III', 1996, 676),
(4, 'Saepe Totam Magnam Sit', 'Briana Kihn', 1906, 872),
(5, 'Voluptatum Sit Quia', 'Ardella Bauch', 1921, 953),
(6, 'Ratione Quo', 'Dr. Judah Armstrong IV', 2015, 801),
(7, 'Voluptates Accusamus Est Vitae', 'Sabina O\'Connell', 1981, 93),
(8, 'Nesciunt Sed Est Enim', 'Asha Kreiger', 1943, 767),
(9, 'Aut Ad Aut', 'Mrs. Mozelle Nader', 1950, 693),
(10, 'Repellendus Ut Mollitia Quo', 'Sabina O\'Connell', 2020, 507),
(11, 'Veritatis Consectetur', 'Briana Kihn', 1986, 506),
(12, 'Libero Quia', 'Sabina O\'Connell', 1960, 971),
(13, 'Quia Nulla Eum Quo', 'Asha Kreiger', 1997, 228),
(14, 'Non Consectetur Ut', 'Kyla Kertzmann III', 1954, 865),
(15, 'Velit Modi', 'Briana Kihn', 1936, 570),
(16, 'Quibusdam Cumque Perspiciatis Sed Nihil', 'Asha Kreiger', 1957, 186),
(17, 'Cupiditate Libero', 'Kyla Kertzmann III', 1962, 944),
(18, 'Vel Amet Eum Suscipit Earum', 'Briana Kihn', 1917, 896),
(19, 'Veniam Placeat Omnis Voluptas Deleniti', 'Prof. Jon Armstrong I', 2014, 288),
(20, 'Sed Ipsa', 'Asha Kreiger', 1977, 616),
(21, 'Nobis Sapiente Velit Minima', 'Prof. Jon Armstrong I', 1993, 792),
(22, 'Quasi Eum Qui Et Molestiae', 'Jaida Nitzsche', 1932, 673),
(23, 'Libero Voluptas Unde Iure', 'Kyla Kertzmann III', 1959, 1000),
(24, 'Cupiditate Odio Repellat', 'Jaida Nitzsche', 2007, 524),
(25, 'Vitae Dolor Quisquam Veritatis', 'Briana Kihn', 1970, 607),
(26, 'Quisquam Fugit Aut', 'Ardella Bauch', 1984, 172),
(27, 'Rem Delectus Iusto Reprehenderit Omnis', 'Jaida Nitzsche', 1946, 556),
(28, 'Exercitationem Et Quidem', 'Briana Kihn', 1906, 142),
(29, 'Neque Velit Saepe Non', 'Asha Kreiger', 2005, 373),
(30, 'Recusandae Earum Illo Et Dolorum', 'Dr. Judah Armstrong IV', 1994, 592),
(31, 'Id Qui Aut', 'Sarai Stiedemann DVM', 1971, 587),
(32, 'Expedita Est A Nihil', 'Jaida Nitzsche', 1953, 106),
(33, 'Non Nostrum Possimus', 'Briana Kihn', 1913, 149),
(34, 'Et Quidem Enim', 'Kyla Kertzmann III', 1978, 105),
(35, 'Officia Officiis Quaerat Dolorum Repudiandae', 'Sarai Stiedemann DVM', 1997, 597),
(36, 'Id Distinctio Accusamus Possimus Non', 'Kyla Kertzmann III', 1920, 530),
(37, 'Aut Et Sed Nemo Assumenda', 'Asha Kreiger', 1965, 756),
(38, 'Reiciendis Dolorem Itaque Illum', 'Mrs. Mozelle Nader', 1989, 782),
(39, 'Deserunt Non', 'Sabina O\'Connell', 1965, 309),
(40, 'Vero Exercitationem', 'Sabina O\'Connell', 1949, 885),
(41, 'Omnis Aut', 'Mrs. Mozelle Nader', 2005, 850),
(42, 'Magnam Quia', 'Mrs. Mozelle Nader', 1956, 168),
(43, 'Aut Omnis', 'Ardella Bauch', 1934, 726),
(44, 'Esse Consequuntur Vero Sed', 'Asha Kreiger', 1987, 808),
(45, 'Tempora Sint Quia Quidem Rerum', 'Jaida Nitzsche', 2017, 890),
(46, 'Sunt Eveniet Non', 'Briana Kihn', 1984, 511),
(47, 'Esse Omnis Reiciendis Dolorem', 'Kyla Kertzmann III', 2012, 460),
(48, 'Corporis Eveniet Possimus Saepe Velit', 'Kyla Kertzmann III', 2010, 726),
(49, 'Nihil Nisi Atque Voluptate Dolor', 'Dr. Judah Armstrong IV', 1928, 610),
(50, 'Odio Itaque', 'Asha Kreiger', 2006, 283);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
