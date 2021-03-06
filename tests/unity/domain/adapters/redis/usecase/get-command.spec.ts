import { RedisClient } from '@/domain/adapters/redis/redis-connector';
import GetCommand from '@/domain/adapters/redis/usecases/get.usecase';

const VALUES: { [key: string]: string } = {};

const RedisClientMock = {
  set: jest.fn().mockImplementation((key, value, options?) => {
    Reflect.set(VALUES, key, value);
    return 'OK';
  }),
  get: jest.fn().mockImplementation(async (key) => {
    return await Reflect.get(VALUES, key);
  }),
} as Pick<RedisClient, 'get' | 'set'> as RedisClient;

describe('GetCommand Usecase', () => {
  it('should return the value related to the key passed as parameter', async () => {
    const key = 'any_key:test';
    const value = 'any_value';
    RedisClientMock.set(key, value);
    const resultPromise = GetCommand.perform(RedisClientMock, key);
    await expect(resultPromise).resolves.toMatch(value);
  });

  it('should thrown excpetion if redisClient is null', async () => {
    const resultPromise = GetCommand.perform(
      null as unknown as RedisClient,
      'any_key',
    );
    await expect(resultPromise).rejects.toThrowError('redisClient is required');
  });

  it('should thrown excpetion if key is null', async () => {
    const resultPromise = GetCommand.perform(RedisClientMock, '');
    await expect(resultPromise).rejects.toThrowError('key are required');
  });
});
