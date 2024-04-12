
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:jwtConstants.secret ,
    });

  }

  async validate(payload: any) {
    console.log("------------Access token being validated -----------")
    return { id: payload.id, email: payload.email };
  }
}
