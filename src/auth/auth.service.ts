import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly prisma:PrismaService,
        private readonly jwtService:JwtService
    ){}

    async register(createUserDto:CreateUserDto){
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: createUserDto.email.toLowerCase(),
                    password: bcrypt.hashSync(createUserDto.password, 10),
                    lastname: createUserDto.lastname.toLowerCase(),
                    name: createUserDto.name.toLowerCase(),
                    username: createUserDto.username.toLowerCase()
                },
                select: {
                    email: true,
                    lastname: true,
                    name: true,
                    username: true,
                    id: true,
                    isActive: true,
                    role: true,
                }
            });
            return {
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            throw new BadRequestException(err);
        }
    }

    async login(loginUserDto:LoginUserDto){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email: loginUserDto.email.toLowerCase()
                },
                select: {
                    email: true, 
                    password: true,
                    id: true
                }
            });
            if(!user) throw new UnauthorizedException('Credentials are not valid (email)');
            if(!bcrypt.compareSync(loginUserDto.password, user.password)) throw new UnauthorizedException('Credentials are not valid (password)');
            delete user.password
            return {
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            this.handleDBErrors(err);
        }
    }

    private getJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign( payload );
        return token;
    }

    private handleDBErrors(err){
        if(err instanceof UnauthorizedException) throw err
        throw new InternalServerErrorException('Error in server check logs');
    }

}