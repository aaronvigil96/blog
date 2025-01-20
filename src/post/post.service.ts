import { Injectable } from "@nestjs/common";
import { PaginationDto } from "src/common/pagination.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { Subject } from "rxjs";

@Injectable()
export class PostService {

    constructor(private readonly prisma:PrismaService){}

    private eventSubject = new Subject<any>();

    async getAllPost({limit = 10, offset = 0}:PaginationDto){
        const posts = await this.prisma.post.findMany({
            take: limit,
            skip: offset,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });
        return posts;
    }

    async createPost(userId:number, {title, content}:CreatePostDto){
        const post = await this.prisma.post.create({
            data: {
                title,
                content,
                authorId: userId
            }
        })
        return post;
    }

    async getAllPostByUserId({limit = 10, offset = 0}:PaginationDto, idUser:number){
        const posts = await this.prisma.post.findMany({
            take: limit,
            skip: offset,
            where: {
                authorId: idUser,
                isActive: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        });
        return posts;
    }

    get events(){
        return this.eventSubject.asObservable();
    }

    async notifyNewPost(post:any){

        const data = await post;

        this.eventSubject.next({data});
    }
}