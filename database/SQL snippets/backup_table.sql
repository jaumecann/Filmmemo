SELECT * INTO FilmRecordBackup FROM FilmRecord


--This makes a copy of table mytable, and every row in it, called mytable_backup. It will not copy any indices, constraints, etc., just the structure and data.
--Note that this will not work if you have an existing table named mytable_backup, 
--so if you want to use this code regularly (for example, to backup daily or monthly), you'll need to run drop mytable_backup first.