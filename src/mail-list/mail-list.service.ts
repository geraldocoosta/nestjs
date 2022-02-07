import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMailListDto } from './dto/create-mail-list.dto';
import { MailList, MailListDocument } from './schemas/mail-list.schema';

@Injectable()
export class MailListService {
  constructor(
    @InjectModel(MailList.name) private mailModel: Model<MailListDocument>,
  ) {}

  async create({ emails }: CreateMailListDto) {
    const mail = await this.findOne();
    console.log(mail);
    if (!mail) {
      return this.mailModel.create({ emails });
    }
    console.log(emails);
    await mail.update({ emails }).exec();
    return this.findOne();
  }

  async findOne() {
    const mails = await this.mailModel.find().exec();
    return mails.length ? mails[0] : null;
  }
}
