export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">OzodCoder</div>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
              Bizning dunyo bo'ylab dasturchi bo'lishga amaliy texnik ta'lim bilan yordam beramiz.
            </p>
          </div>
          <div>
            <div className="footer__col-title">Kompaniya</div>
            <ul className="footer__list">
              <li>Biz Haqimizda</li>
              <li>Yordam Bog'lanish</li>
              <li>O'qituvchi bo'lish</li>
            </ul>
          </div>
          <div>
            <div className="footer__col-title">Huquqiy</div>
            <ul className="footer__list">
              <li>Maxfiylik Siyosati</li>
              <li>Xizmat Ko'rsatish Shartlari</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">© 2026 OzodCoder. Barcha huquqlar himoyalangan.</div>
      </div>
    </footer>
  )
}
