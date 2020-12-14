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

echo "checking if docker installed by printing version information..."
sudo docker --version

