var commentsCount;
var textArea;
var commentsList;
var cardTemplate = 
	'<div class="card">\
		<img src="images/anonymous.png">\
		<div class="wrapper">\
			<div class="head">\
				<span>#%s</span>%s\
			</div>\
			<div class="content">\
				%s\
			</div>\
		</div>\
	</div>'
var countSpan;

$(function() {
	textArea = $('#commentsEditArea');
	commentsList = $('#list0');
	countSpan = $('#count0  > span');
	commentsCount = countSpan.text();

	$('#copyright > span').text(new Date().getFullYear());
});

function comment() {
	var id = Number(commentsCount) + 1;
	var nick = 'Me';
	var content = textArea.val().trim();
	if(content != '') {
		commentsList.append(cardTemplate.format(id, nick, content.replace(/\n/g,'<br>')));
		changeCommentsConut();
		postCommentToServer(content);
	}
}

function commentByHotKey(event) {
	if(event.keyCode == 10) {
        comment(); //ctrl + enter 直接提交
    }
}

function changeCommentsConut() {
	commentsCount++;
	countSpan.text(commentsCount);
}

String.prototype.format = function(){
    var args = arguments;
	var count = 0;
    return this.replace(/%s/g, function(s, i) {
        return args[count++];
    });
}

function postCommentToServer(comment) {
	$.get('?comment=' + comment);
}