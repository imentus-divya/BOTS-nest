import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { IBotService } from './bot.interface';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Process, Processor } from "@nestjs/bull";





@Injectable()
export abstract class BaseBotServices implements IBotService {
    constructor(
        public readonly config: ConfigService,
        public readonly httpService: HttpService,
        @InjectQueue('bot-queue') private bot_queue: Queue,
    ) { }

    async RunBot(botInfo) {
        console.log("🚀 ~ botInfo:", botInfo)
        console.log("🚀 Bot to start ... ");
        const bot = await this.bot_queue.add('start-bot', botInfo)
        return { message: 'Bot Started. . . ', bot_unique_id: bot.id }
    }

    async StopBot(bot_id: any)
    {
    console.log("🚀~ bot_id to delete :", bot_id);
     const isIDExits = await this.bot_queue.getJob(bot_id);
     console.log("🚀 ~~ IDExits:", isIDExits)

     const status= await isIDExits.getState();
     console.log("🚀 ~  ~ StopBot ~ status:", status)
 
 
     if (isIDExits) {
       console.log('BOT exists :')
       console.log("BOT METHOD name : ", isIDExits.name)
       console.log("Queue name : ", isIDExits.queue.name)
       const stopBot = await this.bot_queue.add('stop-bot', isIDExits)

       await isIDExits.remove();
    //    const Email=await this.sendEmail(email , bot_id ,mailHeadline , mailMessage );
       return { ' removed bot unique  id ': isIDExits.id }
     }
     else {
       return { 'bot unique id not present in queue : ':bot_id }
     }
        
    }

    






}
