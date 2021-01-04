#!/bin/bash

CMD=./cmd.bash

mkdir -p ~/docker/volumes/postgres
chmod 754 cmd.bash

${CMD} install
${CMD} pull
${CMD} build_all
${CMD} start
