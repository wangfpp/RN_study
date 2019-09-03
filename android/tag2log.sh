# !/bin/bash
function commitList() {
    keyword=$1
    commits=$(git log $lastTag --date=short --pretty=format:" - %s %b  提交人及邮箱 %an-%ae commitID: %h 日期:%ad" --grep=^$keyword)
    echo  "$commits" >> commits.md
}



lastTag=$(git describe --tags `git rev-list --tags --max-count=1`) # 获取最后一次tag
echo $?
echo "上次的tag $lastTag"
echo '## 新增内容' > commits.md
# commits=$(git log $lastTag --date=short --pretty=format:" - %s   commitID: %h 日期:%ad" --grep=^$1) # 新特性
commitList "add" #新特性

echo '## 废弃内容' >>  commits.md
commitList "del:"  #废弃功能

echo '## 修改项' >>  commits.md
commitList "changed"  #修改项

echo '## 修复内容' >>  commits.md
commitList "bugfix"  #修改项


# echo  "$commits" >> commits.md


