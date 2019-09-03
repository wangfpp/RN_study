# !/bin/bash

# 自动化打包生成app和version.json的版本信息
# 1. 打包APP
# 2.  生成changedlog
# ./buildapp.sh $1 #采用已有的打包脚本进行打包
# ./tag2log.sh
UPDATEURL="http://172.16.1.61:2081/html/app/shiyin/"

packageversion=$(cat ../package.json | jq '.version') # jq读取JSON字段
echo $packageversion
VERSION=$(echo $packageversion| sed $'s/\"//g')
#sed 去除引号
# echo "$opt" | tr -d '"' 去除引号
appNameWithFolder=$(find ./app/build/outputs/apk/release/*$VERSION*.apk -ctime -1) #ls ./app/build/outputs/apk/release/*.apk -t | head -1
appName=${appNameWithFolder##*/}
if [ $appName ]; then
    echo $appName
    $(echo {"version": $packageversion,"filename": $appName,"url": $UPDATEURL$appName,"desc":[]} >  ./app/build/outputs/apk/release/version.json)
else
    echo -e "\033[31m 未找到含有版本号$packageversion的APK\033[0m"
    exit 1
fi
