import { Component, inject, signal} from '@angular/core';


import { UserRole } from '../core/models/UserModel';
import { UserService } from '../core/services/create-user-service';
import { AuthService } from '../core/services/auth-service';
import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';

@Component({
  imports: [TopNavBar],
  selector: 'app-user-management',
  styleUrl: './user-management.css',
  templateUrl: './user-management.html',
})
export class UserManagement {

  protected auth = inject(AuthService);
  protected userService = inject(UserService);

  protected message = signal('');



  private isUserRole(value :string): value is UserRole{
    return (
      value === 'admin' ||
      value === 'manager' ||
      value === 'developer' ||
      value === 'designer'
    );
  }

  protected changeRole(userId: number, event: Event):void{
    const selectedElement = event.target as HTMLSelectElement;
    const selectedRole = selectedElement.value;

    if(!this.isUserRole(selectedRole)){
      this.message.set('Invalid Role Selected!');
      return;
    }

    const success = this.auth.changeUserRole(userId, selectedRole);

    if(success){
      this.message.set('User Role updated!')
    }else{ this.message.set('could not update the user role!') }
      
    const currentRole = this.userService.C_users().find((user) => user.userId === userId)?.userRole;

    if (currentRole) {
      selectedElement.value = currentRole;
    }
  }


}
