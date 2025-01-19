import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { PostService } from "./post.service";
import { PaginationDto } from "src/common/pagination.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { CreatePostDto } from "./dto/create-post.dto";

@Controller('post')
export class PostController {

    constructor(private readonly postService:PostService){}

    @Get()
    findAll(@Query() paginationDto:PaginationDto){
        return this.postService.getAllPost(paginationDto);
    }

    @Get('/user')
    @Auth()
    findAllPostsByUserId(@Query()paginationDto:PaginationDto, @GetUser('id') idUser){
        return this.postService.getAllPostByUserId(paginationDto, idUser);
    }

    @Post()
    @Auth()
    createPost(@Body() createPostDto:CreatePostDto, @GetUser('id') idUser){
        return this.postService.createPost(idUser, createPostDto);
    }

    @Patch()
    @Auth()
    updatePost(){

    }
}