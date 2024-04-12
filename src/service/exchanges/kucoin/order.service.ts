import { Injectable } from '@nestjs/common';
import { IOrderService } from 'src/service/order.interface';
import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { BaseOrderServices } from 'src/service/baseOrder.services';
import { json } from 'stream/consumers';

@Injectable()
export class kucoinOrderService extends BaseOrderServices
{
    private api_url = this.config.get('kucoin_base_url')

    async OrderBook(pair:string)
    {
        try{
            this.logger.info("🚀 ~ orderservice of kucoin ~ ");
            // this.logger.info("🚀 ~DEPTH FUNCTION PAIR IS :"+pair)
            // try {
            //     const response = await this.httpService.axiosRef.get(`https://api.kucoin.com/api/v3/market/orderbook/level2?symbol=BTC-USDT`);
            //     // const data1 = JSON.stringify(response);
            //     // this.logger.info("🚀 ~ get depth data 111 ~ :"+data1)
            //     const data = response.data
            //     console.log("🚀 ~ data:", data)
            //     // this.logger.info("🚀 ~ get depth data ~ :"+data.data)
            //     const bestBid = data.data.bestBid;
            //     const bestAsk = data.data.bestAsk;
            //     // const bestBid = bids.length > 0 ? parseFloat(bids[0][0]) : null;
            //     // const bestAsk = asks.length > 0 ? parseFloat(asks[0][0]) : null;
            //     console.log(`Best Bid: ${bestBid}, Best Ask: ${bestAsk}`);
            //     return [bestBid, bestAsk];
            //     //return response
            // }
            // catch (error) {
            //     //console.error(` Error fetching data from API: ${error}`);
            //     this.logger.error("Error fetching data from API in | getDepth: ", error)
            // }
            return 'Order Book data . . .'
        }
        catch(error){
            console.log("🚀 ~ orderservice ~ OrderBook ~ Error : "+error)
            this.logger.error("🚀 ~ orderservice ~ OrderBook ~ Error : ", error);

        }

    }
    async getexchange(){
        const api = `${this.api_url}/api/v2/symbols`
        try{
            this.logger.info("🚀 ~ getexchange ~ formatted API :"+api)
            const response = await this.httpService.axiosRef.post(api);
            const data = response.data;
            // const bestBid = bids.length > 0 ? parseFloat(bids[0][0]) : null;
            // const bestAsk = asks.length > 0 ? parseFloat(asks[0][0]) : null;
            console.log(`get exchange-`,response);
            return response
        }
        catch (error) {
            console.log(` Error fetching data from API: ${error}`);
            this.logger.info("Error fetching data from API in | getexchange: ", error)
        }
    }

}
