export default class PageIntro {
  constructor() {
    this.$header = $('[data-header]');
    this.$pageHeading = $('[data-page-heading]');
    this.$pageIntroCta = $('[data-page-intro-cta]');

    this._bindEvents();
  }

  _bindEvents() {
    this.$pageIntroCta.on("click", this._scrollToForm.bind(this));
    this._updatePageHeading();
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

  // _updatePageHeading() {
  //   var query = this._queryConvert(window.location.search);
  //   this.$pageHeading.text(this.$pageHeading[0].textContent.replace("business", query.q));
  //   // console.log(query, this.$pageHeading[0].textContent, query.q);
  // }

  //   // query string would normally be window.location.search
  // _queryConvert(query_string) {
  //   var queryStr = query_string,
  //     queryParams = [];

  //   if (queryStr !== "") {
  //     var queryArr = queryStr.replace('?', '').split('&');

  //     $.each(queryArr, function (q, query) {
  //       var qArr = query.split('=');
  //       queryParams[qArr[0]] = qArr[1];
  //     });
  //   }

  //   return queryParams;
  // }
}

new PageIntro();