const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '17',
                firefox: '60',
                chrome: '67',
                safari: '8',
                ios: '8',
                android: '4'
            },
            useBuiltIns: 'usage',
        },
    ],
];

module.exports = { presets };
