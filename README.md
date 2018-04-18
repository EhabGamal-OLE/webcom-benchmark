# Webcom Benchmark Demo
## Local setup
1. Clone the repo to your local machine `git clone https://github.com/EhabGamal-OLE/webcom-benchmark.git`
2. Navigate to the project dir and run `npm install`
3. Run `npm start` to test the application using the default values
4. Run `npm run benchmark` to test the benchmark platform

## Custome Config
You can override default configs (e.g. changing the namespace) by editing the `config/custome.json` file
Run your custome config using `npm run custome`

## Change Default Values
1. Run `npm start -- --help` to see available command arguments
2. Use `-r | --requests-num` to change number of requests send to webcom (e.g. `npm start -- -r 100` will send 100 requests)
3. Use `-l | --logs-freq` to limit number of logs lines (e.g. `npm start -- -l 10` will log one line each 10 requests)