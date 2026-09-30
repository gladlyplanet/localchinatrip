/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/destinations/liaoning/dalian-coastal-road",
        destination: "/destinations/liaoning/dalian-binhai-road",
        permanent: true
      },
      {
        source: "/destinations/liaoning/jinzhou-barbecue",
        destination: "/destinations/liaoning/jinzhou-guta-night-food",
        permanent: true
      },
      {
        source: "/destinations/jiangxi/jingdezhen",
        destination: "/destinations/jiangxi/jingdezhen-porcelain-workshops",
        permanent: true
      },
      {
        source: "/destinations/jiangxi/porcelain-market-and-studio",
        destination: "/destinations/jiangxi/jingdezhen-porcelain-workshops",
        permanent: true
      },
      {
        source: "/destinations/yunnan/shangri-la",
        destination: "/destinations/yunnan/shangri-la-dukezong",
        permanent: true
      },
      {
        source: "/destinations/yunnan/stone-forest",
        destination: "/destinations/yunnan/stone-forest-kunming",
        permanent: true
      },
      {
        source: "/destinations/gansu/mingsha-mountain",
        destination: "/destinations/gansu/mingsha-mountain-and-crescent-spring",
        permanent: true
      },
      {
        source: "/destinations/shanxi/qiao-family-compound",
        destination: "/destinations/shanxi/qiao-family-courtyard",
        permanent: true
      },
      {
        source: "/destinations/shanxi/hukou-waterfall",
        destination: "/destinations/shanxi/hukou-waterfall-shanxi-side",
        permanent: true
      },
      {
        source: "/destinations/shanxi/mianshan-mountain",
        destination: "/destinations/shanxi/mianshan",
        permanent: true
      },
      {
        source: "/destinations/jilin/koguryo-sites-ji-an",
        destination: "/destinations/jilin/koguryo-heritage-ji-an",
        permanent: true
      },
      {
        source: "/destinations/jilin/puppet-emperor-s-palace",
        destination: "/destinations/jilin/changchun-puppet-palace",
        permanent: true
      },
      {
        source: "/destinations/tianjin/yangliuqing-new-year-prints",
        destination: "/destinations/tianjin/yangliuqing-new-year-painting",
        permanent: true
      },
      {
        source: "/destinations/tianjin/haihe-river",
        destination: "/destinations/tianjin/haihe-river-night-walk",
        permanent: true
      },
      {
        source: "/destinations/tianjin/tianjin-breakfast-walk",
        destination: "/destinations/tianjin/tianjin-snack-trail",
        permanent: true
      },
      {
        source: "/destinations/chongqing/ciqikou-ancient-town",
        destination: "/destinations/chongqing/ciqikou-old-town",
        permanent: true
      },
      {
        source: "/destinations/sichuan/giant-panda-base",
        destination: "/destinations/sichuan/chengdu-panda-base",
        permanent: true
      },
      {
        source: "/destinations/sichuan/dujiangyan",
        destination: "/destinations/sichuan/dujiangyan-irrigation-system",
        permanent: true
      },
      {
        source: "/destinations/shanghai/yuyuan-garden",
        destination: "/destinations/shanghai/yu-garden-and-old-city",
        permanent: true
      },
      {
        source: "/destinations/hong-kong/temple-street",
        destination: "/destinations/hong-kong/temple-street-night-market",
        permanent: true
      },
      {
        source: "/destinations/jiangsu/yixing-pottery-workshop",
        destination: "/destinations/jiangsu/yixing-zisha-teapot-studio",
        permanent: true
      },
      {
        source: "/destinations/hubei/wuhan-breakfast-walk",
        destination: "/destinations/hubei/wuhan-breakfast-streets",
        permanent: true
      },
      {
        source: "/destinations/hubei/three-gorges",
        destination: "/destinations/hubei/three-gorges-hubei-section",
        permanent: true
      },
      {
        source: "/destinations/shaanxi/muslim-quarter",
        destination: "/destinations/shaanxi/muslim-quarter-xi-an",
        permanent: true
      },
      {
        source: "/destinations/guangdong/chaozhou-old-city",
        destination: "/destinations/guangdong/chaozhou-old-town",
        permanent: true
      },
      {
        source: "/destinations/hunan/zhangjiajie",
        destination: "/destinations/hunan/zhangjiajie-national-forest-park",
        permanent: true
      },
      {
        source: "/destinations/heilongjiang/yabuli",
        destination: "/destinations/heilongjiang/yabuli-ski-area",
        permanent: true
      },
      {
        source: "/destinations/macau/red-market",
        destination: "/destinations/macau/red-market-macau",
        permanent: true
      },
      {
        source: "/destinations/hainan/bo-ao",
        destination: "/destinations/hainan/boao-town",
        permanent: true
      },
      {
        source: "/destinations/hainan/dongpo-academy",
        destination: "/destinations/hainan/dongpo-academy-danzhou",
        permanent: true
      },
      {
        source: "/destinations/anhui/xuanzhi-paper-workshop",
        destination: "/destinations/anhui/xuancheng-xuan-paper-workshop",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
