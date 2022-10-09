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

const getMessages = async (): Promise<Array<MessageBody>> => {
	console.log('Start get messages...');

	return await new Promise((resolve, reject) => {
		const msg: Array<MessageBody> = [];
		let count = 0;

		const recursiveGetMessages = (cursor?: string) => {
			// require below permissions
			// channels:history, groups:history, im:history, mpim:history
			web.apiCall('conversations.history', {
				channel: SLACK_CHANNEL_ID,
				cursor,
			})
				.then((res: MessageResponse) => {
					const { messages, response_metadata: { next_cursor } } = res;
					// push message
					msg.push(...messages);
					// iterate count
					count += messages.length;
					// if next message exist
					if (next_cursor) {
						// iterate next message
						recursiveGetMessages(next_cursor);
					} else {
						console.log(`End get ${count} messages.`);
						resolve(msg);
					}
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		};

		recursiveGetMessages();
	});
};

const writeMessagesToTextFile = async (
	fileName: string,
	messages: Array<MessageBody>,
	options?: {
		containLink?: false;
	},
) => {
	await Deno.writeTextFile(
		fileName,
		messages
			// specify a user
			.filter((v) => v.user === userResponse.user.id)
			// remove like the message 'Someone join this channel'.
			.filter((v) => typeof v.subtype === 'undefined')
			// remove hyperlink message
			.filter((v) => !options?.containLink && !v.text.match(/<([^<>|]*)(?:\|([^<>]*))?>/g))
			.map((v) => v.text)
			.join('<EOT>'),
	);
};

const messages = await getMessages();

await writeMessagesToTextFile('./messages.txt', messages);
