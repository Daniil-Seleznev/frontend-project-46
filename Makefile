lint:
	npx eslint --config eslint.config.js .

test:
	npm test

coverage:
	npm run test:coverage
