export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://devgameblogpromo.vercel.app/#website",
        "url": "https://devgameblogpromo.vercel.app/",
        "name": "DevGameBlogPromo",
        "description": "Gaming blog and promotion website with news, guides, and updates.",
        "publisher": {
          "@id": "https://devgameblogpromo.vercel.app/#org"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://devgameblogpromo.vercel.app/#org",
        "name": "DevGameBlogPromo",
        "url": "https://devgameblogpromo.vercel.app/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://devgameblogpromo.vercel.app/logo.png"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://devgameblogpromo.vercel.app/#webpage",
        "url": "https://devgameblogpromo.vercel.app/",
        "name": "Home Page"
      },

      {
        "@type": "BlogPosting",
        "headline": "Welcome to DevGameBlogPromo",
        "description": "Latest gaming news, guides, and promotional updates.",
        "image": "https://devgameblogpromo.vercel.app/cover.jpg",
        "author": {
          "@type": "Person",
          "name": "Admin"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Dev Game Blog Promo",
          "logo": {
            "@type": "ImageObject",
            "url": "https://devgameblogpromo.vercel.app/logo.png"
          }
        },
        "datePublished": "2026-01-01",
        "dateModified": "2026-01-01",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://devgameblogpromo.vercel.app/"
        }
      },

      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://devgameblogpromo.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://devgameblogpromo.vercel.app/blog"
          }
        ]
      },

      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is DevGameBlogPromo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A gaming blog platform for news, guides, and promotions."
            }
          },
          {
            "@type": "Question",
            "name": "Is the site updated regularly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, new gaming content is added regularly."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      {/* SEO META TAGS */}
      <head>
        <title>Dev Game Blog Promo</title>
        <meta
          name="description"
          content="Gaming blog and promotion website with latest updates, guides, and news."
        />

        {/* Open Graph */}
        <meta property="og:title" content="Dev Game Blog Promo" />
        <meta property="og:description" content="Gaming blog and promotions hub." />
        <meta property="og:url" content="https://devgameblogpromo.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dev Game Blog Promo" />
        <meta name="twitter:description" content="Gaming blog and promotions hub." />
      </head>

      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* PAGE CONTENT */}
      <main>
        <h1>Dev Game Blog Promo</h1>
        <p>Welcome to your gaming blog platform.</p>
      </main>
    </>
  );
}
