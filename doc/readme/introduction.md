[![Build Status](https://travis-ci.org/tmpfs/cli-argparse.svg?v=1)](https://travis-ci.org/tmpfs/cli-argparse)
[![npm version](http://img.shields.io/npm/v/cli-argparse.svg?v=1)](https://npmjs.org/package/cli-argparse)
[![Coverage Status](https://coveralls.io/repos/tmpfs/cli-argparse/badge.svg?branch=master&service=github&v=2)](https://coveralls.io/github/tmpfs/cli-argparse?branch=master)

Lightweight yet feature rich argument parser.

This module does not define any options or any program requirements it simply parses arguments into an object structure that is easier for other modules to work with.

## Features

* Supports multiple option values as arrays
* Supports long flag negations, eg: `--no-color`
* Supports `--option=value`, `--option value` and `option=value`
* Expands short flags such as `-xvf`
* Assignment on last flag expansion `-xvf file.tgz`
* Treat `-` as special stdin flag
* Stop argument parsing on `--`
* Comprehensive test suite
* 100% code coverage


