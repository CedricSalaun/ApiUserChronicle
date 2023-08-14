export class TokenOutboundPort {
  constructor(tokenRepositoryAdapter) {
    this.tokenRepositoryAdapter = tokenRepositoryAdapter;
  }

  decodeToken(payload) {
    return this.tokenRepositoryAdapter.decodeToken(payload);
  }

  generateToken(payload) {
    return this.tokenRepositoryAdapter.generateToken(payload);
  }

  verifyToken(base64Token) {
    return this.tokenRepositoryAdapter.verifyToken(base64Token);
  }

  async hash(payload) {
    return this.tokenRepositoryAdapter.hash(payload);
  }

  async compare(payload) {
    return this.tokenRepositoryAdapter.compare(payload);
  }
}
