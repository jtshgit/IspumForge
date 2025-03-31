from flask import Flask, request, jsonify
from flask_cors import CORS
from lorem_text import lorem
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SUPPORTED_LANGUAGES = [
    "english", "spanish", "french", "german", "hindi", "chinese", 
    "japanese", "italian", "portuguese", "russian"
]

@app.route('/generate', methods=['GET'])
def generate_lorem():
    try:
        num_paragraphs = int(request.args.get('paragraphs', 1))
        word_count = int(request.args.get('word_count', 50))  # Default words per paragraph
        language = request.args.get('language', 'english').lower()

        if language not in SUPPORTED_LANGUAGES:
            return jsonify({"error": "Language not supported"}), 400

        # Generate multiple paragraphs
        paragraphs = [" ".join(lorem.words(word_count).split()[:word_count]) for _ in range(num_paragraphs)]

        if language != "english":
            translated_paragraphs = [
                GoogleTranslator(source="auto", target=language).translate(para) 
                for para in paragraphs
            ]
        else:
            translated_paragraphs = paragraphs

        return jsonify({"paragraphs": translated_paragraphs})  # Return as list
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
