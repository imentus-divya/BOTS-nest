
export interface IBotService {

  RunBot(botInfo): Promise<any>;
  StopBot(bot_id):Promise<any>;
  }