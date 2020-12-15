#!/bin/bash

# Credit: https://techviewleo.com/how-to-install-and-use-docker-in-linux-mint/

sudo apt-get update

# Install Docker dependencies and add Docker official key
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Adding Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(. /etc/os-release; echo "$UBUNTU_CODENAME") stable"
sudo apt-get update

# Install Docker CE on Linux Mint 20
sudo apt-get -y install docker-ce
sudo usermod -aG docker $USER

# Install docker-compose
# Note: may need the following dependencies: py-pip, python-dev, libffi-dev, openssl-dev, gcc, libc-dev, and make.

sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make docker-compose executable
sudo chmod +x /usr/local/bin/docker-compose

echo "checking if docker installed by printing version information..."
sudo docker --version

echo "checking if docker-compose installed by printing version information..."
docker-compose --version

