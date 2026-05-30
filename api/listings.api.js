class ListingApi {
  constructor(baseUrl, request) {
    this.baseUrl = baseUrl;
    this.request = request;
  }

  async getListings() {
    return await this.request.get()
  }
}

module.exports = ListingApi;