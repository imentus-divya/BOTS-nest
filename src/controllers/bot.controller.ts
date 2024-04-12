import { Controller } from '@nestjs/common';
import { WinstonConfig } from '../service/logger/winston.config';
import {   Post, Body, HttpCode, HttpStatus ,UseGuards,Req } from '@nestjs/common';
import { JwtGuard } from 'src/service/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { IBotService } from 'src/service/bot.interface';
import { Inject } from '@nestjs/common';



@Controller('volumeInt')
export class BotController 
{
    private readonly logger = this.winstonConfig.createLogger();
    constructor(private readonly winstonConfig: WinstonConfig, @Inject('IBotService') private readonly IBotService:IBotService){}
    // @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('startBot')
    async StartBot(@Body() body) 
    {
        try{
            this.logger.info("🚀 ~ BotController ~ startBot ~ ");
            const response = await this.IBotService.RunBot(body);
            this.logger.info("🚀 ~ response:"+ response)
            return response;
        }
        catch(error){
            this.logger.error("🚀 ~ Error in ~ BotController ~ startBot ~ Error: ",error);
        }
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('stopBot')
    async StopBot(@Body() body) {
        try{
            this.logger.info("🚀 ~ BotController ~ stopBot ~ ");
        }
        catch(error){
            this.logger.error("🚀 ~ Error in ~ BotController ~ stopBot ~ Error: ",error);
        }
    //   const response = await this.botsService.StopBot(body);/
    }
    
}
