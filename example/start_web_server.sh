#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# https://github.com/warren-bank/node-serve
export NO_UPDATE_CHECK='1'

echo 'Open in browser: http://localhost:80/example/htdocs/es2020.html'
echo ''

serve --cors --listen 'tcp:0.0.0.0:80' "${DIR}/.."
