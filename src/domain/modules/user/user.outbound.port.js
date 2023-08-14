export class UserOutboundPort {
  constructor(userRepositoryAdapter) {
    this.userRepositoryAdapter = userRepositoryAdapter;
  }

  async createUser(payload) {
    return this.userRepositoryAdapter.createUser(payload);
  }

  async getUserByUserName(payload) {
    return this.userRepositoryAdapter.getUserByUserName(payload);
  }
}
