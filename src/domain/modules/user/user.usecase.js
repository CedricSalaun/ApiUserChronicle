import { CustomError } from '../../services/error.js';

export class UserUsecase {
  constructor(userOutboundPort, tokenOutboundPort) {
    this.userOutboundPort = userOutboundPort;
    this.tokenOutboundPort = tokenOutboundPort;
  }

  async createUser({ username, password }) {
    this.validateUserInput(username, password);

    const user = await this.userOutboundPort.getUserByUserName(username);
    if (user) throw new CustomError('Cet identifiant est déjà associé à un compte', 400);

    const hashedPassword = await this.tokenOutboundPort.hash(password);
    const { _id } = await this.userOutboundPort.createUser({ username, password: hashedPassword });
    return this.tokenOutboundPort.generateToken({ _id });
  }

  async connectUser({ username, password }) {
    this.validateUserInput(username, password);

    const user = await this.userOutboundPort.getUserByUserName(username);
    if (!user) throw new CustomError('Cet identifiant est inconnu', 403);
    if (!await this.tokenOutboundPort.compare({ data: password, hash: user.password })) throw new CustomError('Mot de passe incorrect', 401);

    return this.tokenOutboundPort.generateToken({ _id: user._id });
  }

  validateUserInput(username, password) {
    if (password?.length < 4) {
      throw new CustomError('Le mot de passe doit contenir au moins 4 caractères', 400);
    }
    if (username?.length < 2 || username.length > 20) {
      throw new CustomError('Votre identifiant doit contenir entre 2 et 20 caractères', 400);
    }
    if (!(/^[a-z]+$/.test(username))) {
      throw new CustomError('Votre identifiant ne doit contenir que des lettres minuscules non accentuées', 400);
    }
  }
}
