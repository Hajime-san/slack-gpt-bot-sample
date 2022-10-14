import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';
import { SlackAPI } from 'deno-slack-api/mod.ts';
import { API_URL, SLACK_CHANNEL_ID } from '../env.ts';

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
    // fetch generate text
    const response = await fetch(`${API_URL}/generate-text`);
    const { text }: { text: string } = await response.json();
    await client.chat.postMessage({
      channel: SLACK_CHANNEL_ID,
      text,
    });
    return { outputs: {} };
  },
);
