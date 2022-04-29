const Joi = require("joi");

const assetsQuotesQueryDefaults = ["BTC", "ETH"];
const assetsQuotesQuerySchema = Joi.object({
  assets: Joi.array()
    .items(...assetsQuotesQueryDefaults)
    .default(assetsQuotesQueryDefaults),
});

const historicalParamsSchema = Joi.object({
  timestamp: Joi.number().required(),
  asset: Joi.string()
    .allow(...assetsQuotesQueryDefaults)
    .required(),
});

module.exports = {
  assetsQuotesQuerySchema,
  historicalParamsSchema,
};
