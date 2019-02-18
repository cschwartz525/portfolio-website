var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Skill Model
 * ==========
 */
var Skill = new keystone.List('Skill');

Skill.add({
		name: { type: String, initial: true, required: true, index: true },
		category: { type: Types.Relationship, ref: 'SkillCategory', many: false },
		experience: { type: Number, initial: true, required: true, index: true }
});

/**
 * Registration
 */
Skill.defaultColumns = 'name, category, experience';
Skill.register();
