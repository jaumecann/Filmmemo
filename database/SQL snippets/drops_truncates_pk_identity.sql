

-->ADD IDENTITY (aUTOINCREMENT, ONLY WHEN CREATING)<--
--ALTER TABLE [Filmmemo].[dbo].[Directors] ADD id INT IDENTITY(1,1) NOT NULL

--ALTER TABLE [Filmmemo].[dbo].[Directors] DROP COLUMN id


--ALTER TABLE [Filmmemo].[dbo].[Directors] ADD PRIMARY KEY (id);

--TRUNCATE TABLE [Filmmemo].[dbo].[Directors]
