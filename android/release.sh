# !/bin/bash

# 自动化打包生成app和version.json的版本信息
# 1. 打包APP
# 2.  生成changedlog


#采用已有的打包脚本进行打包
# ./buildapp.sh $1

#更新文件的URL
UPDATEURL="http://172.16.1.61:2081/html/app/shiyin/"

# jq读取JSON字段
packageversion=$(cat ../package.json | jq '.version')
echo $packageversion
#sed 去除引号
# echo "$opt" | tr -d '"' 去除引号
VERSION=$(echo $packageversion| sed $'s/\"//g')

#ls ./app/build/outputs/apk/release/*.apk -t | head -1
appNameWithFolder=$(find ./app/build/outputs/apk/release/*$VERSION*.apk -ctime -1)

#去除目录前缀
appName=${appNameWithFolder##*/}
if [ $appName ]; then
    echo $appName
    JSON="{\"version\": $packageversion,\"filename\": \"$appName\",\"url\": \"$UPDATEURL$appName\",\"desc\":[]}"
    echo  $JSON >  ./app/build/outputs/apk/release/version.json
    echo $appName
    # 获取字符串的len
    strlen=$(echo ${#appName})

    # 掐头去尾截取的长度
    truelen=$(expr $strlen - 11)
    BRANCH=$(git branch | grep '*' | awk '{print $2}')
    # 截取字符串
    TAGNAME=$(echo $BRANCH-${appName:  7 : $truelen })
    echo $TAGNAME
    ./tag2log.sh $TAGNAME
else
    echo -e "\033[31m 未找到含有版本号$packageversion的APK\033[0m"
    exit 1
fi
