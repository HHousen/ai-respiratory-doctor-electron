![AI Respiratory Doctor Logo](build/icon.png)
# AI Respiratory Doctor Desktop App
[![Build Status](https://travis-ci.org/HHousen/ai-respiratory-doctor-electron.svg?branch=master)](https://travis-ci.org/HHousen/ai-respiratory-doctor-electron)
> A desktop app built with Electron that mimics the AI Respiratory Doctor web app.

This app uses [electron](https://electronjs.org/), a self-contained python [flask](https://flask.palletsprojects.com/en/1.1.x/) API, and [pytorch](https://pytorch.org/)/[fasiai](https://docs.fast.ai/) to compute the probabilities of certain diseases in chest X-Rays using machine learning.

Asset bundling is handled by webpack through [electron-webpack](https://github.com/electron-userland/electron-webpack) and building/compiling is done with [electron-builder](https://github.com/electron-userland/electron-builder). The user interfact was built using the Materialize-css framework. The original template this app was based on is [electron-webpack-quick-start](https://github.com/electron-userland/electron-webpack-quick-start).

Additionally, [Travis CI](https://travis-ci.org/) handles automatic building of the application on every commit.

Original App Website: <https://ai-respiratory-doctor.herokuapp.com/>

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
These pieces of software need to be installed on your system in order for the app to function. They are not bundled or included with the download. 
* PyTorch
* Fastai
* Flask
* Flask-Cors
Additionally, use the [Yarn](https://yarnpkg.com/) Package Manager instead of NPM. 

### Installation (Development Setup)
First, install the prerequisites then do the following:
```bash
git clone https://github.com/HHousen/ai-respiratory-doctor-electron.git
cd ai-respiratory-doctor-electron
pipenv install
yarn
yarn dev
```

## Project Structure
```bash
ai-respiratory-doctor-electron
├── build
│   └── icon.png
├── custom.additions.webpack.js
├── package.json
├── README.md
├── src
│   ├── main
│   │   ├── index.js
│   │   └── preload.js
│   ├── models
│   │   └── export.pkl
│   ├── predict.py
│   ├── __pycache__
│   │   └── predict.cpython-37.pyc
│   ├── renderer
│   │   └── index.js
│   ├── sass
│   │   ├── materialize
│   │   └── style.scss
│   └── static
│       └── app.html
├── yarn-error.log
└── yarn.lock
```

## Building for Production
Either use ``yarn dist`` for code compiled with electron-builder or ``yarn dist:dir`` for electron-builder seeting and compression storage. 

## Meta

Hayden Housen – [haydenhousen.com](https://haydenhousen.com)

Distributed under the MIT license. See the [LICENSE](LICENSE) for more information.

<https://github.com/HHousen>

## Contributing

1. Fork it (<https://github.com/HHousen/ai-respiratory-doctor-electron/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request