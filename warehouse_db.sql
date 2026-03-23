-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `pno` varchar(45) NOT NULL,
  `sno` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `wno` varchar(45) NOT NULL,
  PRIMARY KEY (`pno`,`sno`,`wno`),
  KEY `iw_idx` (`wno`),
  KEY `is_idx` (`sno`),
  CONSTRAINT `is` FOREIGN KEY (`sno`) REFERENCES `supplier` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `iw` FOREIGN KEY (`wno`) REFERENCES `warehouse` (`wno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('1134','2',20200,'1'),('114','114514',99999899,'1');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `userName` varchar(50) NOT NULL,
  `userPwd` varchar(50) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('','11223344','supplier'),('\'\'\'root','1','wm'),('1','','supplier'),('11','11','supplier'),('admin','12345','wm'),('hh','hh','wm'),('hhh','hhh','supplier'),('kky','123456','supplier'),('root','root','wm'),('roott','1','wm'),('xk','xk','supplier'),('xukai','hhhh','supplier'),('yzh','111','wm'),('zhangxiaohang','123','supplier'),('徐凯qaq','123','wm'),('李小米','1','supplier'),('王小明','1','supplier');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_table`
--

DROP TABLE IF EXISTS `new_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_table` (
  `sno` char(8) NOT NULL,
  PRIMARY KEY (`sno`),
  CONSTRAINT `C1` CHECK ((`sno` between _utf8mb4'10000' and _utf8mb4'29999'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_table`
--

LOCK TABLES `new_table` WRITE;
/*!40000 ALTER TABLE `new_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `new_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_form`
--

DROP TABLE IF EXISTS `order_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_form` (
  `oid` int NOT NULL AUTO_INCREMENT,
  `sno` varchar(45) NOT NULL,
  `pno` varchar(45) NOT NULL,
  `wno` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `state` varchar(20) NOT NULL,
  PRIMARY KEY (`oid`),
  KEY `os_idx` (`sno`),
  KEY `ow_idx` (`wno`),
  CONSTRAINT `os` FOREIGN KEY (`sno`) REFERENCES `supplier` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ow` FOREIGN KEY (`wno`) REFERENCES `warehouse` (`wno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_form`
--

LOCK TABLES `order_form` WRITE;
/*!40000 ALTER TABLE `order_form` DISABLE KEYS */;
INSERT INTO `order_form` VALUES (4,'2','1134','1',200,'已入库'),(6,'2','1134','1',20000,'已入库'),(7,'114514','114','1',99999899,'已入库'),(8,'123','1111','1',11111,'已入库');
/*!40000 ALTER TABLE `order_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_list`
--

DROP TABLE IF EXISTS `part_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `part_list` (
  `pno` varchar(45) NOT NULL,
  `pname` varchar(45) NOT NULL,
  `unit_price` varchar(45) NOT NULL,
  `size` varchar(45) NOT NULL,
  `describes` varchar(50) NOT NULL DEFAULT '无',
  `sno` varchar(45) NOT NULL,
  PRIMARY KEY (`pno`,`sno`),
  KEY `sno_idx` (`sno`),
  CONSTRAINT `sno` FOREIGN KEY (`sno`) REFERENCES `supplier` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_list`
--

LOCK TABLES `part_list` WRITE;
/*!40000 ALTER TABLE `part_list` DISABLE KEYS */;
INSERT INTO `part_list` VALUES ('\'\'\'','ddd','1','1','无','2'),('0001','kky02','999999999999999999','0,000000000000001','ddd','qwerty'),('0002','kky03','13','\\n 12','无','qwerty'),('1111','111','111','111','111','123'),('1134','ddd','110','10','12','2'),('11344','ddd','11','11','ddd','1'),('1135','好好','10','10','无','2'),('114','苹果','514','191','无','114514'),('11414','大力王','10','10','what is love','2'),('1145','螺母','2','20','很耐用','1'),('1145','大力王','10','10','what is love','2'),('514','香蕉','100','100','大','114514'),('6','1','1','1','1','2');
/*!40000 ALTER TABLE `part_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `pid` varchar(45) NOT NULL,
  `budget` varchar(45) NOT NULL,
  `date` varchar(45) NOT NULL,
  `sno` varchar(45) NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `sno1_idx` (`sno`),
  CONSTRAINT `sno1` FOREIGN KEY (`sno`) REFERENCES `supplier` (`sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('1','100000','北京时间 2130年1月30日','2'),('100','10','北京时间 2022年1月20日','114514'),('1145','200','北京时间 2020年1月2日','1'),('1145`14\'\'\'\'','2000','北京时间 2022年1月\'\'\'日','qwerty'),('2','2000','北京时间 2022年1月30日','2'),('3','10000','北京时间 2022年1月30日','2'),('4','10000','北京时间 2022年1月30日','2');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `sno` varchar(45) NOT NULL,
  `sname` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `userName` varchar(50) NOT NULL,
  PRIMARY KEY (`sno`),
  KEY `userName_idx` (`userName`),
  CONSTRAINT `userName1` FOREIGN KEY (`userName`) REFERENCES `login` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('1','张三','南航','100086','11'),('114514','wang','1','1','王小明'),('123','123','123','123','1'),('2','徐凯','地对地导弹','047232','xk'),('qwerty','kky01','hhhhhh','1112223344','kky');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse` (
  `wno` varchar(45) NOT NULL,
  `square` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `noa` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`wno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouse`
--

LOCK TABLES `warehouse` WRITE;
/*!40000 ALTER TABLE `warehouse` DISABLE KEYS */;
INSERT INTO `warehouse` VALUES ('1','200','10086',4),('2','20000','047232',0),('6','20000','1',0);
/*!40000 ALTER TABLE `warehouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wm`
--

DROP TABLE IF EXISTS `wm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wm` (
  `wmno` varchar(45) NOT NULL,
  `wname` varchar(45) NOT NULL,
  `profession` varchar(20) NOT NULL,
  `leader` varchar(45) NOT NULL,
  `wno` varchar(45) NOT NULL,
  `userName` varchar(50) NOT NULL,
  PRIMARY KEY (`wmno`),
  KEY `userName_idx` (`userName`),
  KEY `wno_idx` (`wno`),
  CONSTRAINT `userName2` FOREIGN KEY (`userName`) REFERENCES `login` (`userName`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ww` FOREIGN KEY (`wno`) REFERENCES `warehouse` (`wno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wm`
--

LOCK TABLES `wm` WRITE;
/*!40000 ALTER TABLE `wm` DISABLE KEYS */;
INSERT INTO `wm` VALUES ('0','zhangsan','police','无','1','\'\'\'root'),('2','张三','管理员','2','2','hh'),('3','cherry','蜀黍','无','1','root'),('baba','baba','banana','baba','1','admin');
/*!40000 ALTER TABLE `wm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-01 19:39:09
