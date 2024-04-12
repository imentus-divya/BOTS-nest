import { Controller } from '@nestjs/common';
import {   Post, Body, HttpCode, HttpStatus,UseGuards, Req } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { RefreshJwtGuard } from 'src/service/auth/guards/refresh-jwt-auth.guard';
import { AuthService } from 'src/service/auth/auth.service';
import { Request } from 'express';

@Controller('volumeInt')
export class AuthController
{
    constructor(private readonly AuthService:AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async Login(@Req() request: Request)
    {
        return await this.AuthService.Login(request);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Req() request: Request)
    {
        return this.AuthService.refreshToken(request)
    }
}
