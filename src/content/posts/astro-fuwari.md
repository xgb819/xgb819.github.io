---
title: 基于 Astro + GitHub Pages + GitHub Actions 搭建 Fuwari 主题的个人博客
published: 2026-03-16
tags: ["Astro", "GitHub", "建站"]
category: 技术分享
draft: false
---

# 前言

本教程基于 GitHub Pages 免费托管 Astro Fuwari 博客主题，通过 GitHub Actions 实现自动化构建与部署。无需服务器、无需备案，适合快速搭建静态个人博客。

# 前期准备

## 注册 GitHub 账号

直接访问 [GitHub 官网](https://github.com/signup?source=form-home-signup&user_email=)  完成注册，牢记用户名，后续仓库命名需严格匹配。

## 本地环境安装

### Node.js 安装

访问 [Node.js 官网](https://nodejs.org/zh-cn/download) 下载安装，自带 npm 包管理工具。默认选择 LTS 版本，下载对应系统安装包，全程默认下一步安装即可。

### Git 安装

打开 [Git 官网](https://git-scm.com/)，点页面右侧的下载按钮，安装全程默认选项。

### pnpm 安装

Git 安装完后，桌面按住 <kbd>Shift</kbd>，右键打开 Git Bash Here，复制粘贴命令 `npm install -g pnpm` 回车，等待安装完成，这是 Fuwari 主题指定的包管理工具。

安装完成后，打开命令行 / 终端：

- Windows：按下键盘 <kbd>Win</kbd> + <kbd>R</kbd> 组合键，弹出运行窗口，输入 cmd 回车打开命令行。

- Mac：按下 <kbd>Command</kbd> + <kbd>空格</kbd>，搜索 Terminal 打开终端。

执行以下命令：

```bash
# 检查 Node.js 版本（显示版本号即成功，建议 ≥18.x）
node -v

# 检查 npm 版本（Node.js 自带，无需单独安装）
npm -v

# 检查 Git 版本（显示版本号即成功）
git --version

# 检查 pnpm 版本（显示版本号即成功）
pnpm -v
```

> 若执行命令后提示「不是内部或外部命令」，说明安装未成功或环境变量未配置，需重新安装对应工具（Windows 可重启命令行重试）。

## VS Code 安装

打开 [VS Code 官网](https://code.visualstudio.com/)，点击首页的 Download 按钮，默认安装即可，用来编辑博客配置和编写文章。

### VS Code 汉化

1. 打开 VS Code，点击左侧栏扩展图标（四个小方块形状，快捷键 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>），进入插件市场；

2. 在顶部搜索框输入 Chinese，找到 Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code；

3. 点击插件下方的安装按钮，等待安装完成；

4. 安装后右下角会弹出 Restart 重启提示，点击重启 VS Code，界面就会变成简体中文，后续配置和写作更易看懂。

> 如果重启后仍为英文，按下 <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> 打开命令面板，输入 Configure Display Language，选择 zh-CN 再次重启即可。

### VS Code Markdown 插件安装

Markdown All in One 是一款 Markdown 插件，支持快捷键排版、自动目录、侧边实时预览，完美适配博客文章编写。

1. 回到 VS Code 左侧扩展页面，搜索框输入 Markdown All in One，找到对应插件并点击安装；

2. 安装完成后，打开任意 .md 后缀的 Markdown 文件（比如博客文章）；

3. 开启实时预览：按下快捷键 <kbd>Ctrl</kbd> + <kbd>K</kbd>，松开后立刻按 <kbd>V</kbd>，右侧会弹出预览窗口，左边编辑、右边实时看效果；

配置完成后，后续编写博客文章，既能用中文界面操作，又能实时预览排版，写作效果一目了然。

# Fuwari 博客项目初始化

## 本地初始化 Fuwari 项目

在命令行（或终端）窗口中，复制粘贴以下命令，回车：

```bash
# 创建并初始化 Fuwari 项目
pnpm create fuwari@latest fuwari

# 进入项目目录
cd fuwari

# 初始化 Git 仓库
git init

# 强制将默认分支改名为 main（统一分支名，适配GitHub Pages与Actions，解决master分支冲突）
git branch -M main
```

## 首次 Git 配置

### Git 账号绑定

```bash
# 绑定 GitHub 注册邮箱，替换为你自己的邮箱
git config --global user.email "你的GitHub邮箱"

# 绑定 GitHub 用户名，替换为你自己的 GitHub 用户名
git config --global user.name "你的GitHub用户名"

# 验证配置是否生效，执行后会显示刚才绑定的信息，确认无误即可
git config --global --list
```

### 创建并关联远程 GitHub 仓库

1. 登录 GitHub 账号，点击首页右上角 + 号，选择 New repository 新建仓库；

2. 在 Repository name 处，严格填写：你的用户名.github.io，这是 GitHub Pages 固定格式，不能修改；

3. 仓库描述、公开权限保持默认，直接拉到页面底部，点击 Create repository 创建仓库；

4. 仓库创建完成后，点击仓库页面上的 Code，复制 HTTPS 远程仓库地址（`https://github.com/你的用户名/你的用户名.github.io.git`）；

5. 回到之前打开的命令行窗口，执行以下命令，关联本地项目与远程 GitHub 仓库：

```bash
# 关联远程 GitHub 仓库，替换为你复制的真实仓库地址
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 验证远程仓库是否关联成功（输出 origin 的 fetch/push 地址即代表成功）
git remote -v
```

### SSH 免密配置

1. 命令行执行 `ssh-keygen -t ed25519 -C "你的GitHub邮箱"`，全程回车不设密码；

2. 找到生成的公钥文件（默认路径：C:/Users/你的电脑用户名/.ssh/id_ed25519.pub），用记事本打开复制全部内容；

3. 进入 GitHub → Settings → SSH and GPG keys → New SSH key，粘贴公钥保存；

4. 执行命令切换为 SSH 地址：`git remote set-url origin git@github.com:你的用户名/你的用户名.github.io.git。`

# 本地博客配置

项目核心配置文件为 src/config.ts，所有个性化设置都在此文件完成。

## 本地预览配置效果

配置完成后，回到命令行窗口（确保仍在项目根目录），执行以下命令，安装项目依赖并启动本地开发服务器，实时预览修改后的博客效果。

```bash
# 安装项目全部依赖，耐心等待执行完成
pnpm install

# 启动本地开发服务器，启动后可本地预览
pnpm dev
```

启动成功后，命令行会显示本地访问地址，浏览器直接访问 <http://localhost:4321>，即可实时查看配置效果，确认配置无误、页面显示正常后，再进行后续自动化部署配置。

# GitHub Actions 自动化部署

## 创建自动化工作流文件

1. 在项目路径 .github/workflows 下新建文件，命名为 deploy.yml；

2. 打开 deploy.yml 文件，复制以下完整工作流代码，全部粘贴进去，保存文件即可（参见：[部署你的 Astro 站点至 GitHub Pages](https://docs.astro.build/zh-cn/guides/deploy/github/)）。

```yaml
name: Deploy to GitHub Pages

on:
  # 每次推送到 `main` 分支时触发这个“工作流程”
  # 如果你使用了别的分支名，请按需将 `main` 替换成你的分支名
  push:
    branches: [ main ]
  # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”
  workflow_dispatch:

# 允许 job 克隆 repo 并创建一个 page deployment
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v5
      - name: Install, build, and upload your site
        uses: withastro/action@v5
        # with:
          # path: . # 存储库中 Astro 项目的根位置。（可选）
          # node-version: 20 # 用于构建站点的特定 Node.js 版本，默认为 20。（可选）
          # package-manager: pnpm@latest # 应使用哪个 Node.js 包管理器来安装依赖项和构建站点。会根据存储库中的 lockfile 自动检测。（可选）
          # build-cmd: pnpm run build # 用于构建你的网站的命令。默认运行软件包的构建脚本或任务。（可选）
        # env:
          # PUBLIC_POKEAPI: 'https://pokeapi.co/api/v2' # 对变量值使用单引号。（可选）

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## GitHub 仓库 Pages 设置

1. 进入你的 GitHub 博客仓库，点击仓库顶部菜单栏的 Settings 按钮；

2. 在左侧菜单栏往下翻，找到 Pages 选项并点击；

3. 在页面中找到 Source，下拉选择 GitHub Actions。

## Astro 配置文件适配

打开项目根目录的 astro.config.mjs，修改站点配置，适配 GitHub Pages 部署路径。

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 填写你的 GitHub Pages 地址，替换为自己的用户名
  site: 'https://你的用户名.github.io',
});
```

### 使用自定义域名

你可以通过在项目中添加 ./public/CNAME 文件来设置自定义域名，同时将 astro.config.mjs 中的 site 替换为你的自定义域名。

在域名控制台，配置域名解析，允许域名解析到 GitHub：

#### 填写 A 记录信息

- 记录类型：A

- 主机记录：@

- 记录值：

  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```

- TTL：3600（默认即可）

#### 填写 CNAME 记录信息

- 记录类型：CNAME

- 主机记录：www

- 记录值：`https://你的用户名.github.io`

- TTL：3600（默认即可）

#### GitHub Pages 配置自定义域名

1. 打开你的 GitHub 仓库，点击仓库顶部的 Settings；

2. 点击左侧菜单栏的 Pages，在 Custom domain 输入框中，输入你的自定义域名，点击 Save；

3. 等待 DNS check successful，勾选 Enforce HTTPS，GitHub 会自动验证域名并生成 HTTPS 证书。


## 代码提交及推送

确保已经完成 Git 账号绑定、远程仓库关联，且本地博客配置、自动化部署工作流全部设置完毕，接下来直接执行命令推送代码，触发首次部署。

```bash
# 1. 将本地所有修改的配置文件加入暂存区
git add .

# 2. 提交代码并添加备注，方便后续查看更新记录
git commit -m "initial astro site commit"

# 3. 将代码推送到GitHub远程仓库，触发自动部署
git push origin main
```

推送完成后，进入 GitHub 仓库页面，点击顶部 Actions 查看部署进度，等待 1-2 分钟，任务显示绿色对勾即为部署成功，直接访问 `https://你的用户名.github.io` 即可打开个人博客。

# 日常文章发布与更新

## 新建博客文章

Fuwari 主题支持 Markdown 写作，文章统一存放在 src/content/posts/ 目录下，推荐用命令快速创建，自动生成文章模板，无需手动编写头部信息。

```bash
# 命令快速创建文章，替换为自己的文章标题
pnpm new-post 文章标题
```

执行命令后，会自动在 posts 目录生成对应的 Markdown 文件。

使用 VS Code 打开文件后，顶部自带文章标题、日期、标签、分类等元数据，下方直接用 Markdown 语法书写正文即可（参见：[Markdown 基本语法](https://markdown.com.cn/basic-syntax/)、[Markdown 扩展语法](https://markdown.com.cn/extended-syntax/)）。

## 文章更新与重新部署

文章写完或修改配置后，回到项目根目录命令行，重复执行以下提交推送命令，GitHub Actions 会自动重新构建部署，线上内容同步更新。

```bash
# 添加所有新增或修改的文件
git add .

# 提交备注，写明更新内容
git commit -m "add: 文章标题"

# 推送至远程仓库
git push origin main
```
