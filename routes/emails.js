/**
 * This file defines the email tests for your project.
 *
 * Each email test should provide the locals used to render the
 * email template for preview.
 *
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 *
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

var keystone = require('keystone');

module.exports = {

	/** New Message Notifications */
	'message-notification': function (req, res, callback) {
		// To test message notifications we create a dummy message that
		// is not saved to the database, but passed to the template.

		var Message = keystone.list('Message');

		var newMessage = new Message.model({
			name: { first: 'Test', last: 'User' },
			email: 'contact@portfolio-website.com',
			phone: '+61 2 1234 5678',
			messageType: 'message',
			body: { md: 'Nice message notification.' },
		});

		callback(null, {
			admin: 'Admin User',
			message: newMessage,
			message_url: '/keystone/messages/',
		});
	},

};
