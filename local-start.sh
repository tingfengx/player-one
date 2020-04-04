#! /bin/sh


echo "======================= START BUILD ========================="

cd player-one/client/ && npm install && npm run build && cd ../api/ && npm install 
echo "====================== BUILD COMPLETE ======================="
echo "===================== STARTING SERVER ======================="
echo "=============== PLEASE VISIT localhost:5000 ================="

npm start
