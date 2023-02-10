# [如何使用ZBLibrary-Android快速开发框架](https://my.oschina.net/tommylemon/blog/665241)

原创

[孤独的探索号](https://my.oschina.net/tommylemon)

[工作日志](https://my.oschina.net/tommylemon?tab=newest&catalogId=3529773)

2016/04/24 12:01

阅读数 11.5W

[震惊！万人围观，华为云到底做了什么？>>>![img](https://www.oschina.net/img/hot3.png)](https://e.cn.miaozhen.com/r/k=2256196&p=7wk6k&dx=__IPDX__&rt=2&pro=s&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&o=https://bbs.huaweicloud.com/live/cloud_live/202108231900.html?utm_source=oschina&utm_medium=banner&utm_campaign=hlwplus-pdev&utm_content=blog-text)

**1.下载：**

**点击右边这个地址 [https://github.com/TommyLemon/Android-ZBLibrary](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FTommyLemon%2FAndroid-ZBLibrary)**

![img](https://static.oschina.net/uploads/space/2016/1118/120647_8BuZ_2437072.png)

点击 Clone or download > [Download Zip](https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fgithub.com%2FTommyLemon%2FAndroid-ZBLibrary%2Farchive%2Fmaster.zip) 即可。

 

**2.解压**

解压到一个路径并记住这个路径。

 

**3.用AndroidStudio打开**

   File > Open > 打开 解压后的文件目录（Android-ZBLibrary-master） > OK

 

**4.运行** 

   Run > Run app

 如果不能成功运行，点击以下链接查看解决方法  

 http://my.oschina.net/u/2437072/blog/665242

 

**5.将自己的项目依赖ZBLibrary**

   1）File > New > Import Module > 选择 解压后的文件目录（Android-ZBLibrary-master）下的 ZBLibrary

   2）右键app > Open Module Settings > Dependencies > add（点击"+"）> Module Dependency > 选择 ZBLibrary > OK > OK

   3）右键app > Open Module Settings > 选择app > Dependencies > 如果有android-support-v4包，选择并点击 "-" 移除 > OK，没有就 Cancel

   4）右键app > Open Module Settings > 选择ZBLibrary > Dependencies >

​    ①如果有android-support-v4包，选择并点击 "-" 移除

​    ②点击"+" > File dependency > 选择libs目录下其中一个 > OK

​    ③添加libs下其它jar包依赖，方法和②一样 > OK

 

**6.重复第4步**

 

**7.查看Demo**

 重复第3步 或者 Windows下在资源管理器中查看，Mac下在Finder中查看。

 Demo有错误不用管，文件或代码复制到自己的Project中就能用了。

 