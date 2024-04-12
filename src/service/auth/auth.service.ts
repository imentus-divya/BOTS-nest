import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) { }

  async Login(req: Request):Promise<any> {
    console.log("🚀 ~ ~ ~ Login Function ~ ~ ~")
    // LOGIC FOR VALIDATION
    const payload = { details: 'some-details' };
    console.log("🚀 ~ payload:", payload)

    return {
      tokenVal: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '7d' })
    }
  }

  async refreshToken(user) {
    console.log("🚀 ~~~~~ Refresh Token ~~~~~");
    
    const payload = {
      details: 'some-details'
    };
    console.log("🚀 ~  refreshToken ~ payload:", payload)

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
