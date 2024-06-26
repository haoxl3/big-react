import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

// 包所在目录
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包后模块所在目录
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
    if (isDist) {
        return `${distPath}/${pkgName}`;
    }
    return `${pkgPath}/${pkgName}`
}
export function getPackageJSON(pkgName) {
    const path = `${resolvePkgPath(pkgName)}/package.json`;
    const str = fs.readFileSync(path, {encoding: 'utf-8'});
    return JSON.parse(str);
}
export function getBaseRollupPlugins({typescript = {}} = {}) {
    return [cjs(), ts(typescript)]
}