var dateformat = require('dateformat');
var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'experience';

	locals.data = {
		jobs: [],
		education: [],
	};

	// Load all jobs
	view.on('init', function (next) {
		keystone.list('Job').model.find().sort('-startDate').exec(function (err, jobs) {

			if (err || !jobs.length) {
				return next(err);
			}

			jobs.forEach((job) => {
				job.displayStartDate = dateformat(job.startDate, 'mm/yyyy');
				if (!job.endDate) {
					job.displayEndDate = 'Present';
				} else {
					job.displayEndDate = dateformat(job.endDate, 'mm/yyyy');
				}
			});

			locals.data.jobs = jobs;
			next(err);
		});
	});

	// Load all education
	view.on('init', function (next) {
		keystone.list('Education').model.find().sort('-startDate').exec(function (err, education) {

			if (err || !education.length) {
				return next(err);
			}

			education.forEach((edu) => {
				edu.displayStartDate = dateformat(edu.startDate, 'mm/yyyy');
				if (!edu.endDate) {
					edu.displayEndDate = 'Present';
				} else {
					edu.displayEndDate = dateformat(edu.endDate, 'mm/yyyy');
				}
			});

			locals.data.education = education;
			next(err);
		});
	});

	// Render the view
	view.render('experience');
};
