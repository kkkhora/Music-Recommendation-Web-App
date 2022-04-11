# CIS550-22Spring-GroupProject

This is a private repository for group project of CIS 550 in 2022 Spring.

## File List and Description

| File Name | Description |
| --- | --- |
| *DataImport.sql* | SQL script for importing data to AWS-hosted RDS instance. |
| *DataNormalization.sql* | SQL script for normalizing data from orginal tables. |

## Database and Dataset Description

### AWS RDS Instance Access

```
Endpoint: aws-rds-mysql-1.cbfipmkivdxm.us-east-1.rds.amazonaws.com
Port: 3306
Username: admin
Password: Group550-project
```

### Dataset Description

*Song_info.csv*

Row number: 23899

```
SELECT COUNT(*) FROM Song_info;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Song_ID** | *varchar(100)* | Unique ID of each song. |

*Artist_info_dedup.csv*

Row number: 9072

```
SELECT COUNT(*) FROM Artist_info_dedup;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Artist_ID** | *varchar(100)* | Unique ID of each artist. |

*Album_info_dedup.csv*

Row number: 18719

```
SELECT COUNT(*) FROM Album_info_dedup;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Album_id** | *varchar(100)* | Unique ID of each album. |