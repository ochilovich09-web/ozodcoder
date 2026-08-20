export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-surface-container-low">
      <div className="mx-auto max-w-content px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-2 font-display text-lg font-bold text-primary">OzodCoder</div>
            <p className="text-sm text-on-surface-variant">
              Bizning dunyo bo'ylab dasturchi bo'lishga amaliy texnik ta'lim bilan yordam beramiz.
            </p>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-on-surface">Kompaniya</div>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>Biz Haqimizda</li>
              <li>Yordam Bog'lanish</li>
              <li>O'qituvchi bo'lish</li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold text-on-surface">Huquqiy</div>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>Maxfiylik Siyosati</li>
              <li>Xizmat Ko'rsatish Shartlari</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light pt-6 text-xs text-on-surface-variant">
          © 2026 OzodCoder. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}
