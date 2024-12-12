#!/usr/bin/env bash

# repo dir path
REPO_DIR_PATH="/home/www/web/matpur-frontend"

# branch name
DEPLOY_BRANCH_NAME=$1

if [ $DEPLOY_BRANCH_NAME ]; then
  DEPLOY_BRANCH_NAME=$1
else
  DEPLOY_BRANCH_NAME="main"
fi

echo "当前发布分支：${DEPLOY_BRANCH_NAME}"

# cd repo dir
cd $REPO_DIR_PATH

# update repo
sudo git fetch --all && git reset --hard origin/${DEPLOY_BRANCH_NAME} && git pull

# install pnpm
sudo npm i pnpm -g

# install pm2
sudo npm i pm2 -g

# setup
sudo pnpm install

sudo pnpm build:ft

sudo pnpm pm2:stop-ft

sudo pnpm pm2:start-ft



