CREATE DATABASE  IF NOT EXISTS `sports` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sports`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: sports
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `description` text COLLATE utf8mb3_spanish_ci,
  `date` date NOT NULL,
  `location` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `sportType` enum('Football','Basketball','Tennis','Swimming','Cycling','Baseball','Volleyball','Cricket','Rugby','Hockey') COLLATE utf8mb3_spanish_ci NOT NULL DEFAULT 'Football',
  `organizer` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `events_ibfk_username` (`organizer`),
  CONSTRAINT `events_ibfk_username` FOREIGN KEY (`organizer`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Mountain Cycling Tour','Cycling event in the mountains.','2024-07-22','Madrid','Cycling','Cruz','mountain_cycling.jpg'),(2,'Football Juniors Cup','Football competition for young players.','2024-08-28','Valencia','Football','Cruz','juniors_cup.jpg'),(3,'Autumn Marathon','Full marathon event through the city.','2024-09-20','Madrid','Cycling','Reyes','autumn_marathon.jpg'),(4,'Football Festival','City-wide football tournament with multiple teams.','2024-10-12','Barcelona','Football','Reyes','football_festival.jpg'),(5,'Swimming Relay','Team-based swimming competition.','2024-11-05','Madrid','Swimming','Reyes','swimming_relay.jpg'),(6,'Beach Volleyball Bash','Competitive beach volleyball event.','2024-06-18','Malaga','Volleyball','Reyes','beach_volleyball.jpg'),(7,'Junior Cricket Cup','Cricket tournament for junior athletes.','2024-03-16','Seville','Cricket','Reyes','junior_cricket.jpg'),(8,'Rugby Clash','Rugby match series with local teams.','2024-07-10','Bilbao','Rugby','Reyes','rugby_clash.jpg'),(9,'Tennis Doubles','Doubles tennis championship.','2024-04-04','Madrid','Tennis','Reyes','tennis_doubles.jpg'),(10,'Basketball League Finals','Finals of the city basketball league.','2024-05-18','Madrid','Basketball','Reyes','basketball_finals.jpg'),(11,'Cycling Grand Prix','Annual cycling race around the city.','2024-08-02','Barcelona','Cycling','Reyes','cycling_grandprix.jpg'),(12,'Baseball Championship','Annual baseball championship event.','2024-09-15','Madrid','Baseball','Reyes','baseball_championship.jpg'),(13,'Hockey Showdown','City hockey championship.','2024-06-28','Madrid','Hockey','Alexis','hockey_showdown.jpg'),(14,'Urban Basketball Tournament','Basketball tournament in urban courts.','2024-07-19','Valencia','Basketball','Andry','urban_basketball.jpg'),(15,'Football Classic','Traditional football match in the city stadium.','2024-08-15','Madrid','Football','Andry','football_classic.jpg'),(16,'Open Volleyball Tournament','Citywide volleyball event open to teams.','2024-09-05','Barcelona','Volleyball','Andry','open_volleyball.jpg'),(17,'Cricket Nationals','Regional cricket championship.','2024-10-10','Seville','Cricket','Andry','cricket_nationals.jpg'),(18,'Tennis Singles Challenge','Singles tennis competition.','2024-11-22','Madrid','Tennis','Andry','tennis_singles.jpg'),(19,'City Rugby League','Seasonal rugby matches between city teams.','2024-12-03','Bilbao','Rugby','Andry','city_rugby_league.jpg'),(20,'Swimming Finals','Final event for the local swimming competition.','2024-12-20','Madrid','Swimming','Cruz','swimming_finals.jpg'),(21,'Winter Hockey Championship','Winter season hockey championship.','2024-12-29','Barcelona','Hockey','Cruz','winter_hockey.jpg'),(22,'Cycling Tour','Citywide cycling race.','2025-01-05','Madrid','Cycling','Reyes','cycling_tour.jpg');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_spanish_ci NOT NULL,
  `role` enum('regular','admin') CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL DEFAULT 'regular',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Andry','$2a$10$X8CI./4YpMNElHnfrKXRjeTyJeYo60TvL82SmyI7cJSytgi60bs.O','admin'),(16,'Alexis','$2a$10$lxSw3Ud/a2QOG6pHZMBP8.MKw5oFRfUUDkS6VyEAnUdUT.wGvOi2m','regular'),(20,'Reyes','$2a$10$hGnCzMtxZFqtHGz7vvLvK.llXTYnNHsnZyTAuB2.P/XcL27jh94nG','regular'),(21,'Cruz','$2a$10$b4yaJCx.4lH5OH3JZqC9.OBgrC4CZPthaFx6AtZXUHmo/7EPfVqNa','regular');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 21:22:47
