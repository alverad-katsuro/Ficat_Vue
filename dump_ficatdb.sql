-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: ficatdb
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academicUnities`
--

DROP TABLE IF EXISTS `academicUnities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academicUnities` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL DEFAULT '',
  `acronym` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `academicunities_name_unique` (`name`),
  UNIQUE KEY `academicunities_acronym_unique` (`acronym`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academicUnities`
--

LOCK TABLES `academicUnities` WRITE;
/*!40000 ALTER TABLE `academicUnities` DISABLE KEYS */;
INSERT INTO `academicUnities` VALUES (1,'Instituto de Ciências da Saúde','ICS'),(2,'Instituto de Tecnologia','ITEC'),(3,'Instituto de Ciências Biológicas','ICB'),(4,'Instituto de Filosofia e Ciências Humanas','IFCH'),(5,'Núcleo de Desenvolvimento Amazônico em Engenharia','NDAE'),(6,'Instituto de Ciências da Arte','ICA'),(7,'Instituto de Ciências Exatas e Naturais','ICEN'),(8,'Instituto de Ciências Jurídicas','ICJ'),(9,'Instituto de Ciências Sociais Aplicadas','ICSA'),(10,'Instituto de Geociências','IG'),(11,'Núcleo de Teoria e Pesquisa do Comportamento','NTPC'),(12,'Instituto de Letras e Comunicação','ILC');
/*!40000 ALTER TABLE `academicUnities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogCards`
--

DROP TABLE IF EXISTS `catalogCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogCards` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('tccGraduation','tccExpert','dissertation','thesis') NOT NULL DEFAULT 'tccGraduation',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unityName` varchar(120) NOT NULL,
  `courseName` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `catalogcards_coursename_foreign` (`courseName`),
  KEY `catalogcards_unityname_foreign` (`unityName`),
  CONSTRAINT `catalogcards_coursename_foreign` FOREIGN KEY (`courseName`) REFERENCES `courses` (`name`),
  CONSTRAINT `catalogcards_unityname_foreign` FOREIGN KEY (`unityName`) REFERENCES `academicUnities` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogCards`
--

LOCK TABLES `catalogCards` WRITE;
/*!40000 ALTER TABLE `catalogCards` DISABLE KEYS */;
INSERT INTO `catalogCards` VALUES (1,'tccGraduation','2002-11-24 06:00:00','Instituto de Ciências Jurídicas','name7'),(2,'thesis','2012-02-17 06:00:00','Instituto de Letras e Comunicação','name4'),(3,'dissertation','2003-01-29 06:00:00','Instituto de Geociências','name7'),(4,'dissertation','2013-07-23 06:00:00','Instituto de Letras e Comunicação','name5'),(5,'tccGraduation','2009-07-25 06:00:00','Instituto de Geociências','name3'),(6,'tccGraduation','2010-09-18 06:00:00','Instituto de Geociências','name3'),(7,'tccExpert','2005-06-17 06:00:00','Instituto de Ciências Jurídicas','name6'),(8,'tccGraduation','2014-05-25 06:00:00','Instituto de Geociências','name4'),(9,'tccExpert','2016-10-19 06:00:00','Instituto de Letras e Comunicação','name4'),(10,'dissertation','2009-05-05 06:00:00','Instituto de Ciências da Arte','name1'),(11,'tccExpert','2004-05-18 06:00:00','Instituto de Geociências','name3'),(12,'thesis','2011-08-08 06:00:00','Instituto de Letras e Comunicação','name1'),(13,'tccGraduation','2000-11-24 06:00:00','Instituto de Ciências Jurídicas','name7'),(14,'dissertation','2018-03-17 06:00:00','Instituto de Letras e Comunicação','name6'),(15,'tccExpert','2000-10-01 06:00:00','Instituto de Geociências','name6'),(16,'dissertation','2016-06-20 06:00:00','Instituto de Letras e Comunicação','name1'),(17,'dissertation','2007-03-12 06:00:00','Instituto de Letras e Comunicação','name2'),(18,'dissertation','2010-04-27 06:00:00','Instituto de Ciências Jurídicas','name2'),(19,'tccExpert','2011-08-08 06:00:00','Instituto de Geociências','name2'),(20,'dissertation','2001-01-07 06:00:00','Instituto de Ciências Jurídicas','name4'),(21,'thesis','2009-02-24 06:00:00','Instituto de Geociências','name4'),(22,'dissertation','2012-02-14 06:00:00','Instituto de Geociências','name5'),(23,'thesis','2018-05-08 06:00:00','Instituto de Ciências da Saúde','name3'),(24,'thesis','2013-07-06 06:00:00','Instituto de Geociências','name6'),(25,'dissertation','2001-10-11 06:00:00','Instituto de Ciências da Arte','name2'),(26,'thesis','2007-05-07 06:00:00','Instituto de Letras e Comunicação','name2'),(27,'dissertation','2014-08-24 06:00:00','Instituto de Tecnologia','name4'),(28,'dissertation','2004-04-25 06:00:00','Instituto de Geociências','name4'),(29,'thesis','2008-10-20 06:00:00','Instituto de Tecnologia','name1'),(30,'thesis','2002-07-01 06:00:00','Instituto de Ciências da Arte','name2'),(31,'tccGraduation','2001-03-10 06:00:00','Instituto de Letras e Comunicação','name4'),(32,'tccGraduation','2012-11-22 06:00:00','Instituto de Tecnologia','name2'),(33,'tccGraduation','2015-05-04 06:00:00','Instituto de Ciências da Saúde','name3'),(34,'dissertation','2014-01-14 06:00:00','Instituto de Ciências da Arte','name4'),(35,'dissertation','2002-08-16 06:00:00','Instituto de Ciências Jurídicas','name6'),(36,'thesis','2017-09-06 06:00:00','Instituto de Ciências Jurídicas','name4'),(37,'tccGraduation','2011-07-28 06:00:00','Instituto de Ciências Jurídicas','name3'),(38,'thesis','2013-11-05 06:00:00','Instituto de Letras e Comunicação','name1'),(39,'tccGraduation','2016-05-24 06:00:00','Instituto de Ciências da Saúde','name5'),(40,'tccExpert','2016-07-18 06:00:00','Instituto de Letras e Comunicação','name5'),(41,'tccGraduation','2002-05-09 06:00:00','Instituto de Ciências da Saúde','name5'),(42,'thesis','2005-01-24 06:00:00','Instituto de Ciências da Arte','name1'),(43,'thesis','2000-11-13 06:00:00','Instituto de Ciências Jurídicas','name3'),(44,'tccGraduation','2015-02-19 06:00:00','Instituto de Ciências Biológicas','name2'),(45,'dissertation','2014-09-14 06:00:00','Instituto de Ciências Jurídicas','name4'),(46,'tccGraduation','2012-06-06 06:00:00','Instituto de Ciências Biológicas','name5'),(47,'thesis','2010-10-10 06:00:00','Instituto de Letras e Comunicação','name1'),(48,'thesis','2016-03-19 06:00:00','Instituto de Tecnologia','name3'),(49,'thesis','2017-08-12 06:00:00','Instituto de Geociências','name6'),(50,'dissertation','2014-11-24 06:00:00','Instituto de Ciências Biológicas','name1'),(51,'dissertation','2012-10-10 06:00:00','Instituto de Ciências Jurídicas','name3'),(52,'dissertation','2010-10-28 06:00:00','Instituto de Ciências da Saúde','name3'),(53,'thesis','2015-01-22 06:00:00','Instituto de Ciências Biológicas','name3'),(54,'dissertation','2000-03-17 06:00:00','Instituto de Ciências Biológicas','name6'),(55,'thesis','2005-06-11 06:00:00','Instituto de Ciências da Saúde','name7'),(56,'tccGraduation','2012-06-04 06:00:00','Instituto de Ciências Biológicas','name1'),(57,'tccGraduation','2018-10-03 06:00:00','Instituto de Geociências','name6'),(58,'tccExpert','2004-01-28 06:00:00','Instituto de Tecnologia','name1'),(59,'tccExpert','2001-07-03 06:00:00','Instituto de Ciências Biológicas','name2'),(60,'dissertation','2006-04-07 06:00:00','Instituto de Geociências','name6'),(61,'thesis','2018-05-22 06:00:00','Instituto de Geociências','name4'),(62,'dissertation','2017-05-16 06:00:00','Instituto de Ciências Jurídicas','name4'),(63,'thesis','2008-06-13 06:00:00','Instituto de Ciências Jurídicas','name3'),(64,'dissertation','2009-06-22 06:00:00','Instituto de Letras e Comunicação','name1'),(65,'thesis','2009-04-17 06:00:00','Instituto de Ciências da Saúde','name7'),(66,'tccGraduation','2018-07-20 06:00:00','Instituto de Geociências','name2'),(67,'dissertation','2017-03-16 06:00:00','Instituto de Tecnologia','name2'),(68,'dissertation','2000-03-03 06:00:00','Instituto de Geociências','name6'),(69,'tccExpert','2017-07-15 06:00:00','Instituto de Letras e Comunicação','name7'),(70,'thesis','2014-08-11 06:00:00','Instituto de Ciências da Saúde','name7'),(71,'dissertation','2000-10-07 06:00:00','Instituto de Ciências Jurídicas','name2'),(72,'tccExpert','2012-04-18 06:00:00','Instituto de Ciências Jurídicas','name4'),(73,'tccGraduation','2014-11-24 06:00:00','Instituto de Letras e Comunicação','name6'),(74,'tccExpert','2011-08-26 06:00:00','Instituto de Letras e Comunicação','name3'),(75,'dissertation','2007-02-06 06:00:00','Instituto de Tecnologia','name2'),(76,'tccExpert','2011-07-26 06:00:00','Instituto de Ciências Jurídicas','name2'),(77,'dissertation','2003-03-02 06:00:00','Instituto de Ciências da Saúde','name3'),(78,'tccExpert','2010-05-07 06:00:00','Instituto de Ciências Jurídicas','name5'),(79,'tccGraduation','2012-11-27 06:00:00','Instituto de Ciências Jurídicas','name4'),(80,'tccGraduation','2000-09-19 06:00:00','Instituto de Ciências da Saúde','name1'),(81,'tccExpert','2015-02-11 06:00:00','Instituto de Geociências','name4'),(82,'dissertation','2000-01-08 06:00:00','Instituto de Geociências','name1'),(83,'thesis','2007-10-28 06:00:00','Instituto de Tecnologia','name3'),(84,'tccGraduation','2018-11-15 06:00:00','Instituto de Ciências Biológicas','name4'),(85,'tccGraduation','2000-02-28 06:00:00','Instituto de Ciências Biológicas','name5'),(86,'dissertation','2014-09-28 06:00:00','Instituto de Ciências da Saúde','name4'),(87,'dissertation','2006-11-02 06:00:00','Instituto de Ciências Jurídicas','name3'),(88,'thesis','2000-02-08 06:00:00','Instituto de Geociências','name1'),(89,'tccGraduation','2000-03-19 06:00:00','Instituto de Tecnologia','name1'),(90,'thesis','2013-06-10 06:00:00','Instituto de Ciências Biológicas','name7'),(91,'tccExpert','2004-09-08 06:00:00','Instituto de Geociências','name7'),(92,'tccExpert','2015-02-09 06:00:00','Instituto de Geociências','name3'),(93,'thesis','2006-07-01 06:00:00','Instituto de Ciências da Saúde','name3'),(94,'dissertation','2006-01-04 06:00:00','Instituto de Ciências da Saúde','name2'),(95,'thesis','2006-06-11 06:00:00','Instituto de Ciências Jurídicas','name7'),(96,'dissertation','2015-07-05 06:00:00','Instituto de Ciências Biológicas','name6'),(97,'tccExpert','2004-04-10 06:00:00','Instituto de Ciências da Arte','name5'),(98,'dissertation','2007-07-03 06:00:00','Instituto de Ciências da Saúde','name4'),(99,'tccGraduation','2004-05-09 06:00:00','Instituto de Geociências','name1'),(201,'tccGraduation','2010-08-07 06:00:00','Instituto de Tecnologia','name2'),(202,'thesis','2021-09-16 12:55:53','Instituto de Letras e Comunicação','Programa de Pós-Graduação em Letras');
/*!40000 ALTER TABLE `catalogCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `program` varchar(120) NOT NULL,
  `type` enum('graduação','especialização','mestrado','doutorado') NOT NULL DEFAULT 'graduação',
  `unityAcronym` varchar(12) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courses_name_unique` (`name`),
  UNIQUE KEY `courses_program_unique` (`program`),
  KEY `courses_unityacronym_foreign` (`unityAcronym`),
  CONSTRAINT `courses_unityacronym_foreign` FOREIGN KEY (`unityAcronym`) REFERENCES `academicUnities` (`acronym`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'name1','program1','graduação','ICS'),(2,'name2','program2','graduação','ILC'),(3,'name3','program3','graduação','ITEC'),(4,'name4','program4','graduação','IFCH'),(5,'name5','program6','graduação','ICB'),(6,'name6','program5','graduação','ITEC'),(7,'name7','program7','graduação','ICS'),(8,'name8','program8','graduação','ILC'),(9,'name9','program9','graduação','ITEC'),(10,'name10','program10','especialização','ICB'),(11,'name11','program11','especialização','IFCH'),(12,'Programa de Pós-Graduação em Letras','PPGL','doutorado','ILC');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20190823091738_users.js',1,'2021-08-05 13:05:11'),(2,'20190823094725_knowledgeAreas.js',1,'2021-08-05 13:05:13'),(3,'20190825111003_academicUnities.js',1,'2021-08-05 13:05:15'),(4,'20190826120057_courses.js',1,'2021-08-05 13:05:20'),(5,'20190910111958_catalogCards.js',1,'2021-08-05 13:05:26');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knowledgeAreas`
--

DROP TABLE IF EXISTS `knowledgeAreas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knowledgeAreas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(15) NOT NULL DEFAULT '',
  `description` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `knowledgeareas_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knowledgeAreas`
--

LOCK TABLES `knowledgeAreas` WRITE;
/*!40000 ALTER TABLE `knowledgeAreas` DISABLE KEYS */;
INSERT INTO `knowledgeAreas` VALUES (1,'0.1','description1'),(2,'0.2','description2'),(3,'0.3','description3'),(4,'0.4','description4'),(5,'0.5','description5'),(6,'0.6','description6'),(7,'0.7','description7'),(8,'0.8','description8'),(9,'0.9','description9'),(10,'0.10','description10'),(11,'410','LINGUÍSTICA');
/*!40000 ALTER TABLE `knowledgeAreas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `password_digest` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sedepti',1,'$2a$12$98X4L2OsTqOMhen8cpE1zeydis5AiVItfT2Mu/uUSALammFgJ8pni');
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

-- Dump completed on 2021-09-16 10:36:24
