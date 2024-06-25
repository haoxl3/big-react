import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from "./utils";
import generatePackageJson from "rollup-plugin-generate-package-json";

// 找到react文件夹下的package.json, 获取name和module字段
const {name, module} = getPackageJSON("react");
// 获取react文件夹所在的路径
const pkgPath = resolvePkgPath(name);
// 获取react文件被打包后的路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
    {
        input: `${pkgPath}/${module}`,
        output: {
            file: `${pkgDistPath}/index.js`,
            format: "umd",
            name: 'index.js'
        },
        plugins: [...getBaseRollupPlugins(), generatePackageJson({
            inputFolder: pkgPath,
            outputFolder: pkgDistPath,
            baseContents: ({name, description, version}) => ({
                name,
                description,
                version,
                main: 'index.js'
            })
        })]
    },
    {
        input: `${pkgPath}/src/jsx.ts`,
        output: [
            {
                file: `${pkgDistPath}/jsx-runtime.js`,
                name: 'jsx-runtime.js',
                formate: 'umd'
            },
            {
                file: `${pkgDistPath}/jsx-dev-runtime.js`,
                name: 'jsx-dev-runtime.js',
                formate: 'umd'
            }
        ],
        plugins: getBaseRollupPlugins()
    }
]