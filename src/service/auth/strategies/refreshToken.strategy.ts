import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from "../constants";

export class RefreshJwtStrategy extends PassportStrategy(Strategy,'jwt-refresh')
{
    constructor()
    {
    // console.log("inisde refresh validation-------------")
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
       
    }
    async validate(payload: any) {
    console.log("------------Refresh token being validated -----------")
    console.log("🚀 ~ validate ~ payload : ",payload)
     return { id: payload.id, email: payload.email};
      }
}