import { jest } from '@jest/globals';
import { Command } from 'commander';

const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

import { helloAction, helloCommand } from '../../src/commands/hello.command.js';

describe('src/commands/hello.command.ts', () => {
  afterEach(() => {
    logSpy.mockClear();
  });

  test('should return instance of Command', () => {
    const result = helloCommand();
    expect(result).toBeInstanceOf(Command);
  });

  test.each([
    ['buddy', { yell: false }, `Hello, buddy.`],
    ['buddy', { yell: true }, `Hello, buddy.`.toUpperCase()],
    [undefined, { yell: false }, `Hello, friend.`],
    [undefined, { yell: true }, `Hello, friend.`.toUpperCase()],
  ])(
    'when helloCommand is called with %p and %p as arguments, output is %p',
    (name?: string, options?: Record<string, unknown>, expected?: string) => {
      helloAction(name, options);
      expect(logSpy).toHaveBeenCalledWith(expected);
    },
  );
});
