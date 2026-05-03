.PHONY: deploy logs stop build

deploy:
	npm run deploy

logs:
	npm run deploy:logs

stop:
	npm run deploy:stop

build:
	npm run docker:build
