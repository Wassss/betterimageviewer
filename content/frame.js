/* globals Components, content, addMessageListener, removeMessageListener */
Components.utils.import('resource://gre/modules/Services.jsm');

let listener = {
	_messages: [
		'BetterImageViewer:ZoomReset'
	],
	init: function() {
		this.enable();
	},
	enable: function() {
		for (let m of this._messages) {
			addMessageListener(m, this);
		}
	},
	disable: function() {
		for (let m of this._messages) {
			removeMessageListener(m, this);
		}
	},
	receiveMessage: function(message) {
		switch (message.name) {
		case 'BetterImageViewer:ZoomReset':
			try {
				content.document.QueryInterface(Components.interfaces.nsIImageDocument);
				content.dispatchEvent(new content.CustomEvent('BetterImageViewer:ZoomReset'));
			} catch (ex) {
				// QI will throw if it's not an nsIImageDocument
			}
			break;
		}
	}
};
listener.init();