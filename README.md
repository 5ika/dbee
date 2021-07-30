# dbee

`dbee` helps you to backup and restore your PostreSQL database trough S3 compatible servers (like Minio).
Quickly save a dump from a server and init a new database on another server with a few commands.

## Install

### With NPM

```shell
npm i -g git+https://github.com/5ika/dbee.git
```

Command `dbee` will be globally available on your system.

## Use

### Quick-start

#### 1. Add an S3 server

```shell
dbee s3 add mys3 minio.example.org --accessKey myaccesskey --secretKey mysecretkey
```

_mys3_ will be the reference name for this S3 server

#### 2. Add a PostgreSQL server

```shell
dbee psql add mypsql psql.example.org --username myuser --password mypassword
```

_mypsql_ will be the reference name for this PSQL server.

> If no password is provided at this step, it will be asked when needed.

#### 3. Create a database dump

```shell
dbee bckp mypsql/mydbname
```

A dump of _mydbname_ database will be uploaded to _mys3_ S3 server.

#### 4. Init a new database from dump

```shell
dbee ls # List available dumps on S3 server
dbee init mydbname-2021-07-29T15:10:19.748Z.bak myotherpsql/mynewdb
```

### Commands

```
dbee s3 add <s3Name> <host>                           Add S3 server
dbee s3 rm <s3Name>                                   Remove S3 server from config
dbee s3 ls                                            List S3 servers
dbee psql add <psqlName> <host>                       Add Postgres servers
dbee psql ls                                          List Postgress servers
dbee psql rm <psqlName>                               Remove Postgres server from config
dbee ls [s3Name]									                    List databases available on S3 server
dbee rm [s3Name/]<fileName>                           Remove database dump from S3 server
dbee bckp [psqlName/]<dbName> [s3Name]                Backup database to S3
dbee init [s3Name/]<fileName> [psqlName/]<dbName>     Restore database from S3
```

### Advanced use

#### Options for S3 server

It is possible to provide some additional options for the S3 connection:

- `--port` or `-p`: Specify another port than the default one (443)
- `--useSSL` or `-s`: Use an SSL connection to the server
- `--bucket` or `-b`: Specify another bucket name than the default one (dbee)

#### Multiple S3 servers

When only one S3 server is configured, it's not necessary to specify it:

```shell
dbee ls
```

But when there is more than one, it is necessary:

```shell
dbee ls myminio
```

#### Options for PostgreSQL server

It is possible to provide some additional options for the PostgreSQL connection:

- `--port` or `-p`: Specify another port than the default one (5432)
- `--useSSL` or `-s`: Use an SSL connection to the server
- `--timescale` or `-t`: Specify that the server uses TimescaleDB extension (useful for database creation)

#### PostgreSQL server on localhost

When no _psqlName_ is provided, dbee take a default configuration for PostgreSQL server as following:

```json
{
  "host": "localhost",
  "username": "postgres",
  "password": null,
  "useSSL": false,
  "port": 5432
}
```

It permits commands like:

```shell
dbee bckp mydbname
dbee init mydbname-2021-07-29T15:10:19.748Z.bak mynewdb
```

## Build

A standalone executable binary can be built with [pkg](https://github.com/vercel/pkg):

```shell
yarn build
```

Executable is then available in the `dist/` directory.
