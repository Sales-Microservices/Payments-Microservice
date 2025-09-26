import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/paymentSession.dto';
import { Request, Response } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSession: PaymentSessionDto) {
    return this.paymentsService.createPaymentSession(paymentSession);
  }

  @Post('success')
  success() {
    return { message: 'Payment successful' };
  }

  @Post('cancel')
  cancel() {
    return { message: 'Payment cancelled' };
  }

  @Post('webhook')
  async stripeWebhook(@Req() req: Request, @Res() res: Response) {
    return this.paymentsService.stripeWebhook(req, res);
  }
}
