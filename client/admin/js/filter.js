let $;
let $txt;

const debounce = require('lodash.debounce');

function applyFilters() {
	if ($txt.val()) {
		const regex = new RegExp('^(.*?)('+$txt.val()+')(.*?)$', 'ig');
		const $matching = $('.screen[data-filter*="'+$txt.val().toLowerCase()+'"]');
		$matching.show().find('.screen-name').each(function() {
			$(this).html(this.title.replace(regex, '$1<span class="highlight">$2</span>$3'));
		});
		$('.screen').not($matching).hide();
		if ($matching.length === 1 && !$matching.find('.screen-select').prop('checked')) {
			$matching.find('.screen-select').prop('checked', true);
		}
	} else {
		$('.screen').show().find('.screen-name').each(function() {
			$(this).html(this.title);
		});
	}
}

const applyFiltersDebounced = debounce(applyFilters, 200, {
	leading: true
});

exports.init = function(jQuery) {
	$ = jQuery;
	$txt = $('#txtfilter');
	$txt.on('keyup', function(e) {
		e.preventDefault();
		applyFiltersDebounced();
	});
	applyFiltersDebounced();
};

exports.apply = applyFiltersDebounced;
