window.onload = function(){
	document.body.innerHTML += '<div id="entity_editor" style="position:absolute;padding:0;margin:0;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,1);z-index:10;display:none;"></div>';
	document.body.innerHTML += '<button onClick="document.getElementById(\'entity_editor\').style.display=\'block\'" type="button" class="ant-btn ant-btn-danger" style="position: fixed; top: 40px; right: 20px;">Open Entity Editor</button>';
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://cdn.jsdelivr.net/gh/leonvv/bitrix24-entity-editor@latest/dist/build/static/js/ee.min.js';
	head.appendChild(script);
}