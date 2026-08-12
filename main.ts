let recording = false
let readyToSend = false

function showReady() {
    basic.showIcon(IconNames.Yes)
    basic.pause(300)
    basic.clearScreen()
}

function showRecording() {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        . # # # .
        . . # . .
    `)
}

function startRecording() {
    if (recording) {
        return
    }

    recording = true
    readyToSend = false
    showRecording()

    // The microphone extension is available in this project.
    // The actual audio transport to Yuvansh Bot will be added in the
    // companion host/device bridge; the micro:bit handles the controls.
    music.playTone(262, music.beat(BeatFraction.Eighth))
}

function finishRecording() {
    if (!recording) {
        return
    }

    recording = false
    readyToSend = true
    basic.showIcon(IconNames.Yes)
    basic.pause(300)
    basic.clearScreen()
}

input.onButtonPressed(Button.A, function () {
    startRecording()
})

input.onButtonReleased(Button.A, function () {
    finishRecording()
})

input.onButtonPressed(Button.B, function () {
    if (readyToSend) {
        basic.showIcon(IconNames.ArrowEast)
        basic.pause(300)
        radio.sendString("YJ_SEND")
        basic.showString("SEND")
        readyToSend = false
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.No)
        basic.pause(300)
        basic.clearScreen()
    }
})

input.onButtonPressed(Button.AB, function () {
    recording = false
    readyToSend = false
    radio.sendString("YJ_CANCEL")
    basic.showIcon(IconNames.No)
    basic.pause(300)
    basic.clearScreen()
})

radio.setGroup(1108)
showReady()
