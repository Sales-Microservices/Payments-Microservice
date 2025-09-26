import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/paymentSession.dto';

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
}

