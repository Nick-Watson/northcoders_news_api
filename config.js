module.exports = {
  DB: {
    test: 'mongodb://localhost/northcoders-news-api-test',
    dev: 'mongodb://nwat24:warrior2488@ds135830.mlab.com:35830/northcoders_news_api'
  },
  PORT: {
    test: 3090,
    dev: process.env.PORT
  }
};
