DROP SCHEMA IF EXISTS `meteo_db` ;
CREATE SCHEMA IF NOT EXISTS `meteo_db` DEFAULT CHARACTER SET utf8mb4 collate utf8mb4_unicode_ci;
USE `meteo_db` ;

CREATE TABLE IF NOT EXISTS `meteo_db`.`tele` (
  `id` INT NOT NULL AUTO_INCREMENT, 
  `sensor_id` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 ,
  `dt` DATETIME NOT NULL DEFAULT '2000-01-01 00:00:00',
  `temperature` SMALLINT(1) UNSIGNED  NOT NULL DEFAULT 0 ,
  `humidity` TINYINT(1) UNSIGNED  NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


# mysql 5.7: create user 'meteo_r'@'localhost' identified by '';
# mysql 8: create user 'meteo_r'@'localhost' identified with 'caching_sha2_password' by '';
create user 'meteo_r'@'localhost' identified with 'caching_sha2_password' by '';
grant select on meteo_db.* to meteo_r@'localhost';

# mysql 5.7: create user 'meteo_api'@'%' identified by 'pass';
create user 'meteo_api'@'%' identified with 'caching_sha2_password' by 'pass';
grant select, insert, update, delete on meteo_db.* to meteo_api@'%';

flush privileges;
show grants for 'meteo_r'@'localhost';
show grants for 'meteo_api'@'%';
