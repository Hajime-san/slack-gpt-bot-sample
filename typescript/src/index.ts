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
	options: {
		eotSuffix?: string;
		containLink?: boolean;
		additionalCondition?: (v: MessageBody) => boolean;
	},
) => {
	const { eotSuffix, containLink, additionalCondition } = options;
	const _eotSuffix = eotSuffix ? eotSuffix : '<|endoftext|>';
	const _containLink = containLink ? containLink : false;

	await Deno.writeTextFile(
		fileName,
		messages
			.filter((v) =>
				// specify a user
				v.user === userResponse.user.id &&
				// remove like the message 'Someone join this channel'.
				typeof v.subtype === 'undefined' &&
				// other condition
				(
					// remove hyperlink message
					(!_containLink && !v.text.match(/<([^<>|]*)(?:\|([^<>]*))?>/g)) &&
					// additional condition
					(additionalCondition ? additionalCondition(v) : true)
				)
			)
			.map((v, index, array) => {
				if (index === array.length - 1) {
					console.log(`Filtered ${array.length} messages.`);
				}
				return v.text;
			})
			.join(_eotSuffix),
	);
};

const messages = await getMessages();

await writeMessagesToTextFile(
	'./dataset.txt',
	messages,
	{
		additionalCondition: (v) => !v.text.includes(':terra:'),
	},
);
