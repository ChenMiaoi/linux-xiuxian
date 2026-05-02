---
title: 第八卷：天劫降临
---

# 第八卷：天劫降临

> **修炼阶段：** <CultivationRealm realm="渡劫期" />
> **内核焦点：** 安全 (`security/`, SELinux)

## 卷首语

大道三千，劫数难逃。

rootkit 暗影潜伏于内核之中，hook 系统调用，篡改数据结构。它看不见、摸不着，却无处不在。SELinux·铁面从最初的阻碍变成了最后的防线。

而 Spectre 与 Meltdown，那是来自上古的诅咒——利用硬件本身的缺陷，突破一切软件防线。

## 章节概览

| 章节 | 标题 | 核心概念 |
|------|------|----------|
| 第 156 章 | 暗影 | rootkit、内核级威胁 |
| 第 157 章 | 系统调用劫持 | syscall hook、inline hook |
| 第 158 章 | 安全基石 | credentials、uid/gid |
| 第 159 章 | 权能之道 | Linux capabilities |
| 第 160 章 | 沙箱之术 | seccomp、系统调用过滤 |
| 第 161 章 | 隔离之法 | namespaces 安全 |
| 第 162 章 | SELinux·铁面 | SELinux 入门 |
| 第 163 章 | 安全上下文 | SELinux contexts |
| 第 164 章 | 策略之网 | SELinux 策略 |
| 第 165 章 | LSM 框架 | Linux Security Modules |
| 第 166 章 | AppArmor | 路径型 LSM |
| 第 167 章 | 内核地址空间布局 | KASLR |
| 第 168 章 | 栈保护 | stack canaries、NX |
| 第 169 章 | 影子诅咒 | Spectre |
| 第 170 章 | 熔毁之灾 | Meltdown |
| 第 171 章 | 内核加密 | crypto API |
| 第 172 章 | 密钥管理 | keyring |
| 第 173 章 | 审计之道 | audit framework |
| 第 174 章 | 完整性度量 | IMA/EVM |
| 第 175 章 | 天劫圆满 | 安全总结 |
