import { applyDecorators, UseGuards } from "@nestjs/common"
import { ValidRoles } from "../interfaces/valid-roles.enum"
import { RoleProtected } from "./role-protected.decorator"
import { AuthGuard } from "@nestjs/passport"
import { UserRoleGuard } from "../guards/user-role.guard"


export const Auth = (...roles: ValidRoles[]) => {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    )
}