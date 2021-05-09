This is a cryptocurrency exchange website called "MoonBase."

## Getting Started for Development

First, for run the development server:

```bash
npm run dev
```

then start MonogoDB.

```
docker run --name mongo -p 27017:27017 --rm -it -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo
```

____

## Getting Started for Docker-compose

```
 docker-compose -f moon-base.dockerapp/docker-compose.yml up
 ```

## Home page

```
http://localhost:3000/
```

## How to add coin

Add coin 

```
http://localhost:3000/api/addMoon?amount=450&initPrice=2&riseEvery=100
```
- amount -> moon base amount to be added
- initPrice -> initial price
- riseEvery -> rise 10% every base moon amount


## Run a unit test

```
npm run test
```

