import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import * as sgMail from '@sendgrid/mail';
import { BadRequestException, Body, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';



@Processor('bot-queue')
export class BotsProcessing {
    private count=0;
    constructor(
    ) { }

    @Process('start-bot')
    private async generate_Bot(botInfo: Job) {
        try {
            console.log('~~~~~~~~~~BOT AT PROCESSING STAGE  ~~~~~~~~~~~~~~~~')
            this.runBot(botInfo);
        }
        catch (error) {
            console.log("Error in generate bot ", error)
        }
    }
    async sendEmail(email: string, bot_id: string, mailHeadline: string, mailMessage: string) {
        // Set your SendGrid API key here
        const sendgridApiKey = process.env.sendgrid_api_key;
        sgMail.setApiKey(sendgridApiKey);
        const msg = {
            to: email,
            from: '', // Change to your verified sender
            subject: `${mailHeadline}`,
            text: `${mailMessage} ${bot_id}`,
            html: `<p>${mailMessage} ${bot_id}</p>`,
        };

        try {
            const msgSend = await sgMail.send(msg);
            console.log("🚀 ~ BotsService ~ sendVerificationEmail ~ msgSend:", msgSend)
            console.log(`Email sent to ${email} .`);

            // Check if the email was sent successfully before saving user information
            if (!msgSend) {
                throw new InternalServerErrorException('Error sending verification email.');
            }

        } catch (error) {
            console.error(`Error sending email: ${error}`);
            throw new InternalServerErrorException('Error sending verification email.');
        }
    }
    private async runBot(botInfo: Job) {
        console.log("🚀 ~ BotsProcessing ~ runBot ~ Job:", botInfo.data)

        try {
            console.log('processing ...')
            const email = botInfo.data.email;
            const bot_id=botInfo.data.bot_id;
            const mailHeadline = ' Congratulations Bot is Live!';
            const mailMessage = 'Bot Started with ID :';
            const verifyEmail = await this.sendEmail(email, bot_id, mailHeadline, mailMessage);

            setInterval(async () => {
               console.log('bot processed ...',this.count)
               this.count++
            }, 2 * 1000);
        }
        catch (error) {
            console.log('error in run bot function ', error)
        }

    }
    async generateVolume(botInfo: Job) {
        try {

            console.log('volume geneartion')

        }

        catch (error) {
        }



    }



}
