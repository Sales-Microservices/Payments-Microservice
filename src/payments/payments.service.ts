import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(
        envs.stripeSecret
    )

    async createPaymentSession() {
        const session = await this.stripe.checkout.sessions.create({
            payment_intent_data: {
                metadata: {
                },
            },

            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,

                    },
                    quantity: 1,

                }
            ],
            mode: 'payment',
            success_url: 'https://localhost:3003/payments/success',
            cancel_url: 'https://localhost:3003/payments/cancel',
        })
        return { url: session.url }
    }
}

