PROJECT = "WDDX"

all: clean install test

test: ;@echo "Testing ${PROJECT}....."; \
	export NODE_PATH=.; \
	./node_modules/.bin/nodeunit test

install: ;@echo "Installing ${PROJECT}....."; \
	npm install
 
update: ;@echo "Updating ${PROJECT}....."; \
	git pull --rebase; \
	npm update

doc: ;@echo "Generating API documentation for ${PROJECT}....."; \
	export NODE_PATH=.; \
	./node_modules/.bin/yuidoc;

docview: doc ;@echo "Launching doc viewer on 8080 for ${PROJECT}....."; \
	export NODE_PATH=.; \
	./node_modules/.bin/http-server ./doc;

clean: ;@echo "Taking out ${PROJECT} garbage....."; \
	rm -rf node_modules doc *.tgz

pack: ;@echo "Creating ${PROJECT} package....."; \
	npm pack

.PHONY: test install clean update doc pack docview