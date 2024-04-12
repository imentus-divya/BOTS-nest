import { Injectable } from '@nestjs/common';
import { IOrderService } from '../../order.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { Console } from 'console';
import { BaseOrderServices} from 'src/service/baseOrder.services';


@Injectable()
export class MexcOrderService  extends BaseOrderServices
{
    
    async OrderBook()
    {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~``MEXC ORDER SERVICE~~~~~~~~~~~~~~~~~~~~~~~~');

    const url=await this.config.get('mexc_order_book')
    // const url=await this.config.get('kucoin_order_book')

     console.log("🚀 ~ url:", url)
     const order_book=await this.httpService.axiosRef.get(url)
     console.log("🚀 ~ order_book:", order_book.data)
     return order_book.data;

    }

 



    
}
