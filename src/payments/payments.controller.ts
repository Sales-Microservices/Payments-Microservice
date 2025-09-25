import { Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('create-payment-session')
  createPaymentSession() {
    return this.paymentsService.createPaymentSession();
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
