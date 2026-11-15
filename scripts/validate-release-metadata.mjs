import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const app = JSON.parse(readFileSync(new URL('../app.json', import.meta.url), 'utf8')).expo;
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));

assert.ok(/^\\d+\\.\\d+\\.\\d+$/.test(app.version), 'Expo version must use semantic versioning');
assert.equal(pkg.version, app.version, 'package.json version must match app.json');
assert.equal(lock.version, app.version, 'package-lock root version must match app.json');
assert.equal(lock.packages?.['']?.version, app.version, 'package-lock root package version must match app.json');
assert.ok(Number.isInteger(app.android?.versionCode) && app.android.versionCode > 0, 'Android versionCode must be a positive integer');
console.log('Release metadata passed:', app.version, '(Android versionCode', app.android.versionCode + ')');
