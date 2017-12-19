module.exports = class CategoriesRouter {
    /**
     * 重构图片分类和文章分类路由
     * @param {*传入的路由} router 
     * @param {*传入路由的前缀字符串} prefix 
     * @param {*图片分类或者文章分类} categories 
     */
    constructor(router, prefix, categories) {
        this.router = router;
        this.router.prefix(prefix);
        this.categories = categories;
        // 新增分类
        router.post('/categories', async(ctx, next) => {
            let info = ctx.request.body;
            await this.categories.addCategories(info.name).then(res => {
                ctx.body = {
                    id: res['insertId']
                }
            }, err => {
                // 用户名重复
                if (err.code === 'ER_DUP_ENTRY') {
                    ctx.status = 406;
                    ctx.message = 'IsCreated';
                    return;
                }
                ctx.body = 'CreateError';
                ctx.status = 415;
            })
        })
        // 删除分类(禁用)
        router.delete('/categories/:id', async(ctx, next) => {
            let id = ctx.params.id;
            await this.categories.disableCategories(id).then(res => {
                if (res['changedRows'] === 1) {
                    ctx.status = 200;
                } else {
                    ctx.body = 'DeleteError';
                }
            }, err => {
                ctx.status = 500;
            })
        })
        // 修改分类
        router.post('/categories/:id', async(ctx, next) => {
            let id = ctx.params.id;
            let name = ctx.request.body['name'];
            await this.categories.modifyCategories(id, name).then(res => {
                if (res['changedRows'] === 1) {
                    ctx.status = 200;
                } else {
                    ctx.body = 'ModifyError';
                }
            }, err => {
                ctx.status = 500;
            })
        })
        // 查找分类
        router.get('/categories/:id', async(ctx, next) => {
            let id = ctx.params.id;
        })
        // 获取分类列表
        router.get('/categories', async(ctx, next) => {
            let headers = ctx.request.headers;
            let data;
            await this.categories.getCategories(headers.offset, headers.size).then(res => {
                data = res;
                return this.categories.getTotalCategoriesNum();
            }, err => {
                console.log(err);
                ctx.status = 500;
            }).then(res => {
                let totalNum = 0;
                if (!!res) {
                    totalNum = res[0]['COUNT(*)'];
                }
                ctx.body = {
                    list: data,
                    totalNum: totalNum
                }
            }, err => {
                ctx.status = 500;
            })
        })
    }
}