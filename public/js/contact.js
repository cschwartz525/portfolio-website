var $ = window.$;

$('#inquiry').on('click', function () {
	$('#message-body').attr('placeholder', 'Tell me a little bit about your project...');
});
$('#message').on('click', function () {
	$('#message-body').attr('placeholder', 'Leave me a message...');
});
