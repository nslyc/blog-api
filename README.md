# Blog-Api 
基于Koa2搭建的api服务
## 准备
1. 下载 [mariaDB](https://downloads.mariadb.org/) 或者 [MySQL](http://www.mysql.com/downloads/) 数据库并安装
2. 导入SQL文件，生成数据库
## 启动
下载依赖 ` npm i` ，
然后启动服务 `npm start`,
接口访问可使用 [POSTMAN](https://www.getpostman.com/app/download/osx64/)
## 接口文档
路由前缀 `/api`
### 用户
- 登录
    - method： `POST`
    - path： `/login`
    - input：
    ```
    {
        username: string, 
        password: string
    }
    ```
    - output：
        - 注册成功： `{id: number, token: "token"}`
        - 用户名或密码错误： `{error: "LoginErr"}`
        - 服务器错误： `{error: "UnknowError"}`
- 注册
    - method： `POST`
    - path： `/register`
    - input：
    ```
    {
        username: string, 
        password: string
    }
    ```
    - output：
        - 注册成功： `{id: number}`
        - 用户名已被注册： `{error: "IsRegisted"}`
        - 服务器错误： `{error: "UnknowError"}`
- 修改密码
    - method： `POST`
    - path： `/modifyPassword/:id`
    - input：
    ```
    {
        password: string, 
        newPassword: string
    }
    ```
    - output：
        - 密码修改成功： `{message: "OK"}`
        - 身份验证失败： `{error: "VerifyErr"}`
        - 服务器错误： `{error: "UnknowError"}`
### 文章分类
- 新增分类
    - method： `POST`
    - path： `/article/categories`
    - input： `{name: string}`
    - output：
        - 创建成功： `{id: number}`
        - 分类已创建： `{error: "IsCreated"}`
        - 服务器错误： `{error: "UnknowError"}`
- 删除分类
    - method： `DELETE`
    - path： `/article/categories/:id`
    - output：
        - 删除成功： `{message: "OK"}`
        - 分类删除失败： `{error: "DeleteError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 修改分类
    - method： `POST`
    - path： `/article/categories/:id`
    - input： `{name: string}`
    - output：
        - 修改成功： `{message: "OK"}`
        - 分类修改失败： `{error: "ModifyError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 指定id的分类
    - method： `GET`
    - path： `/article/categories/:id`
    - output：
        - 成功： `[...object]`
        - 服务器错误： `{error: "UnknowError"}`
- 获取分类列表
    - method： `GET`
    - path： `/article/categories`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
### 文章
- 获取文章列表
    - method： `GET`
    - path： `/articles`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
- 获取分类下的文章列表
    - method： `GET`
    - path： `/articles/categories/:categoriesId`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
- 新增文章
    - method： `POST`
    - path： `/articles`
    - input：
    ```
        {
            title: string,
            author: string, 
            content: string, 
            categoriesId: number,
            description?
        }
    ```
    - output：
        - 新增成功： `{id: number}`
        - 文章已新建(title唯一)： `{error: "IsCreated"}`
        - 服务器错误： `{error: "UnknowError"}`
- 删除文章
    - method： `DELETE`
    - path： `/articles/:id`
    - output：
        - 删除成功： `{message: "OK"}`
        - 删除失败： `{error: "DeleteError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 修改文章
    - method： `POST`
    - path： `/articles/:id`
    - input：
    ```
        {
            title: string,
            author: string, 
            content: string, 
            categoriesId: number,
            description?
        }
    ```
    - output：
        - 修改成功： `{message: "OK"}`
        - 修改失败： `{error: "ModifyError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 查找文章
    - method： `GET`
    - path： `/articles/:id`
    - output：
        - 获取成功： `{list: [...object]}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
### 图片分类
- 新增分类
    - method： `POST`
    - path： `/image/categories`
    - input： `{name: string}`
    - output：
        - 创建成功： `{id: number}`
        - 分类已创建： `{error: "IsCreated"}`
        - 服务器错误： `{error: "UnknowError"}`
- 删除分类
    - method： `DELETE`
    - path： `/image/categories/:id`
    - input：
    - output：
        - 删除成功： `{message: "OK"}`
        - 分类删除失败： `{error: "DeleteError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 修改分类
    - method： `POST`
    - path： `/image/categories/:id`
    - input： `{name: string}`
    - output：
        - 修改成功： `{message: "OK"}`
        - 分类修改失败： `{error: "ModifyError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 获取分类列表
    - method： `GET`
    - path： `/image/categories`
    - input：
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败：
        - 服务器错误： `{error: "UnknowError"}`
### 图片
- 获取图片列表
    - method： `GET`
    - path： `/images`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
- 获取分类下的图片列表
    - method： `GET`
    - path： `/images/categories/:categoriesId`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
- 新增图片
    - method： `POST`
    - path： `/images`
    - input：
    ```
        {
            path: string,
            categoriesId: number,
            description?
        }
    ```
    - output：
        - 新增成功： `{id: number}`
        - 图片已新建(path唯一)： `{error: "IsCreated"}`
        - 服务器错误： `{error: "UnknowError"}`
- 删除图片
    - method： `DELETE`
    - path： `/images/:id`
    - output：
        - 删除成功： `{message: "OK"}`
        - 删除失败： `{error: "DeleteError"}`
        - 服务器错误： `{error: "UnknowError"}`
- 修改图片
    - method： `POST`
    - path： `/images/:id`
    - input：
    ```
        {
            path: string,
            categoriesId: number,
            description?
        }
    ```
    - output：
        - 修改成功： `{message: "OK"}`
        - 修改失败： `{error: "ModifyError"}`
        - 服务器错误： `{error: "UnknowError"}`
### 评论
- 文章id获取评论列表
    - method： `GET`
    - path： `/reviews/articles/:articlesId`
    - output：
        - 获取成功： `{list: [...object], totalNum: number}`
        - 获取失败、服务器错误： `{error: "UnknowError"}`
- 发表评论
    - method： `POST`
    - path： `/reviews`
    - input：
    ```
        {
            author: string,
            email: string,
            content： string,
            articleId: number
            site?
        }
    ```
    - output：
        - 新增成功： `{id: number}`
        - 图片已新建(path唯一)： `{error: "IsCreated"}`
        - 服务器错误： `{error: "UnknowError"}`
- 删除评论
    - method： `DELETE`
    - path： `/reviews/:id`
    - output：
        - 删除成功： `{message: "OK"}`
        - 删除失败、服务器错误： `{error: "UnknowError"}`
## 说明
- 凡是获取列表的接口，均可以在请求头部 `headers` 加入属性
```
    {
        offset: number, // 列表偏移
        size: number // 列表数量
    }
```
- 公用接口不做身份验证，权限接口身份验证，需要在请求头部`headers`加入属性
```
    {
        authorization: string // 登录成功后返回的token
    }
```