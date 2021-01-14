
'use strict';

/* globals define, $, config, app */

define('admin/plugins/db-explorer', function () {
	var dbExplorer = {};

	dbExplorer.init = function () {
		$('#get').on('click', function () {
			var data = {
				key: $('#keyName').val(),
				start: $('#start').val(),
				stop: $('#stop').val(),
				min: $('#min').val(),
				max: $('#max').val(),
				count: $('#count').is(':checked') ? 1 : 0,
				withScores: $('#withScores').is(':checked') ? 1 : 0,
			};
			$.ajax({
				url: config.relative_path + '/api/admin/plugins/db-explorer',
				type: 'get',
				data: data,
				success: function (response) {
					var el = $('.template').clone();
					el.removeClass('template').removeClass('hidden');
					$('.results').prepend(el);
					el.find('#type').text(response.result.type);
					el.find('#key').text(data.key);
					el.find('.output').text(response.result.value);
				},
				error: function () {
					app.alertError('Error loading data');
				},
			});
			return false;
		});
	};
	return dbExplorer;
});
