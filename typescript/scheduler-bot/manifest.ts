import { Manifest } from 'deno-slack-sdk/mod.ts';
import MessageWorkflow from './workflows/message_workflow.ts';

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
	name: 'scheduler-bot',
	description: 'A sample GPT text generator with scheduled bot',
	icon: 'assets/icon.png',
	workflows: [MessageWorkflow],
	botScopes: ['channels:read', 'chat:write', 'chat:write.public'],
});
