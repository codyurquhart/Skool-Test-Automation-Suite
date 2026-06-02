class LoginApi {
  constructor(baseUrl, request) {
    this.baseUrl = baseUrl;
    this.request = request;
  }

  async login(email, password) {
    const url = `${this.baseUrl}/auth/login`;

    const response = await this.request.post(url, {
      data: {
        email,
        password,
      },
    });

    if (!response.ok) {
      throw new Error(`Login failed with status ${response.status}`);
    }

    return response;
  }
}

module.exports = LoginApi;
