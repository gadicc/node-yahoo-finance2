#!/bin/sh

echo "json-transform.sh"
echo "================="
echo

echo "ESM"
echo "---"

cd dist/esm

for FILE in $(find -name \*.json) ; do
  echo "Converting \"$FILE\" to ESM module \"$FILE.js\"";
  echo -n "export default " > $FILE.js
  cat $FILE >> $FILE.js
done

for FILE in $(find -name \*js) ; do
  # Lines that start with 'import' and end with '.json";'.
  if grep -qE '^(import .*)\.json";$' $FILE; then
    echo
    echo "Modifying imports in \"$FILE\" (backup saved to .orig)"
    grep -E '^(import .*)\.json";$' $FILE
    sed -Ei.orig 's/^(import .*)\.json";$/\1.json.js";/' $FILE
  fi
done

echo
echo "CJS"
echo "---"

cd ../cjs

for FILE in $(find -name \*.json) ; do
  echo "Converting \"$FILE\" to ESM module \"$FILE.js\"";
  echo -n "module.exports = " > $FILE.js
  cat $FILE >> $FILE.js
done

for FILE in $(find -name \*js) ; do
  # Lines that start with 'import' and end with '.json";'.
  if grep -qE '^(const .*)\.json"\)\);$' $FILE; then
    echo
    echo "Modifying imports in \"$FILE\" (backup saved to .orig)"
    grep -E '^(const .*)\.json"\)\);$' $FILE
    sed -Ei.orig 's/^(const .*)\.json"\)\);$/\1.json.js"));/' $FILE
  fi
done

echo
echo "json-transform.sh finished."
