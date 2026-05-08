# TiMaX Deutsch World - Learn German

A modern, responsive website for learning German with Tisha & Maximilian. Features live classes, Goethe exam preparation, and cultural training from A1 to C1 levels.

## 🌍 Website Features

### Core Sections
- **Hero Banner**: Eye-catching introduction with clear CTAs
- **Levels & Exam Prep**: Comprehensive Goethe certification training (A1-C1)
- **Services**: Six specialized teaching services
- **Meet Our Tutors**: Team introduction with expertise highlights
- **Student Reviews**: Real testimonials and success stories
- **FAQ**: Common questions answered
- **Contact Form**: Easy enrollment and inquiries
- **Slideshow Gallery**: Visual journey through Germany

### Technical Features
- **Multi-language Support**: 9 languages (English, German, Italian, Spanish, French, Dutch, Hindi, Portuguese, Polish)
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 compliant with semantic HTML
- **Performance Optimized**: Glass morphism UI, smooth animations
- **PWA Ready**: Web manifest for app-like experience
- **SEO Optimized**: Sitemap, robots.txt, meta tags

## 📁 Project Structure

```
Teaching Website/
├── index.html                 # Main page
├── css/
│   └── style.css             # All styles (responsive design)
├── js/
│   ├── script.js             # Interactive features
│   └── translations.js       # Multi-language support
├── assets/
│   ├── logo.png              # Brand logo
│   ├── max.jpeg              # Maximilian's photo
│   └── tisha.jpeg            # Tisha's photo
├── Slideshow/                # Gallery images
│   ├── slide1.jpg
│   ├── slide2.jpg
│   ├── slide3.jpg
│   ├── slide4.jpg
│   ├── slide5.jpg
│   ├── slide7.jpeg
│   └── slide8.jpeg
├── robots.txt                # SEO - Search engine guidelines
├── sitemap.xml               # SEO - URL map
├── manifest.json             # PWA configuration
├── .htaccess                 # Server configuration (Apache)
├── package.json              # Node.js dependencies
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) Node.js 14+ for local development

### Installation

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/yourusername/timax-deutsch-world.git
   cd Teaching\ Website
   ```

2. **Local Development Server**
   
   Using Python (built-in):
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```
   
   Using Node.js:
   ```bash
   npm install
   npm start
   ```

3. **Deploy to Production**
   - Upload all files to your web hosting server
   - Ensure `.htaccess` is enabled (Apache)
   - Test on all browsers and devices

## 🎨 Customization

### Update Website Content

**Colors & Branding**
- Edit CSS variables in [css/style.css](css/style.css) (lines 1-15)
- Logo: Replace `assets/logo.png`
- Team photos: Replace `assets/max.jpeg` and `assets/tisha.jpeg`

**Text & Translations**
- English: Edit `data-i18n` attributes in HTML
- Other languages: Update [js/translations.js](js/translations.js)
- Add new language by extending the translations object

**Gallery Slideshow**
- Add images to `Slideshow/` folder
- Update HTML in index.html (Slideshow section)

### Interactive Features
- Mobile menu toggle
- Language switcher
- FAQ accordion
- Smooth scrolling
- Scroll reveal animations
- Form validation

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS 14+, Android 9+)

## 🔒 Performance & Security

### Optimization
- Gzip compression enabled
- Browser caching configured
- Image optimization recommended
- CSS/JS minification ready

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 SEO Configuration

- Meta tags optimized
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Semantic HTML structure
- Mobile-friendly design
- Fast page load (monitored with Core Web Vitals)

## 🎯 Content Sections

### Services Offered
1. Goethe Exam Prep (A1–C1)
2. Cultural Training
3. Relocation Assistance
4. One-to-One Coaching
5. University Admission Support
6. 100% Online & Flexible

### Language Levels
- **A1**: Beginner
- **A2**: Elementary
- **B1**: Intermediate
- **B2**: Upper Intermediate
- **C1**: Advanced

## 📧 Contact & Support

- Email: contact@timax-deutsch-world.com
- Form: Located on the website (#contact section)
- Social Media: [Add links to your profiles]

## 📝 License

MIT License - Feel free to use this as a template for other projects!

## 🔄 Version History

- **v1.0.0** (May 7, 2026): Initial production release
  - Complete website structure
  - Multi-language support
  - Responsive design
  - SEO optimization
  - Accessibility compliance

## 🛠️ Maintenance Checklist

- [ ] Update student testimonials monthly
- [ ] Add new slideshow images quarterly
- [ ] Monitor SEO rankings
- [ ] Test contact form submissions
- [ ] Update team bios and certifications
- [ ] Review and update FAQ section
- [ ] Check broken links monthly
- [ ] Update sitemap when content changes
- [ ] Monitor website analytics
- [ ] Test accessibility with screen readers

## 🤝 Contributing

1. Create a branch for your feature
2. Make changes and test thoroughly
3. Submit a pull request with description

## 📞 Support & Questions

For questions about the website or to request features, please contact:
- Tisha: [email]
- Maximilian: [email]

---

**Created with ❤️ for German Language Learners**

Made for TiMaX Deutsch World - Excellence in German Education
