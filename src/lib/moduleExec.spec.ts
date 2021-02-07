import search from '../modules/search';
const { InvalidOptionsError } = require('./errors');
import moduleExec from './moduleExec';

import _env from '../env-node';
import _fetch from './yahooFinanceFetch';
import _moduleExec from './moduleExec';

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true, logOptionsErrors: false }},
  _moduleExec,
  search
};

describe('moduleExec', () => {

  describe('options validation', () => {

    it('throws InvalidOptions on invalid options', async () => {
      const rwo = (options:any) => yf.search('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
    });

    it('logs errors on invalid options when logOptionsErrors = true', async () => {
      yf._opts.validation.logOptionsErrors = true;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      const rwo = (options:any) => yf.search('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
      console = realConsole;

      expect(
        fakeConsole.log.mock.calls.length +
        fakeConsole.error.mock.calls.length +
        fakeConsole.dir.mock.calls.length
      ).toBeGreaterThan(1);
      yf._opts.validation.logOptionsErrors = false;
    });

    it('does not log errors on invalid options when logOptionsErrors = false', async () => {
      yf._opts.validation.logOptionsErrors = false;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      const rwo = (options:any) => yf.search('symbol', options);
      await expect(rwo({ invalid: true })).rejects.toThrow(InvalidOptionsError)
      console = realConsole;

      expect(
        fakeConsole.log.mock.calls.length +
        fakeConsole.error.mock.calls.length +
        fakeConsole.dir.mock.calls.length
      ).toBe(0);
    });

  });

  describe('result validation', () => {

    it('throws on unexpected input', async () => {
      yf._opts.validation.logErrors = false;
      await expect(yf.search('AAPL', {}, { devel: 'search-fakeBadResult.json' }))
        .rejects.toThrow(/Failed Yahoo Schema/)
      yf._opts.validation.logErrors = true;
    });

    it('dont throw or log on unexpected input with {validateResult: false}', async () => {
      yf._opts.validation.logErrors = true;
      const realConsole = console;
      const fakeConsole = { error: jest.fn(), log: jest.fn(), dir: jest.fn() };

      /* @ts-ignore */
      console = fakeConsole;
      await expect(yf.search('AAPL', {}, {
        devel: 'search-fakeBadResult.json',
        validateResult: false
      })).resolves.toBeDefined();
      console = realConsole;

      expect(fakeConsole.log).not.toHaveBeenCalled();
      expect(fakeConsole.error).not.toHaveBeenCalled();
      expect(fakeConsole.dir).not.toHaveBeenCalled();
    });

  });

});
