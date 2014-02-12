var Util = {}

Util.pad = function(n, min, pad) {
	pad = pad || '0';
	n = n + '';
	return n.length > min ? n : new Array(min - n.length + 1).join(pad) + n;
}

Util.exports = function(Module, Namespace) {
	for(var name in Namespace)
		Module.exports[name] = Namespace[name];
}

var Time = {}

Time.epoch = function(date) {
	var d = date || new Date();
	return Math.round(d.getTime()/1000);
}

Time.sectoh = function(i) {
  var hour=Math.floor(i/3600);
	var minute=Math.floor((i-(hour*3600))/60);
	var second=Math.floor(i-(hour*3600)-(minute*60));
	return Util.pad(hour, 2, '0') + ':' + Util.pad(minute, 2, '0') + ':' + Util.pad(second, 2, '0');
}

Time.from_epoch = function(epoch) {
	var d = new Date();
	d.setTime(epoch * 1000);
	return d;
}

Time.ms = function(date) {
	var d = date || new Date();
	return d.getTime();
}

Time.now = function(fmt, date) {
		 /* 
		 * %h numeric hour on two digits
		 * %i numeric minute on two digits
		 % %s numeric seconds on two digits
		 * %d numeric day on two digits
		 * %m numeric month on two digits
		 * %y numeric year on two digits
		 * %Y numeric year on four digits
		 * %t unix timestamp (seconds elapsed from 1 1 70)
		 * %u milliseconds
		 */
		var res = new String(fmt);

		var d = date || new Date();

		res = res.replace('%h', Util.pad(d.getHours(), 2, '0'));
		res = res.replace('%i', Util.pad(d.getMinutes(), 2, '0'));
		res = res.replace('%s', Util.pad(d.getSeconds(), 2, '0'));
		res = res.replace('%d', Util.pad(d.getDate(), 2, '0'));
		res = res.replace('%m', Util.pad(d.getMonth() + 1, 2, '0'));
		res = res.replace('%Y', d.getFullYear());
		res = res.replace('%y', new String(d.getFullYear()).substring(2,4));
		res = res.replace('%t', Time.epoch(d));
		res = res.replace('%u', Util.pad(d.getMilliseconds(), 3, '0'));

		return res;
}

Util.exports(module, Time);
