class CookiesConsent {
  constructor() {
    this.banner = undefined

    this.config = undefined
    this.tracking = undefined

    this.PreBanner = undefined
    this.Cookies = undefined
    this.DOMbanner = undefined
  }

  render() {
    this.addCss()
    this.createDOMElements()
    this.checkStatus()
  }

  addCss() {
    const stylesheet = document.createElement('link');
    stylesheet.setAttribute('rel', 'stylesheet');
    stylesheet.setAttribute('href', `https://cdn.jsdelivr.net/gh/portalsosdesigners/config/cookiesConsent.css`);
    document.head.appendChild(stylesheet);
  }

  createDOMElements() {
    this.PreBanner = document.createElement("div");
    this.PreBanner.innerHTML = `<button type="button" id="prebannerBtn" class="prebanner prebanner__border__${this.config.bannerStyle} cookiesConsent__${this.config.position} cookiesConsent__${this.config.border} animation" style="color: ${this.banner.manageCookies.color}; background-color: ${this.banner.manageCookies.background};">
                                    <svg fill="currentColor" style="margin-right: 7px; margin-top: 2px; vertical-align: text-top;" height="15px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17 0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13 35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0 0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77 54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11 80.53-12.76l69.13-35.21a132.273 132.273 0 0 0 57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
                                    </svg>${this.banner.manageCookies.text}</button>`;
    this.PreBanner.style.display = "none";
    document.body.appendChild(this.PreBanner);

    this.Cookies = document.createElement("div");
    this.Cookies.innerHTML = `<div 
                                    id="cookiesConsent-banner" 
                                    class="cookiesConsent__banner cookiesConsent__banner__${this.config.bannerStyle} cookiesConsent__${this.config.border} cookiesConsent__${this.config.position}"
                                    style="background-color: ${this.banner.background};"
                                >
                                    <h3 style="color: ${this.banner.color};">${this.banner.heading}</h3>
                                    <p style="color: ${this.banner.color};">
                                        ${this.banner.description} 
                                        <a 
                                            href="${this.banner.link}"
                                            target="_blank" 
                                            class="read__more"
                                            style="color: ${this.banner.color};"
                                        >
                                            ${this.banner.linkText}
                                        </a>
                                    </p>
                                    <div class="btn__section">
                                        <button type="button" id="acceptCookies" class="btn__accept accept__btn__styles" style="color: ${this.banner.acceptBtn.color}; background-color: ${this.banner.acceptBtn.background};">
                                            ${this.banner.acceptBtn.text}
                                        </button>
                                        <button type="button" id="rejectCookies" class="btn__settings settings__btn__styles" style="color: ${this.banner.rejectBtn.color}; background-color: ${this.banner.rejectBtn.background};">
                                            ${this.banner.rejectBtn.text}
                                        </button>
                                    </div>
                                </div>
                            `;
    document.body.appendChild(this.Cookies);
    this.DOMbanner = document.getElementById('cookiesConsent-banner')


    document.getElementById('prebannerBtn').addEventListener('click', () => this.openSelector())
    document.getElementById('acceptCookies').addEventListener('click', () => this.acceptCookies())
    document.getElementById('rejectCookies').addEventListener('click', () => this.rejectCookies())
  }

  checkStatus() {
    switch (localStorage.getItem("CookiesConsent")) {
      case "1":
        this.openManageCookies();
        this.activateTracking();
        break;
      case "0":
        this.openManageCookies();
        break;
      default:
        this.openSelector();
    }

    if (!sessionStorage.getItem('rejectedCookies') && localStorage.getItem("CookiesConsent") === '0') {
      this.openSelector();
    }
  }

  openManageCookies() {
    this.PreBanner.style.display = this.config.hideAfterClick ? "none" : "block"
    this.DOMbanner.classList.remove('cookiesConsent__show')
  }

  openSelector() {
    this.PreBanner.style.display = "none";
    this.DOMbanner.classList.add('cookiesConsent__show')
  }

  acceptCookies() {
    localStorage.setItem("CookiesConsent", "1")
    this.openManageCookies()
    this.activateTracking()
  }

  rejectCookies() {
    localStorage.setItem("CookiesConsent", "0");
    sessionStorage.setItem('rejectedCookies', 'true')
    this.openManageCookies();
    this.disableTracking();
  }

  activateTracking() {
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${this.tracking.AnalyticsCode}');`;

      if (this.tracking.RMKCode !== undefined) {
        AnalyticsData.text += `
                                gtag('config', '${this.tracking.RMKCode}');`
      }

      document.head.appendChild(AnalyticsData);
    }

