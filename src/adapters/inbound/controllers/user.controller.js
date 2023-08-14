export class UserController {
  constructor(userUseCase) { this.userUseCase = userUseCase; }

  async createUser(req, { username, password }) {
    try {
      const token = await this.userUseCase.createUser({ username, password });
      return { token, error: null };
    } catch(error) {
      throw error;
    }
  }

  async connectUser(req, { username, password }) {
    try {
      const token = await this.userUseCase.connectUser({ username, password });
      return { token, error: null };
    } catch(error) {
      throw error;
    }
  }
}
