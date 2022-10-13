import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';
import { SlackAPI } from 'deno-slack-api/mod.ts';

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in Workflows.
 * https://api.slack.com/future/functions/custom
 */
export const MessageFunctionDefinition = DefineFunction({
	callback_id: 'message_function',
	title: 'Generate a message',
	description: 'Generate a message',
	source_file: 'functions/message_function.ts',
});

export default SlackFunction(
	MessageFunctionDefinition,
	async ({ token }) => {
		const client = SlackAPI(token, {});
		await client.chat.postMessage({
			channel: 'C01CK0S5H8A',
			text: 'hi',
		});
		return { outputs: {} };
	},
);
