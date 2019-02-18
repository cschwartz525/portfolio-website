var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Message Model
 * =============
 */

var Message = new keystone.List('Message', {
		nocreate: true,
		noedit: true
});

Message.add({
		name: { type: Types.Name, required: true },
		email: { type: Types.Email, required: true },
		phone: { type: String },
		messageType: { type: Types.Select, options: [
				{ value: 'inquiry', label: 'Let\'s work together!' },
				{ value: 'message', label: 'Just saying hello' }
		] },
		body: { type: Types.Markdown, required: true },
		createdAt: { type: Date, default: Date.now }
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
		var subject;
		if (this.messageType === 'inquiry') {
				subject = 'New inquiry from craigschwartzweb.com';
		} else if (this.messageType === 'message') {
				subject = 'New message from craigschwartzweb.com';
		} else {
				subject = 'New message from craigschwartzweb.com';
		}
		keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
				if (err) {
						return callback(err);
				}
				new keystone.Email({
						templateExt: 'hbs',
						templateEngine: require('express-handlebars'),
						templateName: 'message-notification'
				}).send({
						to: admins,
						from: {
								name: 'Portfolio Website',
								email: 'contact@craigschwartzweb.com'
						},
						subject: subject,
						message: message,
						layout: false
				}, callback);
		});
};

Message.defaultSort = '-createdAt';
Message.defaultColumns = 'name, email, messageType, createdAt';
Message.register();
