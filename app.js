var fs = require('fs');
var basePath = 'examples/src'; 
fs.readdir(basePath,function(err, files){
	if(err){
		console.log('read dir err')
	}else{
		files.forEach(function(item){
			// 遍历每个子文件夹
			var tmpPath = basePath + '/' + item;
			var htmlPath = basePath + '/' + item + '/widget.html';
			var jsPath = basePath + '/' + item + '/widget.js';
			var cssPath = basePath + '/' + item + '/widget.css';
			var htmlStr,jsStr,cssStr;
			fs.readFile(htmlPath,function(err,data){
				if(err){
					console.log('read html err')
				}else{
					htmlStr = data.toString();
				}
				fs.readFile(jsPath,function(err,data){
					if(err){
						console.log('read html err')
					}else{
						jsStr = data.toString();
					}
					fs.readFile(cssPath,function(err,data){
						if(err){
							console.log('read html err')
						}else{
							cssStr = data.toString();
						}
						var ctx = '..'
						var tpl = [
					        '<!DOCTYPE html>',
					        '<html lang="en">',
					        '<head>',
					        '<meta charset="UTF-8">',
					        '<meta name="viewport" content="width=device-width, initial-scale=1">',
					       	'<title>Title</title>',
							'<link rel="stylesheet" href="'+ ctx +'/vendor/font-awesome/css/font-awesome.css">',
					       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u.css">',
					       	'<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/u-extend.css">',
						    '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/tree.css">',
					        '<link rel="stylesheet" type="text/css" href="'+ ctx +'/vendor/uui/css/grid.css">',
					        '<style id="demo-style" media="screen">',
					        cssStr,
					        '</style>',
					        '</head>',
					        '<body>',
					        htmlStr,
					        '<script src="'+ ctx +'/vendor/jquery/jquery-1.11.2.js"></script>',
					    	'<script src="'+ ctx +'/vendor/knockout/knockout-3.2.0.debug.js"></script>',
					        '<script src="'+ ctx +'/vendor/uui/js/u-polyfill.js"></script>',
					        '<script src="'+ ctx +'/vendor/uui/js/u.js"></script>',
					        '<script src="'+ ctx +'/vendor/uui/js/u-tree.js"></script>',
					        '<script src="'+ ctx +'/vendor/uui/js/u-grid.js"></script>',
							'<script src="'+ ctx +'/vendor/requirejs/require.debug.js"></script>',
					        '<script>',
					        jsStr,
					        '</script>',
					        '</body>',
					        '</html>'
				        ]
				        var tplStr = tpl.join('\r\n');
				        fs.writeFile('examples/' + item + '.html',tplStr,function(err){
				        })
					})
				})
			})
		})
	}
})