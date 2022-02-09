import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Tweet, TweetDocument } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name)
    private TweetModel: Model<TweetDocument>,
  ) {}

  create(createTweetDto: CreateTweetDto) {
    return this.TweetModel.create(createTweetDto);
  }

  findAll(
    { offset, limit }: { offset: number; limit: number } = {
      offset: 0,
      limit: 0,
    },
  ) {
    return this.TweetModel.find()
      .skip(offset)
      .limit(limit)
      .sort({ CreatedAt: -1 })
      .exec();
  }
}
