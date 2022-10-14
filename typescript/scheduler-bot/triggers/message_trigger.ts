import { Trigger } from 'deno-slack-api/types.ts';
import MessageWorkflow from '../workflows/message_workflow.ts';
import { datetime } from 'https://deno.land/x/ptera@v1.0.2/mod.ts';

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
		// UTC now to ISO string
		start_time: datetime().add({ minute: 1 }).toUTC().toISO(),
		frequency: {
			type: 'weekly',
			on_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		},
	},
};

export default trigger;
