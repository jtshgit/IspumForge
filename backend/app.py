from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Predefined text samples for different languages
LOREM_TEXT = {
    "english": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis egestas rhoncus. Quisque at felis eget nulla placerat suscipit. Curabitur sodales purus ut justo suscipit, at scelerisque tortor volutpat. Proin posuere, erat non scelerisque suscipit, eros dui sagittis turpis, et suscipit justo nulla ac erat. Integer gravida, magna at consectetur fringilla, sapien erat vehicula lectus, id tincidunt mi nulla et erat. Fusce tempus justo ut urna volutpat, sit amet fermentum nulla consectetur.",
    "spanish": "Este es un texto de ejemplo en español generado automáticamente. El sol brilla sobre las montañas, mientras el río fluye suavemente por el valle. Cada palabra forma parte de una estructura compleja que da sentido a las frases. La gramática y la sintaxis son esenciales para la comprensión del lenguaje. Los escritores buscan siempre la forma más clara y efectiva de transmitir sus pensamientos. En la literatura, la creatividad juega un papel fundamental, permitiendo la expresión de ideas únicas e innovadoras.",
    "french": "Ceci est un texte exemple en français généré automatiquement. Chaque phrase suit une construction bien définie, permettant une lecture fluide et agréable. Les écrivains cherchent toujours à améliorer leur style et leur vocabulaire. La langue française est riche en nuances et en subtilités. L'expression écrite demande une grande maîtrise de la grammaire et de l'orthographe. En lisant régulièrement, on enrichit son vocabulaire et sa compréhension de la langue. La littérature offre une immense diversité de styles et de genres.",
    "german": "Dies ist ein automatisch generierter Beispieltext auf Deutsch. Die Sprache ist ein mächtiges Werkzeug, das Menschen verbindet und Gedanken übermittelt. Jedes Wort trägt eine Bedeutung und eine Geschichte. Die Grammatik bildet das Fundament jeder Sprache und ermöglicht eine klare Kommunikation. In der Literatur finden wir Geschichten, die uns zum Nachdenken anregen und Emotionen hervorrufen. Jeder Satz ist eine kleine Welt für sich, gefüllt mit Ideen und Bildern.",
    "hindi": "यह हिंदी में स्वचालित रूप से उत्पन्न किया गया एक उदाहरण पाठ है। भाषा अभिव्यक्ति का एक सशक्त माध्यम है जो विचारों को स्पष्टता से संप्रेषित करने में मदद करता है। प्रत्येक शब्द का एक विशेष महत्व और संदर्भ होता है। हिंदी साहित्य में अनेक विधाएँ शामिल हैं, जिनमें कविता, कथा, नाटक और निबंध प्रमुख हैं। भाषा का सही ज्ञान संचार को प्रभावी बनाता है। शब्दों की सही समझ और प्रयोग भाषा को सशक्त बनाते हैं।",
    "chinese": "这是自动生成的中文示例文本。语言是人类沟通的重要工具，每个词汇都承载着特定的意义和文化背景。语法是语言的基础，使表达更加清晰和准确。在文学中，我们可以找到丰富多彩的故事，它们启发思考并引起共鸣。阅读可以拓宽我们的视野，增强我们的理解能力。通过不断学习和实践，我们可以更好地掌握语言的精髓。",
    "japanese": "これは自動生成された日本語のサンプルテキストです。言語はコミュニケーションの基本であり、それぞれの単語には特別な意味があります。文法は正確な表現を可能にし、文章の理解を助けます。文学の世界では、物語が私たちに感動を与え、思考を促します。読書は視野を広げ、知識を深める手段の一つです。言語を学び続けることで、より豊かな表現が可能になります。",
    "italian": "Questo è un testo di esempio generato automaticamente in italiano. La lingua è un mezzo fondamentale per la comunicazione umana. Ogni parola ha un significato preciso e una storia dietro di sé. La grammatica consente di strutturare correttamente le frasi per una comunicazione chiara ed efficace. La letteratura ci offre storie emozionanti e spunti di riflessione. Ogni testo scritto rappresenta un'opportunità per apprendere e approfondire la nostra conoscenza linguistica.",
    "portuguese": "Este é um texto de exemplo gerado automaticamente em português. A língua é um elemento essencial da comunicação humana, permitindo a troca de ideias e informações. Cada palavra tem um significado único e uma função específica. A gramática e a sintaxe garantem a clareza da mensagem transmitida. A literatura nos transporta para universos imaginários e nos faz refletir sobre a realidade. Ler e escrever são habilidades fundamentais para o desenvolvimento pessoal e intelectual.",
    "russian": "Это автоматически сгенерированный пример текста на русском языке. Язык является важнейшим инструментом общения, позволяющим людям выражать свои мысли и чувства. Каждое слово несет в себе определенный смысл и эмоции. Грамматика и синтаксис помогают строить правильные и понятные предложения. Литература открывает перед нами новые миры и помогает лучше понимать окружающую реальность. Чтение способствует расширению кругозора и развитию интеллекта.",
    "arabic": "هذا نص مثال تم إنشاؤه تلقائيًا باللغة العربية. اللغة وسيلة أساسية للتواصل والتعبير عن الأفكار والمشاعر. لكل كلمة معنى محدد ودور هام في تكوين الجمل. القواعد النحوية تساهم في تحقيق وضوح المعنى وسهولة الفهم. في الأدب، نجد قصصًا تلهمنا وتوسع مداركنا. القراءة تثري المفردات وتعمّق الفهم اللغوي.",
    "turkish": "Bu, otomatik olarak oluşturulmuş bir Türkçe örnek metindir. Dil, insanların düşüncelerini ve duygularını ifade etmelerini sağlayan temel bir iletişim aracıdır. Her kelimenin kendine özgü bir anlamı vardır. Dil bilgisi kuralları, cümlelerin doğru ve anlaşılır olmasını sağlar. Edebiyat, bizi farklı dünyalara götürür ve hayal gücümüzü geliştirir. Okuma, bilgi edinmenin en etkili yollarından biridir.",
    "dutch": "Dit is een automatisch gegenereerde voorbeeldtekst in het Nederlands. Taal is een krachtig middel om gedachten en gevoelens over te brengen. Elk woord heeft zijn eigen betekenis en functie in een zin. Grammatica zorgt voor structuur en duidelijkheid in communicatie. Literatuur biedt een schat aan kennis en inspiratie. Lezen helpt bij het uitbreiden van onze woordenschat en het verbeteren van onze taalvaardigheden.",
    "korean": "이것은 자동 생성된 한국어 예제 텍스트입니다. 언어는 사람들 사이의 의사소통을 가능하게 하는 중요한 도구입니다. 각 단어는 고유한 의미를 가지며 문장을 구성하는 데 필수적인 역할을 합니다. 문법은 명확한 표현을 가능하게 하고 이해를 돕습니다. 문학은 다양한 이야기와 감동을 제공하며 우리의 사고를 확장시킵니다. 독서는 지식을 넓히고 사고력을 향상시키는 중요한 활동입니다。",
    "swedish": "Detta är en automatiskt genererad exempeltext på svenska. Språk är ett kraftfullt verktyg för kommunikation och förståelse. Varje ord bär på en betydelse och en historia. Grammatik och syntax hjälper till att skapa tydliga och begripliga meningar. Litteratur öppnar dörrar till nya världar och ger oss insikt i olika perspektiv. Att läsa regelbundet förbättrar vår språkförmåga och förståelse.",
    "polish": "To jest automatycznie wygenerowany przykładowy tekst po polsku. Język jest narzędziem, które umożliwia ludziom komunikację i wyrażanie myśli. Każde słowo ma swoje znaczenie i historię. Gramatyka pomaga w budowaniu poprawnych i zrozumiałych zdań. Literatura dostarcza inspirujących historii i rozwija wyobraźnię. Regularne czytanie wzbogaca słownictwo i poprawia umiejętności językowe.",
    "greek": "Αυτό είναι ένα αυτόματα δημιουργημένο παράδειγμα κειμένου στα ελληνικά. Η γλώσσα είναι ένα ισχυρό μέσο επικοινωνίας και κατανόησης. Κάθε λέξη έχει τη δική της σημασία και ιστορία. Η γραμματική και το συντακτικό βοηθούν στη δημιουργία σαφών και κατανοητών προτάσεων. Η λογοτεχνία μας μεταφέρει σε φανταστικούς κόσμους και διευρύνει τους ορίζοντές μας. Το διάβασμα βελτιώνει την κατανόηση και εμπλουτίζει το λεξιλόγιό μας.",
    "hebrew": "זהו טקסט לדוגמה שנוצר באופן אוטומטי בעברית. השפה היא כלי רב עוצמה לתקשורת ולהבעת רעיונות. לכל מילה יש משמעות ייחודית ותפקיד במשפט. הדקדוק מסייע ביצירת משפטים ברורים ומובנים. ספרות פותחת דלת לעולמות חדשים ומעשירה את הדמיון. קריאה סדירה משפרת את הידע הלשוני ומרחיבה את האופקים.",
    "thai": "นี่คือตัวอย่างข้อความที่สร้างขึ้นโดยอัตโนมัติในภาษาไทย ภาษาเป็นเครื่องมือที่สำคัญในการสื่อสารและแสดงความคิด คำแต่ละคำมีความหมายเฉพาะตัวและมีบทบาทในโครงสร้างของประโยค ไวยากรณ์ช่วยให้การสื่อสารมีความชัดเจนและเข้าใจง่าย วรรณกรรมเปิดโอกาสให้เราได้เรียนรู้และเข้าใจมุมมองที่แตกต่าง การอ่านช่วยพัฒนาทักษะทางภาษาและเพิ่มพูนความรู้.",
    "indonesian": "Ini adalah teks contoh yang dihasilkan secara otomatis dalam bahasa Indonesia. Bahasa adalah alat utama dalam komunikasi dan ekspresi. Setiap kata memiliki makna unik dan fungsi dalam struktur kalimat. Tata bahasa membantu menciptakan komunikasi yang jelas dan efektif. Sastra membawa kita ke dunia imajinasi dan memperluas wawasan kita. Membaca secara rutin meningkatkan pemahaman dan keterampilan bahasa."
}

@app.route('/generate', methods=['GET'])
def generate_lorem():
    try:
        num_paragraphs = int(request.args.get('paragraphs', 1))
        word_count = int(request.args.get('word_count', 50))  # Default words per paragraph
        language = request.args.get('language', 'english').lower()

        if language not in LOREM_TEXT:
            return jsonify({"error": "Language not supported"}), 400

        # Generate multiple paragraphs with the given word count
        base_text = LOREM_TEXT[language].split()
        paragraphs = [
            " ".join(random.choices(base_text, k=word_count))  # Randomly pick words to form a paragraph
            for _ in range(num_paragraphs)
        ]

        return jsonify({"paragraphs": paragraphs})  # Return list of paragraphs

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
