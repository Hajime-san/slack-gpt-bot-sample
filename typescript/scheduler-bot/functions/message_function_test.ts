import { SlackFunctionTester } from 'deno-slack-sdk/mod.ts';
import { assertEquals } from 'https://deno.land/std@0.153.0/testing/asserts.ts';
import MessageFunction from './message_function.ts';

const { createContext } = SlackFunctionTester('message_function');

Deno.test('Message function test', async () => {
  const inputs = { message: 'Welcome to the team!' };
  const { outputs } = await MessageFunction(createContext({ inputs }));
  assertEquals(
    Object.is(outputs?.message, undefined),
    true,
  );
});
