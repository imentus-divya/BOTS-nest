import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { BaseExchangeServices } from 'src/service/baseExchange.services';

@Injectable()
export class kucoinExchangeService extends BaseExchangeServices
{
    async ExchangePair()
    {
     console.log('~~~~~~~~~~~~~Market Data of Kucoin (OVERIDDEN) ~~~~~~~~~~~~')
     const url=await this.config.get('kucoin_market')
     const exchange_pair=await this.httpService.axiosRef.get(url)
     console.log("🚀 ~  exchange_pair: (OVERIDDEN) METHOD", exchange_pair.data)
     return exchange_pair.data;
    }


}
