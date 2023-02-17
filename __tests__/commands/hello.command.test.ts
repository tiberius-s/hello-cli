import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Command } from 'commander';

import { helloHandler, helloCommand } from '@/commands/hello.command.js';

const logSpy = vi.spyOn(console, 'log').mockImplementation(() => null);

describe('src/commands/hello.command.ts', () => {
  beforeEach(() => {
    logSpy.mockClear();
  });

  test('should return instance of Command', () => {
    const result = helloCommand();
    expect(result).toBeInstanceOf(Command);
  });

  test.each([
    ['buddy', { yell: false }, 'Hello, buddy.'],
    ['buddy', { yell: true }, 'Hello, buddy.'.toUpperCase()],
    [undefined, { yell: false }, 'Hello, friend.'],
    [undefined, { yell: true }, 'Hello, friend.'.toUpperCase()],
  ])(
    'when helloCommand is called with %p and %p as arguments, output is %p',
    (name?: string, options?: Record<string, unknown>, expected?: string) => {
      helloHandler(name, options);
      expect(logSpy).toHaveBeenCalledWith(expected);
    },
  );
});
