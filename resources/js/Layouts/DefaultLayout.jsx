import React, { useState, useEffect } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';

import { CookieModal } from '@/Components/CookieModal';

const DefaultLayout =({ children, title = 'Vividus — Em breve', description = 'Nosso site está em modo "quase lá". Enquanto isso, a Vividus já está bem viva nas redes.', canonical = 'https://www.vividus.com.br' }) => {
  const { notifyCookie, rejectCookie } = usePage().props;
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  const acceptCookies = () => {
      setTrackingEnabled(true);
  };
  
  useEffect(() => {
      const timer = setTimeout(() => {
          if (notifyCookie || trackingEnabled) {
              const script = document.createElement('script');
              script.innerHTML = `
                  (function(w,d,s,l,i){
                      w[l]=w[l]||[];
                      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                      var f=d.getElementsByTagName(s)[0],
                          j=d.createElement(s),
                          dl=l!='dataLayer'?'&l='+l:'';
                      j.async=true;
                      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                      f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-TD52TPB');
              `;
              document.head.appendChild(script);

              const noscript = document.createElement('noscript');
              noscript.innerHTML = `
                  <iframe
                      src="https://www.googletagmanager.com/ns.html?id=GTM-TD52TPB"
                      height="0"
                      width="0"
                      style="display:none;visibility:hidden"
                  ></iframe>
              `;
              document.body.appendChild(noscript);
          }
      }, 100);

      return () => clearTimeout(timer);
  }, [notifyCookie, trackingEnabled]);

  return (
    <>
      <Head>
        {/* Primary meta */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Vividus" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:image" content={`${canonical}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vividus — Em breve" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${canonical}/og-image.jpg`} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vividus',
              url: canonical,
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  email: 'contato@somosget.com.br',
                  contactType: 'customer service',
                  availableLanguage: 'Portuguese',
                },
                {
                  '@type': 'ContactPoint',
                  telephone: '+55-54-99322-0193',
                  contactType: 'customer service',
                  availableLanguage: 'Portuguese',
                },
              ],
              sameAs: [
                'https://www.instagram.com/vividus.ag/',
                'https://www.linkedin.com/company/agencia-vividus/',
              ],
            }),
          }}
        />

        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#E9D770" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <header className="w-full bg-secondary py-10 flex" role="banner">
          <div className="container max-w-large">
            <a href="/" aria-label="Vividus — Página inicial">
              <svg
                width="40"
                height="40"
                viewBox="0 0 340 340"
                className="fill-primary"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M164.822 75.5566C176.739 63.9811 198.682 48.8726 219.869 39.0527L304.105 0.0078125L340.002 36.3584L264.444 164.822C276.02 176.739 291.129 198.682 300.949 219.869L339.995 304.105L303.645 340.003L175.179 264.445C163.262 276.021 141.32 291.129 120.133 300.949L35.8965 339.995L0 303.645L75.5566 175.18C63.9812 163.263 48.8725 141.321 39.0527 120.134L0.0078125 35.8965L36.3584 0L164.822 75.5566ZM53.8379 310.835L56.0264 313.051C75.6265 303.445 96.1229 290.898 111.728 275.488C128.863 258.567 144.713 236.27 152.303 209.557L128.517 185.471L53.8379 310.835ZM185.471 211.484L310.834 286.164L313.051 283.975C303.445 264.375 290.898 243.879 275.488 228.274C258.567 211.139 236.27 195.288 209.557 187.698L185.471 211.484ZM283.975 26.9512C264.375 36.5572 243.879 49.1042 228.274 64.5137C211.139 81.4346 195.288 103.732 187.698 130.445L211.483 154.531L286.163 29.168L283.975 26.9512ZM26.9502 56.0273C36.5563 75.6274 49.1041 96.123 64.5137 111.728C81.4344 128.862 103.732 144.713 130.444 152.303L154.531 128.518L29.167 53.8379L26.9502 56.0273Z"
                />
              </svg>
            </a>
          </div>
        </header>

        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>
        <footer
          className="w-full bg-secondary py-10"
          role="contentinfo"
        >
          <div className="container max-w-large">
            <div className="flex items-center justify-between">
              <a
                href="mailto:contato@somosget.com.br"
                className="font-tertiary text-cream text-xs tracking-widest uppercase hover:text-primary transition-colors duration-300"
                aria-label="Enviar e-mail para contato@somosget.com.br"
              >
                contato@somosget.com.br
              </a>

              <a
                href="tel:+5454993220193"
                className="font-tertiary text-cream text-xs tracking-widest uppercase hover:text-primary transition-colors duration-300"
                aria-label="Ligar para 54 99322.0193"
              >
                54 99322.0193
              </a>
            </div>
          </div>
        </footer>

        {!notifyCookie || !rejectCookie ? (
            <CookieModal acceptCookies={acceptCookies} visible={notifyCookie ? false : true} />
        ) : null}
      </div>
    </>
  );
}

export default DefaultLayout;