import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { Auth } from "./decorators/auth.decorator";
import { GetUser } from "./decorators/get-user.decorator";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() createUserDto:CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() loginUserDto:LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    @Get('profile')
    @Auth()
    profile(@GetUser()user){
        return user;
    }

}