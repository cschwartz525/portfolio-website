var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */

var Job = new keystone.List('Job');

Job.add({
	company: { type: String, required: true, initial: true, index: true },
	title: { type: String, required: true, initial: true, index: true },
	startDate: { type: Types.Date, required: true, initial: true },
	endDate: { type: Types.Date, initial: true },
	summary: { type: Types.Html, wysiwyg: true, height: 400 },
});

Job.defaultColumns = 'company, title, startDate, endDate';
Job.register();
