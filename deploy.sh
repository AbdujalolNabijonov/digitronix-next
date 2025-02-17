git reset --hard
git checkout master
git pull master

npm install yarn global
yarn install

yarn build
pm2 start "yarn run start" --name=digitronix-nest