var axios = require('axios');
var keystone = require('keystone');
var Message = keystone.list('Message');

exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res);
		var locals = res.locals;

		// Set locals
		locals.section = 'contact';
		locals.messageTypes = Message.fields.messageType.ops;
		locals.formData = req.body || {};
		locals.validationErrors = {};
		locals.messageSubmitted = false;
		locals.recaptchaSiteKey = process.env.RECAPTCHA_SITEKEY;

		// On POST requests, add the Message item to the database
		view.on('post', { action: 'contact' }, function (next) {

				var recaptchaResponse = req.body['g-recaptcha-response'];
				var recaptchaSecret = process.env.RECAPTCHA_SECRET;
				var recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaResponse)}`;

				axios(recaptchaVerifyUrl).then((response) => {

						if (response.data && response.data.success) {

							var newMessage = new Message.model();
							var updater = newMessage.getUpdateHandler(req);

							updater.process(req.body, {
									flashErrors: true,
									fields: 'name, email, phone, messageType, body',
									errorMessage: 'There was a problem submitting your message:'
							}, (err) => {
									if (err) {
											locals.validationErrors = err.errors;
									} else {
											locals.messageSubmitted = true;
									}
									next();
							});

						} else {

								locals.messageSubmitted = false;
								next();

						}

				});

		});

		view.render('contact');
};
