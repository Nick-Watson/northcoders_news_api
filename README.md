# Northcoders News API

Northcoders News API is the back-end of the Northcoders News project. This RESTful API is used to serve JSON data to the [front-end](https://github.com/Nick-Watson/w06-northcoders-news/tree/remote-week
) React UI. The API consists of a Express.js server and requests data from a MongoDB database. The API has been deployed on Heroku which can be found at [https://aqueous-forest-58725.herokuapp.com/api](https://aqueous-forest-58725.herokuapp.com/api). The MongoDB instance is hosted on mLabs and the server connects to it through the Mongoose module. 

### Prerequisites

Please ensure you have the following installed;

```
Node.js v7.0.0 or higher
```
Available [here](https://nodejs.org/en/download/current/)

```
MongoDB
```
Available [here](https://docs.mongodb.com/manual/administration/install-community/)

## Tests

The API has been tested and checked to make sure it responds with the correct status codes and data. The tests were conducted using Mocha, Chai and Supertest on a local MongoDB instance. To view the tests please follow the instructions below.

From the command line ensure you have MongoDB running locally;

````````
mongod
````````
Then in another shell window and in a directory of your choosing;

````````
git clone https://github.com/Nick-Watson/wk07sprint03_northcoders_news_api_feb2017 ncn_api

cd ncn_api

npm install 

npm test

````````

## Built With

* [Express](https://github.com/expressjs/express) - Server framework for Node
* [Mongoose](https://github.com/Automattic/mongoose) - MongoDB object modelling tool
* [async](https://github.com/caolan/async) - Asynchronus proccess helper
* [Supertest](https://github.com/visionmedia/supertest) - HTTP server testing in Node
* [Mocha](https://mochajs.org/) - Test framework
* [Chai](http://chaijs.com/) - Assertation library

## Routes

The availbale endpoints for the API are listed below;

```
GET /api/topics
```
Get all the topics

```
GET /api/topics/:topic_id/articles
```
Return all the articles for a certain topic

```
GET /api/articles
```
Returns all the articles

```
GET /api/articles/:article_id/comments
```
Get all the comments for a individual article

```
POST /api/articles/:article_id/comments
```
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

```
PUT /api/articles/:article_id
```
Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
e.g: /api/articles/:article_id?vote=up

```
PUT /api/comments/:comment_id
```
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
e.g: /api/comments/:comment_id?vote=down

```
DELETE /api/comments/:comment_id
```
Deletes a comment

