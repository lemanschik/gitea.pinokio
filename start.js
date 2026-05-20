const platform = process.platform
const binaryPath = platform === 'win32' ? 'app\\gitea.exe' : 'app/gitea'

module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          `${binaryPath} web --port {{port}}`
        ],
        on: [{
          event: "/AppURL\\(ROOT_URL\\):\\s*(http:\\/\\/[a-zA-Z0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
