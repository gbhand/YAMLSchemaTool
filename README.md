# YAML Schema Tool (for GitHub Actions) #

Inject your organization's custom GitHub Actions runner labels into a YAML schema.
(Tested with [SchemaStore](https://json.schemastore.org/github-workflow.json))

## Requirements ##

```
node >= 12.22
```

## Installation ##

Clone the repository
```
git clone https://github.com/gbhand/YAMLSchemaTool.git
cd YAMLSchemaTool
```

Install module
```
npm install
```

Configure environment
```
echo "GH_PAT=" > .env
echo "ORG=" >> .env
echo "SCHEMA_URL=" >> .env
echo "OUTPUT_PATH=" >> .env
```

These values should be filled in as follows:
| Name         | Description                                                                                                                                                                                                                                                                                                                        |          |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `GH_PAT`     | GitHub Personal AccessToken with `admin:org` scope, required for [getting runner labels](https://docs.github.com/en/rest/reference/actions#list-self-hosted-runners-for-an-organization). See [how to generate](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)   | Required |
| `ORG`        | Organization name on GitHub                                                                                                                                                                                                                                                                                                        | Required |
| `SCHEMA_URL` | Path to base schema to be modified. [Example](https://json.schemastore.org/github-workflow.json)                                                                                                                                                                                                                                   | Required |
| `OUTPUT_PATH`| Local path to output file. Defaults to `outputs/{basename}`                                                                                                                                                                                                                                                                        | Optional |

## Usage ##

```
node app.mjs
```

## License ##

MIT