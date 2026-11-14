import { UserRole } from "./UserModel";


export type permisson = "task.create"        |
                        "task.view.all"      |
                        "task.view.related"  |
                        "task.start"         |
                        "task.complete.own"  |
                        "task.complete.any"  |
                        "task.reset"         |
                        "user.role.change"   ;


export const RolePermisson : Record<UserRole, permisson[]> = {

    admin:  [
        'task.create',
        'task.view.all',
        'task.start',
        'task.complete.own',
        'task.complete.any',
        'task.reset',
        'user.role.change',
    ],
    manager:[
        'task.create',
        'task.view.all',
        'task.start',
        'task.complete.own',
        'task.complete.any',
        'task.reset',
    ],
    developer:[
        'task.view.related',
        'task.start',
        'task.complete.own',
    ],
    designer:[
        'task.view.related',
        'task.start',
        'task.complete.own',
    ], 
};                        