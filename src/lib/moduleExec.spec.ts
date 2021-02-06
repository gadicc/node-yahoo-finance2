import search from '../modules/search';
const { InvalidOptionsError } = require('./errors');
import moduleExec from './moduleExec';

import _env from '../env-node';
import _fetch from './yahooFinanceFetch';
import _moduleExec from './moduleExec';

const yf = {
  _env,
  _fetch,
  _opts: { validation: { logErrors: true }},
  _moduleExec,
  search
};

describe('moduleExec', () => {

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
