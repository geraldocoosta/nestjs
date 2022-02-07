import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { MailListService } from './mail-list.service';

@Processor('emails')
export class SendMailTweetsJob {
  constructor(private mailListService: MailListService) {}

  @Process()
  async handle(job: Job) {
    const mailList = await this.mailListService.findOne();
    console.log(`emails retornados: ${mailList}`);
    console.log('kafka para enviar a mensagem');
  }
}