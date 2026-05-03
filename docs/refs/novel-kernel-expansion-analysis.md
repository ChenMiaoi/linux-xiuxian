---
title: 小说内核知识扩写分析
---

# 小说内核知识扩写分析

> 分析对象：`docs/novel/` 全文 228 个 Markdown 文件。统计指标用于发现扩写优先级，不替代逐章人工判断。

## 总体结论

后期卷更需要扩写。当前前传和第一卷篇幅较厚，越往后平均章幅越低；第十卷、八卷、九卷、七卷、六卷最需要引入 `vendor/linux/Documentation/` 的官方知识点来增强准确性和厚度。

优先级建议：

1. 第十卷：飞升大道。技术/流程知识密度最低，应接入 `Documentation/process/` 与 `Documentation/maintainer/`。
2. 第八卷：天劫降临。安全卷篇幅偏短，应接入 credentials、LSM、keys、IMA/IPE、hardware vulnerabilities。
3. 第九卷：大道无形。架构卷篇幅偏短，应接入 RCU、locking、memory barriers、lockdep、KCSAN。
4. 第七卷：天地之桥。驱动卷术语密度偏低，应接入 driver model、DMA API、bus、runtime PM、Device Tree。
5. 第六卷：沧海横流。网络卷篇幅偏低，应接入 NAPI、offload、netfilter、BPF、Netlink。
6. 第四卷与第三卷：已有主题明确，但末段总结章和现代机制可继续补强。

## 卷级统计

| 卷 | 章数 | 平均词元 | 源码链接 | ChapterGate | Playground | 技术术语命中 | 判断 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 前传 | 12 | 3888 | 0 | 14 | 47 | 75 | 篇幅厚，但缺少内核源码/文档链接；更偏 C 基础 |
| 第一卷 | 15 | 2752 | 15 | 15 | 27 | 130 | 启动线可补 firmware/arch/kernel-parameters |
| 第二卷 | 20 | 2063 | 20 | 20 | 28 | 231 | 可补 cgroup、PSI、namespace 边界 |
| 第三卷 | 20 | 1862 | 21 | 24 | 20 | 321 | 已补 EEVDF；仍可补能耗、调度域、schedutil |
| 第四卷 | 25 | 2090 | 24 | 25 | 24 | 420 | 内存主题较完整；末段现代 MM 可补 |
| 第五卷 | 20 | 1818 | 19 | 20 | 19 | 463 | 术语多，篇幅偏短；可补 page cache/block/writeback |
| 第六卷 | 25 | 1667 | 24 | 25 | 24 | 315 | 网络卷明显可扩 |
| 第七卷 | 25 | 1666 | 24 | 25 | 24 | 139 | 驱动卷术语密度不足，优先扩 |
| 第八卷 | 20 | 1502 | 19 | 20 | 19 | 126 | 安全卷不足，优先扩 |
| 第九卷 | 25 | 1486 | 24 | 25 | 24 | 189 | 架构卷不足，优先扩 |
| 第十卷 | 10 | 1631 | 9 | 10 | 9 | 17 | 飞升流程知识不足，最高优先级 |

## 各卷扩写建议

### 前传：根基篇

现状：篇幅充足，Playground 多，但几乎没有 `KernelSourceLink`。定位更像 C/汇编基础训练。

建议：

- 不必大幅扩写正文；可在章末或道藏笔记加入“未来回查路径”。
- 补 `include/linux/types.h`、`include/linux/list.h`、`include/linux/container_of.h`、`include/linux/compiler*.h`、`include/asm-generic/barrier.h` 的源码链接。
- 把 `Documentation/core-api/wrappers/atomic_t.rst`、`Documentation/memory-barriers.txt` 纳入原子操作和内存屏障章节。

### 第一卷：混沌初开

短章候选：

- `vol1-chaos/ch01.md`：1164 词，适合补 `init_task` 与 PID 0 的静态起源。
- `vol1-chaos/ch10.md`、`ch11.md`：panic/recovery 可接入 admin guide 与 fault injection。
- `vol1-chaos/ch14.md`：idle 命运可接入 idle/scheduler 文档。

可补知识：

- `Documentation/arch/*/`：不同架构启动入口。
- `Documentation/firmware-guide/`：固件界与内核界交接。
- `Documentation/devicetree/`：硬件描述。
- `Documentation/admin-guide/kernel-parameters.rst`：启动参数改变命运。

### 第二卷：万物之基

短章候选：

- `vol2-foundation/ch23.md`：等待之道，可补 wait/wakeup 与 completion。
- `vol2-foundation/ch32.md`：cgroup 章节虽然术语多，但可更准确。
- `vol2-foundation/ch35.md`：总结章可扩成 process/cgroup/namespace/signal 总图。

可补知识：

- cgroup v2 的统一层级、controllers、resource domain。
- PSI 把 CPU、memory、IO 压力量化。
- taskstats/delay accounting 作为“因果账簿”。
- namespace 与 cgroup 的边界。

### 第三卷：天道均衡

短章候选：

- `vol3-scheduler/ch40.md`：nice design。
- `vol3-scheduler/ch43.md`：调度域，目前术语命中为 0，应补 `sched-domains.rst`。
- `vol3-scheduler/ch52.md`：调度延迟，目前术语命中为 0，应补 sched debug、latency、OSNoise/timerlat。
- `vol3-scheduler/ch55.md`：总结章应纳入 EEVDF。

可补知识：

