var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var SkillCategory = new keystone.List('SkillCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

SkillCategory.add({
	name: { type: String, required: true },
});

SkillCategory.relationship({ ref: 'Skill', path: 'category' });

SkillCategory.register();
