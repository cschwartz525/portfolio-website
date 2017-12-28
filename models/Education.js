var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Education Model
 * ==========
 */

var Education = new keystone.List('Education');

Education.add({
	school: { type: String, required: true, initial: true, index: true },
	degree: { type: String, required: true, initial: true, index: true },
	major: { type: String, required: true, initial: true, index: true },
	startDate: { type: Types.Date, required: true, initial: true },
	endDate: { type: Types.Date, initial: true },
	summary: { type: Types.Html, wysiwyg: true, height: 400 },
});

Education.defaultColumns = 'school, degree, major, startDate, endDate';
Education.register();
