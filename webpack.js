// webpack配置方法
// 1. 函数类型  接受两个参数 env和argv 分别对应着环境对象和 Webpack-CLI 的命令行选项，例如下面代码中的--optimize-minimize
module.exports = (env, argv) => {
    return {
        mode: env.production ? 'production' : 'development',
        devtool: env.production ? 'source-maps' : 'eval',
        plugins: [
            new TerserPlugin({
                terserOptions: {
                    compress: argv['optimize-minimize'] // 只有传入 -p 或 --optimize-minimize
                }
            })
        ]
    };
};

// 2. Promise 类型的 Webpack 配置   需要异步加载一些 Webpack 配置需要做的变量

module.exports = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: './app.js'
                /* ... */
            });
        }, 5000);
    });
};

// 3. 多配置数组
// 在一些特定的场景，我们可能需要一次打包多次，而多次打包中有一些通用的配置，
// 这时候可以使用配置数组的方式，将两次以上的 Webpack 配置以数组的形式导出：
module.exports = [
    {
        mode: 'production'
        // 配置1
    },
    {
        // 配置2
    }
];

// 输入与输出
// entry 可以是多文件，也可以是单文件，单文件可以是string和数组形式
// 单文件：
module.exports = {
    entry: 'path/to/my/entry/file.js'
};
// 或者使用对象方式
module.exports = {
    entry: {
        main: 'path/to/my/entry/file.js'
    }
};
// 数组形式
module.exports = {
    mode: 'development',
    entry: ['./src/app.js', './src/home.js'],
    output: {
        filename: 'array.js'
    }
};

// 1.如果直接是 string 的形式，那么 webpack 就会直接把该 string 指定的模块（文件）作为入口模块
// 2.如果是数组 [string] 的形式，那么 webpack 会自动生成另外一个入口模块，
// 并将数组中每个元素指定的模块（文件）加载进来，并将最后一个模块的 module.exports 作为入口模块的 module.exports 导出。

// 多文件
module.exports = {
    entry: {
        home: 'path/to/my/entry/home.js',
        search: 'path/to/my/entry/search.js',
        list: 'path/to/my/entry/list.js'
    }
};

// 输出 output  只有一个输出
module.exports = {
    entry: {
        home: 'path/to/my/entry/home.js',
        search: 'path/to/my/entry/search.js',
        list: 'path/to/my/entry/list.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
};

// 占位符： [name]是占位符， 上述的name对应的是entry里的key(home、search、list)
