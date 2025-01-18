import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { GetUser } from "./decorators/get-user.decorator";
import { ValidRoles } from "./interfaces/valid-roles.enum";
import { Auth } from "./decorators/auth.decorator";

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

    @Get('private')
    @Auth(ValidRoles.ADMIN)
    private(@GetUser() user){
        return {
            user
        }
    }
}