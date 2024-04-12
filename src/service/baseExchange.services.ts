import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { IExchangeService } from './exchange.interface';
import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { WinstonConfig } from '../service/logger/winston.config';
@Injectable()
export abstract class BaseExchangeServices implements IExchangeService

    {
        constructor(
         protected config:ConfigService,      
         protected httpService:HttpService,
         public winstonConfig:WinstonConfig
        ){}

      async ExchangePair()
       {
        console.log('~~~~~~~~~~~~~Market Data of Kucoin~~~~~~~~~~~~')
        const url=await this.config.get('kucoin_market')
        const exchange_pair=await this.httpService.axiosRef.get(url)
        console.log("🚀 ~  exchange_pair:", exchange_pair.data)
        return exchange_pair.data
    }
  }