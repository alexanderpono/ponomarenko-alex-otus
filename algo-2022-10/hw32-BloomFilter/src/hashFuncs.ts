import crypto from 'crypto';

export function sha256(x: string): bigint {
    const hash = crypto.createHash('sha256');
    hash.update(x);
    const digest = hash.digest('hex');
    return BigInt(`0x${digest}`);
}

export function md5(x: string): bigint {
    const hash = crypto.createHash('md5');
    hash.update(x);
    const digest = hash.digest('hex');
    return BigInt(`0x${digest}`);
}

export function sha1(x: string): bigint {
    const hash = crypto.createHash('sha1');
    hash.update(x);
    const digest = hash.digest('hex');
    return BigInt(`0x${digest}`);
}

export function sha3_512(x: string): bigint {
    const hash = crypto.createHash('sha3-512');
    hash.update(x);
    const digest = hash.digest('hex');
    return BigInt(`0x${digest}`);
}
