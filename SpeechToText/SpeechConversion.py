import speech_recognition as sr

r = sr.Recognizer()

def record_text():
    while True:
        try:
            with sr.Microphone() as source2:
                r.adjust_for_ambient_noise(source2, duration=0.2)
                audio2 = r.listen(source2)
                MyText = r.recognize_google(audio2)

        except sr.RequestError as e:
            print("Could not request results: {0}".format(e))
            continue

        except sr.UnknownValueError:
            print("Unknown value occurrence")
            continue

        return MyText

def output_text(text):
    try:
        with open("output.txt", "a") as f:
            f.write(text + "\n")
    except IOError as e:
        print("Error writing to file:", e)

def live_transcript():
    while True:
        print("Listening...")
        text = record_text()
        print("Recognized:", text)
        output_text(text)
        print("Transcription saved to output.txt")
