import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckNewTweetsTask } from './check-new-tweets/check-new-tweets.task';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import * as redisStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';

@Module({
  controllers: [TweetsController],
  providers: [TweetsService, CheckNewTweetsTask],
  imports: [
    MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      }),
    }),
    BullModule.registerQueue({
      name: 'emails',
    }),
  ],
})
export class TweetsModule {}
