module.exports = {
  run: [
    // 1. Windows download
    {
      when: "{{platform === 'win32'}}",
      method: "fs.download",
      params: {
        uri: "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-windows-4.0-amd64.exe",
        path: "app/gitea.exe"
      }
    },
    // 2. macOS Intel (amd64) download
    {
      when: "{{platform === 'darwin' && arch === 'x64'}}",
      method: "fs.download",
      params: {
        uri: "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-darwin-amd64",
        path: "app/gitea"
      }
    },
    // 3. macOS Apple Silicon (arm64) download
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "fs.download",
      params: {
        uri: "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-darwin-arm64",
        path: "app/gitea"
      }
    },
    // 4. Linux x64 download
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "fs.download",
      params: {
        uri: "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-linux-amd64",
        path: "app/gitea"
      }
    },
    // 5. Linux arm64 download
    {
      when: "{{platform === 'linux' && arch === 'arm64'}}",
      method: "fs.download",
      params: {
        uri: "https://dl.gitea.com/gitea/1.22.4/gitea-1.22.4-linux-arm64",
        path: "app/gitea"
      }
    },
    // 6. Make executable on macOS and Linux
    {
      when: "{{platform === 'darwin' || platform === 'linux'}}",
      method: "shell.run",
      params: {
        message: "chmod +x app/gitea"
      }
    }
  ]
}
