#!/bin/bash

DOCKER_USERNAME="konkeydong"
CWD=$(dirname "$(readlink -f "$0")")
declare -A image_hash_list=([node]=1 [mysql]=1)

_check_argument()
{
    local argument=$1
    local message=$2
    local parent_func="${FUNCNAME[1]}"


    if [[ -z ${argument} ]]
    then
        echo "[Inside function ${parent_func}()] ${message}. Aborting..."
        exit 1
    else
        echo "${argument}"
    fi
}

install()
{
    bash ${CWD}/install_docker.sh
}

build()
{
    local project=$(_check_argument "$1" "missing argument [project]")

    if [[ ${image_hash_list[${project}]} == "1" ]]
    then
        cd ${CWD}/${project}
        docker build -t ${DOCKER_USERNAME}/${project} .
        cd ${CWD}
    fi
}

build_all()
{
    for key in "${!image_hash_list[@]}"
    do
        build "${key}"
    done
}

exec()
{
    local container_name=$(_check_argument "$1" "missing argument [container_name]")
    local root_access=$2

    if [[ $root_access == "root" ]]
    then
        root_access="-u 0" # ID 0 = root user
    else
        root_access=""
    fi

    if [[ ${image_hash_list[${container_name}]} == "1" ]]
    then
        docker exec -it ${root_access} ${container_name} /bin/bash
    fi
}

start() { 
    local background_flag=$1

    if [[ $background_flag == "background" ]]
    then
        echo "Running docker containers in detached (background) mode"
        background_flag="--detach"
    else
        background_flag=""
    fi
    
    docker-compose up ${background_flag}
}

_push_pull()
{
    local cmd=$(_check_argument "$1" "missing argument [cmd]");
    local docker_image=$(_check_argument "$2" "missing argument [docker_image]")

    docker ${cmd} ${DOCKER_USERNAME}/${docker_image}
}

initialize_db() { docker exec mysql /bin/bash /app/db/initialize_database.bash; }
prune() { docker system prune -a; }
stop() { docker-compose down; }
push() { docker login && _push_pull "push" "$1" "$2"; }
pull() { _push_pull "pull" "$1" "$2"; }

help()
{
    cat << EOF
    build { node | mysql }:         Build the specified container.
    build_all:                      Build all containers.
    exec { node | mysql } [root]:   Exec into specified container. Uses root user if root is passed.
    help:                           Display this help doc and exit.
    initialize_db:                  Create the mysql user [mysql] and create the DB tables (if not already existing).
    install:                        Install Docker and Docker-Compose.
    prune:                          Remove all dangling docker images.
    pull:                           Pull container from docker hub.
    push:                           Push container to docker hub.
    start { background }:           Start all docker containers. Run in background of terminal if "background" is sent as argument.
    stop:                           Stop all docker containers.
EOF

    exit 0
}

eval $@
