import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { envs } from "src/config/envs";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly prisma:PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: envs.secret_jwt_key,
            passReqToCallback: true
        })
    }

    async validate(req: Request, jwtPayload: JwtPayload) {
        const {id} = jwtPayload;
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                email: true,
                lastname: true,
                name: true,
                username: true,
                isActive: true,
                role: true,
                id: true
            }
        });
        if(!user) throw new UnauthorizedException('Token are not valid')
        if(!user.isActive) throw new UnauthorizedException('User is inactive')
        return user;
    }

}