import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TableComponent} from '../../shared/ui/atoms/table/table.component';
import {Column} from '../../shared/ui/atoms/table/table';
import {AsyncPipe, NgClass} from '@angular/common';
import {ButtonComponent} from '../../shared/ui/atoms/button/button.component';
import {UserManagementModalComponent} from '../../features/user/ui/user-management-modal/user-management-modal.component';
import {UserService} from '../../features/user/services/user.service';
import {User} from '../../features/user/models/user.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'ut-home',
  standalone: true,
  imports: [
    TableComponent,
    AsyncPipe,
    ButtonComponent,
    UserManagementModalComponent,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent {
  isUserManagementModalOpen = false;
  readonly userColumns: Column<User>[] = [
    {key: 'username', label: 'username'},
    {key: 'firstName', label: 'First Name'},
    {key: 'lastName', label: 'Last Name'},
    {key: 'email', label: 'email'},
    {key: 'type', label: 'type'},
  ];
  selectedUser?: User;
  users$ = this.userService.getAll();

  constructor(protected userService: UserService, private toast: ToastrService) {
  }

  closeUserManagementModal() {
    this.selectedUser = undefined;
    this.isUserManagementModalOpen = false;
  }

  openUserManagementModal(user: typeof this.selectedUser = undefined) {
    this.selectedUser = user;
    this.isUserManagementModalOpen = true;
  }

  onSavedUser(user: User) {
    const methodToCall: keyof UserService = this.selectedUser ? 'patchOne' : 'postOne';
    this.userService[methodToCall](user).subscribe({
      complete: () => this.toast.success('User saved successfully'),
    })

    this.closeUserManagementModal();
  }

  onSelectUser({current, previous}: { current: User, previous: User | undefined }) {
    if (current.id === previous?.id) return this.closeUserManagementModal();
    this.openUserManagementModal(current);
  }

  onDeleteUser(id: User['id']) {
    this.userService.deleteOne(id).subscribe({
      complete: () => this.toast.success('User deleted successfully'),
    });

    this.closeUserManagementModal();
  }
}
