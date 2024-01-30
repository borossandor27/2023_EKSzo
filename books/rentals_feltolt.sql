DROP PROCEDURE IF EXISTS rentalsFeltolt;
SET DELIMITER $$
CREATE PROCEDURE `rentalsFeltolt`(IN `db` INT)
    MODIFIES SQL DATA
BEGIN
DECLARE tol date;
DECLARE ig date;
DECLARE nap int;
DECLARE i int DEFAULT 0;
ismetles:WHILE i<db DO
	INSERT INTO `rentals`(`id`, `book_id`, `start_date`,`end_date`) VALUES (NULL,FLOOR(RAND()*(SELECT COUNT(*) FROM books))+1,CURRENT_DATE - INTERVAL FLOOR(RAND() * 50) DAY,`start_date`+INTERVAL 14 DAY);
    SET i=i+1;
END WHILE ismetles;
END$$
DELIMITER ;