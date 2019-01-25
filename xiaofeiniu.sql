#设置编码格式
set names utf8;
#如果已经存在数据库xiaofeiniu 先丢弃
drop database if exists xiaofeiniu;
#创建数据库，创建数据库并设置编码格式为utf8
create database xiaofeiniu charset=utf8;
# 使用数据库
use xiaofeiniu;
 
# 在数据库中创建表格 管理员信息表 xfn_admin
create table xfn_admin(
    aid int primary key auto_increment,  
    aname varchar(32) unique,
    apwd varchar(64)
);

insert into xfn_admin values
(null,'admin',password("123456")),
(null,'boss',password("999999"));

#项目全局设置 xfn_settings
create table xfn_settings(
    sid int primarykey, #编号
    appName varchar(32) ,
    apiUrl varchar(64),
    adminUrl varchar(64),
    appUrl varchar(64),
    icp varchar(64),
    copyringht varchar(128)
);
#桌台信息表 xfn_table
create table xfn_table(
    tid int ,
    tname varchar(64),
    type varchar(16),
    status int 
);
# 桌台预定信息表 xfn_reservation
create table xfn_reservation(
    rid int,
    contactName varchar(64),
    phone varchar(16),
    contactTime bigint,
    dinnerTime bigint
);
#菜品分类表 xfn_category
create table xfn_category(
    cid int,
    cname varchar(32)
);

#菜品信息表 xfn_dish(
    did int,
    title varchar(32),
    imgUrl varchar(128),
    price decimal(6,2),
    detail varchar(128),
    categoryId int # 外键 参考类别cid
);

#订单列表 xfn_order
create table xfn_order(
    oid int primary key,
    startTime bigint,
    endTime bigint,
    customerCount int,
    tableId int
);

# 订单详情表 xfn_order_detail
create table xfn_order_detail(
    did int primary key,
    dishId int, 
    dishCount int,  #菜品数量
    customerName varchar(64), # 点餐用户的称呼
    orderId  int  #订单编号，所指明所属订单
);






