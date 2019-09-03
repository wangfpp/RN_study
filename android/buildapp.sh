#!/bin/bash
APP_HOME="`pwd -P`"
./gradlew assembleRelease
if [ $? == 0 ];then
    echo -e "\033[32m 打包成功 \033[0m"
    if [ "$1" == 'cpf' ];then
        if [ ! -d '/home/wangfpp/nas/ISO/app/' ];then
            echo 'nas目录未mount　正在mount'
            echo "ddkk1212" | sudo mount 172.16.1.5:/share/Public /home/wangfpp/nas
            echo 'mount完成'
        fi
        pushd "$APP_HOME/app/build/outputs/apk/release/" >> /dev/null #有变量的用双引号　``为可执行命令
        echo -e "\033[36m 文件存放于: \033[0m $APP_HOME/app/build/outputs/apk/release/"
        cp *.apk /home/wangfpp/nas/ISO/app/
        echo -e "\033[36m 同步于: \033[0m nas/ISO/app/目录下"
        popd >> /dev/null
    else
        echo -e "\033[36m 文件存放于: \033[0m $APP_HOME/app/build/outputs/apk/release/"
    fi
else
    echo -e "\033[31m 打包失败 \033[0m"
fi