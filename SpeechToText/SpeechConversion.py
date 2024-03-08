import speech_recognition as sr

r = sr.Recognizer()

def record_text():
    #Loop in case of errors
    while(1):
        try:
            #use the microphone as source of input. 
            with sr.Microphone() as source2:
                # Prepare recognizer to receive input
                r.adjust_for_ambient_noise(source2, duration=0.2)

                #listen for the user's input 
                audio2 = r.listen(source2)

                #Using google to recognize audio
                MyText = r.recognize_google(audio2)

        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))

        except sr. UnknownValueError:
            print("unkown value occurrence")
        return MyText

def output_text(text):
    f=open("output.txt", "a")
    f.write(text)
    f.write("\n")
    f.close()
    return

while(1):
    text = record_text()
    output_text(text)

    print("Wrote text")