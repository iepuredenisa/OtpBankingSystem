using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace OtpBankingSystem.DAL.Context
{
    public class RedisContext
    {
        #region Members
        private static Lazy<ConnectionMultiplexer> _lazyConnection;
        private readonly ILogger<RedisContext> _logger;
        private readonly IDatabase _database;
        private readonly IServer _server;
        #endregion Members

        #region Constructor
        public RedisContext(IConfiguration configuration, ILogger<RedisContext> logger)
        {
            string redisConnectionString = configuration.GetConnectionString("Redis") ?? "localhost:6379";

            _lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
                ConnectionMultiplexer.Connect(redisConnectionString)
            );

            _logger = logger;
            _database = _lazyConnection.Value.GetDatabase();

            var endpoints = _lazyConnection.Value.GetEndPoints();
            _server = _lazyConnection.Value.GetServer(endpoints.First());
        }
        #endregion Constructor

        #region Methods
        public async Task<bool> SetValueAsync(string key, string value, TimeSpan? expiry = null)
        {
            try
            {
                return await _database.StringSetAsync(key, value, expiry);
            }
            catch (RedisException ex)
            {
                _logger.LogError(ex, $"❌ Redis SET failed for key: {key}");
                return false;
            }
        }

        public async Task<string?> GetValueAsync(string key)
        {
            try
            {
                var result = await _database.StringGetAsync(key);
                return result.HasValue ? result.ToString() : null;
            }
            catch (RedisException ex)
            {
                _logger.LogError(ex, $"❌ Redis GET failed for key: {key}");
                return null;
            }
        }

        public async Task<bool> DeleteKeyAsync(string key)
        {
            try
            {
                return await _database.KeyDeleteAsync(key);
            }
            catch (RedisException ex)
            {
                _logger.LogError(ex, $"❌ Redis DELETE failed for key: {key}");
                return false;
            }
        }

        public async Task<bool> KeyExistsAsync(string key)
        {
            try
            {
                return await _database.KeyExistsAsync(key);
            }
            catch (RedisException ex)
            {
                _logger.LogError(ex, $"❌ Redis EXISTS check failed for key: {key}");
                return false;
            }
        }

        public async Task<List<string>> GetAllKeysAsync()
        {
            var keysList = new List<string>();

            try
            {
                var keys = _server.Keys(pattern: "*", pageSize: 1000);
                keysList = keys.Select(k => (string)k).ToList();
            }
            catch (RedisException ex)
            {
                _logger.LogError(ex, "❌ Redis SCAN operation failed.");
            }

            return keysList;
        }
        #endregion Methods
    }
}
