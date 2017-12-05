var captchapng = require("captchapng");

class VerificationCode {
  constructor(length = 4, w = 60, h = 20) {
    this.w = w;
    this.h = h;
    this.length = length;
    this.randomNumber = null;
  }

  //
  getRandomNumber() {
    let i = 0,
        res = [];

    while(i < this.length) {
      i++;
      res.push(Math.floor(Math.random() * 10));
    }
    return res.join('');
  }

  //
  getImgbase64() {
    let cap;
    
    this.randomNumber = this.getRandomNumber();
    cap = new captchapng(this.w, this.h, this.randomNumber);

    cap.color(0, 0, 0, 0);
    cap.color(80, 80, 80, 255);

    let img = cap.getBase64(),
        imgbase64 = new Buffer(img, 'base64');

    return imgbase64;
  }

  getJson() {
    let imgbase64 = this.getImgbase64();

    return {
      number: this.randomNumber,
      base64: 'data:image/png;base64,' + imgbase64.toString('base64')
    }
  }
}
module.exports = VerificationCode;