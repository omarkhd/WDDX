WDDX
====

[![Build Status](https://travis-ci.org/SimasGodovan/WDDX.png?branch=master)](https://travis-ci.org/SimasGodovan/WDDX)
[![Coverage Status](https://coveralls.io/repos/SimasGodovan/WDDX/badge.png)](https://coveralls.io/r/SimasGodovan/WDDX)
[![Dependency Status](https://david-dm.org/SimasGodovan/WDDX.png)](https://david-dm.org/SimasGodovan/WDDX)
[![Dev-dependency Status](https://david-dm.org/SimasGodovan/WDDX/dev-status.png)](https://david-dm.org/SimasGodovan/WDDX#info=devDependencies)

From [Wikipedia WDDX](http://en.wikipedia.org/wiki/WDDX):
> WDDX (Web Distributed Data eXchange) is a programming language-, platform- and transport-neutral data interchange
> mechanism to pass data between different environments and different computers. It supports simple data types
> such as number, string, boolean, etc., and complex aggregates of these in forms such as structures, arrays and
> recordsets (row/column data, typically coming from database queries). There are WDDX interfaces for a wide
> variety of languages, including ColdFusion, Ruby, Python, PHP, Java, C++, .NET, Actionscript, lisp, Haskell, Perl.

## make
```
make all            - reset and install production packages
make all-dev        - reset and install development packages
make test           - run tests
make test-watch     - run tests (watch for test suite changes)
make coverage       - run tests with coverage report
make coverage-clean - remove coverage report
make coverage-view  - start coverage report preview on http://localhost:8081
make coveralls      - push coverage report to coveralls (done by travis-ci)
make install        - install production packages
make install-dev    - install development packages
make update         - fetch newest version from repository and update packages
make doc            - create API documentation
make dov-view       - start API documentation preview on http://localhost:8080
make clean          - cleanup
make reset          - reset package to original state
```