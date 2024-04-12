import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotController } from './controllers/bot.controller';
import { ExchangeController } from './controllers/exchange.controller';
import { OrderController } from './controllers/order.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
// mexc
import { MexcOrderService } from './service/exchanges/mexc/order.service';
import { MexcExchangeService } from './service/exchanges/mexc/exchange.service';
// kucoin
import { kucoinOrderService } from './service/exchanges/kucoin/order.service';
import { kucoinExchangeService } from './service/exchanges/kucoin/exchange.service';

// interface
import { IBotService } from './service/bot.interface';
import { IExchangeService } from './service/exchange.interface';
import { BaseOrderServices } from './service/baseOrder.services';
import { BaseExchangeServices } from './service/baseExchange.services';
import { WinstonConfig } from './service/logger/winston.config';
import { MexcBotService } from './service/exchanges/mexc/bot.service';
import { kucoinBotService } from './service/exchanges/kucoin/bot.service';
import { AuthService } from './service/auth/auth.service';

// jwtAuth
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './service/auth/constants';
import { JwtStrategy } from './service/auth/strategies/jwt-strategy';
import { RefreshJwtStrategy } from './service/auth/strategies/refreshToken.strategy';
import { AuthController } from './controllers/auth.controller';

// bullMQ
import { BullModule } from '@nestjs/bull';
import { BotsProcessing } from './service/bot.process';



@Module({
  imports: [
    // config
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    // JWT
    JwtModule.register(
      {
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86000s' }
      }),

    // BULLMQ
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },}),
      BullModule.registerQueue({
        name: 'bot-queue',
        defaultJobOptions: {
          attempts: 2
        }
      }),
    
    HttpModule
  ],
  controllers: [AppController, BotController, ExchangeController, OrderController ,AuthController],

  providers:
    [
      AppService,AuthService,  JwtStrategy , RefreshJwtStrategy,BotsProcessing,

      {
        provide: 'IOrderService', 
        useClass:
          process.env.excahnge === 'MEXC'
            ? MexcOrderService: process.env.excahnge === 'KUCOIN'
            ? kucoinOrderService: MexcOrderService
      },

      {
      provide:'IExchangeService',useClass:
      process.env.excahnge === 'MEXC'
      ? MexcExchangeService:kucoinExchangeService
      },  

      WinstonConfig,
      {
      provide:'IBotService',useClass:
      process.env.excahnge === 'MEXC'
      ? MexcBotService:kucoinBotService
      },  
      
    
    ],
    exports: [WinstonConfig]
})
export class AppModule { }
