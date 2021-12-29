import { RedisClient } from '@/domain/adapters/redis/redis-connector';

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

class GetCommand {
  static async perform(redisClient: RedisClient, key: string) {
    if (!redisClient) throw new Error('redisClient is required');
    return await redisClient.get(key);
  }
}

describe('GetCommand Usecase', () => {
  it('should return the value related to the key passed as parameter', async () => {
    const key = 'any_key:test';
    const value = 'any_value';
    RedisClientMock.set(key, value);
    const resultPromise = GetCommand.perform(RedisClientMock, key);
    await expect(resultPromise).resolves.toMatch(value);
  });
});
