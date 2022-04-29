const Express = require("express");
var cors = require("cors");

const {
  assetsQuotesQuerySchema,
  historicalParamsSchema,
} = require("./validation-schemas");

const {
  getQuotes,
  getQuotesHistorical,
} = require("./services/quotes/quotes.service");

const PORT = 4000;

const app = Express();

app.use(cors());

// Configs
app.use(Express.json());
app.use(
  Express.urlencoded({
    extended: true,
  })
);

//get data
app.get("/assets/quotes", (req, res) => {
  const { value: query, error } = assetsQuotesQuerySchema.validate(req.query);

  if (error) {
    res.status(400).send(error);
    return;
  }

  console.log("QUERY", query);

  getQuotes(query.assets)
    .then((quotes) => {
      res.status(200).send(quotes);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

//get data at some point in time

app.get("/assets/quotes/historical/:asset/:timestamp", (req, res) => {
  const { value: params, error } = historicalParamsSchema.validate(req.params);
  if (error) {
    res.status(400).send(error);
    return;
  }
  getQuotesHistorical(params.asset, params.timestamp)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send(e);
    });
});

app.listen(PORT, () => {
  console.log(`cryptoapi is listening on port: ${PORT}`);
});
