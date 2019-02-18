var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {
		var view = new keystone.View(req, res);
		var locals = res.locals;

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'skills';
		locals.data = {
				categories: []
		};

		// Load all skill categories
		view.on('init', function (next) {
				keystone.list('SkillCategory').model.find().sort('name').exec(function (err, categories) {

						if (err || !categories.length) {
								return next(err);
						}

						locals.data.categories = categories;

						// Load the skills for each category
						async.each(locals.data.categories, function (category, next) {

								keystone.list('Skill').model.find().where('category', category.id).sort('name').exec(function (err, skills) {
										category.skills = skills;
										next(err);
								});

						}, function (err) {
								next(err);
						});
				});
		});

		// Render the view
		view.render('skills');
};
