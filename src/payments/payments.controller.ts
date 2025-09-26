import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/paymentSession.dto';

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
}
