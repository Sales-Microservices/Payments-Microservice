import Joi from "joi";

interface EnvConfig {
    PORT: number;
    STRIPE_SECRET: string;
    STRIPE_SUCCESS_URL: string;
    STRIPE_CANCEL_URL: string;
    STRIPE_ENDPOINT_SECRET: string;
}

const envSchema: Joi.ObjectSchema<EnvConfig> = Joi.object({
    PORT: Joi.number().required(),
    STRIPE_SECRET: Joi.string().required(),
    STRIPE_SUCCESS_URL: Joi.string().required(),
    STRIPE_CANCEL_URL: Joi.string().required(),
    STRIPE_ENDPOINT_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig: EnvConfig = {
    PORT: value.PORT,
    STRIPE_SECRET: value.STRIPE_SECRET,
    STRIPE_SUCCESS_URL: value.STRIPE_SUCCESS_URL,
    STRIPE_CANCEL_URL: value.STRIPE_CANCEL_URL,
    STRIPE_ENDPOINT_SECRET: value.STRIPE_ENDPOINT_SECRET,
};

export const envs = {
    port: envConfig.PORT,
    stripeSecret: envConfig.STRIPE_SECRET,
    stripeSuccessUrl: envConfig.STRIPE_SUCCESS_URL,
    stripeCancelUrl: envConfig.STRIPE_CANCEL_URL,
    stripeEndpointSecret: envConfig.STRIPE_ENDPOINT_SECRET,
};