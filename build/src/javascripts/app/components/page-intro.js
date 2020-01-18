export default class PageIntro {
  constructor() {
    this.$header = $('[data-header]');
    this.$pageIntroCta = $('[data-page-intro-cta]');

    this._bindEvents();
  }

  _bindEvents() {
    this.$pageIntroCta.on("click", this._scrollToForm.bind(this));
  }

  _scrollToForm() {
    let self = this;
    let section = this.$pageIntroCta.attr("data-href");
    
    if (section.search("#") > -1) {
      $("html,body").animate({
        scrollTop: $(section).offset().top - self.$header.outerHeight() - 30
      });
    }
  }
}

new PageIntro();