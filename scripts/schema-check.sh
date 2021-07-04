#!/bin/sh

cp schema.json schema.json.bak
yarn schema

MD5SUM_OLD=$(md5sum schema.json.bak | awk '{print $1}')
MD5SUM_NEW=$(md5sum schema.json | awk '{print $1}')

if [ "$MD5SUM_OLD" = "$MD5SUM_NEW" ] ; then
  echo "[OK] schema.json is up to date - good to go!";
else
  echo "[FAIL] Please commit updated schema.json.";
  exit 1;
fi
