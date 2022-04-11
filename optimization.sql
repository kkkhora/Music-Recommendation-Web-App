SELECT Artist_name
FROM Artist_info_dedup
WHERE Artist_country = 'JP';

CREATE  index country_index ON Artist_info_dedup(Artist_country);

SELECT Artist_name
FROM Artist_info_dedup
WHERE Artist_country = 'JP';

DROP INDEX country_index ON Artist_info_dedup;
