BIN = ./node_modules/.bin

all: reset install

all-dev: reset install-dev test

test:
	$(BIN)/mocha --ui tdd --reporter nyan

test-watch:
	$(BIN)/mocha --ui tdd --reporter nyan --growl --watch

coverage: coverage-clean
	mkdir ./coverage
	$(BIN)/mocha --ui tdd --require blanket --reporter html-cov > ./coverage/index.html

coverage-clean:
	rm -rf ./coverage

coverage-view: coverage
	$(BIN)/http-server -p 8081 ./coverage

coveralls:
	$(BIN)/mocha --ui tdd --require blanket --reporter mocha-lcov-reporter | $(BIN)/coveralls

install:
	npm install --production

install-dev:
	npm install

update:
	git pull --rebase
	npm update

doc:
	rm -rf doc
	$(BIN)/yuidoc

doc-view: doc
	$(BIN)/http-server ./doc

clean: coverage-clean
	rm -rf doc *.tgz npm-debug.log

reset: clean
	rm -rf node_modules

.PHONY: all all-dev test test-watch coverage coverage-clean coverage-view coveralls install install-dev update doc doc-view clean reset