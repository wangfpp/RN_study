# !/bin/bash
currTag=$1


function commitList() {
    lastTag=$1
    formtag=$2
    keyword=$3
    local commits
    if [[ $# == 2 ]];then
        commits=$(git log $1 --date=short --pretty=format:" - %s %b  提交人及邮箱 %an－%ae commitID: %h 日期:%ad" --grep=^$2)
    elif [[ $# == 3 ]];then
        echo "当前tag: $2"
        commits=$(git log $1..$2 --date=short --pretty=format:" - %s %b  提交人及邮箱 %an－%ae commitID: %h 日期:%ad" --grep=^$3)
    fi
    echo  "$commits" >> commits.md
}


# 获取最后一次tag
lastTag=$(git describe --tags `git rev-list --tags --max-count=1`)

echo "上次的tag: $lastTag"
echo '## 新增内容' > commits.md
# commits=$(git log $lastTag --date=short --pretty=format:" - %s   commitID: %h 日期:%ad" --grep=^$1) # 新特性


if [ $currTag ];then
    git tag -a $currTag -m "打包版本号$currTag"
    git push origin $currTag
fi


if [ $currTag ];then
    commitList  $lastTag $currTag "add"
else 
    commitList  $lastTag  "add"
fi

echo '## 废弃内容' >>  commits.md

if [ $currTag ];then
    commitList  $lastTag $currTag "del:"
else 
    commitList  $lastTag  "del:"
fi

echo '## 修改项' >>  commits.md

if [ $currTag ];then
    commitList $lastTag $currTag "changed"
else 
    commitList $lastTag "changed"
fi

echo '## 修复内容' >>  commits.md

if [ $currTag ];then
    commitList $lastTag $currTag "bugfix"
else 
    commitList $lastTag "bugfix"
fi



# echo  "$commits" >> commits.md


