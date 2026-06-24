# 全栈工程师常见面试题整理

这里整理全栈工程师常见面试题，覆盖前端、后端、数据库、网络、安全、系统设计、DevOps 和项目经验。

全栈面试通常不要求每个方向都像专项工程师一样深，但会重点考察：能否独立把一个功能从页面做到接口、数据、部署和排查。

## 能力地图

<div class="flow-diagram">
  <p class="flow-title">全栈工程师面试能力链路</p>
  <div class="flow-row">
    <div class="flow-node"><strong>前端体验</strong><span>HTML、CSS、JS、框架、性能</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>后端接口</strong><span>REST、鉴权、错误处理、并发</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>数据能力</strong><span>SQL、索引、事务、缓存</span></div>
    <div class="flow-arrow">-&gt;</div>
    <div class="flow-node"><strong>工程交付</strong><span>测试、部署、监控、排障</span></div>
  </div>
  <p class="flow-note">回答全栈题时，最好能从用户体验一路讲到接口、数据、风险和上线验证。</p>
</div>

## 题目分类

- [全栈工程师能力清单](/posts/fullstack-skills-roadmap)
- [前端基础](/posts/fullstack-interview-frontend)
- [后端与 API](/posts/fullstack-interview-backend-api)
- [后端技术高频题](/posts/fullstack-interview-backend-tech)
- [数据库与缓存](/posts/fullstack-interview-database-cache)
- [网络与安全](/posts/fullstack-interview-network-security)
- [系统设计](/posts/fullstack-interview-system-design)
- [DevOps 与部署](/posts/fullstack-interview-devops)
- [项目经验](/posts/fullstack-interview-project)

## 推荐复习顺序

1. 先看[全栈工程师能力清单](/posts/fullstack-skills-roadmap)，建立整体技术地图。
2. 再复习前端基础和框架，因为它决定用户能不能顺畅使用。
3. 接着复习后端接口、后端技术和数据库，因为它决定业务是否正确可靠。
4. 然后看网络、安全、缓存和性能，这是区分初级和中高级的重要部分。
5. 最后准备系统设计和项目经验，用真实项目把知识串起来。

## 全栈回答模板

回答功能设计类问题时，可以按这个顺序：

1. 页面交互是什么
2. 接口如何设计
3. 数据如何存储
4. 权限和安全怎么处理
5. 异常和边界情况是什么
6. 如何测试、部署和监控

例如“做一个登录功能”，不要只说表单和接口。更完整的回答要包括：表单校验、密码传输、token、刷新登录态、权限路由、错误提示、限流、防暴力破解和日志审计。
