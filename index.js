
'use strict';

const db = require.main.require('./src/database');
const routeHelpers = require.main.require('./src/routes/helpers');

const dbExplorer = module.exports;

dbExplorer.init = async function (params) {
	routeHelpers.setupAdminPageRoute(params.router, '/admin/plugins/db-explorer', params.middleware, [], renderAdmin);
};

async function renderAdmin(req, res) {
	const data = await get(req.query);
	res.render('admin/plugins/db-explorer', {
		result: {
			key: req.query.key,
			type: data.type,
			value: JSON.stringify(data.value, null, 4),
		},
	});
}

const typeToMethod = {
	string: getString,
	hash: getHash,
	zset: getZset,
	set: getSet,
	list: getList,
};

async function get(params) {
	if (!params.key) {
		return {};
	}
	params.start = parseInt(params.start, 10) || 0;
	params.stop = parseInt(params.stop, 10) || 99;
	params.withScores = parseInt(params.withScores, 10);
	params.count = parseInt(params.count, 10);

	const [type, exists] = await Promise.all([
		db.type(params.key),
		db.exists(params.key),
	]);
	if (!exists) {
		return { type: '', value: null };
	}
	if (!typeToMethod[type]) {
		throw new Error('[[error:invalid-type]]');
	}
	return {
		type,
		value: await typeToMethod[type](params),
	};
}

async function getString(params) {
	return await db.get(params.key);
}

async function getHash(params) {
	const data = await db.getObject(params.key);
	if (data.hasOwnProperty('password')) {
		delete data.password;
	}
	return data;
}

async function getZset(params) {
	if (params.min !== '' && params.min !== '-inf') {
		params.min = parseInt(params.min, 10);
	}
	if (params.max !== '' && params.max !== '+inf') {
		params.max = parseInt(params.max, 10);
	}

	// using min, max
	if (params.min !== '' && params.max !== '') {
		const count = params.stop !== -1 ? params.stop - params.start + 1 : -1;
		if (params.count) {
			return await db.sortedSetCount(params.key, params.min, params.max);
		}
		if (params.withScores) {
			return await db.getSortedSetRevRangeByScoreWithScores(params.key, params.start, count, params.max, params.min);
		}
		return await db.getSortedSetRevRangeByScore(params.key, params.start, count, params.max, params.min);
	}

	if (params.count) {
		return await db.sortedSetCard(params.key);
	}
	if (params.withScores) {
		return await db.getSortedSetRevRangeWithScores(params.key, params.start, params.stop);
	}
	return await db.getSortedSetRevRange(params.key, params.start, params.stop);
}

async function getSet(params) {
	return await db.getSetMembers(params.key);
}

async function getList(params) {
	return await db.getListRange(params.key, params.start, params.stop);
}

dbExplorer.admin = {};

dbExplorer.admin.menu = async function (menu) {
	menu.plugins.push({
		route: '/plugins/db-explorer',
		icon: 'fa-hdd-0',
		name: 'DB Explorer',
	});
	return menu;
};
