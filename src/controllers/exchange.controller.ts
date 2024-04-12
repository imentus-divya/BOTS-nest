import { Controller } from '@nestjs/common';
import {  Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { JwtGuard } from 'src/service/auth/guards/jwt-auth.guard';
import { IExchangeService } from 'src/service/exchange.interface';

@Controller('volumeInt')
export class ExchangeController {

    constructor(@Inject('IExchangeService') private readonly IExchangeService:IExchangeService) {}

    // @HttpCode(HttpStatus.OK)
    // @Post('walletInfo')
    // async walletInfo(@Body() body: any) {
    // }

    
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Get('exchangePair')
    async exchangeList() {
      const response = await this.IExchangeService.ExchangePair();
      console.log("🚀 ~ ExchangeController ~ exchangeList ~ response:", response)
    }
}
