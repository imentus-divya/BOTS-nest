import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { IOrderService } from './order.interface';
//import { WinstonConfig } from 'winston.config';
import { Injectable } from '@nestjs/common';
import { WinstonConfig } from '../service/logger/winston.config';


@Injectable()
export abstract class BaseOrderServices implements IOrderService

    {
        public readonly logger = this.winstonConfig.createLogger();
        private kucoin_api_url = this.config.get('kucoin_base_URl')
        constructor(
            public readonly config:ConfigService,
            public readonly httpService:HttpService,
            public readonly winstonConfig: WinstonConfig,
        ){}

    // abstract AbstractMethod(): string;
        async OrderBook(pair:string)
        {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~BASE ORDER SERVICE~~~~~~~~~~~~~~~~~~~~~~~~');
        const url=await this.config.get('mexc_order_book')
        console.log("🚀 ~ url:", url)
        const order_book=await this.httpService.axiosRef.get(url)
        console.log("🚀 ~ order_book:", order_book.data)
        return order_book.data;
        }  

        async PlaceOrder() {
            this.logger.info('~🚀  PlaceOrder ~ In Progress . . . . . .')
            return 'place order in progress . . . .'
        }
        async CancelOrder()
        {
            this.logger.info('~🚀 CancelOrder  ~ In Progress . . . . . .')
            return 'CancelOrder in progress . . . .'
        }
        async OrderDetails(orderId)
        {
            this.logger.info( `${orderId}. . OrderDetails ...`);
            return `${orderId}. . OrderDetails ...`
        }

  }
