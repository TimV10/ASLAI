from flask import Flask, render_template, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import speech_recognition as sr

app = Flask(__name__)

UPLOAD_FOLDER = 'SpeechToText/'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}  # Update allowed extensions based on your requirements

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'your_secret_key'  # Set a secret key for flash messages


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'fileToUpload' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['fileToUpload']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Process the saved audio file for speech recognition
        r = sr.Recognizer()
        with sr.AudioFile(filepath) as source:
            audio_text = r.listen(source)
            try:
                # Using Google speech recognition
                text = r.recognize_google(audio_text)
                print('Converting audio transcripts into text...')
                # Instead of printing and flashing, pass the text to the template
                return render_template('index.html', recognized_text=text)
            except Exception as e:
                print(e)
                flash('Could not process audio file. Please try again.')
                return redirect(url_for('index'))
    else:
        flash('Invalid file type.')
        return redirect(request.url)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
