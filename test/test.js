'use strict';

import assert from 'assert';
import Cache from '../';

describe('node-couchdb-plugin: memory', () => {
    it('should expose expected API', () => {
        assert.strictEqual(typeof Cache, 'function', 'exported object is not a function');

        const cache = new Cache;
        for (let method of ['get', 'set', 'invalidate']) {
            assert.strictEqual(typeof cache[method], 'function', `cache.${method} is not a function`);
        }

        assert(cache.get('smth') instanceof Promise, 'get result is not a promise');
        assert(cache.set('key', 'value') instanceof Promise, 'set result is not a promise');
        assert(cache.invalidate() instanceof Promise, 'invalidate result is not a promise');
    });

    it('should should use async get operation', () => {
        const cache = new Cache;
        let counter = 0;

        const getPromise = cache.get('foo').then(() => {
            counter++;
        });

        assert.strictEqual(counter, 0, 'get op is synchronous');
        return getPromise;
    });

    it('should should use async set operation', () => {
        const cache = new Cache;
        let counter = 0;

        const setPromise = cache.set('foo', 'bar').then(() => {
            counter++;
        });

        assert.strictEqual(counter, 0, 'set op is synchronous');
        return setPromise;
    });

    it('should should use async invalidate operation', () => {
        const cache = new Cache;
        let counter = 0;

        const invalidatePromise = cache.invalidate().then(() => {
            counter++;
        });

        assert.strictEqual(counter, 0, 'invalidate op is synchronous');
        return invalidatePromise;
    });

    it('should set/get existing records', () => {
        const cache = new Cache;

        return cache.set('key', 'value')
            .then(() => cache.get('key'))
            .then(res => assert.strictEqual(res, 'value'));
    });

    it('should not get missing records', () => {
        const cache = new Cache;

        return cache.get('mising').then(res => {
            assert.strictEqual(res, null);
        });
    });

    it('should clear existing records with invalidate', () => {
        const cache = new Cache;

        return cache.set('key', 'value')
            .then(() => cache.get('key'))
            .then(res => assert.strictEqual(res, 'value'))
            .then(() => cache.invalidate())
            .then(() => cache.get('key'))
            .then(res => assert.strictEqual(res, null));
    });
});
