CREATE DATABASE BEREK;
USE BEREK;

CREATE TABLE `berek` (
  `Nev` varchar(18) DEFAULT NULL,
  `Neme` enum('férfi','nő') DEFAULT NULL,
  `Reszleg` varchar(14) DEFAULT NULL,
  `Belepes` int(4) DEFAULT NULL,
  `Ber` int(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Csoportosító lekérdezések gyakorlására';

--
-- A tábla adatainak kiíratása `berek2020`
--

INSERT INTO `berek` (`Nev`, `Neme`, `Reszleg`, `Belepes`, `Ber`) VALUES
('Átlagos Ákos', 'férfi', 'szerelőműhely', 1983, 219531),
('Fekete Frigyes', 'férfi', 'asztalosműhely', 1997, 130135),
('Farkas Károly', 'férfi', 'lakatosműhely', 1995, 209343),
('Nagy Antal', 'férfi', 'karbantartás', 1986, 309611),
('Oláh Gáspár', 'férfi', 'karbantartás', 1988, 137158),
('Öregh Amália', 'nő', 'személyzeti', 2016, 315782),
('Somogyi Erika', 'nő', 'karbantartás', 2016, 193363),
('Izmos Vilmos', 'férfi', 'szerelőműhely', 2011, 298796),
('Kovács János', 'férfi', 'asztalosműhely', 1986, 212865),
('Pokol Petúnia', 'nő', 'beszerzés', 1973, 256368),
('Bak Dániel', 'férfi', 'pénzügy', 1983, 496106),
('Fekete Andrea', 'nő', 'értékesítés', 1989, 124880),
('Gáspár Olga', 'nő', 'karbantartás', 2010, 298381),
('Ináncsi József', 'férfi', 'karbantartás', 2001, 199721),
('Szabó András', 'férfi', 'beszerzés', 2009, 269287),
('Erdős Árpád', 'férfi', 'szerelőműhely', 2009, 220353),
('Kiss Jenő', 'férfi', 'karbantartás', 1973, 324666);
