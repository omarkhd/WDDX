BIN = ./node_modules/.bin

all: clean install test

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
	rm -rf node_modules doc *.tgz npm-debug.log

pack:
	npm pack

.PHONY: coverage coverage-view coverage-clean coveralls test test-watch install clean update doc pack doc-view