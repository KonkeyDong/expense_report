#!/bin/bash

CMD=./cmd.bash
chmod 754 cmd.bash

${CMD} start background
${CMD} initialize_db
${CMD} stop

cat << EOF

--------------------------------------------------------------------------------------------
Everything should be installed and working."
Run [./cmd.bash help] for more information on commands.

To further test your containers, run the following IN SEPARATE TERMINALS:
./cmd.bash start  ### starts the docker containers
./cmd.bash exec <container_name> ### exec into the container and run commands from within.
--------------------------------------------------------------------------------------------
EOF
