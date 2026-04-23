import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer px-3" aria-labelledby="footer-heading">
      <div className="section-shell site-footer__inner">
        <div className="site-footer__brand">
          <div className="site-footer__brand-row">
            <div className="site-footer__logo-wrap">
              <Image
                src="/images/logo.png"
                alt=""
                width={400}
                height={133}
                className="site-footer__logo block h-20 w-auto max-w-none object-contain object-left sm:h-24"
                sizes="(max-width: 640px) 220px, 280px"
              />
            </div>
            <div className="site-footer__brand-text">
              <p id="footer-heading" className="site-footer__wordmark">
                Imperial Associates
              </p>
              <p className="site-footer__tagline">Civil · BIM · Survey · Interiors</p>
            </div>
          </div>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__card">
            <span className="site-footer__label">Address</span>
            <p className="site-footer__text">
              10-11-109/13, Janta Press Colony, Raichur - 584101
            </p>
          </div>
          <div className="site-footer__card">
            <span className="site-footer__label">Contact</span>
            <p className="site-footer__text">
              <a href="tel:+917760158960" className="site-footer__link">
                +91 77601 58960
              </a>
            </p>
            <p className="site-footer__text">
              <a href="tel:+919964632271" className="site-footer__link">
                +91 99646 32271
              </a>
            </p>
          </div>
          <div className="site-footer__card col-span-2">
            <span className="site-footer__label">Email</span>
            <p className="site-footer__text">
              <a
                href="mailto:info@imperialassociates.co.in"
                className="site-footer__link break-all sm:break-normal"
              >
                info@imperialassociates.co.in
              </a>
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © 2026 Imperial Associates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
