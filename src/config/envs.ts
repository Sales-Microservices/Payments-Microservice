import Joi from "joi";

interface EnvConfig {
    PORT: number;
    STRIPE_SECRET: string;

}

const envSchema: Joi.ObjectSchema<EnvConfig> = Joi.object({
    PORT: Joi.number().required(),
    STRIPE_SECRET: Joi.string().required(),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig: EnvConfig = {
    PORT: value.PORT,
    STRIPE_SECRET: value.STRIPE_SECRET,
};

export const envs = {
    port: envConfig.PORT,
    stripeSecret: envConfig.STRIPE_SECRET,
};