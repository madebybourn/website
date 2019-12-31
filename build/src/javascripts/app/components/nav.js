export default class Navigation {
  constructor() {
    this.$nav = $('[data-nav]');
    this.$hamburger = $('[data-hamburger]');

    this._bindEvents();
  }

  _bindEvents() {
    this.$hamburger.on("click", this._toggleNav.bind(this));
  }

  _toggleNav() {
    this.$hamburger.toggleClass("is-active");
    this.$nav.toggleClass("is-open");
  }
}

new Navigation();