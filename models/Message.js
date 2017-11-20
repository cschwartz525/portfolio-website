var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * =============
 */

var Message = new keystone.List('Message', {
	nocreate: true,
	noedit: true,
});

Message.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	messageType: { type: Types.Select, options: [
		{ value: 'message', label: 'Just leaving a message' },
		{ value: 'question', label: 'I\'ve got a question' },
		{ value: 'other', label: 'Something else...' },
	] },
	body: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Message.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Message.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Message.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function () {};
	}
	var message = this;
	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateExt: 'hbs',
			templateEngine: require('express-handlebars'),
			templateName: 'message-notification',
		}).send({
			to: admins,
			from: {
				name: 'Portfolio Website',
				email: 'contact@portfolio-website.com',
			},
			subject: 'New Message for Portfolio Website',
			message: message,
		}, callback);
	});
};

Message.defaultSort = '-createdAt';
Message.defaultColumns = 'name, email, messageType, createdAt';
Message.register();
