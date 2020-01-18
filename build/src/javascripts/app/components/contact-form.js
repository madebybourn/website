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
        self.$contactFormResponse.html("<p class='c-form__response--success'>" + self.$contactForm.attr("data-contact-form-success-message") +"</p>").fadeIn();

        $('html,body').animate({
          scrollTop: self.$contactFormResponse.offset().top - $('[data-header]').outerHeight() - 30
        }, 500, function () {
          if (self.$contactForm.attr("data-contact-form-calendly-event") !== "") {
            let message = {
              calendlyEvent: self.$contactForm.attr("data-contact-form-calendly-event"),
              fromName: $("[name='fromName']").val(),
              fromEmail: $("[name='fromEmail']").val(),
              phoneNumber: ($("[name='message[phoneNumber]']")) ? $("[name='message[phoneNumber]']").val() : null,
              message: ($("[name='message[body]']")) ? $("[name='message[body]']").val() : $("[name='message']").val(),
            }
            Calendly.initPopupWidget({
              url: 'https://calendly.com/bourn/' + message.calendlyEvent +'?name=' + message.fromName + '&email=' + message.fromEmail + '&a1=' + message.phoneNumber + '&a2=' +message.message
            });

            setTimeout(() => {
              self._resetForm();
            }, 2000);
          }
          else {
            self._resetForm();
          }
        });

      } else {
        // response.error will be an object containing any validation errors that occurred, indexed by field name
        // e.g. response.error.fromName => ["From Name is required"]
        // alert("An error occurred. Please try again.");
        // console.log(response);
        self.$contactFormResponse.html("<p class='c-form__response--error'>Oops something went wrong. Check for errors above.</p>").fadeIn();
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
    this.$contactForm.find("small.c-form__error").remove();
    this.$contactFormResponse.empty();
  }

  _setErrors(errors) {
    if (errors.firstName) {
      $("[name='message[firstName]']").attr("data-error", "");
      $("[name='message[firstName]']").after("<small class='c-form__error'>"+errors.firstName+"</small>");
    }

    if (errors.lastName) {
      $("[name='message[lastName]']").attr("data-error", "");
      $("[name='message[lastName]']").after("<small class='c-form__error'>" + errors.lastName + "</small>");
    }

    if (errors.fromName) {
      $("[name='fromName']").attr("data-error", "");
      $("[name='fromName']").after("<small class='c-form__error'>" + errors.fromName + "</small>");
    }

    if (errors.fromEmail) {
      $("[name='fromEmail']").attr("data-error", "");
      $("[name='fromEmail']").after("<small class='c-form__error'>" + errors.fromEmail + "</small>");
    }

    if (errors.phoneNumber) {
      $("[name='message[phoneNumber]']").attr("data-error", "");
      $("[name='message[phoneNumber]']").after("<small class='c-form__error'>" + errors.phoneNumber + "</small>");
    }

    if (errors.message) {
      $("[name='message'], [name='message[body]']").attr("data-error", "");
      $("[name='message'], [name='message[body]']").after("<small class='c-form__error'>" + errors.message + "</small>");
    }
  }

  _resetForm() {
    this.$contactForm.find("input, textarea").not('[name="CRAFT_CSRF_TOKEN"], [name="action"], [name="subject"]').val("");
  }
}

new ContactForm();