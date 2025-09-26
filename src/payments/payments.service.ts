import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/paymentSession.dto';
import { Request, Response } from 'express';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(
        envs.stripeSecret, // Especifica la versión de la API
    );

    async createPaymentSession(paymentSession: PaymentSessionDto) {
        const { currency, items } = paymentSession;
        const line_items = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: item.quantity,
        }));

        const session = await this.stripe.checkout.sessions.create({
            payment_intent_data: {
                metadata: {},
            },
            line_items: line_items,
            mode: 'payment',
            success_url: 'https://localhost:3003/payments/success',
            cancel_url: 'https://localhost:3003/payments/cancel',
        });
        return session;
    }

    async stripeWebhook(req: Request, res: Response) {
        const sig = req.headers['stripe-signature'];

        if (!sig || typeof sig !== 'string') {
            res.status(400).send('Webhook Error: Missing or invalid Stripe signature');
            return;
        }

        let event: Stripe.Event;

        // Real
        const endpointSecret = envs.stripeEndpointSecret;

        try {
            event = this.stripe.webhooks.constructEvent(
                req['rawBody'],
                sig,
                endpointSecret,
            );
        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        switch (event.type) {
            case 'charge.succeeded':
                const chargeSucceeded = event.data.object;
                // TODO: llamar nuestro microservicio
                console.log({
                    metadata: chargeSucceeded.metadata,
                    orderId: chargeSucceeded.metadata.orderId,
                });
                break;

            default:
                console.log(`Event ${event.type} not handled`);
        }

        return res.status(200).json({ sig });
    }
}

