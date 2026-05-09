const fs = require('fs');

const reviews = [{"name": "Anshdeep singh", "loc": "Raipur, Chhattisgarh, India", "course": "A1", "text": "Hey everybody,<br>I am writing this for Tisha Choudhary ma'am. From whom I learned German as my 1st foreign language. She is an exceptional educator who makes learning a new language feel less intimidating. Her teaching style is highly engaging, focusing not just on the language but also introducing me about German culture while I was attending an online batch. Thanks to her patience and clear explanations, my confidence in speaking and understanding German has improved significantly. A fantastic experience overall!"}, {"name": "Manjinder Singh", "loc": "Sirsa, Haryana, India", "course": "A1", "text": "I recently completed my German A1 classes and honestly, it was such a lovely experience. She made every class feel comfortable, interactive, and fun. \ud83d\udc9b<br>She explained even the difficult topics so patiently and always encouraged us to speak without being afraid of mistakes. Her positive energy and sweet nature made learning German much easier and enjoyable.<br><br>Danke sch\u00f6n for being such a wonderful teacher and making us fall in love with the language! \ud83c\udde9\ud83c\uddea\u2728"}, {"name": "Eshan Sharma", "loc": "Udhampur, Jammu and Kashmir, India", "course": "B1", "text": "Great learning from Tisha mam, live on classes great and she makes it easy to learn"}, {"name": "VIRAT CHAUDHARY", "loc": "Noida, Uttar Pradesh, India", "course": "A1", "text": "I had a great experience learning A1 level German with Tisha Ma\u2019am. Her teaching style is very clear, interactive, and easy to understand. She made learning German enjoyable and helped build my confidence in speaking and understanding the language. Highly recommended!!"}, {"name": "Varneet Singh", "loc": "Chandigarh, India", "course": "A1 Level", "text": "I started my German learning journey on Duolingo, but it wasn't delivering the results I expected. That's when I came across Ms. Tisha and enrolled in her A1 German course and it made all the difference. In just a few days, I learned more with her than I had in weeks on Duolingo."}, {"name": "Ali Mehdi", "loc": "New Delhi, Delhi, India", "course": "A2", "text": "Thank you so much for your guidance this term. I really appreciate how you balance a structured teaching style with such a warm and friendly personality. You\u2019ve created an environment where it feels safe to make mistakes and learn from them which has made studying German a truly enjoyable experience.<br>Vielen Dank f\u00fcr Ihre Geduld und Unterst\u00fctzung\ud83e\udef6"}, {"name": "Meshach Varuvel", "loc": "Kiel, Schleswig-Holstein, Germany", "course": "A1", "text": "Learning German A1 with Tisha was truly a wonderful experience for me. Before joining the class, I was nervous about learning a completely new language, but her friendly and encouraging teaching style made everything feel easy and comfortable.<br>Tisha always taught with so much patience, positivity, and dedication. No matter how many doubts we had, she explained every topic clearly and never hesitated to help us again and again until we understood. Her classes were interactive, fun, and full of motivation.<br>What I appreciated the most was how supportive and caring she was towards every student. She always encouraged us to speak in German confidently without being afraid of making mistakes. Because of her constant support, I slowly became more confident in reading, speaking, and understanding German. I\u2019m really grateful for all the effort and passion she put into teaching us."}];

let content = fs.readFileSync('js/translations.js', 'utf-8');
let replaced = content.replace(/("rev_loc_9":\s*"[^"]*")/g, (match) => {
    let app = match + ",";
    for (let i = 0; i < reviews.length; i++) {
        let r = reviews[i];
        let id = 10 + i;
        app += \\n    "rev_name_\": "\",\;
        app += \\n    "rev_course_\": "\",\;
        app += \\n    "rev_text_\": "\",\;
        app += \\n    "rev_loc_\": "\"\\;
    }
    return app;
});
fs.writeFileSync('js/translations.js', replaced, 'utf-8');

let html = fs.readFileSync('index.html', 'utf-8');
let reviewsHtml = '';
for (let i = 0; i < reviews.length; i++) {
    let id = 10 + i;
    reviewsHtml += \
                    <!-- Review \ -->
                    <div class="review-card">
                        <div class="review-top">
                            <h4 class="reviewer" data-i18n="rev_name_\">\</h4>
                            <div class="stars">\u2605\u2605\u2605\u2605\u2605</div>
                        </div>
                        <div class="verified-badge">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            <span data-i18n="rev_verified">Verified Student</span>
                        </div>
                        <p class="review-course" data-i18n="rev_course_\">\</p>
                        <p class="review-text" data-i18n="rev_text_\">\</p>
                        <button class="see-more-btn" onclick="openReviewModal(this)" data-i18n="rev_btn_see_more">See more</button>
                        <div class="review-date" data-i18n="rev_loc_\">\</div>
                    </div>\;
}

html = html.replace(/(\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class="form-container)/, reviewsHtml + '\');
fs.writeFileSync('index.html', html, 'utf-8');
console.log("Success");
