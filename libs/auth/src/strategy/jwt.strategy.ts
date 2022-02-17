import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'gasoigwqjrkjqwpirasfasjgaskgaslhlqw',
            idField: 'id',
            usernameField: 'email',
            passwordField: 'password',
        })
    }
    
    async validate(payload: any) {
        console.log(payload);
        return {
            user: payload.user,
        }
    }
}