'use strict';

const cache = new Map;

export default {
    get(key) {
        return new Promise(resolve => {
            process.nextTick(() => {
                resolve(cache.get(key) || null);
            });
        });
    },

    set(key, value) {
        return new Promise(resolve => {
            process.nextTick(() => {
                cache.set(key, value);
                resolve();
            });
        });
    },

    invalidate() {
        return new Promise(resolve => {
            process.nextTick(() => {
                cache.clear();
                resolve();
            });
        });
    }
};
