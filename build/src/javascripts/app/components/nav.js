export default class Navigation {
  constructor() {
    this.$header = $('[data-header]');
    this.$nav = $('[data-nav]');
    this.$hamburger = $('[data-hamburger]');

    this._bindEvents();
  }

  _bindEvents() {
    let self = this;
    this.$hamburger.on("click", this._toggleNav.bind(this));

    if (self.$nav.attr("data-nav") === "landing-page") {
      self._scrollToSection();
    }
  }

  _toggleNav() {
    this.$hamburger.toggleClass("is-active");
    this.$nav.toggleClass("is-open");
  }

  _scrollToSection(){
    let self = this;
    
    $("[data-nav-item]").on("click", function(){
      let section = $(this).attr("data-href");
      console.log(section);
      $("html,body").animate({
        scrollTop: $(section).offset().top - self.$header.outerHeight() - 30
      });
      self._toggleNav();
    });
  }
}

new Navigation();