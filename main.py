from microbit import *

# Yuvansh Bot micro:bit controller

recording = False
has_message = False

# Startup
display.show(Image.YES)
sleep(500)
display.clear()

while True:

    # A + B = reset
    if button_a.is_pressed() and button_b.is_pressed():

        recording = False
        has_message = False

        display.clear()
        display.show(Image.NO)
        sleep(500)
        display.clear()

        # Wait for both buttons to be released
        while button_a.is_pressed() or button_b.is_pressed():
            sleep(10)

    # Hold A = recording
    elif button_a.is_pressed():

        if not recording:
            recording = True
            has_message = False

        display.show(Image.MUSIC_QUAVER)
        sleep(100)

    # A released = recording finished
    elif recording:

        recording = False
        has_message = True

        display.show(Image.YES)
        sleep(500)
        display.clear()

    # B = send
    if button_b.was_pressed():

        if has_message:

            display.show(Image.ARROW_EAST)
            sleep(500)

            # Yuvansh Bot connection will go here.
            display.scroll("SEND")

            has_message = False
            display.clear()

        else:

            display.show(Image.NO)
            sleep(500)
            display.clear()

    sleep(20)