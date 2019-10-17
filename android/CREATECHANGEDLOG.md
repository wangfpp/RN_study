# 自定义生成CHANGEDLOG脚本

### changedlog的来源
- 1. 产品是由每次push的代码生成
- 2. changedlog就来源于每次的commit
- 3. git log可一获取所有的commit
- 4. changedlog应该是上次发布与本次发布之间的commit生成
- 5. 按照提交规范过滤提交特性得到升级说明

### 如何知晓上次发布?
- 1. 构建tag名称
```bash
    #tag应该包含发布的分支　版本号 可以的话还可以加发布日期等　自定义！！！
    BRANCH="$(git branch | grep '*' | awk '{print $2}')"
    VERSION=$(cat ../package.json | jq '.version')
    DATE=$(date "+%Y-%m-%d")
    TAGNAME=$BRANCH-$VERSION-$DATE
    #
```
- 2. 项目打包发布应该基于tag建立静态标示
```bash
    #TagName为tag的名称　Description为此tag的描述
    git tag -a $TagName -m $Description
    # 把所有tag提交到远端
    git push origin --tags 
```
- 3. 获取上次的tag
```bash
    #获取最近的一次tag
    LASTTAG=$(git describe --tags `git rev-list --tags --max-count=1`)
```
- 4. 本次打包的时候可以构建一个release.sh的打包脚本
```bash
    # !/bin/bash
    # 首先执行打包命令
    npm run build
    if [ $? == 0 ];then
        # $? 是上次执行命令的状态　0 成功　不为零则失败
        #打包成功获取构建一个tagname传递给changelog构建脚本
        TAGNAME=$BRANCH-$VERSION-$DATE
        ./changedlog.sh $TAGNAME
    else
        echo '打包出错啦......'
    fi
```

### 获取changedlog
- 1. 根据git describe获取上一次的tag
- 2. 根据git的命令获取两个tag之间的commit并进行格式化
```bash
    # $1为上次的tag　$2为本次构建的tag　grep为过滤关键词
    commits=$(git log $1..$2 --date=short --pretty=format:" - %s %b  提交人及邮箱 %an－%ae commitID: %h 日期:%ad" --grep=^$3)
```
- 3. 文档
 [git log文档](https://git-scm.com/docs/git-log)　
 [segmentfault文档](https://segmentfault.com/a/1190000000307435)此链接转载自(http://hisea.me/)

### 获取修改特性
- 1. 产品的升级说明一般有【新增内容】【删除内容】【修复内容】等
- 2. 这些特性都需要在git commit中体现出来才能进行过滤
- 3. git commit规范提交说明<br>

|  特性   | 指令  |
|  :-:  | :-:  |
| 新增  | add |
| 删除  | delete |
| 修复 | fix |
| .... | .... |

- 4. 有了规范的commit就可以提取各种特性修改 

### 如何保存CHANGEDLOG
- 1. 以上步骤就可以获取不同属性的版本修改了
- 2. 只需要一文档的方式保存就行
```bash
    # 获取过滤并格式化的commit
    commits=$(git log $1..$2 --date=short --pretty=format:" - %s %b  提交人及邮箱 %an－%ae commitID: %h 日期:%ad" --grep=^$3)
    # 输入进文档内 > 是直接覆盖 >> 是追加
    echo  "$commits" >> commits.md
```
### 脚本构建

- 1. 打包、构建changedlog以及其他操作都应该是自动化的
- 2. 执行release.sh中集中进行上述的所有操作

### 其他说明
- 1. .sh的文件需要sudo chmod +x name.sh赋给可执行权限
- 2. 根据自己的需求构建所需的脚本文件
- 3. 有的东西windows上可能不能用比如jq 可以试试[巧克力](https://chocolatey.org/)安装
- 4. 本文的release.sh地址[release.sh](https://github.com/wangfpp/RN_study/blob/master/android/release.sh)<br>
[changedlog脚本](https://github.com/wangfpp/RN_study/blob/master/android/tag2log.sh)
- 5. 运行结果

![提交说明](https://graph.baidu.com/resource/11134907d3afd19ce49a101571296735.jpg "提交commit")
![生成结果](https://graph.baidu.com/resource/1118fa702edb0f1c00b9d01571298027.jpg "提取的commit")