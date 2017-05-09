## Northcoders News API

Northcoders News API is a RESTful API created in Node.js using Express.js, MongoDB and Mongoose. This is the back end of the Northcoders News application which provides the application content to the [front end](https://github.com/Nick-Watson/w06-northcoders-news/tree/remote-week) React components. The MongoDB datbase is hosted on mLabs and the API is deployed on Heroku.

API link: [https://aqueous-forest-58725.herokuapp.com/api](https://aqueous-forest-58725.herokuapp.com/api)

The API is tested using Mocha, Chai and Supertest. If you would like to see the tests please follow the instructions below and ensure you have Node v7.0.0 (or later) and [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) installed and running.

``````
git clone https://github.com/Nick-Watson/wk07sprint03_northcoders_news_api_feb2017 ncn_api

cd ncn_api

npm install

npm test
```````

### Routes

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
