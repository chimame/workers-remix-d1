#!/bin/bash

echo 'input migration name'
read input

SCRIPT_DIR=$(cd $(dirname $0); pwd)
sqlite3def --dry-run ${SCRIPT_DIR}/../.wrangler/state/d1/DB.sqlite3 < ${SCRIPT_DIR}/../database/schema.sql > ${SCRIPT_DIR}/../migrations/`date +%Y%m%d%H%M%S`_${input}.sql

pnpm wrangler d1 migrations apply --local mydb
