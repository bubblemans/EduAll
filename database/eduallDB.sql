-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: courseDB
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `credit` int(11) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `offer_season` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,3,'Computer Science','CS160','Fall/Spring','Software Engineering'),(2,3,'Computer Science','CS146','Fall/Spring','Data Structures and Algorithms'),(3,3,'Computer Science','CS151','Fall/Spring','Object-Oriented Design'),(4,3,'Computer Science','CS154','Fall/Spring','Formal Languages and Computability'),(5,3,'Computer Science','CS153','Spring','Concepts of Compiler Design'),(6,3,'Computer Science','CS156','Fall/Spring','Introduction to Artificial Intelligence'),(7,3,'Computer Science','CS166','Fall/Spring','Information Security'),(8,3,'Economics','ECON104','Fall','Mathematical Methods for Economics'),(9,3,'Biology','BIOL104','Fall/Spring','General Biology'),(10,3,'Mathematics','MATH30','Fall/Spring','Calculus I');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (23);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `id` bigint(20) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (11,'Computer Science',2,NULL,NULL,NULL),(12,'Computer Science',7,NULL,NULL,NULL),(13,'Business',5,NULL,NULL,NULL),(14,'Art',2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section` (
  `id` bigint(20) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `course_id` bigint(20) NOT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `section_id` bigint(20) NOT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `timeslot` varchar(255) DEFAULT NULL,
  `year` int(11) NOT NULL,
  `days` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,30,1,'CS160',1,'Spring','9am - 10:15am',2021,'M/W'),(2,50,1,'CS160',2,'Spring','9am - 10:15am',2021,'M/W'),(3,30,1,'CS160',3,'Spring','3pm - 4:15pm',2021,'M/W'),(4,30,2,'CS146',1,'Spring','3pm - 4:15pm',2021,'M/W'),(5,30,2,'CS146',2,'Spring','3pm - 4:15pm',2021,'M/W'),(6,50,2,'CS146',3,'Spring','10am - 11:15am',2021,'M/W'),(7,50,3,'CS151',1,'Spring','6pm - 7:15pm',2021,'T/Th'),(8,100,3,'CS151',2,'Spring','10am - 11:15am',2021,'T/Th'),(9,100,3,'CS151',3,'Fall','10am - 11:15am',2020,'T/Th'),(10,30,4,'CS154',1,'Spring','6pm - 7:15pm',2021,'T/Th'),(11,30,4,'CS154',2,'Spring','9am - 10:15am',2021,'T/Th'),(12,50,5,'CS153',2,'Fall','9am - 10:15am',2019,'M/W'),(13,30,6,'CS156',1,'Spring','3pm - 4:15pm',2021,'M/W'),(14,40,6,'CS156',2,'Spring','11am - 15am',2021,'F'),(15,50,7,'CS166',1,'Spring','3pm - 4:15pm',2021,'T/Th'),(16,30,7,'CS166',2,'Spring','10am - 11:15am',2021,'T/Th'),(17,50,7,'CS166',3,'Fall','6pm - 10:15pm',2021,'F/Sat'),(18,50,8,'ECON104',1,'Spring','10am - 11:15am',2021,'T/Th'),(19,30,9,'BIOL104',1,'Spring','1pm - 6pm',2021,'F'),(20,30,9,'BIOL104',2,'Spring','6pm - 7:15pm',2021,'T/Th'),(21,50,9,'BIOL104',3,'Fall','9am - 10:15am',2021,'T/Th'),(22,30,10,'MATH30',1,'Spring','10am - 11:15am',2021,'M/W'),(23,50,10,'MATH30',2,'Spring','6pm - 10:15pm',2021,'F/Sat'),(24,50,10,'MATH30',3,'Spring','10am - 11:15am',2021,'M/W'),(25,40,10,'MATH30',4,'Spring','1pm - 6pm',2021,'F'),(26,30,10,'MATH30',5,'Fall','6pm - 7:15pm',2020,'T/Th');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` bigint(20) NOT NULL,
  `major` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Computer Science',4,NULL,NULL,NULL),(2,'Computer Science',4,NULL,NULL,NULL),(3,'Computer Science',4,NULL,NULL,NULL),(4,'Applied Math',3,NULL,NULL,NULL),(5,'Computer Science',2,NULL,NULL,NULL),(6,'Psychology',4,NULL,NULL,NULL);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takes`
--

DROP TABLE IF EXISTS `takes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `takes` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  `course_id` bigint(20) NOT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `section_id` bigint(20) NOT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `year` int(11) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `timeslot` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takes`
--

LOCK TABLES `takes` WRITE;
/*!40000 ALTER TABLE `takes` DISABLE KEYS */;
INSERT INTO `takes` VALUES (1,1,1,'CS160',NULL,1,'Spring',2021,NULL,NULL),(1,2,1,'CS160',NULL,1,'Spring',2021,NULL,NULL),(1,3,1,'CS160',NULL,1,'Spring',2021,NULL,NULL),(1,4,1,'CS160',NULL,1,'Spring',2021,NULL,NULL),(5,4,2,'CS146',NULL,2,'Spring',2021,NULL,NULL),(5,5,2,'CS146',NULL,2,'Spring',2021,NULL,NULL),(5,6,2,'CS146',NULL,2,'Spring',2021,NULL,NULL),(10,7,4,'CS154',NULL,1,'Spring',2021,NULL,NULL),(19,7,9,'BIOL104',NULL,1,'Spring',2021,NULL,NULL);
/*!40000 ALTER TABLE `takes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teaches`
--

DROP TABLE IF EXISTS `teaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teaches` (
  `course_id` bigint(20) NOT NULL,
  `id` bigint(20) NOT NULL,
  `section_id` bigint(20) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`course_id`,`id`,`section_id`,`semester`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teaches`
--

LOCK TABLES `teaches` WRITE;
/*!40000 ALTER TABLE `teaches` DISABLE KEYS */;
/*!40000 ALTER TABLE `teaches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-03 23:39:27
-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: usersDB
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (45);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Milano123!','student','0d21!@','gyohogo@sjsu.edu','Gyoho','Go'),(2,'manche@ster6^!','student','dbi21!','shotaro.kuma@sjsu.edu','Shotaro','Kumazawa'),(3,'dwqg21*(0','student','biwq$1','alvin.lu@gmail.com','Alvin','Lu'),(4,'F!^g18A0','student','biud2!','bjtagurung@gmail.com','Bjta','Gurung'),(5,'Tys&*jI49','student','vwq&!','monica.beru@gmail.com','Monica','Berucci'),(6,'blowmonkeys1!','student','juuu!','yaofengwu.wu@sjsu.edu','Yaofeng','Wu'),(7,'Syu2w!@78','student','iisqw','aryan1@yahoo.com','Aryan','Visard'),(8,'dbxwq&*@^!','student','dbqwi','bella.cho@gmail.com','Bella','Cho'),(9,'Syu2e21!@78','student','bkdsj!','hiroyuki@gmail.com','Hiroyuki','Nishimura'),(10,'dwqvyi21&*','student','cw231','ryotsu@yahoo.com','Ryotsu','kankichi'),(11,'TFye[i21*','professor','e21dw!','karra@sjsu.edu','Karra','Shallion'),(12,'BW1yI@O&8qw12','professor','dwqc!','fabio.diroia@sjsu.edu','Fabio','Deroia'),(13,'e21#(!@78','professor','bnfu','clare.nguyen@gmail.com','Clare','Nguyen'),(14,'dbe21`*099w','professor','fgiue','louren.sai@gmail.com','Loulen','Sai'),(15,'E@D!V7978n','professor','cbekc','tech.soo@sjsu.edu','Soo','Tech'),(16,'dvy1uefvwc','professor','cewcc','yunchen@sjsu.edu','Yun','Chen'),(17,'E@D!V7978n','professor','ceivc','tech.soo@sjsu.edu','Soo','Tech'),(18,'dwqiy&*@!','professor','ceiow','choi.chris@gmail.com','Chris','Choi'),(19,'iyfd&*!~wsq','professor','8972x','kim.summi@sjsu.edu','Summi','Kim');
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

-- Dump completed on 2021-05-03 23:39:28
