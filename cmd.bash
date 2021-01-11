#!/bin/bash

DOCKER_USERNAME="konkeydong"
CWD=$(dirname "$(readlink -f "$0")")
declare -A AA=([node]=1 [postgres]=1) # AA = associative array (AKA hash table)

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

    if [[ ${AA[${project}]} == "1" ]]
    then
        cd ${CWD}/${project}
        docker build -t ${DOCKER_USERNAME}/${project} .
        cd ${CWD}
    fi
}

build_all()
{
    for key in "${!AA[@]}"
    do
        build "${key}"
    done
}

exec()
{
    local container_name=$(_check_argument "$1" "missing argument [container_name]")

    if [[ ${AA[${container_name}]} == "1" ]]
    then
        docker exec -it ${container_name} /bin/bash
    fi
}

prune() { docker system prune -a; }
start() { docker-compose up; }

_push_pull()
{
    local cmd=$(_check_argument "$1" "missing argument [cmd]");
    local docker_image=$(_check_argument "$2" "missing argument [docker_image]")

    docker ${cmd} ${DOCKER_USERNAME}/${docker_image}
}

push() { docker login && _push_pull "push" "$1" "$2"; }
pull() { _push_pull "pull" "$1" "$2"; }

help()
{
    cat << EOF
    build { node postgres }: Build the specified container.
    build_all:               Build all containers.
    exec { node postgres }:  Exec into specified container.
    help:                    Display this help doc and exit.
    install:                 Install Docker and Docker-Compose.
    prune:                   Remove all dangling docker images.
    pull:                    Pull container from docker hub.
    push:                    Push container to docker hub.
    start:                   Start all docker containers.
EOF

    exit 0
}

eval $@