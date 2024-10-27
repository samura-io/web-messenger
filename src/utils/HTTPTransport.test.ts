import { expect, use } from 'chai';
import SinonChai from 'sinon-chai';
import HTTPTransport, { queryStringify } from './HTTPTransport.ts';
import { createSandbox, SinonStub } from 'sinon';

describe('HTTPTransport', () => {
  use(SinonChai);
  const sandbox = createSandbox();
  let http: string;
  let request: SinonStub;

  beforeEach(() => {
    http = new HTTPTransport({ API_URL: 'https://example.com' });
    request = sandbox.stub(http, '_request' as keyof HTTPTransport).callsFake((data) => Promise.resolve(data));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Верно конкатинирется путь к API', () => {
    http.post('/test/user/123', { data: { test: 'test' } });

    expect(request).to.have.been.calledWith('https://example.com/test/user/123');
  });

  it('Верно формируются query параметры для GET запроса: число и число', () => {
    expect(queryStringify({ a: 1, b: 2 })).to.equal('?a=1&b=2');
  });

  it('Верно формируются query параметры для GET запроса: число и строка', () => {
    expect(queryStringify({ a: 1, b: 'test string' })).to.equal('?a=1&b=test string');
  });

  it('Верно формируются query параметры для GET запроса: число и массив', () => {
    expect(queryStringify({ a: 1, b: [1, 'test'] })).to.equal('?a=1&b=1,test');
  });

  it('Верно формируются query параметры для GET запроса: строка и объект', () => {
    expect(queryStringify({ a: 'test', b: { test: 1 } })).to.equal('?a=test&b=[object Object]');
  });

});
