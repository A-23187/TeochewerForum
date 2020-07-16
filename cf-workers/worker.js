addEventListener('fetch',
	e => e.respondWith(router(e.request))
);

function router(req) {
	const url = new URL(req.url);

	if(url.pathname.startsWith('/forum/'))
		return forum(url);
	else
		return resp('404 Not Found', 404);
}

function resp(content, status = 200) {
	return new Response(content, {
		status: status,
		headers: new Headers({
			'content-type': 'text/html'
		})
	});
}

async function forum(url) {
	const BASE_PATH = 'https://raw.githubusercontent.com/A-23187/TeochewerForum/master/';
	const API_BASE_URL = 'https://api.github.com/repos/A-23187/TeochewerForum/issues';
	const API_HEADERS = {'User-Agent': 'A-23187', 'Authorization': 'token ' + GH_TOKEN};
	const CARD = `<div class="card">
	<img src="images/anonymous.png">
	<div class="wrapper">
		<div class="head"><span>#ID</span></div>
		<div class="content">CNT</div>
	</div>
</div>`;

	var path = url.pathname.substr(7); // 7 - the length of '/forum/'
	var type = path.substr(path.lastIndexOf('.') + 1);
	var comment = url.searchParams.get('comment');

	if(comment == null || comment == '') {
        if(path == '')
            path = 'forum.html';
		if(path == 'forum.html') {
			var template = await fetch(BASE_PATH + path)
				.then(res => res.text());
			var comments = await fetch(API_BASE_URL + '?labels=forum&direction=asc', {headers: API_HEADERS})
				.then(res => res.json());
			
			return resp(template.replace('{{count}}', comments.length).replace('{{comments}}', () => {
				var res = '';
				for(let i in comments) {
					var c = comments[i];
					res += CARD.replace('ID', Number(i) + 1)
						.replace('CNT', c.body.replace(/\r?\n/g, '<br>'));
				}
				return res;
			}));
		} else {
			var res = await fetch(BASE_PATH + path);//.catch(err => resp(err.stack, 500));
			if(type == 'png' || type == 'jpg' || type == 'gif')
				return res;
			else if(type == 'html' || type == 'css' || type == 'js') {
				return new Response(res.body, {
					status: res.status,
					headers: new Headers({
						'content-type': ({'html': 'text/html', 'css': 'text/css', 'js': 'application/javascript'})[type]
					})
				})
			}
		}
	} else {
		var res = await fetch(API_BASE_URL, {
			method: 'POST',
			headers: API_HEADERS,
			body: JSON.stringify({
				'title': 'Forum\'s Comments',
				'labels': ['forum'],
				'body': comment
			})
		});
		return res;
	}
}
