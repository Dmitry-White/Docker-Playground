const express = require("express");
const os = require("os");
const morgan = require("morgan");

const { incrAsync } = require("./redis");

const port = process.env.PORT || 5000;
const message =
  process.env.MESSAGE ||
  "Hit refresh if you think Sunderland is the greatest football team in the world.";
const hostname = os.hostname();

const app = express();

app.use(morgan("combined"));

const getHitCount = async () => {
  let retries = 5;

  try {
    const count = await incrAsync("hits");
    return count;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    retries -= 1;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
};

app.get("/", async (req, res) => {
  const count = await getHitCount();

  res.send(`${message} You've only refreshed ${count} times. REFRESH MORE!!!`);
});

app.listen(port, () => {
  console.log(`Listening on: http://${hostname}:${port}`);
});
