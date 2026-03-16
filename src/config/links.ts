export interface FriendLink {
  name: string;
  url: string;
  description: string;
  avatar?: string;
  // avatar 支持三种格式：
  // 1. 外部链接：以 http:// 或 https:// 开头
  // 2. public 目录：以 / 开头，如 /images/avatar.jpg
  // 3. 本地路径：相对于 src 目录，如 assets/images/avatar.jpg
}

export const friendLinks: FriendLink[] = [
  {
    name: "星轨时光机",
    url: "https://gerrit1999.github.io",
    description: "Gerrit1999 的个人博客",
    avatar: "https://avatars.githubusercontent.com/u/71630591",
  },
  {
    name: "ZY 知识库",
    url: "https://blog.pljzy.top",
    description: "一个技术探索与分享的平台",
    avatar: "https://avatars.githubusercontent.com/u/103929231",
  },
  // 在这里添加更多友链
];