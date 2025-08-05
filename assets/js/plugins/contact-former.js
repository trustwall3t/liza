/**
 *
 * -----------------------------------------------------------------------------
 *
 * Template : Bizup - Creative Agency & Portfolio HTML Template
 * Author : reacthemes
 * Author URI : https://reactheme.com/ 
 *
 * -----------------------------------------------------------------------------
 *
 **/

(function ($) {
    'use strict';
    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();
        
        $(form).find('#rts-btn').attr('readonly');

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response + ', your message has been submitted. I will get back to you shortly');

                // Clear the form.
                $('#name, #email,  #location, #time, #timeZone, #date, #mobile, #message').val('');
                $(form).find('#rts-btn').removeAttr('readonly');
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });

})(jQuery);