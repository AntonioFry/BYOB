# Build Your Own Backend

## Overview

Build Your Own Backend is a RESTful API that is a demonstration of my early knowldege of node js and backend concepts. The data in my API only deals with a singular one-to-many relationship consisting of musical artists and albums. The API allows you to GET, POST, and DELETE from each data set.

## Tools
- Express
- Node js
- knex
- PostgresSQL

## Lerning Goals
- Building out modular endpoints
- Knex migration workflow
- Building out a seeding function
- Seeding data 

## Documentation

### GET

#### Artists(all)

Endpoint:
```
/api/v1/artists
```
This endpoint pulls all the data from the 'artists' dataset. The result should be an array of multiple objects.

Example response:
```
[
    {
        "id": 44,
        "artist_name": "Led Zepplin",
        "genre": "Classic Rock",
        "member_count": 8,
        "year_formed": 1968,
        "created_at": "2019-08-18T06:37:48.087Z",
        "updated_at": "2019-08-18T06:37:48.087Z"
    },
    {
        "id": 45,
        "artist_name": "Black Sabbath",
        "genre": "Hard Rock",
        "member_count": 21,
        "year_formed": 1968,
        "created_at": "2019-08-18T06:37:48.102Z",
        "updated_at": "2019-08-18T06:37:48.102Z"
    },
    {
        "id": 46,
        "artist_name": "Fingers of the Sun",
        "genre": "Psychedelic",
        "member_count": 6,
        "year_formed": 2010,
        "created_at": "2019-08-18T06:37:48.108Z",
        "updated_at": "2019-08-18T06:37:48.108Z"
    }
]
```

#### Albums(all)

Endpoint:
```
/api/v1/albums
```
This endpoint pulls all the data from the 'albums' dataset. The result should be an array of multiple objects.

Example response:
```
[
    {
        "id": 38,
        "album_name": "Led Zepplin IV",
        "track_count": 8,
        "year_released": 1971,
        "created_at": "2019-08-18T06:37:48.145Z",
        "updated_at": "2019-08-18T06:37:48.145Z",
        "artist_id": 44
    },
    {
        "id": 39,
        "album_name": "The Song Remains The Same (2018 Remaster)",
        "track_count": 15,
        "year_released": 1976,
        "created_at": "2019-08-18T06:37:48.146Z",
        "updated_at": "2019-08-18T06:37:48.146Z",
        "artist_id": 44
    },
    {
        "id": 40,
        "album_name": "Paranoid (2014 Remaster)",
        "track_count": 8,
        "year_released": 1970,
        "created_at": "2019-08-18T06:37:48.147Z",
        "updated_at": "2019-08-18T06:37:48.147Z",
        "artist_id": 45
    }
]
```

#### Artists(singular)

Endpoint:
```
/api/v1/artists/:id
```
This endpoint pulls a singular artist from all of the dataset given their id. The result should be an object.

Example response:
```
{
    "id": 44,
    "artist_name": "Led Zepplin",
    "genre": "Classic Rock",
    "member_count": 8,
    "year_formed": 1968,
    "created_at": "2019-08-18T06:37:48.087Z",
    "updated_at": "2019-08-18T06:37:48.087Z"
}
```

#### Albums(singular)

Endpoint:
```
/api/v1/albums/:id
```
This endpoint pulls a singular album from all of the dataset given their id. The result should be an object.

Example response:
```
{
    "id": 39,
    "album_name": "The Song Remains The Same (2018 Remaster)",
    "track_count": 15,
    "year_released": 1976,
    "created_at": "2019-08-18T06:37:48.146Z",
    "updated_at": "2019-08-18T06:37:48.146Z",
    "artist_id": 44
}
```

### POST

#### Artists

Endpoint:
```
/api/v1/artists
```
This endpoint posts to the 'artists' dataset given a body in json format. the response is the parsed data that got inserted.

Example body:
```
{
	"artist": {
		"artist_name": "Childish Gambino",
		"genre": "Rap",
		"member_count": 1,
		"year_formed": 2008
	},
	"albums": ["something", "Camp"]
}
```

Example response:
```
{
    "artist_name": "Childish Gambino",
    "genre": "Rap",
    "member_count": 1,
    "year_formed": 2008
}
```

#### Albums

Endpoint:
```
/api/v1/albums
```
This endpoint posts to the 'albums' dataset given a body in json format. the response is the parsed data that got inserted.

Example body:
```
{
	"bodyAlbum": {
	  "album_name": "new",
	  "track_count": 9,
	  "year_released": 1973
	},
	"artistName": "Steve Miller Band"
}
```

Example response:
```
{
    "album_name": "new",
    "track_count": 9,
    "year_released": 1973
}
```

### DELETE

#### Artists

Endpoint:
```
/api/v1/artists/:id
```

Given an id the user should be able to delete a specific artist. The response will be the id of the deleted artist.

Example response:
```
11
```

#### Albums

Endpoint:
```
/api/v1/albums/:id
```

Given an id the user should be able to delete a specific album. The response will be the id of the deleted albums.

Example response:
```
11
```