    if (this.tracking.FacebookPixelCode) {
      let FacebookPixelData = document.createElement('script');
      FacebookPixelData.text = `
                                    !function(f,b,e,v,n,t,s)
                                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                    n.queue=[];t=b.createElement(e);t.async=!0;
                                    t.src=v;s=b.getElementsByTagName(e)[0];
                                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                                    'https://connect.facebook.net/en_US/fbevents.js');
                                    fbq('init', '${this.tracking.FacebookPixelCode}');
                                    fbq('track', 'PageView');
                                `;
      document.head.appendChild(FacebookPixelData);
      let FacebookPixel = document.createElement('noscript');
      FacebookPixel.setAttribute('height', `1`);
      FacebookPixel.setAttribute('width', `1`);
      FacebookPixel.setAttribute('style', `display:none`);
      FacebookPixel.setAttribute('src', `https://www.facebook.com/tr?id=${this.tracking.FacebookPixelCode}&ev=PageView&noscript=1`);
      document.head.appendChild(FacebookPixel);
    }
  }

  disableTracking() {
    if (this.tracking.AnalyticsCode) {
      let Analytics = document.createElement('script');
      Analytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${this.tracking.AnalyticsCode}`);
      document.head.appendChild(Analytics);
      let AnalyticsData = document.createElement('script');
      AnalyticsData.text = `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        window['ga-disable-${this.tracking.AnalyticsCode}'] = true

                        gtag('config', '${this.tracking.AnalyticsCode}' , {
                            'client_storage': 'none',
                            'anonymize_ip': true
                        });`;

      if (this.tracking.RMKCode !== undefined) {
        AnalyticsData.text += `
                          gtag('config', '${this.tracking.RMKCode}' , {
                              'client_storage': 'none',
                              'anonymize_ip': true
                          });');`
      }

      document.head.appendChild(AnalyticsData);
    }

    this.clearCookies()
  }

  clearCookies() {
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
      let d = window.location.hostname.split(".");
      while (d.length > 0) {
        let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        let p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        };
        d.shift();
      }
    }
  }

  start(languaje, obj) {
    if (!obj) obj = {}
    const lang = new LanguagesGC(languaje)

    this.config = {
      border: obj.border || 'border',
      position: obj.position || 'left',
      hideAfterClick: obj.hideAfterClick || false,
      bannerStyle: obj.style || 2
    }

    this.tracking = {
      AnalyticsCode: obj.analytics || undefined,
      RMKCode: obj.rmk || undefined,
      FacebookPixelCode: obj.facebookPixel || undefined,
      customScript: obj.customScript || undefined
    }

    this.banner = {
      description: obj.bannerDescription || lang.bannerDescription,
      linkText: obj.bannerLinkText || lang.bannerLinkText,
      link: obj.policyLink || '#link',
      background: obj.bannerBackground || '#fff',
      color: obj.bannerColor || '#1d2e38',
      heading: obj.bannerHeading !== 'none' ? obj.bannerHeading || lang.bannerHeading : '',
      acceptBtn: {
        text: obj.acceptBtnText || lang.acceptBtnText,
        background: obj.acceptBtnBackground || '#253b48',
        color: obj.acceptBtnColor || '#fff'
      },
      rejectBtn: {
        text: obj.rejectBtnText || lang.rejectBtnText,
        background: obj.rejectBtnBackground || '#E8E8E8',
        color: obj.rejectBtnColor || '#636363'
      },
      manageCookies: {
        color: obj.manageColor || '#1d2e38',
        background: obj.manageBackground || '#fff',
        text: obj.manageText || lang.manageText,
      }
    }

    window.addEventListener('load', () => {
      this.render()
    })
  }
}

class LanguagesGC {
  constructor(code) {
    this.init()
    let lang = this.arrLang[code] || this.arrLang['en']
    this.bannerHeading = lang['bannerHeading']
    this.bannerDescription = lang['bannerDescription']
    this.bannerLinkText = lang['bannerLinkText']
    this.acceptBtnText = lang['acceptBtnText']
    this.rejectBtnText = lang['rejectBtnText']
    this.manageText = lang['manageText']
  }

  init() {
    this.arrLang = {
      en: {
        'bannerHeading': 'We use cookies',
        'bannerDescription': 'We use our own and third-party cookies to personalize content and to analyze web traffic.',
        'bannerLinkText': 'Read more about cookies',
        'acceptBtnText': 'Accept cookies',
        'rejectBtnText': 'Reject',
        'manageText': 'Manage cookies'
      },
      es: {
        'bannerHeading': 'Uso de cookies',
        'bannerDescription': 'Utilizamos cookies propias y de terceros para personalizar el contenido y para analizar el tráfico de la web.',
        'bannerLinkText': 'Ver más sobre las cookies',
        'acceptBtnText': 'Aceptar cookies',
        'rejectBtnText': 'Rechazar',
        'manageText': 'Cookies'
      },
      pt_BR: {
        'bannerHeading': 'Uso de cookies',
        'bannerDescription': 'Usamos cookies próprios e de terceiros para personalizar o conteúdo e analisar o tráfego da web.',
        'bannerLinkText': 'Leia mais sobre os cookies',
        'acceptBtnText': 'Aceitar cookies',
        'rejectBtnText': 'Rejeitar',
        'manageText': 'Gerenciar cookies'
      }
    }
  }

}

const cookiesConsent = new CookiesConsent()
