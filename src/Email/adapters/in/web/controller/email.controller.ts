import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SendEmailRequest } from './dto/request/send.email.request';
import { SendEmailInputPort } from 'src/Email/core/ports/in/SendEmailInputPort';
import { EmailMapper } from './dto/email.mapper';
import { LoggerService } from 'src/Logger/logger.service';

@Controller('email')
export class mailController {
  constructor(
    @Inject('SendEmailInputPort')
    private readonly sendMailUsecase: SendEmailInputPort,
    private readonly emailMapper: EmailMapper,

  ) { }
  // receber o email via param, talvez criptar o email com o bcrypt com uma chave que só os dois microserviços sabem. Talvez externalizar essa chave também.
  @Post('/send')
  public sendMail(@Body() request: SendEmailRequest) {
    const logger = LoggerService.getLogger();
    console.log(request);
    logger.log('rota /send enviado');
    const emailModelIn =
      this.emailMapper.SendEmailRequestToEmailModelIn(request);
    return this.sendMailUsecase.execute(emailModelIn);
  }
}
