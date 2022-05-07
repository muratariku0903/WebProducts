// using make-dir module. if not install this ,type command [npm install make-dir --save]
const fs = require('fs');
const makeDir = require('make-dir');

const config = {
    css: {
        files: [
            'style.scss'
        ],
    },
    images: {

    },
    scripts: {
        files: [
            'index.js'
        ],
    },
    scss: {
        dirs: {
            foundation: {
                files: [
                    '_base.scss',
                    '_color.scss',
                    '_font.scss',
                    '_mixin.scss',
                    '_reset.scss',
                    '_variable.scss',
                    '_index.scss',
                ]
            },
            layout: {
                files: [
                    '_header.scss',
                    '_main.scss',
                    '_footer.scss',
                    '_index.scss',
                ]
            },
            object: {
                dirs: {
                    component: {
                        files: [
                            '_index.scss'
                        ]
                    },
                    project: {
                        files: [
                            '_index.scss'
                        ]
                    },
                    utility: {
                        files: [
                            '_index.scss'
                        ]
                    }
                },
                files: [
                    '_index.scss',
                ],
            }
        }
    }
}

const setup = (rootDirName, config) => {
    makeDir(rootDirName);
    for (const dirName in config) {
        console.log(`create dir : ${rootDirName}/${dirName}`);
        makeDir(`${rootDirName}/${dirName}`);
        for (const key in config[dirName]) {
            if (key === 'files') {
                for (const fileName of config[dirName]['files']) {
                    console.log(`create file : ${rootDirName}/${dirName}/${fileName}`);
                    fs.appendFile(`${rootDirName}/${dirName}/${fileName}`, "write something\n", (err) => {
                        if (err) console.log(err);
                    });
                }
            } else if (key === 'dirs') {
                setup(`${rootDirName}/${dirName}/`, config[dirName]['dirs']);
            }
        }
    }
}

setup('assets', config);
