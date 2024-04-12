import { Controller,Headers } from '@nestjs/common';
import { IOrderService } from 'src/service/order.interface';
import { Inject } from '@nestjs/common';
import {  Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards , Req} from '@nestjs/common';
import { WinstonConfig } from '../service/logger/winston.config';
import { Request } from 'express';
import { JwtGuard } from 'src/service/auth/guards/jwt-auth.guard';

@Controller('volumeInt')

export class OrderController 
{
  private readonly logger;
    constructor(@Inject('IOrderService') private readonly IOrderService:IOrderService,private readonly winstonConfig: WinstonConfig){
      this.logger = this.winstonConfig.createLogger();
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get('orderBook')
    async Orderbook() {
        try{
            this.logger.info("🚀 ~ orderController ~ orderbook ~ ");
            //const response = await this.IOrderService.OrderBook();
            const response = await this.IOrderService.OrderBook("XMR-BTC")
            // this.logger.info(" ~ orderController ~ orderbook ~ response : "+response)
            return response
        }
        catch(error){
            this.logger.error("🚀 ~ Error in ~ orderController ~ orderbook ~ Error: "+error);
        }
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('placeOrder')
    async PlaceOrder(@Req() request: Request)
    {
      try{
            this.logger.info("🚀 ~ orderController ~placeOrder  ~ ");
            const response = await this.IOrderService.PlaceOrder()
            this.logger.info(" ~ orderController ~ placeOrder~ response : "+response)
            return response
      }
      catch(error)
      {
        this.logger.error("🚀 ~ Error in ~ orderController ~ PlaceOrder : "+error)
      }
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('cancelOrder')
    async CancelOrder(@Req() request: Request)
    {
      try{
            this.logger.info("🚀 ~ orderController ~CancelOrder  ~ ");
            const response = await this.IOrderService.CancelOrder()
            this.logger.info(" ~ orderController ~CancelOrder~ response : "+response)
            return response
      }
      catch(error)
      {
        this.logger.error("🚀 ~ Error in ~ orderController ~ CancelOrder : "+error)
      }
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get('orderDetails:orderId')
    async OrderDetails(@Param('orderId') orderId: string)
    {
      try{
            this.logger.info("🚀 ~ orderController ~OrderDetails  ~ ");
            const response = await this.IOrderService.OrderDetails(orderId)
            this.logger.info(" ~ orderController ~OrderDetails~ response : "+response)
            return response
      }
      catch(error)
      {
        this.logger.error("🚀 ~ Error in ~ orderController ~OrderDetails : "+error)
      }
    }


}
