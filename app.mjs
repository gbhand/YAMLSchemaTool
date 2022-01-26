import 'dotenv/config';
import fetch from 'node-fetch';
import * as fse from 'fs-extra';

async function main() {
  // validate environment
  const envRequired = ['GH_PAT', 'ORG', 'SCHEMA_URL'];
  for (const item of envRequired) {
    if (!process.env[item]) {
      console.error(`Error: ${item} is not defined in .env`);
      process.exitCode = 1;
      return;
    }

    if (!process.env.OUTPUT_PATH) {
      process.env.OUTPUT_PATH = `outputs/${process.env.SCHEMA_URL.substring(process.env.SCHEMA_URL.lastIndexOf('/') + 1)}`;
    }
  }

  async function getSchemaJSON(url) {
    const response = await fetch(url);
    const schema = await response.json();
    return schema;
  }

  async function getRunnerLabels(schema) {
    const headers = { 'Content-Type': 'application/json', Authorization: `token ${process.env.GH_PAT}` };
    const url = `https://api.github.com/orgs/${process.env.ORG}/actions/runners`;

    const response = await fetch(url, { method: 'GET', headers });
    const runners = await response.json();

    const labels = new Set(schema.definitions.normalJob.properties['runs-on'].oneOf[0].enum);

    for (const runner of runners.runners) {
      for (const label of runner.labels) {
        labels.add(label.name);
      }
    }

    return Array.from(labels);
  }

  async function addRunnerLabels(schema, labels) {
    schema.definitions.normalJob.properties['runs-on'].oneOf[0].enum = labels;

    fse.outputFile(process.env.OUTPUT_PATH, JSON.stringify(schema, null, 2), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  const schema = await getSchemaJSON(process.env.SCHEMA_URL);
  const labels = await getRunnerLabels(schema);

  addRunnerLabels(schema, labels);
}
main().catch(console.log);
