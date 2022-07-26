

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

#### Table: Song_info

Row number: 23899

```
SELECT COUNT(*) FROM Song_info;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Song_ID** | *varchar(100)* | Unique ID of each song. |
| **Song_name** | *varchar(100)* |  |
| **Song_genre** | *varchar(100)* |  |
| **Acousticness** | *decimal(4,4)* |  |
| **Valence** | *decimal(4,4)* |  |
| **Danceability** | *decimal(4,4)* |  |
| **Energy** | *decimal(6,6)* |  |
| **Instrumentalness** | *decimal(8,8)* |  |
| **Liveness** | *decimal(4,4)* |  |
| **Loudness** | *decimal(10,3)* |  |
| **Speechiness** | *decimal(6,6)* |  |
| **Tempo** | *decimal(10,3)* |  |
| **Duration** | *int* |  |
| **Key_pitch** | *int* |  |
| **H_s** | *varchar(1)* |  |

#### Table: Artist_info_dedup

Row number: 9072

```
SELECT COUNT(*) FROM Artist_info_dedup;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Artist_ID** | *varchar(100)* | Unique ID of each artist. |
| **Artist_name** | *varchar(100)* |  |
| **Artist_genre** | *varchar(100)* |  |
| **Artist_image** | *varchar(100)* |  |
| **Artist_country** | *varchar(4)* |  |

#### Table: Album_info_dedup

Row number: 18719

```
SELECT COUNT(*) FROM Album_info_dedup;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Album_id** | *varchar(100)* | Unique ID of each album. |
| **Album_name** | *varchar(100)* |  |
| **Album_year** | *int* |  |
| **Track_image** | *varchar(100)* |  |

#### Table: Master_table

Row number: 23899

```
SELECT COUNT(*) FROM Master_table;
```

| Attribute Name | Data Type | Description
| --- | --- | --- |
| **Song_ID** | *varchar(100)* |  |
| **Album_id** | *varchar(100)* |  |
| **Artist_id** | *varchar(100)* |  |
