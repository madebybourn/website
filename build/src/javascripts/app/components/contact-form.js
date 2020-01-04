export default class ContactForm {
  constructor() {
    this.$contactForm = $('[data-contact-form]');
    this.$contactFormResponse = $('[data-contact-form-response]');

    this._bindEvents();
  }

  _bindEvents() {
    let self = this;

    this.$contactForm.on("submit", function(e) {
      e.preventDefault();
      self._submitForm();
    });
  }

  _submitForm() {
    let self = this;

    this._clearErrors();

    // Send it to the server
    let request = $.post({
      url: "/",
      dataType: "json",
      data: self.$contactForm.serialize(),
    });


    request.done(function (response) {
      if (response.success) {
        self.$contactFormResponse.html("<p class='c-form__response--success'>Your message has been sent!</p>").fadeIn();
        self._resetForm();
        $('html,body').animate({
          scrollTop: self.$contactFormResponse.offset().top // - $('[data-header]').outerHeight()
        });
      } else {
        // response.error will be an object containing any validation errors that occurred, indexed by field name
        // e.g. response.error.fromName => ["From Name is required"]
        // alert("An error occurred. Please try again.");
        // console.log(response);
        self.$contactFormResponse.html("<p class='c-form__response--error'>An error occurred. Please try again.</p>").fadeIn();
        self._setErrors(response.errors);
        $('html,body').animate({
          scrollTop: self.$contactForm.offset().top - $('[data-header]').outerHeight() - 30
        });
      }
    });

    request.fail(function (jqXHR, textStatus) {
      var data = jqXHR.responseJSON;
      self.$contactFormResponse.html("<p>" + data.error + "</p>").fadeIn();
    });
  }

  _clearErrors() {
    this.$contactForm.find("input, textarea").removeAttr("data-error");
    this.$contactFormResponse.empty();
  }

  _setErrors(errors) {
    if (errors.firstName) {
      $("[name='message[firstName]']").attr("data-error", "");
    }

    if (errors.lastName) {
      $("[name='message[lastName]']").attr("data-error", "");
    }

    if (errors.fromName) {
      $("[name='fromName']").attr("data-error", "");
    }

    if (errors.fromEmail) {
      $("[name='fromEmail']").attr("data-error", "");
    }

    if (errors.message) {
      $("[name='message']").attr("data-error", "");
      $("[name='message[body]']").attr("data-error", "");
    }
  }

  _resetForm() {
    this.$contactForm.find("input, textarea").val("");
  }
}

new ContactForm();