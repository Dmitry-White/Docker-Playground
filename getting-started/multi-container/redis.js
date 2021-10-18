const redis = require("redis");
const { promisify } = require("util");

const redisPort = process.env.REDIS_PORT || 6379;
const redisHostname = "redis";

const client = redis.createClient(redisPort, redisHostname);

client.on("connect", () => {
  logger.info("Connected!");
});

client.on("error", (error) => {
  logger.error(error);
});

const incrAsync = promisify(client.incr).bind(client);

module.exports = {
  client,
  incrAsync,
};
