import { DefineWorkflow, Schema } from 'deno-slack-sdk/mod.ts';
import { MessageFunctionDefinition } from '../functions/message_function.ts';

/**
 * A Workflow is a set of steps that are executed in order.
 * Each step in a Workflow is a function.
 * https://api.slack.com/future/workflows
 */
const MessageWorkflow = DefineWorkflow({
  callback_id: 'message_workflow',
  title: 'Message Workflow',
  description: 'Send a message to a channel',
});

MessageWorkflow.addStep(MessageFunctionDefinition, {});

export default MessageWorkflow;
