import { Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/paymentSession.dto';
import { Request, Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-session')
  @MessagePattern('create-payment-session')
  createPaymentSession(@Payload() paymentSession: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSession);
  }

  @Post('success')
  @MessagePattern('payment-success')
  success() {
    return { message: 'Payment successful' };
  }

  @Post('cancel')
  @MessagePattern('payment-cancel')
  cancel() {
    return { message: 'Payment cancelled' };
  }

  @Post('webhook')
  @MessagePattern('stripe-webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}
