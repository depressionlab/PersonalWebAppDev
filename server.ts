Deno.serve((req) => {
	if (req.headers.get('upgrade') !== 'websocket') {
		return new Response(null, { status: 501, statusText: 'no websocket upgrade' });
	}

	const ws = Deno.upgradeWebSocket(req);
	ws.socket.addEventListener('open', () => {
		console.log('a client connected');
	});

	ws.socket.addEventListener('message', (ev: MessageEvent<string>) => {
		if (ev.data.startsWith('identity:')) {
			ws.socket.send('identity: recv');
		}
	});

	return ws.response;
});
