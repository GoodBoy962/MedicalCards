export default class Screen {

  static get width() {
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }

  static get height() {
    return window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }

}