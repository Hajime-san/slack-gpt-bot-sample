import { Trigger } from 'deno-slack-api/types.ts';
import MessageWorkflow from '../workflows/message_workflow.ts';

/**
 * Triggers determine when Workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const trigger: Trigger<typeof MessageWorkflow.definition> = {
	name: 'Send a message',
	type: 'scheduled',
	workflow: '#/workflows/message_workflow',
	schedule: {
		start_time: '2022-10-13T10:02:00Z',
		timezone: 'UTC',
		frequency: {
			type: 'weekly',
			on_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
			repeats_every: 18,
		},
	},
};

export default trigger;
