class ResponseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.msg = data;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.msg = message;
    }
  }
}

class SuccessModel extends ResponseModel {
  constructor(data, message) {
    super(data, message);
    this.error = 0;
  }
}

class ErrorModel extends ResponseModel {
  constructor(data, message) {
    super(data, message);
    this.error = 1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
