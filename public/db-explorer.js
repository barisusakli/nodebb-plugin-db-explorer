
'use strict';

define('admin/plugins/db-explorer', ['alerts'], function (alerts) {
	const dbExplorer = {};

	dbExplorer.init = function () {
		$('#keyName').on('keydown', function (event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				$('#get').trigger('click');
			}
		});

		$('#get').on('click', function () {
			const data = {
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
					const el = $('.template').clone();
					el.removeClass('template').removeClass('hidden');
					$('.results').prepend(el);
					el.find('#type').text(response.result.type);
					el.find('#key').text(data.key);
					el.find('.output').text(response.result.value);
				},
				error: function () {
					alerts.error('Error loading data');
				},
			});
			return false;
		});
	};
	return dbExplorer;
});
