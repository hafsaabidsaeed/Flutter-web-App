const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class authService {
  static sharedInstance = new authService();

  constructor() {
    if (authService.sharedInstance != null) {
      return authService.sharedInstance;
    }
  }

  //   Hash Password
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  //   Compare Password
  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  //   Generate Token
  async generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  }
}

module.exports = authService.sharedInstance;