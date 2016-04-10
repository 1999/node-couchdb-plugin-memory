'use strict';

export default class Cache {
    constructor() {
        this._cache = new Map;
    }

    get(key) {
        return new Promise(resolve => {
            process.nextTick(() => {
                resolve(this._cache.get(key) || null);
            });
        });
    }

    set(key, value) {
        return new Promise(resolve => {
            process.nextTick(() => {
                this._cache.set(key, value);
                resolve();
            });
        });
    }

    invalidate() {
        return new Promise(resolve => {
            process.nextTick(() => {
                this._cache.clear();
                resolve();
            });
        });
    }
};