- `sched-eevdf.rst`：lag、eligible、virtual deadline。
- `sched-domains.rst`：多核层次。
- `sched-energy.rst` 与 `schedutil.rst`：调度和能耗。
- `sched-ext.rst`：可作为后期“外道调度术”伏笔。

### 第四卷：内景天地

短章候选：

- `vol4-memory/ch76.md`：compaction。
- `vol4-memory/ch77.md`：THP，术语命中为 0。
- `vol4-memory/ch78.md`：KASAN，术语命中低。
- `vol4-memory/ch80.md`：总结章最短。

可补知识：

- `mm/multigen_lru.rst`：现代页面回收。
- `mm/damon/`：数据访问监控。
- `mm/transhuge.rst`：THP。
- `dev-tools/kasan.rst`、`kfence.rst`、`kmemleak.rst`：内存调试。
- `mm/overcommit-accounting.rst` 与 `mm/oom.rst`：OOM 前因。

### 第五卷：永恒之森

短章候选：

- `vol5-filesystem/ch92.md`：术语多但可补 path lookup 或 dcache。
- `vol5-filesystem/ch95.md`：术语命中低，可补 special fs。
- `vol5-filesystem/ch100.md`：总结章短且无源码链接。

可补知识：

- `filesystems/vfs.rst`：VFS 四大对象。
- `filesystems/path-lookup.rst`：路径查找。
- `filesystems/caching/`：FS-Cache 与 netfs。
- `block/`：块层与文件系统下方的“地脉”。
- `admin-guide/device-mapper/`：映射、快照、thin provisioning。

### 第六卷：沧海横流

短章候选：

- `vol6-network/ch130.md`：986 词，总结章过短。
- `vol6-network/ch126.md`：术语命中低。
- `vol6-network/ch128.md`：术语命中为 0。

可补知识：

- `networking/napi.rst`：中断与轮询融合。
- `networking/netdevices.rst`：网络设备生命周期。
- `networking/checksum-offloads.rst`、`segmentation-offloads.rst`：硬件协助。
- `networking/filter.rst` 与 `bpf/`：BPF/XDP。
- `userspace-api/netlink/`：用户态配置与事件。

### 第七卷：天地之桥

短章候选：

- `vol7-drivers/ch140.md`、`ch142.md`、`ch143.md`：术语命中为 0。
- `vol7-drivers/ch155.md`：总结章可扩。

可补知识：

- `driver-api/driver-model/`：bus/device/driver/class。
- `core-api/dma-api-howto.rst`：DMA 地址和缓存一致性。
- `PCI/`、`usb/`、`i2c/`、`spi/`：不同总线世界。
- `power/runtime_pm.rst`：设备休眠与唤醒。
- `devicetree/`：platform 驱动的硬件描述来源。

### 第八卷：天劫降临

短章候选：

- `vol8-security/ch158.md`：术语命中为 0。
- `vol8-security/ch160.md`、`ch163.md`、`ch164.md`：篇幅短。
- `vol8-security/ch175.md`：总结章应加纵深防御总图。

可补知识：

- `security/credentials.rst`：身份本体。
- `security/lsm.rst`、`admin-guide/LSM/`：安全 hook 和模块。
- `security/keys/`：密钥系统。
- `security/self-protection.rst`：内核自保护。
- `admin-guide/hw-vuln/`：硬件漏洞缓解。
- `security/IMA-templates.rst`、`security/ipe.rst`：完整性策略。

### 第九卷：大道无形

短章候选：

- `vol9-architecture/ch183.md`：术语命中为 0。
- `vol9-architecture/ch186.md`、`ch184.md`、`ch187.md`：篇幅短。
- `vol9-architecture/ch200.md`：总结章仅 1062 词。

可补知识：

- `RCU/whatisRCU.rst` 与 `RCU/Design/`：宽限期与读侧临界区。
- `locking/locktypes.rst`：锁类型和上下文规则。
- `locking/lockdep-design.rst`：锁依赖检测。
- `memory-barriers.txt`：内存序。
- `core-api/refcount-vs-atomic.rst`：生命周期计数。
- `dev-tools/kcsan.rst`：并发 bug 检测。

### 第十卷：飞升大道

短章候选：

- `vol10-ascension/ch202.md`、`ch203.md`、`ch206.md`、`ch207.md`：术语命中接近 0。
- `vol10-ascension/ch210.md`：全书总结偏短。

可补知识：

- `process/submitting-patches.rst`：补丁提交。
- `process/submit-checklist.rst`：提交前清单。
- `process/development-process.rst`：开发流程。
- `process/coding-style.rst`：代码风格。
- `process/handling-regressions.rst`：回归处理。
- `process/security-bugs.rst`：安全漏洞处理。
- `process/stable-api-nonsense.rst`：内部 API 不稳定法则。
- `maintainer/`：维护者职责。

扩写方向：

- 增加 v1/v2/v3 补丁往返。
- 写 review comment、CI failure、bisect、Fixes tag、Cc stable。
- 把 Linus 的认可写成流程终点之一，而不是唯一终点；真正飞升是长期维护责任。

## 推荐执行顺序

1. 先扩第十卷，让结尾从“飞升仪式”变成真实内核社区流程。
2. 再扩第八、九卷，补足安全与并发这两个后期硬核境界。
3. 再扩第七、六卷，把驱动和网络从概述型章节提高到子系统级细节。
4. 最后回补第三、四、五卷的总结章，把现代机制纳入全书知识闭环。

