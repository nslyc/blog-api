# Blog-Api 
基于Node搭建的api服务

## 接口文档
路由前缀 `/api`
### 用户
    - 登录
    - `/login` 
        输入：
            `{username: "username", password: "password"}`
        输出：
            注册成功： {id: id, token: "token"}
            用户名已被注册： {error: "LoginErr"}
            服务器错误： {error: "UnknowError"}
            
