BIN = ./node_modules/.bin

all: clean install test

test:
	$(BIN)/nodeunit test

install:
	npm install
 
update:
	git pull --rebase
	npm update

doc:
	rm -rf doc
	$(BIN)/yuidoc

docview: doc
	$(BIN)/http-server ./doc

clean:
	rm -rf node_modules doc *.tgz

pack:
	npm pack

.PHONY: test install clean update doc pack docview