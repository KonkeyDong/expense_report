DOCKER_IMAGE=postgres

include Makefile.docker

PACKAGE_VERSION=0.1

include Makefile.package

.PHONY: check-version
check-version:
	docker run --rm $(DOCKER_NAMESPACE)/$(DOCKER_IMAGE):latest --version|awk '{ print $$1 }'

.PHONY: install-docker
install-docker:
	bash install_docker.sh

