import { WebClient } from 'https://deno.land/x/slack_web_api@6.7.2/mod.js?s=WebClient';
import { config as loadEnv } from 'https://deno.land/std@0.159.0/dotenv/mod.ts';
import type { MessageBody, MessageResponse, UserResponse } from './types.d.ts';

const { SLACK_CHANNEL_ID, SLACK_TOKEN, USER_MAIL } = await loadEnv({
	export: true,
	allowEmptyValues: true,
});

const web = new WebClient(SLACK_TOKEN);

// require below permissions
// users:read.email
const userResponse: UserResponse = await web.apiCall('users.lookupByEmail', {
	email: USER_MAIL,
});

const getMessage = async (): Promise<Array<MessageBody>> => {
	console.log('Start get messages...');

	return await new Promise((resolve, reject) => {
		const msg: Array<MessageBody> = [];

		const recursiveGetMessage = async (cursor?: string) => {
			// require below permissions
			// channels:history, groups:history, im:history, mpim:history
			web.apiCall('conversations.history', {
				channel: SLACK_CHANNEL_ID,
				cursor,
			})
				.then((res: MessageResponse) => {
					// push message
					msg.push(...res.messages);
					// if next message exist
					if (res.response_metadata.next_cursor) {
						// iterate next message
						recursiveGetMessage(res.response_metadata.next_cursor);
					} else {
						console.log('End get messages.');
						resolve(msg);
					}
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		};

		recursiveGetMessage();
	});
};

const messages = await getMessage();

await Deno.writeTextFile(
	'./messages.txt',
	messages
		// specify a user
		.filter((v) => v.user === userResponse.user.id)
		// remove like the message 'Someone join this channel'.
		.filter((v) => typeof v.subtype === 'undefined')
		// remove hyperlink message
		.filter((v) => !v.text.match(/<([^<>|]*)(?:\|([^<>]*))?>/g))
		.map((v) => v.text)
		.join('<EOT>\n'),
);
