export enum SystemModule {
  Users = 'USER_MANAGEMENT',
  Books = 'BOOK_MANAGEMENT',
}

export const VALID_MODULES_FOR_ADMIN_ROLE = [
  SystemModule.Users,
  SystemModule.Books,
];
