import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from "@nestjs/axios";
import { IExchangeService } from '../../exchange.interface';
import { BaseExchangeServices } from 'src/service/baseExchange.services';

@Injectable()
export class MexcExchangeService extends BaseExchangeServices
{
    
    
   
}
