var motd =
'                          __ _     _     \n' +
'                         / _(_)   | |    \n' +
'  _ __   __ ___  ____  _| |_ _ ___| |__  \n' +
' | \'_ \\ / _\` \\ \\/ /\\ \\/ /  _| / __| \'_ \\ \n' +
' | | | | (_| |>  <  >  <| | | \\__ \\ | | | \n' +
' |_| |_|\\__,_/_/\\_\\/_/\\_\\_| |_|___/_| |_| \n\n\n' +
'[ OKIEKOKIE-3000 ] Firmware version 3.1.4;\n' +
'\n' +
'Enter commands at your own risk...'

function setupTerminal () {
  $('div#terminal').terminal({
    whereis: function (person) {
      if (person === 'naxxfish') {
        this.echo('A suffusion of yellow....')
      } else {
        this.echo('no clue')
      }
    },
    del: function (stuff) {
      this.echo('what do you think this is, Windows?')
    },
    rm: function (something) {
      this.echo(`I don't think so...`)
    },
    ls: function () {
      this.echo('.... nothing much really ....')
    },
    cd: function (directory) {
      this.echo('but this directory is clearly the best, why would you ever want to go anywhere else?')
    },
    ping: function (host) {
      this.echo('pong?')
    },
    help: function () {
      this.echo('help meee help meeeeeeee')
    }
  }, {
    greetings: motd,
    name: 'naxxfish',
    prompt: '$ ',
    height: '100%'
  })
}
