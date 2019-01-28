const express=require('express');
const router=express.Router();
const pool=require("../../pool.js");

// 菜品类别相关的路由

/**
 * API GET /admin/category
 * 含义：客户端获取所有的菜品类别，按编号升序排列
 * 返回值 形如：
 * [{cid:1,cname:'..'},{...}]
 */
router.get("/",(req,res)=>{
    pool.query('select * from xfn_category order by cid',(err,result)=>{
        if(err) throw err;
        var jsonData=JSON.stringify(result);
        res.send("doData{"+jsonData+"}");
    })
})

/**
 * API DELETE /admin/category /:cid (通过合理的请求方法，叫做RESTful API)
 * 含义：根据路由参数表示菜品编号的路由参数，删除该菜品
 * 返回值 形如：
 * {code:200,msg:'1 category delated'}
 * {code:400,msg:'0 category delated'}
 */
router.delete('/:cid',(req,res)=>{
    // 注意删除菜品之前必须先把属于该类别的菜品类别编号设置为NULL
    pool.query('update xfn_dish set categoryId=null where categoryId=?',
    req.params.cid,(err,result)=>{
        if(err)throw err;
        // 至此指定类别的菜品已经修改完毕
        pool.query('delete from xfn_category where cid=?',req.params.cid,(err,result)=>{
        if(err) throw err;
        // 获取delete语句在数据库中影响的行数
        if(result.affectedRows>0){
            res.send({code:200,msg:"1 category deleted"})
        }else{
            res.send({code:400,msg:'0 category deleted'})
        }
     })
    })
    
})
/**
 * API: POST /admin/category
 * 请求参数：{cname:'xxx'}
 * 含义：添加新的菜品类别
 * 返回值形如：
 * {code:200,msg:'1 category added',cid:x}
 */
router.post('/',(req,res)=>{
    // console.log('获取到请求的数据')
    // console.log(req.body)
    var data=req.body;  //形如{cname:''}
    pool.query('insert into xfn_category set ?',data,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:"1 category added"})
        }else{
            res.send({code:400,msg:'0 category added'})
        }
    })
})
 /**
 * API  PUT /admin/category  幂等
 * 请求主体参数: {cid:xx,cname:"xxx"}
 * 含义：根据菜品类别编号修改该类别
 * 返回值 形如：
 * {code:200,msg:'1 category modified' }
 * {code:400,msg:'0 category modified, not exists' }
 * {code:401,msg:'0 category modified, no modification' }
 */


module.exports=router;